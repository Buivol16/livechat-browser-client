import { Component, input } from "@angular/core";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrl: "./message.component.css",
    standalone: true,
    imports: []
})
export class MessageComponent {
    readonly isMyMessage = input(false);
    readonly message = input('');
    readonly isCompoundMessage = input(false);
    readonly isFirstMessageInCompound = input(false);
    readonly isLastMessageInCompound = input(false);
    readonly when = input.required<string>();
}