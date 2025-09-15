import { Component } from '@angular/core';
import { Chat } from '../models/chat.models';

@Component({
  selector: 'chatlist-component',
  templateUrl: './chatlist.component.html',
  styleUrl: './chatlist.component.css',
  standalone: true,
})
export class ChatlistComponent {
  privateChats: Chat[] = [
    { name: 'Barry' },
    { name: 'James' },
    { name: 'Marta' },
  ];
  publicChats: Chat[] = [{ name: 'PubChat1' }];
}
