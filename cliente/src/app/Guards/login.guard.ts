import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Ng2DeviceService } from 'ng2-device-detector';

@Injectable()
export class LoginGuard implements CanActivate {

private deviceInfo;

constructor(public router:Router, private deviceService: Ng2DeviceService){
    this.deviceInfo = this.deviceService.getDeviceInfo();

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	if(localStorage.getItem('currentUser')){
  		//si esta logeado no podrá ir a la ruta de login
      if(this.deviceInfo.device === 'android' || this.deviceInfo.device === 'iphone' || this.deviceInfo.device === 'ipad')
      {
        this.router.navigate(['mobile/mp'])
      }
      else
      {
        this.router.navigate([''])
      }
      
  		return false;

  	}else{

  		return true;
  	}

  }
}
