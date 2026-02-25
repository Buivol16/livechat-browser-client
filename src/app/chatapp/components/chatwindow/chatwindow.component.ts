import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from "../message/message.component";
import { Message } from '../../models/message.models';
import { MessageDirective } from "../../directives/message/message.directive";
import { ChatProfileImageComponent } from "../chatprofileimage/chatprofileimage.component";
import { Chat } from '../../models/chat.models';

@Component({
  selector: 'chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrl: './chatwindow.component.css',
  standalone: true,
  imports: [FormsModule, MessageComponent, MessageDirective, ChatProfileImageComponent],
})
export class ChatWindowComponent {
  readonly currChat = input.required<Chat>();
  readonly messages = input.required<Message[]>();
  readonly chatName = computed(() => this.currChat().name ?? 'Select chat');
  readonly sendMessage = output<Message>();
  readonly message = signal('');

  sendMyMessage(event: SubmitEvent) {
    var mess: Message = {
      content: this.message(), 
      id: 1,
      isMyMessage: false,
      sender: 'Me',
      timestamp: new Date()
    };

    this.sendMessage.emit(mess);
    
    this.message.set('');
    event.preventDefault();
  }

  haveNextMessageFromSameSender(currentMessage: Message, currentIndex: number){
    const nextMessage = this.messages()[currentIndex + 1];
    if(nextMessage && currentMessage.sender === nextMessage.sender){
      return true;
    }else{
      return false;
    }
  }
}
