import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../../models/chat.models';
import { Message } from '../../models/message.models';
import { MessageService } from '../message/messageservice';
import KeycloakService from '../keycloak/keycloakservice';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly CHAT_SERVICE_URL_PREFIX =
    'http://localhost:5555/chat-service/chat';
  readonly http = inject(HttpClient);
  readonly messageService = inject(MessageService);
  readonly keycloakService = inject(KeycloakService);
  private selectedChat: WritableSignal<Chat | undefined> = signal(undefined);
  // readonly privateChats?: Chat[] = [this.createPrivateChat("Denys Khmara", false, [this.createMessage("Where are you?", false, "Denys Khmara", 'img/dkhmara.png', new Date(), false)], 'img/dkhmara.png'), this.createPrivateChat("Kevin McGrace", true, undefined, 'img/kmcgrace.png'), this.createPrivateChat("Catherine River", true, undefined, 'img/criver.png')];
  // readonly publicChats?: Chat[] = [this.createPublicChat('Cat lovers', undefined, 'img/catloversavatar.png'), this.createPublicChat('Dog lovers', undefined, 'img/dogloversavatar.png'), this.createPublicChat('Monke funny', undefined, 'img/monkeavatar.png')];
  readonly messages = signal<Message[]>([]);
  getPrivateChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.CHAT_SERVICE_URL_PREFIX + '/private', {
      headers: {
        Authorization: this.keycloakService.getToken(),
      },
    });
  }

  getPublicChats() {
    return this.http.get<Chat[]>(this.CHAT_SERVICE_URL_PREFIX + '/public', {
      headers: {
        Authorization: this.keycloakService.getToken(),
      },
    });
  }

  selectChat(chat: Chat) {
    if (chat) {
      this.selectedChat.update(() => chat);
      this.tryGetMessages(chat);
    }
  }

  private tryGetMessages(chat: Chat) {
    this.messageService
      .getAllMessagesByChatIdAndIsPrivate(chat.id, true)
      .subscribe({
        next: (messages: Message[]) => {
          this.messageService.setMessagesSignal(true);
          messages.forEach((message) => {
            message.isSent = true;
            message.formattedDate = this.getFormattedDate(message.createdAt);
          });
          chat.messages = [...messages];
        },
        error: () => {
          setTimeout(() => this.tryGetMessages(chat), 5000);
        },
      });
  }

  createNewChat() {
    throw new Error('Method not implemented.');
  }

  // createPrivateChat(name: string, isOnline = false, allMessages: Message[] = [], imgSrc: string) : Chat{
  //     return { id: name: name, messages: allMessages, isOnline: isOnline, isRead: false, imgSrc: imgSrc};
  // }

  // createPublicChat(name: string, allMessages: Message[] = [], imgSrc: string) : Chat{
  //     return { name: name, messages: allMessages, isOnline: false, isRead: false, imgSrc: imgSrc, id: 0,};
  // }
  
  private getFormattedDate(date: Date) {
    const when: Date = new Date(date);
    let minutes = '' + when.getMinutes();
    if (Number.parseInt(minutes) < 10) minutes = '0' + minutes;
    return when.getHours() + ':' + minutes;
  }

  getCurrentChatName(): string {
    if (this.selectedChat() && this.selectedChat()!.name) {
      return this.selectedChat()!.name!;
    } else {
      return 'Select chat';
    }
  }

  getCurrentChatImage() {
    if (this.selectedChat() && this.selectedChat()!.imgSrc) {
      return this.selectedChat()!.imgSrc!;
    } else {
      return null;
    }
  }

  getCurrentChatSignal(): WritableSignal<Chat | undefined> {
    return this.selectedChat;
  }

  getMessages() {
    if (this.selectedChat()) {
      return this.selectedChat()!.messages;
    } else {
      return [];
    }
  }

  // private createMessage(content: string, isMyMessage: boolean, sender: string, senderImage: string, timestamp: Date, isRead: boolean, chatId: number, receiverId: string): Message{
  //     return {
  //         encryptedMessage: content,
  //         id: null,
  //         isMyMessage: isMyMessage,
  //         authorId: sender,
  //         senderImage: senderImage,
  //         createdAt: timestamp,
  //         isRead: isRead,
  //         chatId: chatId,
  //         deletedForAll: false,
  //         deletedForAuthorOnly: false,
  //         //todo change it when make possible to send messages for public chats
  //         isPrivateChat: true,
  //         modifiedAt: null,
  //         receiverId: receiverId
  //     };
  // }
}
