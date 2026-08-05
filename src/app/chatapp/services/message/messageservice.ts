import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Message } from "../../models/message.models";
import { Chat } from "../../models/chat.models";
import KeycloakService from "../keycloak/keycloakservice";

@Injectable(
    {
        providedIn: "root"
    }
)
export class MessageService{
    private readonly MESSAGE_SERVICE_URL_PREFIX = 'http://localhost:5555/message-service/message';
    readonly http = inject(HttpClient);
    readonly keycloakService = inject(KeycloakService);

    sendMessage(message: Message, chat: Chat) {
        const oldMessages = chat.messages;
        this.http.post(this.MESSAGE_SERVICE_URL_PREFIX, message, {
            headers: {
                "Authorization": this.keycloakService.getToken()
            }
        }).subscribe((res) => {
            console.log(res);
        });
        chat.messages = [...oldMessages!, message];
    }

    getAllMessagesByChatIdAndIsPrivate(chatId: number, isPrivate: boolean){
        return this.http.get<Message[]>(this.MESSAGE_SERVICE_URL_PREFIX, {
            headers: {
                "Authorization": this.keycloakService.getToken()
            },
            params: {
                chatId: chatId,
                isPrivate: isPrivate
            }
        });
    }
}