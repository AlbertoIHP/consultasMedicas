//Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Modelos y servicios
import { Ocupacion } from '../../../Models/Ocupacion.model';
import { OcupacionService } from '../../../Services/ocupacion/ocupacion.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { AgregarOcupacionComponent } from './agregar-ocupacion/agregar-ocupacion.component';
import { EditarOcupacionComponent } from './editar-ocupacion/editar-ocupacion.component';

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
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.css']
})
export class OcupacionComponent {
  //Sde declaran los atributos
  public totalOcupaciones: Ocupacion[];
  public usuarioActual;
  public actualizar;

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  displayedColumns = ['Acciones', 'Nombre'];

  ngOnInit() {
    //Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Ocupacion');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
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

  constructor(
    public servicioOcupacion: OcupacionService,
    public dialog: MatDialog,
    public servicioEvento: EventosService
    ) {
    //Se inicializan los atributos    
		this.usuarioActual=new UsuarioActual();
		this.totalOcupaciones = [];

    //Se obtienen los registros de ocupaciones de la base de datos
		this.actualizarOcupaciones();
  }

  actualizarOcupaciones() {
    //Se obtienen todas las ocupaciones desde la API
		this.servicioOcupacion.getOcupacions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalOcupaciones = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalOcupaciones);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Ocupacion');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

  //Se obtiene la ocupación desde la fila
	eliminarOcupacion(ocupacion) {
    //Se elimina usando la id
		this.servicioOcupacion.deleteOcupacion(ocupacion.id).subscribe( data => {
			//Se actualiza la tabla
      this.actualizarOcupaciones();
		});
	}

  // Se envía la ocupación para modificar desde el frontend
	edicionOcupacion(ocupacion) {
    //Se abre un diálogo para editar la ocupación, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarOcupacionComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			  ocupacion: ocupacion,
        servicioOcupacion: this.servicioOcupacion
			}
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarOcupaciones(); }
    });
	}

	agregacionOcupacion() {
    // Se abre un nuevo diálogo para agregar una ocupación, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarOcupacionComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
		 	data: 
      {
        servicioOcupacion: this.servicioOcupacion
      }
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarOcupaciones(); }
    });
	}
}