import { Routes } from '@angular/router';
import { LayoutComponent } from './Shared/layout/layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {path: 'login', canActivate:[guestGuard],component: LoginComponent,title: 'Login'},
    {path: 'register', canActivate:[guestGuard],component: RegisterComponent,title: 'Register'},
    {path: '', component: LayoutComponent,
         children: [
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
          {path: 'dashboard', canActivate:[authGuard],component: DashboardComponent,title: 'dashboard'},
           ]},
];
