import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { map } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private cache: any = {};


  constructor(private http: HttpClient) { }
  dataForRouteIsCached(route: any, refresh: any) {
    return this.cache[route] && (refresh === false || refresh === undefined);
  }


  getDataWithParams(route: any, params: any, refresh: any) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(route, { params: params }).pipe(map(response => {
        this.cache[route] = response;
        return response;
      }));
    }
  }
  put(route: any, data: any) {
    return this.http.put<any>(route, data);
  }
}
