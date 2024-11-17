import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, map, throwError } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private _http=inject(HttpClient);

  profileInfo() {
    return this._http.get<ApiResponse>(`${environment.BaseURL}/api/account/seller`).pipe(
      map(response => {
        if (!response || typeof response !== 'object') {
          throw new Error('Invalid response format');
        }
        
        return response;
      }),
      catchError(error => {
        console.error('Error fetching profile info:', error);
        return throwError(() => new Error('Failed to fetch profile information. Please try again.'));
      })
    );
  }
  
}
