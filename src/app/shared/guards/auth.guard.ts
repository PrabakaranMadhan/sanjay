import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  // token: any;
  tokens:any;
  userDetails:any;
  userDetail:any;
  userName:any
  list: any;
  constructor(private authService: AuthService, private router: Router) {
    // this.token = this.authService.session('get', 'authorization');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    this.list =route.routeConfig?.data ;
    // let uselist =this.list['permission'] as Array<string>;
    this.tokens = this.authService.session('get', 'authorization');
   
    // const requiredRoles = route.data['permission'] as Array<string>;
    const requiredRoles = this.list['permission'] as Array<string>;   
    if (this.tokens ) {
      this.userDetails  = sessionStorage.getItem('userDetail');
      this.userDetails = JSON.parse(this.userDetails)
      this.userName =this.userDetails.type;
      const userRole = this.userName;
  

      // console.log('logged in');
      if(requiredRoles.includes(this.userName)){
        return true;
      }
      this.router.navigate (['admin/dashboard'])
      return false
    } else {
      this.router.navigate(['login']);
      // console.log('loged out');
      // this.authService.logout();
      // sessionStorage.clear();
      sessionStorage.setItem('redirectToPage', '' + url);
      return false;
    }
  }
}
