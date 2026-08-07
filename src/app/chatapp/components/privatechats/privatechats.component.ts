import { Component, inject, signal, WritableSignal } from "@angular/core";
import { ChatComponent } from "../chat/chat.component";
import { ChatService } from "../../services/chat/chatservice";
import { Chat } from "../../models/chat.models";

@Component({
    standalone: true,
    selector: "app-private-chats",
    templateUrl: "./privatechats.component.html",
    styleUrl: "./privatechats.component.css",
    imports: [ChatComponent],
})
export class PrivateChatsComponent{
    readonly chatService = inject(ChatService);
    readonly chats : WritableSignal<Chat[]> = signal([]);

    constructor(){
        this.getAndMapChats();
    }
    
    getAndMapChats(){
        const result = this.chatService.getPrivateChats();
        result.subscribe((objs) => {
            this.chats?.update(chats => {
                chats = objs.map((object) => ({
                    ...object,
                    members: [],
                    messages: [],
                    isPrivate: true
                }));
                return chats;
            });
        });
    }

    getNowDate(chat: Chat){
        if(chat.messages.length > 0){
            return chat.messages[chat.messages.length-1].createdAt;
        }else{
            return null;
        }
    }

    getLastMessageContent(chat: Chat){
        return chat.messages.length > 0 ? chat.messages[chat.messages.length-1].encryptedMessage : '';
    }
}