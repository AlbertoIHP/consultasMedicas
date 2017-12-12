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

import { Router } from '@angular/router';
import { VerpersonaComponent } from '../personas/verpersona/verpersona.component';

import {UsuarioActual} from '../../Globals/usuarioactual.component';

//DATATABLE
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExampleDatabase, ExampleDataSource } from '../../Globals/datasource.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {



	public totalUsuarios: Usuario[];
	public totalPersonas: Persona[];
	public totalRoles: Role[];
	public usuarioActual;
  displayedColumns = ['Acciones','Email', 'Role', 'Persona'];



  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Usuario');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

  }


  isAllSelected(): boolean
  {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.exampleDatabase.data.length;
    }
  }

  masterToggle()
  {
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
	public dialog: MatDialog,
  public servicioEventos: EventosService,
    public router: Router)
  {
   
  	this.usuarioActual=new UsuarioActual();
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




  edicionUsuario (usuario)
  {
	var a = JSON.parse(JSON.stringify(usuario));

	this.pasarStringId(a);

	console.log(a);
	let dialogRef = this.dialog.open(EditarusuarioComponent, {
	  width: '700px',
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
	  width: '700px',
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
		width: '700px',
		data: { persona: persona }
	  });

	  dialogRef.afterClosed().subscribe(result => {

		this.actualizarUsuarios();
	  });

	});


  }




}
