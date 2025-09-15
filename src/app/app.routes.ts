import { Routes } from '@angular/router';
import { LoginAppComponent } from './loginapp/loginapp.component';
import { ChatAppComponent } from './chatapp/chat.component';

export const routes: Routes = [
    {
        "path": "login",
        "component": LoginAppComponent
    },
    {
        "path": "chat",
        "component": ChatAppComponent
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
