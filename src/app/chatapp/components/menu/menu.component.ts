import { Component } from "@angular/core";
import { PrivateChatsComponent } from "../privatechats/privatechats.component";
import { PublicChatsComponent } from "../publicchats/publicchats.component";

@Component({
        selector: "app-menu",
        standalone: true, 
        templateUrl: "./menu.component.html",
        styleUrl: "./menu.component.css",
        imports: [PrivateChatsComponent, PublicChatsComponent]
})
export class MenuComponent{
    
}