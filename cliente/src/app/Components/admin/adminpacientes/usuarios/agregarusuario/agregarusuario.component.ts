import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
	selector: 'app-agregarusuario',
	templateUrl: './agregarusuario.component.html',
	styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent implements OnInit{
	public usuario: any;
	public totalUsuarios: any;
	public totalRoles: any;
	public totalPersonas: any;
	public personasDisponibles: any;
	public servicioUsuario: any;
	public servicioPersona: any;
	public servicioRole: any;






	constructor(
		public dialogRef: MatDialogRef<AgregarusuarioComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		)
	{


		this.usuario = data.usuario;
		this.totalRoles = data.roles;
		this.totalPersonas = data.personas;
		this.totalUsuarios = data.usuarios;

		this.personasDisponibles = this.totalPersonas;
		this.servicioPersona = data.servicioPersona;
		this.servicioUsuario = data.servicioUsuario;
		this.servicioRole = data.servicioRole;
		this.filtrarUsuariosRegistrados();

	}

  ngOnInit()
  {
    this.servicioRole.getRoles().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRoles = todo;

    });

      this.actualizarPersonas();
  }

	onNoClick()
	{

		this.dialogRef.close();
	}

	roleSeleccionado(role)
	{
		console.log(this.usuario);
		this.usuario.Role_id = role.id;
	}

	personaSeleccionada(persona)
	{
		this.usuario.Persona_id = persona.id;
	}

  actualizarUsuarios()
  {
	this.servicioUsuario.getUsers().subscribe(data => {
	  var todo: any = data;
	  todo = todo.data;
	  this.totalUsuarios = todo;
	  this.filtrarUsuariosRegistrados();
	});
  }

	actualizarPersonas()
	{
		this.servicioPersona.getPersonas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
			this.personasDisponibles = this.totalPersonas;
			this.actualizarUsuarios();
		});
	}

	agregarUsuario()
	{
		this.servicioUsuario.registerUser(this.usuario).subscribe(data => {
			console.log(data);
			this.dialogRef.close();

		});
	}


	filtrarUsuariosRegistrados()
	{
		for ( let i = 0 ; i < this.totalUsuarios.length ; i ++ )
		{
			for ( let j = 0 ; j < this.personasDisponibles.length ; j ++ )
			{
				if (this.totalUsuarios[i].Persona_id === this.personasDisponibles[j].id)
				{
					this.personasDisponibles.splice(j, 1);
				}
			}
		}
	}

}
