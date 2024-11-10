import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginPayload } from '../../models/login-payload';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/api-response';
import { RegisterPayload } from '../../models/Register-payload';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environment/environment';  
import { TokenClaims } from '../../models/token-claims';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin = signal<boolean>(false);

  constructor(private _http: HttpClient, private router: Router) {
    if (this.getUserToken()) {
      this.isLoggedin.update(() => true);
    }
  }

  registerSeller(payload: RegisterPayload) {
    return this._http.post<ApiResponse>(
      `${environment.BaseURL}/api/account/register/seller`, payload
    ).pipe(
      map((response) => {
        if (response.statusCode === 200) {
          this.router.navigate(['login']);
        }
        return response;
      })
    );
  }

  customerRegister(payload: RegisterPayload) {
    return this._http.post<ApiResponse>(
      `${environment.BaseURL}/api/account/register/customer`, payload
    ).pipe(
      map((response) => {
        if (response.statusCode === 200) {
          this.router.navigate(['login']);
        }
        return response;
      })
    );
  }

  login(payload: LoginPayload) {
    return this._http.post<ApiResponse>(
      `${environment.BaseURL}/api/Account/login`, payload
    ).pipe(
      map((response) => {
        if (response.data.success && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.isLoggedin.update(() => true);
          this.router.navigate(['home']);
        }
        return response;
      })
    );
  }

  getTokenClaims(): TokenClaims | null {
    const token = this.getUserToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      const tokenClaims = {
        id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        roles: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      };
      console.log('Token claims:', tokenClaims);
      return tokenClaims;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  isTokenValid(): boolean {
    const token = this.getUserToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const isTokenExpired = Date.now() >= decoded['exp'] * 1000;
      if (isTokenExpired) this.logout();
      return !isTokenExpired;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return false;
    }
  }

  logout() {
    this.isLoggedin.update(() => false);
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }

  getUserToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  ForgetPassword(email: string) {
    const params = new HttpParams().set('email', email);
    return this._http.post(
      `${environment.BaseURL}/api/Account/forgot-password`, {}, {
        params,
        responseType: 'text',
      }
    );
  }

  verifyOTP(body: any) {
    return this._http.post(
      `${environment.BaseURL}/api/Account/verify-otp`, body, { responseType: 'text' }
    );
  }

  resetPassword(body: any) {
    return this._http.post(
      `${environment.BaseURL}/api/Account/reset-password`, body, { responseType: 'text' }
    );
  }
}
