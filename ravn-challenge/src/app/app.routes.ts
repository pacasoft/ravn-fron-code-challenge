import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    // lazy load CLIENTE
    {
        path: '',
        loadChildren: () => import('./features/Client/client.module').then(m => m.ClientModule)
    },
    // lazy load CLIENTE
    {
        path: 'user',
        loadChildren: () => import('./features/User/user.module').then(m => m.UserModule)
    },


];
