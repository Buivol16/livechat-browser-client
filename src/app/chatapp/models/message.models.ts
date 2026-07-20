export interface Message {
    id: number;
    content: string;
    timestamp: Date;
    sender: string;
    senderImage: string;
    isMyMessage: boolean;
}