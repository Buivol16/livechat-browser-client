import { Component, inject, signal, WritableSignal } from "@angular/core";
import { ChatComponent } from "../chat/chat.component";
import { Chat } from "../../models/chat.models";
import { ChatService } from "../../services/chat/chatservice";

@Component({
    standalone: true,
    selector: "app-public-chats",
    templateUrl: "./publicchats.component.html",
    styleUrl: "./publicchats.component.css",
    imports: [ChatComponent]
})
export class PublicChatsComponent{
    readonly chatService = inject(ChatService);
    readonly chats : WritableSignal<Chat[]> = signal([]);

    constructor(){
        this.getAndMapChats();
    }
    
    getAndMapChats(){
        const result = this.chatService.getPublicChats();
        result.subscribe((objs) => {
            this.chats?.update(chats => {
                chats = objs.map((object) => ({
                    ...object,
                    members: [],
                    messages: [],
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
        return (chat.messages[chat.messages.length-1] && chat.messages[chat.messages.length-1].encryptedMessage) ?? '';
    }
}