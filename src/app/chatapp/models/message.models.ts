export interface Message {
    id: number;
    content: string;
    timestamp: Date;
    sender: string;
    isMyMessage: boolean;
}