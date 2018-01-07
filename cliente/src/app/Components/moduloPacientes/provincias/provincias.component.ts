// Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Modelos y servicios
import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { VistaProvincia } from '../../../Models/VistaProvincia.model';
import { VistaProvinciaService } from '../../../Services/vistas/vista-provincia.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

// Componentes hijos
import { AgregarprovinciaComponent } from './agregarprovincia/agregarprovincia.component';
import { EditarprovinciaComponent } from './editarprovincia/editarprovincia.component';

// Componente para verificación de roles
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
	selector: 'app-provincias',
	templateUrl: './provincias.component.html',
	styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent {
	//Se declaran los atributos a usar
	public totalRegiones: Region[];
	public datosProvincias: VistaProvincia[];
	public usuarioActual;
	public actualizar;

	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	displayedColumns = ['Acciones', 'Nombre', 'Region'];

	ngOnInit() {
		// Se inicializa el datasource
		this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Provincia');
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
		//Se declaran los servicios y componentes a utilizar
		public servicioRegion: RegionService,
		public servicioProvincia: ProvinciaService,
		public servicioVistaProvincia: VistaProvinciaService,
		public dialog: MatDialog,
		public router: Router,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalRegiones = [];
		this.datosProvincias = [];

		//Actualizar atributos obtenidos desde la base de datos
		this.actualizarRegiones();
		this.actualizarProvincias();
	}

	actualizarRegiones() {
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;
		});
	}

	actualizarProvincias() {
		this.servicioVistaProvincia.getVistaProvincias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.datosProvincias = todo;
			
			//DATATABLE
			this.exampleDatabase  = new ExampleDatabase(this.datosProvincias);

			this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Provincia');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
			  .debounceTime(150)
			  .distinctUntilChanged()
			  .subscribe(() => {
			    if (!this.dataSource) { return; }
			    this.dataSource.filter = this.filter.nativeElement.value;
			  })
		});
	}

	//Se obtiene la provincia desde la fila para obtener su id
	eliminarProvincia(provincia) {
		//Usando el id, de la provincia se elimina esta
		this.servicioProvincia.deleteProvincia(provincia.id).subscribe( data => {
			//Se actualizan las provincias a mostrar
			this.actualizarProvincias();
		});
	}

	// Se obtiene la provincia a modificar desde el frontend
	edicionProvincia(provincia) {
		//Se abre un diálogo para editar la provincia, se abre un componente hijo	
		let dialogRef = this.dialog.open(EditarprovinciaComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
				provincia: provincia,
				totalRegiones: this.totalRegiones,
				servicioProvincia: this.servicioProvincia	
			}
		});

		//Luego de cerrar el diálogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
          	this.actualizarProvincias();
		});
	}

	agregacionProvincia() {
	    // Se abre un nuevo diálogo para agregar una provincia, se abre un componente hijo		
		let dialogRef = this.dialog.open(AgregarprovinciaComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data : 
			{
		        totalRegiones: this.totalRegiones,
		        servicioProvincia: this.servicioProvincia
	        }
		});

		//Luego de cerrar el diálogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
        	// Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        	if (this.actualizar) { this.actualizarProvincias();}
		});
	}
}