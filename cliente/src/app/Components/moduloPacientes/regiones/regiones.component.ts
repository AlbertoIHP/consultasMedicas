// Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

// Modelos y servicios
import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';
import { EventosService } from '../../../Services/eventos/eventos.service';


// Componentes hijos
import { AgregarregionesComponent } from './agregarregiones/agregarregiones.component';
import { EditarregionesComponent } from './editarregiones/editarregiones.component';

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
	selector: 'app-regiones',
	templateUrl: './regiones.component.html',
	styleUrls: ['./regiones.component.css']
})
export class RegionesComponent {
  //Se declaran los atributos a usar
	public totalRegiones: Region[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Region');
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
    public servicioRegion: RegionService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
    ){
    // Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalRegiones = [];
		this.actualizarRegiones();
	}


	actualizarRegiones ()
	{
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalRegiones);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Region');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

  //Se obtiene la región desde la fila para obtener su id
	eliminarRegion (region)
	{
    //Usando el id, de la región se elimina esta
		this.servicioRegion.deleteRegion(region.id).subscribe( data => {
      //Se actualizan las regiones a mostrar
 			this.actualizarRegiones();
		});

	}

  // Se obtiene la región a modificar desde el frontend
	edicionRegion (region)
	{
    //Se abre un dialogo para editar la región, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarregionesComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 region: region
			}
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      
        // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarRegiones();}
    });
	}

	agregacionRegion()
	{
    // Se abre un nuevo dialogo para agregar una región, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarregionesComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px'
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
        // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        if (this.actualizar) { this.actualizarRegiones();}
    });
	}


}

