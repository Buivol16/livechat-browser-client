import {
  AfterViewInit,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Chat } from '../../models/chat.models';
import { Member } from '../../models/member.models';
import { ChatService } from '../../services/chat/chatservice';

@Component({
  selector: 'app-chatprofile',
  templateUrl: './chatprofile.component.html',
  styleUrl: './chatprofile.component.css',
  standalone: true,
  imports: [],
  host: {
    class: 'w-full',
  },
})
export class ChatProfile implements AfterViewInit {
  readonly members = signal<Member[]>([]);
  readonly chatService = inject(ChatService);
  readonly chatDescription = input.required<string>();
  readonly chat = input.required<Chat>();
  readonly closeWindow = output();
  readonly removeUserFunc = output<Member>();

  ngAfterViewInit(): void {
    if (this.chat()) {
      this.chatService.getMembersOfChat(this.chat()!.id).subscribe({
        next: (val) => {
          this.members.set(val);
        },
      });
    }
  }

  removeUser(mem: Member) {
    this.removeUserFunc.emit(mem);
    this.members.set(this.members().filter(val => val !== mem));
  }
}
