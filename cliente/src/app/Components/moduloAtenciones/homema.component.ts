import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../Services/eventos/eventos.service';

import { Router } from '@angular/router';

import { Usuario } from '../../Models/Usuario.model';
import { UserService } from '../../Services/user/user.service';

import { Role } from '../../Models/Role.model';
import { RoleService } from '../../Services/role/role.service';

import {UsuarioActual} from '../Globals/usuarioactual.component';


import { PermisoModulo } from '../../Models/PermisoModulo.model';
import { PermisoModuloService } from '../../Services/permisomodulo/permisomodulo.service';

import { Modulo } from '../../Models/Modulo.model';
import { ModuloService } from '../../Services/modulo/modulo.service';



import { Ng2DeviceService } from 'ng2-device-detector';
@Component({
  selector: 'app-homema',
  templateUrl: './homema.component.html',
  styleUrls: ['./homema.component.css']
})
export class Homema implements OnInit {
  public isLogeado = false
  public usuarioActual;

  private deviceInfo
  constructor(
    private deviceService: Ng2DeviceService, 
    public eventosService: EventosService, 
    public router: Router, 
    public servicioUsuario: UserService) 
  {
    this.deviceInfo = this.deviceService.getDeviceInfo();

    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['login'])
    }
    else
    {
      //se obtienen los datos asociados a permisos del usuario actual
      this.usuarioActual=new UsuarioActual();
      if(this.deviceInfo.device != 'android' &&  this.deviceInfo.device != 'iphone' && this.deviceInfo.device != 'ipad')
      {
        this.router.navigate(['alg'])
      }
    }

   }

  ngOnInit() {
  }


}
