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
  selector: 'app-homemp',
  templateUrl: './homemp.component.html',
  styleUrls: ['./homemp.component.css']
})
export class Homemp implements OnInit {
  public isLogeado = false
  public usuarioActual;

  private deviceInfo
  constructor(    
    private deviceService: Ng2DeviceService, 
    public eventosService: EventosService,
    public servicioUsuario: UserService,
    public router: Router) 
  {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['login'])
    }else{
      //se obtienen los datos asociados a permisos del usuario actual
      console.log(this.deviceInfo)
      this.usuarioActual=new UsuarioActual();
      if(this.deviceInfo.device != 'android' && this.deviceInfo.device != 'iphone' && this.deviceInfo.device != 'ipad')
      {
        console.log("HOLA")
        this.router.navigate(['per'])
      }
    }

   }

  ngOnInit() {
  }


}
