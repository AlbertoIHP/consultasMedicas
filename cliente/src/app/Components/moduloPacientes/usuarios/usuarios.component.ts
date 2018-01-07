//Componentes generales
import { Component, ElementRef, ViewChild, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//Modelos y servicios

import { Usuario } from '../../../Models/Usuario.model';
import { UserService } from '../../../Services/user/user.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Role } from '../../../Models/Role.model';
import { RoleService } from '../../../Services/role/role.service';

import { VistaUsuario } from '../../../Models/VistaUsuario.model';
import { VistaUsuarioService } from '../../../Services/vistas/vista-usuario.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';
import { VerpersonaComponent } from '../personas/verpersona/verpersona.component';

//Componente para verificación de roles
import { UsuarioActual } from '../../Globals/usuarioactual.component';

//DATATABLE
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExampleDatabase, ExampleDataSource } from '../../Globals/datasource.component';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
	//Se declaran los atributos a usar
	public totalUsuarios: VistaUsuario[];
	public totalPersonas: Persona[];
	public personasDisponibles: Persona[];
	public totalRoles: Role[];
	public usuarioActual;
	public actualizar;
  	displayedColumns = ['Acciones','Email', 'Role', 'Persona'];

	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

  ngOnInit() {
  	//Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Usuario');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })
    this.exampleDatabase = []

    // Se obtiene el evento emitido desde agregar
    this.servicioEventos.actualizar.subscribe((data: any) => { this.actualizar = data; });
  }

	isAllSelected(): boolean {
		if (!this.dataSource) { return false; }
		if (this.selection.isEmpty()) { return false; }

		if (this.filter.nativeElement.value) {
		  return this.selection.selected.length == this.dataSource.renderedData.length;
		} else {
		  return this.selection.selected.length == this.exampleDatabase.data.length;
		}
	}

	masterToggle() {
		if (!this.dataSource) { return; }

		if (this.isAllSelected()) {
		  this.selection.clear();
		} else if (this.filter.nativeElement.value) {
		  this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
		} else {
		  this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
		}
	}

	constructor (
		public servicioUsuario: UserService,
		public servicioRole: RoleService,
		public servicioPersona: PersonaService,
		public servicioVistaUsuario: VistaUsuarioService,
		public dialog: MatDialog,
	  	public servicioEventos: EventosService,
	    public router: Router
	    ) {
	   	//Se inicializan los atributos
	  	this.usuarioActual=new UsuarioActual();
	  	this.totalRoles = [];
	  	this.totalPersonas = [];
	  	this.personasDisponibles = [];
	  	this.totalUsuarios = [];

	  	//Se actualizan los usuarios traidos desde la vista
	  	this.actualizarUsuarios();
	}

	actualizarUsuarios() {
		//Se actualizan las personas, los roles y el total de usuarios
		this.totalPersonas = [];
		this.servicioPersona.getPersonas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
			
			this.totalRoles = [];
			this.servicioRole.getRoles().subscribe(data => {
				var todo: any = data;
				todo = todo.data;
				this.totalRoles = todo;

				this.totalUsuarios = [];
				this.servicioVistaUsuario.getVistaUsuarios().subscribe(data => {
					var todo: any = data;
					todo = todo.data;
					this.totalUsuarios = todo;

					this.personasDisponibles = this.totalPersonas;
					
					//Se dejan solo las personas que aún no tienen usuario asignado
					this.filtrarUsuariosRegistrados();

				    //DATATABLE
				    this.exampleDatabase  = new ExampleDatabase(this.totalUsuarios);

				    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Usuario');
				    Observable.fromEvent(this.filter.nativeElement, 'keyup')
				        .debounceTime(150)
				        .distinctUntilChanged()
				        .subscribe(() => {
				        	if (!this.dataSource) { return; }
				            this.dataSource.filter = this.filter.nativeElement.value;
				        })
	 			});
			});
		});
	}

	//Se obtiene el usuario desde la fila
	eliminarUsuario(usuario) {
		//Se usa su id para eliminarlo
		this.servicioUsuario.deleteUser(usuario.id).subscribe( data => {
			this.actualizarUsuarios();
		});
	}

	//Se obtiene el usuario a modificar desde ña foña
	edicionUsuario(usuario) {
		//Se abre un diálogo para editar usuario, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarusuarioComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
				usuario: usuario,
				personas: this.totalPersonas,
				roles: this.totalRoles,
				servicioUsuario: this.servicioUsuario
		  	}
		});

		dialogRef.afterClosed().subscribe(result => {
		  this.actualizarUsuarios();
		});
  }

	agregacionUsuario() {
	    // Se abre un nuevo dialogo para agregar un usuario, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarusuarioComponent, {
		  // Se asignan los parámetros y se envían los datos necesarios
		  width: '700px',
		  data: {
			  usuario: new Usuario(),
			  personasDisponibles: this.personasDisponibles,
			  roles:this.totalRoles,
			  usuarios: this.totalUsuarios,
			  servicioUsuario: this.servicioUsuario
		  }
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
	    dialogRef.afterClosed().subscribe(result => {
	      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
	      if (this.actualizar) { this.actualizarUsuarios();}
	    });
	}

	desplegarPersona(usuario) {
		//Se obtiene la persona en particular con el id obtenido de usuario
		this.servicioPersona.getPersona(parseInt(usuario.Persona_id)).subscribe(data => {
			var persona: any = data;
			persona = persona.data;

			//Se abre un nuevo diálogo y llama a un componente hijo
			let dialogRef = this.dialog.open(VerpersonaComponent, {
				//Se asignan los parámetros y se envían los datos necesarios
				width: '700px',
				data: { persona: persona }
			});
		});
  	}

  	//Se filtran los usuarios que aún no tienen asignado un usuario
  	filtrarUsuariosRegistrados() {
		for ( let i = 0; i < this.totalUsuarios.length; i ++ ) {
			for ( let j = 0; j < this.personasDisponibles.length; j ++ ) {
				if (parseInt(this.totalUsuarios[i].Persona_id) === this.personasDisponibles[j].id) {
					this.personasDisponibles.splice(j, 1);
				}
			}
		}
	}
}