import { Message } from "./message.models";

export interface Chat {
    id?: string;
    imgSrc?: string;
    name?: string;
    isPublic?: boolean;
    isPrivate?: boolean;
    members?: string[];
    messages: Message[];
    isOnline: boolean;
    isRead: boolean;
}