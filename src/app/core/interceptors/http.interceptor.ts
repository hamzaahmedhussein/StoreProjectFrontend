import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  if (authService.isLoggedin()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getUserToken()}`
      }})};



        
  return next(req).pipe(
    retry(2),
    catchError((e , HttpErrorResponse) => {
      if(e.status===401)
      {
        localStorage.removeItem('token');
        router.navigate(['']);
      }

      const error = e.error.message || e.statusText;
      return throwError(() => error);
    }
  ));
};
