import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventosService } from '../../../../Services/eventos/eventos.service';


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
  public isPersona: boolean;
  public persona: any;
  public rolePersona: any;
  public tienePersona: any;
  public emailValido = true;


  GeneratePassword()
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }



	constructor(
		public dialogRef: MatDialogRef<AgregarusuarioComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEventos: EventosService
		)
	{
	this.tienePersona = false;
	this.personasDisponibles = this.totalPersonas;
	this.servicioPersona = data.servicioPersona;
	this.servicioUsuario = data.servicioUsuario;
	this.servicioRole = data.servicioRole;

		this.usuario = data.usuario;
		this.totalRoles = data.roles;
		this.totalPersonas = data.personas;
		this.totalUsuarios = data.usuarios;
	if(data.persona)
	{
	   this.usuario.Persona_id = data.persona.id;
	 this.persona = data.persona;
	 this.tienePersona = true;
	}




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


  actualizarUsuarios()
  {
	this.servicioUsuario.getUsers().subscribe(data => {
	  var todo: any = data;
	  todo = todo.data;
	  this.totalUsuarios = todo;
	  this.filtrarUsuariosRegistrados();

	if(this.tienePersona)
	{
	  this.isPersona = false;
    this.usuario.password = this.GeneratePassword();
	 for( let i = 0 ; i < this.totalUsuarios.length ; i ++)
	 {
	  if( parseInt(this.totalUsuarios[i].Persona_id) === this.persona.id)
	  {

		this.usuario = this.totalUsuarios[i];
		this.servicioRole.getRole(this.usuario.Role_id).subscribe(data => { var todo: any = data; todo = todo.data; this.rolePersona = todo.nombre});

    this.isPersona = true;

		break;
	  }
	 }
	}

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
			this.dialogRef.close();
      this.servicioEventos.hiceUnCambio();

		});
	//   //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
	//   (err) => {
	//   if (err === 'Used') {
	// 	alert("Esta persona ya tiene asignado un usuario")
	//   }

	// });
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

  validateEmail(email)
  {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email))

    if( re.test(email) )
    {
      this.emailValido = false
    }
    else
    {
      this.emailValido = true
    }
  }



}
