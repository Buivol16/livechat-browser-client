import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatScrollService {
  private readonly storagePrefix = 'chat-scroll-position:';
  private chatContainer?: ElementRef<HTMLDivElement>;

  registerChatContainer(chatContainer: ElementRef<HTMLDivElement>) {
    this.chatContainer = chatContainer;
  }

  save(chatId: number): void {
    if (!this.chatContainer) return;

    sessionStorage.setItem(
      this.storagePrefix + chatId,
      this.chatContainer.nativeElement.scrollTop.toString(),
    );
  }

  get(chatId: number): number | null {
    const value = sessionStorage.getItem(this.storagePrefix + chatId);

    if (value === null) {
      return null;
    }

    const position = Number(value);

    return Number.isFinite(position) ? position : null;
  }

  remove(chatId: string): void {
    console.log('removing ');
    sessionStorage.removeItem(this.storagePrefix + chatId);
  }

  restorePosition(chatId: number) {
    console.log('restoring position');
    const scrollTop = this.get(chatId);
    if (!this.chatContainer) return;
    console.log(
      '[Chat Scroll Service] scrollHeight: ' +
        this.chatContainer.nativeElement.scrollHeight,
    );
    if (!scrollTop)
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    else this.chatContainer.nativeElement.scrollTop = scrollTop;
  }
}
