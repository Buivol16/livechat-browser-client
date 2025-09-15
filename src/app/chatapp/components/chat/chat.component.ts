import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from "../message/message.component";
import { Message } from '../../models/message.models';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone: true,
  imports: [FormsModule, MessageComponent],
})
export class ChatComponent {
  messages: Message[] = [];
  message: string = '';

  sendMessage() {
    throw new Error('Method not implemented.');
  }
}
