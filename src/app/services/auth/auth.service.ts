import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginPayload } from '../../models/login-payload';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/api-response';
import { RegisterPayload } from '../../models/Register-payload';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLoggedin = signal<boolean>(false);
  constructor(private _http :HttpClient,private router : Router) {
    if(this.getUserToken())
    {
      this.isLoggedin.update(()=>true);
    }
   }


  registerSerller(payload: RegisterPayload) {
    return this._http.post<ApiResponse>(
      'http://localhost:5291/api/account/register/seller', payload).pipe(
        map((response)=>{
          if(response.statusCode===200)
          {
            this.router.navigate(['login']);
          }
          return response;
        })
       );
  }
  


  customerRegister(payload: RegisterPayload) {
    return this._http.post<ApiResponse>(
      'http://localhost:5291/api/account/register/customer', payload).pipe(
        map((response)=>{
          if(response.statusCode===200)
          {
            this.router.navigate(['login']);
          }
          return response;
        })
       );
  }




  

  login(payload: LoginPayload) {
    return this._http.post<ApiResponse>(
      'http://localhost:7092/api/Account/login',
       payload).pipe(
        map((response)=>{
          if(response.data.success&&response.data.token)
          {
            localStorage.setItem('token',response.data.token);
            this.isLoggedin.update(()=>true);

          }
          return response;
        })
       );
  }
 

  getTokenClaims(): any {
    const token = this.getUserToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      const tokenClaims = {
        id: decoded['id'],
        name: decoded['name'],
        email: decoded['email'],
        roles: decoded['roles']
      }
      return tokenClaims;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  
  isTokenExpired(): boolean {
    const token = this.getUserToken();
    if (!token) return true; 
  
    try {
      const decoded: any = jwtDecode(token); 
      const isTokenExpired = Date.now() >= decoded['exp']! * 1000;     
      if(isTokenExpired) this.logout();
        return isTokenExpired;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return true; 
    }
  }


  logout(){
    this.isLoggedin.update(()=>false);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getUserToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
  
}
