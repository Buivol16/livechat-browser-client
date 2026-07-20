import { Routes } from '@angular/router';
import { LoginAppComponent } from './login/login.component';
import { ChatAppComponent } from './chatapp/chatapp.component';
import { ChatWindowComponent } from './chatapp/components/chatwindow/chatwindow.component';

export const routes: Routes = [
    {
        "path": "login",
        "component": LoginAppComponent
    },
    {
        "path": "main",
        "component": ChatAppComponent,
        "children": [
            {"path": "chat", "component": ChatWindowComponent}
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
