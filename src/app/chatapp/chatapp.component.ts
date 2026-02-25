import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { ChatlistComponent } from './components/chatlist/chatlist.component';
import { ChatWindowComponent } from './components/chatwindow/chatwindow.component';
import { Chat } from './models/chat.models';
import { Message } from './models/message.models';

@Component({
  selector: 'chat-app',
  templateUrl: './chatapp.component.html',
  styleUrl: './chatapp.component.css',
  standalone: true,
  imports: [ChatlistComponent, ChatWindowComponent],
})
export class ChatAppComponent {
  readonly privateChats?: Chat[] = [this.createChat("Barry"), this.createChat("James"), this.createChat("Marta")];
  readonly publicChats?: Chat[] = [this.createChat('PubChat1')];
  readonly selectedChat: WritableSignal<Chat> = signal({});
  readonly selectedChatMessages: Signal<Message[]> = computed(() => this.selectedChat().messages!!);
  readonly selectedChatName: Signal<string> = computed<string>(() => this.selectedChat().name ?? '');

  sendMessage(message: Message) {
    const oldMessages = this.selectedChat().messages;
    this.selectedChat.update((chat) => {
      chat.messages = [...oldMessages!!, message]
      return chat;
    });
  }

  selectChat(chat: Chat){
    if(chat && this.selectedChat()) this.selectedChat.set(chat)
  }

  createNewChat() {
    throw new Error('Method not implemented.');
  }

  private createChat(name: string) : Chat{
    return {name: name, messages: []}
  }
  
}
