import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

import { Usuario } from '../../../../Models/Usuario.model';
import { UserService } from '../../../../Services/user/user.service';

import { Persona } from '../../../../Models/Persona.model';
import { PersonaService } from '../../../../Services/persona/persona.service';

import { Role } from '../../../../Models/Role.model';
import { RoleService } from '../../../../Services/role/role.service';


export interface IContext {
    data:string;
}




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>;
  public totalUsuarios: Usuario[];
  public totalPersonas: Persona[];
  public totalRoles: Role[];
  public nuevoUsuario: Usuario;
  public editarUsuario: Usuario;
  public visualizacionPersona: Persona;


  constructor (public modalService:SuiModalService, public servicioUsuario: UserService, public servicioRole: RoleService, public servicioPersona: PersonaService)
  {
    this.actualizarRoles();
    this.actualizarPersonas();
    this.actualizarUsuarios();

    this.nuevoUsuario = new Usuario();
    this.editarUsuario = new Usuario();
    this.visualizacionPersona = new Persona();
  }

  actualizarRoles ()
  {
    this.servicioRole.getRoles().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRoles = todo;
    });
  }

  actualizarPersonas ()
  {
    this.servicioPersona.getPersonas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalPersonas = todo;
    });
  }

  actualizarUsuarios ()
  {
    this.servicioUsuario.getUsers().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalUsuarios = todo;
      this.reemplazarIdPorString();
    });
  }

  public open(tipo, usuario)
  {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.context = { data: tipo };
    if(usuario != null)
    {
       this.editarUsuario = usuario;
    }

    if (tipo === 'verPersona')
    {

    this.servicioPersona.getPersona(usuario.Persona_id).subscribe(data => {
      console.log(data);
      var todo: any = data;
      todo = todo.data;
      this.visualizacionPersona = todo;

      this.modalService.open(config).onApprove(result => {}).onDeny(result => { /* deny callback */});
    });


    }
    else
    {

    this.modalService
      .open(config).onApprove(result => {
        if(tipo === "editarUsuario")
        {
         this.actualizarUsuario();
        }
        else if(tipo === "nuevoUsuario")
        {
          this.agregarUsuario();
        }

      }).onDeny(result => { /* deny callback */});
    }



  }

  actualizarUsuario ()
  {
    this.servicioUsuario.editUser(this.editarUsuario, this.editarUsuario.id).subscribe(data => {
      console.log(data);
      this.actualizarUsuarios();
    });
  }




  agregarUsuario ()
  {
    console.log(this.nuevoUsuario);
    this.servicioUsuario.registerUser(this.nuevoUsuario).subscribe(data => {
      console.log(data);
      this.actualizarUsuarios();
      this.nuevoUsuario = new Usuario();
    });

  }

  eliminarRole (usuario)
  {
    this.servicioUsuario.deleteUser(usuario.id).subscribe( data => {
      console.log(data);
      this.actualizarUsuarios();
    });
  }






  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalUsuarios.length ; i ++)
    {

      for(let j = 0 ; j < this.totalRoles.length ; j++)
      {
        if( parseInt(this.totalUsuarios[i].Role_id) === this.totalRoles[j].id)
        {
          this.totalUsuarios[i].Role_id = this.totalRoles[j].nombre;
          break;
        }
      }

    }
  }


  pasarStringId(usuario)
  {
    for ( let i = 0 ; i < this.totalRoles.length ; i ++)
    {
      if(usuario.Role_id === this.totalRoles[i].nombre)
      {
        usuario.Role_id = this.totalRoles[i].id;
      }
    }
  }


    editarRoleSeleccionado (role)
  {
    this.editarUsuario.Role_id = role.id;
  }

  roleSeleccionado (role)
  {
    this.nuevoUsuario.Role_id = role.id;
    console.log(this.nuevoUsuario);
  }

  ngOnInit() {
  }

}
