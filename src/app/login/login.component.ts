import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { interval } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [FormsModule],
  animations: [
    
  ],
})
export class LoginAppComponent {
  username= '';
  isLoading = false;
  messages = ['Initializing login sequence...'];
  messagesTemplate = [
    'Verifying credentials...',
    'Establishing secure connection...',
    'Fetching user data...',
    'Loading user preferences...',
    'Setting up user environment...',
    'Applying security protocols...',
    'Checking for updates...',
    'Synchronizing data...',
    'Finalizing login process...',
    'Login successful! Redirecting...',
  ];
  private router = inject(Router);

  async performLogin() {
    //todo: implement actual login logic
    this.isLoading = true;
    console.log(`${this.username} trying to log in...`);
    interval(500).subscribe((i) => {
      if (i < this.messagesTemplate.length) {
        this.messages.push(this.messagesTemplate[i]);
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('Login function executed.');
    await this.router.navigate(['/chat']);
  }

  loadingTemplate() {
    this.isLoading = true;
  }

  scrollToBottom() {
    const container = document.querySelector('.overflow-y-scroll');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    return container ? container.scrollTop : 0;
  }
}