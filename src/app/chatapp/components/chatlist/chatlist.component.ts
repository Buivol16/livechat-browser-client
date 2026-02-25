import { Component, input, InputSignal, output } from '@angular/core';
import { Chat } from '../../models/chat.models';

@Component({
  selector: 'chatlist-component',
  templateUrl: './chatlist.component.html',
  styleUrl: './chatlist.component.css',
  standalone: true,
})
export class ChatlistComponent {
  readonly privateChats: InputSignal<Chat[] | undefined> = input();
  readonly publicChats: InputSignal<Chat[] | undefined> = input();
  readonly selectChatParentFunction = output<Chat>();

  selectChat(selectedChat: Chat){
    this.selectChatParentFunction.emit(selectedChat)
  }
}
