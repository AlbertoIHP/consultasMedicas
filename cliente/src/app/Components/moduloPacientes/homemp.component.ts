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
@Component({
  selector: 'app-homemp',
  templateUrl: './homemp.component.html',
  styleUrls: ['./homemp.component.css']
})
export class Homemp implements OnInit {
  public isLogeado = false

   public current:any;
   public usuarioActual;


  constructor(public eventosService: EventosService, public router: Router) {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['/'])
    }else{
      this.usuarioActual=new UsuarioActual();
     
     
    }

   }

  ngOnInit() {
  }

  


}
