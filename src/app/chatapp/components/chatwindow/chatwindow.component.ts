import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.models';
import { Chat } from '../../models/chat.models';
import { ChatService } from '../../services/chatservice';
import { MessageComponent } from "../message/message.component";
// import { ChatProfileImageComponent } from "../chatprofileimage/chatprofileimage.component";

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrl: './chatwindow.component.css',
  standalone: true,
  imports: [FormsModule, MessageComponent,/* ChatProfileImageComponent*/],
  host: {
    class: 'w-full'
  },
})
export class ChatWindowComponent {
  readonly chatService = inject(ChatService);

  readonly currChat = input<Chat>();
  readonly message = signal('');

  sendMyMessage(event: SubmitEvent) {
    const mess: Message = {
      content: this.message(), 
      id: 1,
      isMyMessage: true,
      sender: 'Me',
      senderImage: 'img/avatarka.png',
      timestamp: new Date()
    };

    this.chatService.sendMessage(mess);
    
    this.message.set('');
    event.preventDefault();
  }

  getMessages(){
    return this.chatService.getMessages();
  }

  haveNextMessageFromSameSender(currentMessage: Message, currentIndex: number){
    const nextMessage = this.chatService.getMessages()[currentIndex + 1];
    if(nextMessage && currentMessage.sender === nextMessage.sender){
      return true;
    }else{
      return false;
    }
  }

  getChatName(){
    return this.chatService.getCurrentChatName();
  }

  getChatImage(){
    return this.chatService.getCurrentChatImage();
  }

  isFirstMessage(mes: Message, index: number){
    const messages = this.getMessages();
    if(messages[index-1] === undefined) return true;
    else return messages[index-1].sender !== mes.sender;
  }

  isLastMessage(mes: Message, index: number){
    const messages = this.getMessages();
    return messages[index+1] === undefined || messages[index+1].sender !== mes.sender;
  }

  getFormattedDate(mes: Message){
    const when = mes.timestamp;
    return when.getHours() + ":" + when.getMinutes();
  }
}
