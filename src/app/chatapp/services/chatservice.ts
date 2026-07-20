import { Injectable, signal, WritableSignal } from "@angular/core";
import { Chat } from "../models/chat.models";
import { Message } from "../models/message.models";

@Injectable(
    {
        "providedIn": "root"
    }
)
export class ChatService{
    private selectedChat: WritableSignal<Chat | undefined> = signal(undefined);
    readonly privateChats?: Chat[] = [this.createChat("Denys Khmara", true, false, [this.createMessage("Where are you?", false, "Denys Khmara", 'img/dkhmara.png', new Date())], 'img/dkhmara.png'), this.createChat("Kevin McGrace", true, true, undefined, 'img/kmcgrace.png'), this.createChat("Catherine River", true, true, undefined, 'img/criver.png')];
    readonly publicChats?: Chat[] = [this.createChat('Cat lovers', false, undefined, undefined, 'img/catloversavatar.png'), this.createChat('Dog lovers', false, undefined, undefined, 'img/dogloversavatar.png'), this.createChat('Monke funny', false, undefined, undefined, 'img/monkeavatar.png')];
    
    getPrivateChats(){
        return this.privateChats;
    }
    
    getPublicChats(){
        return this.publicChats;
    }
    
    sendMessage(message: Message) {
        const oldMessages = this.selectedChat()!.messages;
        this.selectedChat()!.messages = [...oldMessages!, message];
    }
    
    getSelectedChat(){
        return this.selectedChat();
    }
    
    selectChat(chat: Chat){
        if(chat) this.selectedChat.update(() => chat);
    }
    
    createNewChat() {
        throw new Error('Method not implemented.');
    }
    
    createChat(name: string, isPrivate = false, isOnline = false, allMessages: Message[] = [], imgSrc: string) : Chat{
        return {name: name, messages: allMessages, isPrivate: isPrivate, isPublic: !isPrivate, isOnline: isOnline, isRead: false, imgSrc: imgSrc};
    }
    
    getCurrentChatName(): string {
      if(this.selectedChat() && this.selectedChat()!.name){
        return this.selectedChat()!.name!;
      }else{
        return "Select chat";
      }
    }

    getCurrentChatImage(){
        if(this.selectedChat() && this.selectedChat()!.imgSrc){
            return this.selectedChat()!.imgSrc!;
        } else{
            return null;
        }
    }

    getMessages() {
        if(this.selectedChat()){
            return this.selectedChat()!.messages;
        }else{
            return [];
        }
    }

    private createMessage(content: string, isMyMessage: boolean, sender: string, senderImage: string, timestamp: Date): Message{
        return {
            content: content,
            id: Math.random(),
            isMyMessage: isMyMessage,
            sender: sender,
            senderImage: senderImage,
            timestamp: timestamp
        };
    }
}