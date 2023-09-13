import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl: string = environment.baseUrl;
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  status() {
    const localData: any = sessionStorage.getItem('userDetail');
    if (!localData) {
      this.isLoggedIn.next(false);
    } else {
      this.isLoggedIn.next(true);
    }
    return this.isLoggedIn.asObservable();
  }

  getService(url: string): any {
    return this.http.get(this.baseUrl + url).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  postService(url: string, data?: any): any {
    return this.http.post(this.baseUrl + url, data).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  userGetService(url: string): any {
    const token: any = sessionStorage.getItem('authorization');
    console.log(token);
    return this.http
      .get(this.baseUrl + url, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }

  userPostService(url: string, data?: any): any {
    const token: any = sessionStorage.getItem('authorization');
    console.log(token);
    return this.http
      .post(this.baseUrl + url, data, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }

  otherPostService(url: string, data?: any): any {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(this.baseUrl + url, data, requestOptions).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  ourPostService(url: string, data?: any): any {
    const headerDict = {
      'x-api-key': 'fhyDNulWAg9NzBsLmw4Lf6Jl9EhQI37w5rWVu9uF',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(this.baseUrl + url, data, requestOptions).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }
}
