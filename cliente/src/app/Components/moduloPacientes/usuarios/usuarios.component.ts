import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { EventosService } from '../../../Services/eventos/eventos.service';

import { Usuario } from '../../../Models/Usuario.model';
import { UserService } from '../../../Services/user/user.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Role } from '../../../Models/Role.model';
import { RoleService } from '../../../Services/role/role.service';

import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';


import { VerpersonaComponent } from '../personas/verpersona/verpersona.component';

//DATATABLES
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



import { ExampleDatabase, dataTable, buscadorPorNombre } from '../../Globals/datasource.component';


@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {



	public totalUsuarios: Usuario[];
	public totalPersonas: Persona[];
	public totalRoles: Role[];


  //DATATABLE
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  public sourceDatatable: dataTable | null;
  public sourcePorNombre: buscadorPorNombre | null;
  public bdEstructura;
  public buscarPorNombre: boolean;
  displayedColumns = ['Acciones','Email', 'Role', 'Persona'];

	constructor (
	public servicioUsuario: UserService,
	public servicioRole: RoleService,
	public servicioPersona: PersonaService,
	public dialog: MatDialog,
  public servicioEventos: EventosService
	)
	{
	this.buscarPorNombre = false;
	this.totalRoles = [];
	this.totalPersonas = [];
	this.totalUsuarios = [];
	this.actualizarRoles();
	this.actualizarPersonas();
	this.actualizarUsuarios();
  this.servicioEventos.seActivo.subscribe(() => {
      this.actualizarUsuarios();
    });
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


	//DATATABLE
	  this.bdEstructura = new ExampleDatabase(this.totalUsuarios );
	  this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
	  this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, "Usuario");
	  Observable.fromEvent(this.filter.nativeElement, 'keyup')
		  .debounceTime(150)
		  .distinctUntilChanged()
		  .subscribe(() => {
			if (!this.sourcePorNombre) { return; }
			this.sourcePorNombre.filter = this.filter.nativeElement.value;
		  });

	 });
	}


	eliminarUsuario (usuario)
	{
		this.servicioUsuario.deleteUser(usuario.id).subscribe( data => {
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

  cambiarBusqueda()
  {
	this.buscarPorNombre = !this.buscarPorNombre;
  }




  edicionUsuario (usuario)
  {
	var a = JSON.parse(JSON.stringify(usuario));

	this.pasarStringId(a);

	console.log(a);
	let dialogRef = this.dialog.open(EditarusuarioComponent, {
	  width: '1000px',
	  data:
	  {
	   usuario: a,
	 personas: this.totalPersonas,
	 roles:this.totalRoles,
	 servicioUsuario: this.servicioUsuario,
	 servicioRole: this.servicioRole

	  }
	});

	dialogRef.afterClosed().subscribe(result => {

	  this.actualizarUsuarios();
	});
  }

  agregacionUsuario()
  {

	let dialogRef = this.dialog.open(AgregarusuarioComponent, {
	  width: '1000px',
	data: {
	usuario: new Usuario(),
	  usuarios: this.totalUsuarios,
	  personas: this.totalPersonas,
	  roles:this.totalRoles,
	  servicioUsuario: this.servicioUsuario,
	  servicioPersona: this.servicioPersona,
	  servicioRole: this.servicioRole
	   }
	});

	dialogRef.afterClosed().subscribe(result => {

	  this.actualizarUsuarios();
	});
  }

  desplegarPersona(usuario)
  {
	this.servicioPersona.getPersona(parseInt(usuario.Persona_id)).subscribe(data => {

	  var persona: any = data;
	  persona = persona.data;

	  console.log(persona);

	  let dialogRef = this.dialog.open(VerpersonaComponent, {
		width: '1000px',
		data: { persona: persona }
	  });

	  dialogRef.afterClosed().subscribe(result => {

		this.actualizarUsuarios();
	  });

	});


  }




}
