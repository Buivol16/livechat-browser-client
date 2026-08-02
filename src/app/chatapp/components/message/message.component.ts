import { NgClass } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrl: "./message.component.css",
    standalone: true,
    imports: [NgClass]
})
export class MessageComponent {
    readonly isMyMessage = input(false);
    readonly message = input('');
    readonly isCompoundMessage = input(false);
    readonly isFirstMessageInCompound = input(false);
    readonly isLastMessageInCompound = input(false);
    readonly when = input.required<string>();
    readonly isChecked = input.required<boolean>();
    readonly isSent = input.required<boolean>();
}