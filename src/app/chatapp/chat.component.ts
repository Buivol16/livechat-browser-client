import { Component } from '@angular/core';
import { ChatlistComponent } from './components/chatlist/chatlist.component';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone: true,
  imports: [ChatlistComponent, ChatComponent],
})
export class ChatAppComponent {
  createNewChat() {
    throw new Error('Method not implemented.');
  }
}
