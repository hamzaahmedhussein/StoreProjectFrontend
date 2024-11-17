import { Routes } from '@angular/router';
import { LayoutComponent } from './Shared/layout/layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { SellerProfileComponent } from './Pages/seller-profile/seller-profile.component';

export const routes: Routes = [
    {path: 'login',component: LoginComponent,title: 'Login'},
    {path: 'register',component: RegisterComponent,title: 'Register'},

    
    {path: '', component: LayoutComponent,
         children: [
          {path: '', redirectTo: '/home', pathMatch: 'full'},
          {path: 'home',component: HomeComponent,title: 'home'},
          {path: 'sellerprofile',component: SellerProfileComponent,title: 'sellerprofile'},

          { path: '**', redirectTo: '/home', pathMatch: 'full' }

           ]},
];
