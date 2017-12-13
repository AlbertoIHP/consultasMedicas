import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {UsuarioActual} from '../Components/Globals/usuarioactual.component';


@Injectable()
export class AuthGuard implements CanActivate {
  public usuarioActual;

constructor(public router:Router){
    this.usuarioActual=new UsuarioActual();
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let modulo = next.data["nombre"] as string;

  	if(localStorage.getItem('currentUser')){
  			//esta logeado
     
        if(this.usuarioActual.obtenerExistenciaPermiso(modulo)){
          return true;
        }else{
          return false;
        }

        

  		}else{
  			//no esta logeado
  			this.router.navigate(['login']);
  			return false;
  		}

  }
}
