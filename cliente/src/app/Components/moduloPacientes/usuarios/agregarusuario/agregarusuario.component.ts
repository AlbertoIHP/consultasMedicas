import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventosService } from '../../../../Services/eventos/eventos.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
	selector: 'app-agregarusuario',
	templateUrl: './agregarusuario.component.html',
	styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent implements OnInit{
	agregarForm: FormGroup;
	public usuario: any;
	public totalUsuarios: any;
	public totalRoles: any;
	public totalPersonas: any;
	public personasDisponibles: any;
	public servicioUsuario: any;
	public servicioPersona: any;
	public servicioRole: any;
  public persona: any;
  public rolePersona: any;
  public emailValido = true;

  	// Necesarios para autocomplete
	public personaCtrl: FormControl;
  	public filteredPersonas: Observable<any[]>;

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
		this.personasDisponibles = data.personasDisponibles;
		console.log(this.personasDisponibles)
		this.servicioPersona = data.servicioPersona;
		this.servicioUsuario = data.servicioUsuario;
		this.servicioRole = data.servicioRole;

		this.usuario = data.usuario;
		this.totalRoles = data.roles;
		this.totalPersonas = data.personas;
		console.log(this.totalPersonas)
		this.totalUsuarios = data.usuarios;

		this.servicioRole.getRoles().subscribe(data => {
		  var todo: any = data;
		  todo = todo.data;
		  this.totalRoles = todo;

		});

		this.actualizarPersonas();
		console.log(this.totalPersonas)

	}

  ngOnInit()
  {
	
	  this.agregarForm = new FormGroup({
	        email: new FormControl('', [Validators.required]),
	        rol: new FormControl('', [Validators.required]),
	        personaAsociada: new FormControl('', [Validators.required])
    
    	});

	 
		    this.filteredPersonas = this.agregarForm.controls['personaAsociada'].valueChanges
		      .pipe(
		        startWith(''),
		        map(persona => persona ? this.filterPersonas(persona) : this.personasDisponibles.slice())
		);
  }

  	filterPersonas(rut: string) {
	    return this.personasDisponibles.filter(persona =>
	      persona.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0);
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
		this.usuario.password = this.GeneratePassword();

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
