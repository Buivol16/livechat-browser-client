export interface Message {
    id: number | null;
    chatId: number;
    authorId: string;
    receiverId: string;
    encryptedMessage: string;
    isPrivateChat: boolean;
    createdAt: Date;
    modifiedAt: Date | null;
    deletedForAll: boolean;
    deletedForAuthorOnly: boolean;

    senderImage: string;
    isMyMessage: boolean;
    isRead: boolean;
}