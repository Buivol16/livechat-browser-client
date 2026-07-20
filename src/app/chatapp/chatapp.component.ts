import { Component, computed, inject, Signal } from '@angular/core';
import { Chat } from './models/chat.models';
import { Message } from './models/message.models';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chatservice';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chatapp.component.html',
  styleUrl: './chatapp.component.css',
  standalone: true,
  imports: [MenuComponent, RouterOutlet]
})
export class ChatAppComponent {
  readonly chatService: ChatService = inject(ChatService);
  readonly selectedChat?: Chat = this.chatService.getSelectedChat();
  readonly selectedChatMessages: Signal<Message[]> = computed(() => (this.selectedChat && this.selectedChat.messages) ?? []);
  readonly selectedChatName: Signal<string> = computed<string>(() => (this.selectedChat && this.selectedChat.name) ?? '');

  
  
}
