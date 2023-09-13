import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;
  constructor(private router: Router,private http:HttpClient ) { }

  session(method: string, key: string, value?: any): any {
    if (method === "get") {
      let sessionData = sessionStorage.getItem(key);
      return sessionData;
    }
    else if (method === "set") {
      sessionStorage.setItem(key, value);
    }
    else if (method === "remove"){
      sessionStorage.removeItem(key);
    }
  }

  login(token: string): any {
    this.session('set', 'user',token)
    this.auth = this.session('get', 'user');
    return this.auth;
  }

  logout() {
    sessionStorage.clear();
    // localStorage.clear();
    this.router.navigate(['/dashboard']);
  }
}