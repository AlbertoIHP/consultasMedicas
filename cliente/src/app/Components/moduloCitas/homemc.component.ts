import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../Services/eventos/eventos.service';

import { Router } from '@angular/router';

import { Usuario } from '../../Models/Usuario.model';
import { UserService } from '../../Services/user/user.service';

import { Role } from '../../Models/Role.model';
import { RoleService } from '../../Services/role/role.service';

import {UsuarioActual} from '../Globals/usuarioactual.component';


@Component({
  selector: 'app-homemc',
  templateUrl: './homemc.component.html',
  styleUrls: ['./homemc.component.css']
})
export class HomemcComponent implements OnInit {
  public isLogeado = false
   public rolUsuario:Role;
   public usuario:Usuario;
   public totalUsuarios: Usuario[];
   public totalRoles: Role[];
   public current:any;
   public usuarioActual;

  constructor(public eventosService: EventosService, public router: Router,
   public servicioRol:RoleService, public servicioUsuario: UserService) {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['/'])
    }else{
      this.usuarioActual=new UsuarioActual(this.servicioRol,this.servicioUsuario);
      this.rolUsuario=this.usuarioActual.rolUsuario;
      this.usuario=this.usuarioActual.usuario;
    }

   }

  ngOnInit() {
  }
}
