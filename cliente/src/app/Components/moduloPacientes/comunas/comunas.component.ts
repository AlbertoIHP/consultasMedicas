// Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Modelos y servicios
import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { VistaComuna } from '../../../Models/VistaComuna.model';
import { VistaComunaService } from '../../../Services/vistas/vista-comuna.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

// Componentes hijos
import { AgregarcomunaComponent } from './agregarcomuna/agregarcomuna.component';
import { EditarcomunaComponent } from './editarcomuna/editarcomuna.component';

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
	selector: 'app-comunas',
	templateUrl: './comunas.component.html',
	styleUrls: ['./comunas.component.css']
})

export class ComunasComponent {
  	//Se declaran los atributos a usar
	public datosComunas: VistaComuna[];
	public totalProvincias: Provincia[];
	public usuarioActual;
	public actualizar;

	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
  	displayedColumns = ['Acciones', 'Nombre', 'Provincia'];

	ngOnInit() {
		// Se inicializa el datasource
		this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Comuna');
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

    actualizarComunas () {
	    this.servicioVistaComuna.getVistaComunas().subscribe(data => {
	      var todo: any = data;
	      todo = todo.data;
	      this.datosComunas = todo;

	      //DATATABLE
	      this.exampleDatabase  = new ExampleDatabase(this.datosComunas);

	      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Comuna');
	      Observable.fromEvent(this.filter.nativeElement, 'keyup')
	          .debounceTime(150)
	          .distinctUntilChanged()
	          .subscribe(() => {
	            if (!this.dataSource) { return; }
	            this.dataSource.filter = this.filter.nativeElement.value;
	          })
    	});
	}

	constructor (
	    //Se declaran los servicios y componentes a utilizar		
	    public servicioVistaComuna: VistaComunaService,
	    public servicioProvincia: ProvinciaService,
	    public servicioComuna: ComunaService,
	    public dialog: MatDialog,
	    public router: Router,
	    public servicioEvento: EventosService) {
      	// Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.datosComunas = [];
		this.totalProvincias = [];
		//Se actualizan los datos de la tabla
		this.actualizarProvincias();
		this.actualizarComunas();
	}

	//Se actualizan las provincias a ser enviadas en los diálogos
	actualizarProvincias() {
		this.servicioProvincia.getProvincias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalProvincias = todo;
		});
	}

	//Se obtiene la comuna desde la fila para obtener su id
	eliminarComuna(comuna) {
		//Usando el id, de la comuna se elimina esta
		this.servicioComuna.deleteComuna(comuna.id).subscribe( data => {
			//Se actualizan las comunas a mostrar
			this.actualizarComunas();
		});
	}

	// Se obtiene la comuna a modificar desde el frontend
	edicionComuna(comuna) {
		//Se abre un diálogo para editar la comuna, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarcomunaComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
				comuna: comuna,
		        servicioComuna: this.servicioComuna,
		        totalProvincias: this.totalProvincias
			}
		});
		
		//Luego de cerrar el diálogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
        	this.actualizarComunas();
		});
	}

	agregacionComuna() {
		// Se abre un nuevo diálogo para agregar una comuna, se abre un componente hijo		
		let dialogRef = this.dialog.open(AgregarcomunaComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data: 
			{
		        servicioComuna: this.servicioComuna,
		        totalProvincias: this.totalProvincias
      		}
		});

		//Luego de cerrar el diálogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
        	// Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        	if (this.actualizar) { this.actualizarComunas();}
		});
	}
}