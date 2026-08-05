import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Message } from '../../models/message.models';
import { Chat } from '../../models/chat.models';
import KeycloakService from '../keycloak/keycloakservice';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly MESSAGE_SERVICE_URL_PREFIX =
    'http://localhost:5555/message-service/message';
  readonly http = inject(HttpClient);
  readonly keycloakService = inject(KeycloakService);
  readonly messagesReceived = signal(false);

  sendMessage(message: Message, chat: Chat) {
    const oldMessages = chat.messages;
    this.http
      .post(this.MESSAGE_SERVICE_URL_PREFIX, message, {
        headers: {
          Authorization: this.keycloakService.getToken(),
        },
      })
      .subscribe();
    chat.messages = [...oldMessages!, message];
  }

  getAllMessagesByChatIdAndIsPrivate(chatId: number, isPrivate: boolean) {
    const request = this.http.get<Message[]>(this.MESSAGE_SERVICE_URL_PREFIX, {
      headers: {
        Authorization: this.keycloakService.getToken(),
      },
      params: {
        chatId: chatId,
        isPrivate: isPrivate,
      },
    });
    return request;
  }

  getMessagesSignal() {
    return this.messagesReceived;
  }

  setMessagesSignal(val: boolean){ 
    this.messagesReceived.set(val);
  }
}
