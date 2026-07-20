import { Component, inject, input } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ChatService } from "../../services/chatservice";
import { Chat } from "../../models/chat.models";

@Component({
    standalone: true,
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrl: "./chat.component.css",
    imports: [RouterLink]
})
export class ChatComponent{
    protected readonly chatService: ChatService = inject(ChatService);
    protected readonly router = inject(Router);

    readonly imgSrc = input.required<string>();
    readonly chatName = input.required<string>();
    readonly lastMessage= input.required<string>();
    readonly whenLastMessage = input.required<Date | null>();
    readonly isRead = input(false);
    readonly showOnline = input(false);
    readonly isOnline = input(false);
    readonly lastOnMenuList = input.required<boolean>();

    selectThisChat(){
        const chat: Chat = {
            name: this.chatName(),
            isRead: this.isRead(),
            isOnline: this.isOnline(),
            imgSrc: this.imgSrc(),
            messages: []
        };

        this.chatService.selectChat(chat);
    }

    getLastMessageDateFormatted(){
        const date = this.whenLastMessage();
        if(!date) return '';
        const month = date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth();

        if(date.getMilliseconds() - new Date().getMilliseconds() < 60000) return 'Now';

        return date.getDate() + '.' + month + '.' + date.getFullYear();
        
    }
}