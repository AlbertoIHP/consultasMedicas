//Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Modelos y servicios
import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { EditarEstadoCComponent } from './editar-estado-c/editar-estado-c.component';
import { AgregarEstadoCComponent } from './agregar-estado-c/agregar-estado-c.component';

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
	selector: 'app-estadocivil',
	templateUrl: './estadocivil.component.html',
	styleUrls: ['./estadocivil.component.css']
})

export class EstadocivilComponent{
  // Se declaran los atributos
	public totalEstadoCiviles: EstadoCivil[];
	public usuarioActual;
  public actualizar;

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];

  ngOnInit() {
    // Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'EC');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })
    this.exampleDatabase = [];

    // Se obtiene el evento emitido desde agregar
    this.servicioEvento.actualizar.subscribe((data: any) => { this.actualizar = data; });
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
    public servicioEstadoCivil: EstadocivilService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
    ) {
     
    //Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalEstadoCiviles = [];

    //Se obtienen los registros de estados civiles de la base de datos
		this.actualizarEstadoCiviles();
	}

	actualizarEstadoCiviles() {
    // Se obtienen todas los estados civiles desde la API    
		this.servicioEstadoCivil.getEstadoCivils().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadoCiviles = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalEstadoCiviles);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'EC');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

  //Se obtiene el estado civil desde la fila
	eliminarEstadoCivil(ec) {
    //Se elimina usando el id del estado civil
		this.servicioEstadoCivil.deleteEstadoCivil(ec.id).subscribe( data => {
			//Se actualiza la tabla
			this.actualizarEstadoCiviles();
		});
	}

  // Se envía el estado civil a modificar desde el frontend
	edicionEC(ec) {
    //Se abre un dialogo para editar la estado civil, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarEstadoCComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 ec: ec
			}
		});

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarEstadoCiviles();}
    });
	}

	agregacionEC() {
    // Se abre un nuevo dialogo para agregar un estado civil, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarEstadoCComponent, {
      // Se asignan los parámetros
			width: '700px'
		});

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarEstadoCiviles();}
    });
	}
}