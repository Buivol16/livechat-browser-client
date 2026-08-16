import { Routes } from '@angular/router';
import { ChatAppComponent } from './chatapp/chatapp.component';
import { ChatWindowComponent } from './chatapp/components/chatwindow/chatwindow.component';
import { JoinWindowComponent } from './chatapp/components/join/join.component';

export const routes: Routes = [
  {
    path: 'main',
    component: ChatAppComponent,
    children: [
      { path: 'chat', component: ChatWindowComponent },
      { path: 'join/:id', component: JoinWindowComponent },
    ],
  },
];
