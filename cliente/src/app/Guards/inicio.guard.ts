import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class InicioGuard implements CanActivate {

constructor(public router:Router){
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	if(localStorage.getItem('currentUser')){
  		//esta logeado
     	return true;
  	}else{
  		//no esta logeado
  		this.router.navigate(['login']);
		return false;
  	}


  }
}
