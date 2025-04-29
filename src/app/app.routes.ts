import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./feature/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login', loadComponent: () => import('./feature/login/login.component').then(m => m.LoginComponent) 
    },
    {
        path: 'register', loadComponent: () => import('./feature/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full' 
    }
];
