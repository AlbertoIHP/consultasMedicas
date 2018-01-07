// Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

// Modelos y servicios
import { Role } from '../../../Models/Role.model';
import { RoleService } from '../../../Services/role/role.service';
import { EventosService } from '../../../Services/eventos/eventos.service';


// Componentes hijos
import { AgregarrolesComponent } from './agregarroles/agregarroles.component';
import { EditarrolesComponent } from './editarroles/editarroles.component';

// Componente para verificación de roles
import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { Router } from '@angular/router';

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
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.css']
})



export class RolesComponent  {

  //Se declaran los atributos a usar
  public totalRoles: Role[];
  public usuarioActual;
  displayedColumns = ['Acciones', 'Nombre'];
  public actualizar;

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    // Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Role');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

    // Se obtiene el evento emitido desde agregar
    this.servicioEvento.actualizar.subscribe((data: any) => { this.actualizar = data; });
 

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
    //Se declaran los servicios y componentes a utilizar  
    public servicioRole: RoleService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
  ){
    // Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalRoles = [];
		this.actualizarRoles();
	}



	actualizarRoles ()
	{
		this.servicioRole.getRoles().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRoles = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalRoles);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Role');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}

	eliminarRole (role)
	{
		this.servicioRole.deleteRole(role.id).subscribe( data => {
			console.log(data);
			this.actualizarRoles();
		});
	}

  // Se obtiene el rol a modificar desde el frontend
	edicionRole (role)
	{
    //Se abre un dialogo para editar el rol, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarrolesComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 role: role
			}
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
     
        // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarRoles();}
    });
	}

	agregacionRole()
	{
    // Se abre un nuevo dialogo para agregar un rol, se abre un componente hijo    
		let dialogRef = this.dialog.open(AgregarrolesComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px'
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
        // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        if (this.actualizar) { this.actualizarRoles();}
    });
	}

}

