import { inject, Injectable, OnDestroy } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import KeycloakService from '../keycloak/keycloakservice';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'any',
  deps: [KeycloakService],
})
export default class NotificationService implements OnDestroy {
  private readonly keycloakService = inject(KeycloakService);
  private readonly http = inject(HttpClient);

  private readonly NOTIFICATION_SERVICE_URL =
    'ws://localhost:8080/notification';

  private readonly NOTIFICATION_CONFIRMED_URL =
    'http://localhost:8080/notification/confirm';

  private socket: Client = new Client({
    brokerURL: this.NOTIFICATION_SERVICE_URL,
    connectHeaders: {
      Authorization: this.keycloakService.getToken(),
    },
    onConnect: (frame) => {
      console.log('[STOMP] connected:', JSON.stringify(frame.headers));
      this.listenNotification();
    },
  });
  private subscription: StompSubscription | undefined;

  constructor() {
    this.socket.activate();
  }

  public listenNotification() {
    if (this.socket && this.socket.connected) {
      console.log('[STOMP] TRYING TO GET TOKEN FROM KEYCLOAK');
      this.socket.connectHeaders = {};
      this.socket.subscribe('/user/topic/notification', (message) => {
        console.log('[STOMP CLIENT] ' + message);
        const notificationUuid = JSON.parse(message.body).notificationUuid;
        this.http.post(
          this.NOTIFICATION_CONFIRMED_URL,
          {
            notificationUuid,
          },
          {
            headers: {
              Authorization: this.keycloakService.getToken(),
            },
          },
        ).subscribe();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

// debug: function (message) {
//     console.log(message);
//     log("[DEBUG] " + message);
// },

// onConnect: function (frame) {
//     log("Connected to STOMP");
//     log("Frame: " + JSON.stringify(frame.headers));

//     this.subscribe("/topic/notification", function (message) {
//         log("Received from /topic/notification:");
//         log(message.body);
//     });
//     stompClient.subscribe("/user/topic/notification", function (message) {
//         log("Received from /user/topic/notification:");
//         log(message.body);
//         fetch("http://localhost:8080/notification/confirm",{method: "POST", headers: {'Authorization': token}, body: JSON.parse(message.body).notificationUuid});
//     });

//     log("Subscribed to:");
//     log("- /topic/notification");
//     log("- /user/topic/notification");
// },

// onStompError: function (frame) {
//     log("STOMP error:");
//     log("Message: " + frame.headers["message"]);
//     log("Body: " + frame.body);
// },

// onWebSocketError: function (error) {
//     log("WebSocket error:");
//     log(error);
// },

// onWebSocketClose: function () {
//     log("WebSocket connection closed");
// }
