import { Component, inject } from "@angular/core";
import { PrivateChatsComponent } from "../privatechats/privatechats.component";
import { PublicChatsComponent } from "../publicchats/publicchats.component";
import KeycloakService from "../../services/keycloak/keycloakservice";

@Component({
        selector: "app-menu",
        standalone: true, 
        templateUrl: "./menu.component.html",
        styleUrl: "./menu.component.css",
        imports: [PrivateChatsComponent, PublicChatsComponent]
})
export class MenuComponent{
        private readonly keycloakService = inject(KeycloakService);

    logout(event: Event){
        event.preventDefault();
        console.log("Trying to logout...");
        this.keycloakService.logout();
    }

    login(event: Event){
        event.preventDefault();
        console.log("Trying to log in...");
        this.keycloakService.login();
    }
}