import {
  afterRenderEffect,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  viewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.models';
import { ChatService } from '../../services/chat/chatservice';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../../services/message/messageservice';
import { ChatScrollService } from '../../services/scroll/chatscrollservice';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrl: './chatwindow.component.css',
  standalone: true,
  imports: [FormsModule, MessageComponent /* ChatProfileImageComponent*/],
  host: {
    class: 'w-full',
  },
})
export class ChatWindowComponent {
  readonly chatService = inject(ChatService);
  readonly messageService = inject(MessageService);
  readonly chatScrollService = inject(ChatScrollService);
  readonly message = signal('');
  readonly currChat = this.chatService.getCurrentChatSignal();


  @ViewChild('chatContainer')
  private chatContainer?: ElementRef<HTMLDivElement>;

  readonly renderedMessages = viewChildren(MessageComponent);

  constructor() {
    afterRenderEffect(() => {
      const chat = this.currChat();
      const messagesReceived = this.messageService.getMessagesSignal();
      if (!chat || !messagesReceived() || !this.chatContainer) return;
      if (this.renderedMessages().length != chat.messages.length) return;
      console.log(
        'Scroll height: ' + this.chatContainer?.nativeElement.scrollHeight,
      );
      this.chatScrollService.registerChatContainer(this.chatContainer);
      this.chatScrollService.restorePosition(chat.id);
    });
  }

  sendMyMessage(event: SubmitEvent) {
    if (this.message().trim().length < 1) return;
    const chat = this.currChat()!;

    const mess: Message = {
      encryptedMessage: this.message(),
      id: null,
      isMyMessage: true,
      authorId: '5ba4fe19-d930-49c3-8a0e-6077e2b5ff17',
      senderImage: 'img/avatarka.png',
      createdAt: new Date(),
      isPrivateChat: true,
      chatId: chat.id,
      deletedForAll: false,
      deletedForAuthorOnly: false,
      modifiedAt: null,
      receiverId: '7d2b8e6f-9b58-4651-81a8-063e6a43aff9',
      isRead: false,
    };

    this.messageService.sendMessage(mess, chat);

    this.message.set('');
    event.preventDefault();
  }

  haveNextMessageFromSameSender(currentMessage: Message, currentIndex: number) {
    const nextMessage = this.chatService.getMessages()[currentIndex + 1];
    if (nextMessage && currentMessage.authorId === nextMessage.authorId) {
      return true;
    } else {
      return false;
    }
  }

  getChatName() {
    return this.chatService.getCurrentChatName();
  }

  getChatImage() {
    return this.chatService.getCurrentChatImage();
  }

  isFirstMessage(mes: Message, index: number) {
    const messages = this.currChat()!.messages;
    if (messages[index - 1] === undefined) return true;
    else return messages[index - 1].id !== mes.id;
  }

  isLastMessage(mes: Message, index: number) {
    const messages = this.currChat()!.messages;
    return (
      messages[index + 1] === undefined || messages[index + 1].id !== mes.id
    );
  }

  getFormattedDate(mes: Message) {
    const when: Date = new Date(mes.createdAt);
    let minutes = '' + when.getMinutes();
    if (Number.parseInt(minutes) < 10) minutes = '0' + minutes;
    return when.getHours() + ':' + minutes;
  }
}
