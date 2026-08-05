import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chatapp.component.html',
  styleUrl: './chatapp.component.css',
  standalone: true,
  imports: [MenuComponent, RouterOutlet]
})
export class ChatAppComponent {
}
