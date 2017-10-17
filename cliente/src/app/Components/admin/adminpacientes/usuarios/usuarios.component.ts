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
  public personasDisponibles: Persona[];
  public personaElegida: Persona;


	constructor (public modalService:SuiModalService, public servicioUsuario: UserService, public servicioRole: RoleService, public servicioPersona: PersonaService)
	{
	this.personasDisponibles = [];
		this.actualizarRoles();
		this.actualizarPersonas();
		this.actualizarUsuarios();

		this.nuevoUsuario = new Usuario();
		this.editarUsuario = new Usuario();
		this.visualizacionPersona = new Persona();
	}

	actualizarRoles ()
	{
	this.totalRoles = [];
		this.servicioRole.getRoles().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRoles = todo;
		});
	}

	actualizarPersonas ()
	{
	this.totalPersonas = [];
		this.servicioPersona.getPersonas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
	  this.buscarPersonasDisponibles();
		});
	}

	actualizarUsuarios ()
	{
	this.totalUsuarios = [];
		this.servicioUsuario.getUsers().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalUsuarios = todo;
			this.reemplazarIdPorString();
		});
	}

  buscarPersonasDisponibles ()
  {
  	// this.personasDisponibles = [];
  	// for( let l = 0 ; l < this.totalPersonas.length ; l ++)
  	// {
  	//   if(this.totalPersonas[l].usuarioasignado === 0)
  	//   {
  	// 	this.personasDisponibles.push(this.totalPersonas[l]);
  	//   }
  	// }
  }


	public open (tipo, usuario)
	{
	this.actualizarPersonas();
		const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
		config.context = { data: tipo };

	if (usuario != null)
	{
	  this.servicioPersona.getPersona(usuario.Persona_id).subscribe(data => {
		console.log(data);
		var todo: any = data;
		todo = todo.data;
		this.visualizacionPersona = todo;
	  });
	}

	this.editarUsuario = usuario;

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
			this.actualizarUsuarios();
			this.nuevoUsuario = new Usuario();



	  // this.personaElegida.usuarioasignado = 1;







	  console.log(this.personaElegida);

	  this.servicioPersona.editPersona(this.personaElegida, this.personaElegida.id).subscribe(data => {
		this.actualizarPersonas();
	  });



		});

	}

	eliminarUsuario (usuario)
	{
		this.servicioUsuario.deleteUser(usuario.id).subscribe( data => {

	  this.servicioPersona.getPersona(usuario.Persona_id).subscribe(data => {
		var a: any = data;
		var a = a.data;
		var persona: Persona = a;





		// persona.usuarioasignado = 0;










		this.servicioPersona.editPersona(persona, persona.id).subscribe(data => {
		  console.log(data);
		  this.actualizarPersonas();
		});
	  });

			this.actualizarUsuarios();
		});
	}

  personaSeleccionada (persona)
  {
	this.personaElegida = persona;
	this.nuevoUsuario.Persona_id = persona.id;
	console.log(this.nuevoUsuario);
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
