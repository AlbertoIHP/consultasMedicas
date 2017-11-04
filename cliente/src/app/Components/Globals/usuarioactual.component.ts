import { Component, OnInit } from '@angular/core';


import { Usuario } from '../../Models/Usuario.model';
import { UserService } from '../../Services/user/user.service';

import { Role } from '../../Models/Role.model';
import { RoleService } from '../../Services/role/role.service';



export class UsuarioActual implements OnInit {
  public isLogeado = false

   public rolUsuario:Role;
   public usuario:Usuario;
   public totalUsuarios: Usuario[];
   public totalRoles: Role[];
   public current:any;

  constructor(public servicioRol:RoleService, public servicioUsuario: UserService) {
      //se obendrá el tipo de usuario que se logea
      this.rolUsuario=new Role();
      this.usuario=new Usuario();
      this.totalUsuarios=[];
      this.totalRoles=[];
      this.current=JSON.parse(localStorage.getItem('currentUser'));
      //console.log("mail: "+this.current.email);
      this.obtenerUsuario();
      this.obtenerRole();
    

   }

  ngOnInit() {
  }

//función para obtener el usuario actual
  obtenerUsuario(){
    this.servicioUsuario.getUsers().subscribe((data)=>{
      var todo: any = data;
      todo = todo.data;
      this.totalUsuarios=todo;

      //se hacen las comparaciones de email
      for(let i=0;i<this.totalUsuarios.length;i++){
       if(this.totalUsuarios[i].email==this.current.email){
         this.usuario=this.totalUsuarios[i];
         break;
       }
      }

      console.log(this.usuario.Persona_id);

    });
   

  }


//función para obtener el rol del usuario actual
  obtenerRole(){
    this.servicioRol.getRoles().subscribe((data)=>{
      var todo: any = data;
      todo = todo.data;
      this.totalRoles=todo;
      //se hacen las comparaciones por el id del rol

      for(let i=0;i<this.totalRoles.length;i++){

        if(this.totalRoles[i].id==parseInt(this.usuario.Role_id)){
            this.rolUsuario.nombre=this.totalRoles[i].nombre;
            break;
        }
      }

      console.log(this.rolUsuario.nombre);

    });

   

  }

}
