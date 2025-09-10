import { Component } from "@angular/core";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
})
export class LoginComponent {
    count: number = 0;
    prevNumbers: number[] = [];
    
    increment(){
        this.prevNumbers.push(this.count);
        this.count++;
    }
}