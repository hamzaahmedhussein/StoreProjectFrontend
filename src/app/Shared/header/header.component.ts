import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
   authService=inject(AuthService);
   injector=inject(Injector);
   isLoggedin=this.authService.isLoggedin();

   ngOnInit(): void {
    effect(() => {
      this.isLoggedin=this.authService.isLoggedin();
    },
    {
      injector:this.injector
    });
  }
}
