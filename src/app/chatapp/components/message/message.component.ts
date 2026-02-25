import { Component, input } from "@angular/core";

@Component({
    selector: "message",
    templateUrl: "./message.component.html",
    styleUrl: "./message.component.css",
    standalone: true,
    imports: []
})
export class MessageComponent {
    readonly isMyMessage = input(false);
    readonly message = input('');
    readonly isCompoundMessage = input(false);
}