// Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

// Modelos y servicios
import { Prevision } from '../../../Models/Prevision.model';
import { PrevisionService } from '../../../Services/prevision/prevision.service';

// Componentes hijos
import { AgregarprevisionComponent } from './agregarprevision/agregarprevision.component';
import { EditarprevisionComponent } from './editarprevision/editarprevision.component';

// Componente para verificación de roles
import {UsuarioActual} from '../../Globals/usuarioactual.component';

import { Router } from '@angular/router';
import { EventosService } from '../../../Services/eventos/eventos.service';

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
	selector: 'app-previsiones',
	templateUrl: './previsiones.component.html',
	styleUrls: ['./previsiones.component.css']
})
export class PrevisionesComponent{

	//Se declaran los atributos a usar
	public totalPrevisiones: Prevision[];
	public usuarioActual;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion', 'Isapre'];
	public actualizar;


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  ngOnInit(){

  	// Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Prevision');
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
	    public servicioPrevisiones: PrevisionService,
	    public dialog: MatDialog,
	    public router: Router,
     	public servicioEvento: EventosService
    ){
    	// Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalPrevisiones = [];
		this.actualizarPrevisiones();
	}

	actualizarPrevisiones ()
	{
		this.servicioPrevisiones.getPrevisions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPrevisiones = todo;
			this.pasarIdString();


      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalPrevisiones);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Prevision');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

	//Se obtiene la previsión desde la fila para obtener su id
	eliminarPrevision (prevision)
	{
		//Usando el id, de la previsión se elimina esta
		this.servicioPrevisiones.deletePrevision(prevision.id).subscribe( data => {
			//Se actualizan las previsiones a mostrar
			this.actualizarPrevisiones();
		});
	}

	pasarIdString()
	{
		for ( let i = 0 ; i < this.totalPrevisiones.length ; i ++)
		{
			if( parseInt(this.totalPrevisiones[i].isapre) === 1)
			{
				this.totalPrevisiones[i].isapre = "ISAPRE";
			}
			else
			{
				this.totalPrevisiones[i].isapre = "NO ISAPRE";
			}
		}
	}

	pasarStringId(prevision)
	{
		if (prevision.isapre === "ISAPRE")
		{
			prevision.isapre = "1";
		}
		else
		{
			prevision.isapre = "0";
		}
	}

	// Se obtiene la comuna a modificar desde el frontend
	edicionPrevision (prevision){

		var a = JSON.parse( JSON.stringify(prevision));
		this.pasarStringId(a);

		//Se abre un dialogo para editar la previsión, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarprevisionComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 prevision: a
			}
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
			/*
        	// Si recibe un 'false' se actualiza, si no, significa que se dio en editar
          	if (!this.actualizar) { this.actualizarComunas();}
          	*/
          	this.actualizarPrevisiones();
		});
	}

	agregacionPrevision(){
		// Se abre un nuevo dialogo para agregar una previsión, se abre un componente hijo	
		let dialogRef = this.dialog.open(AgregarprevisionComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px'
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
        	// Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        	if (this.actualizar) { this.actualizarPrevisiones();}
		});
	}

}

