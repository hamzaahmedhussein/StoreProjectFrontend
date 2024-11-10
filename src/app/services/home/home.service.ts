import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _http=inject(HttpClient);

  paginatedFilteredProucts(pageIndex:number,pageSize:number,search:string,category:string, minPrice:number,maxPrice:number): Observable<ApiResponse>{
    let params=new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search.toString());
    }
    if (category) {
      params = params.set('category', category.toString());
    }
    if (maxPrice) {
      params = params.set('maxPrice', maxPrice.toString());
    }
    if (minPrice) {
      params = params.set('minPrice', minPrice.toString());
    }


    return this._http.get<ApiResponse>('http://localhost:5291/api/Products', {  params });

  }
}
