import { Routes } from '@angular/router';
import { LoginAppComponent } from './login/login.component';
import { ChatAppComponent } from './chatapp/chatapp.component';

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
