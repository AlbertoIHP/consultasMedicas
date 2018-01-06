// Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Modelos y servicios
import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

// Componentes hijos
import { AgregarcomunaComponent } from './agregarcomuna/agregarcomuna.component';
import { EditarcomunaComponent } from './editarcomuna/editarcomuna.component';

// Componente para verificación de roles
import {UsuarioActual} from '../../Globals/usuarioactual.component';

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
	public totalProvincias: Provincia[];
	public totalComunas: Comuna[];
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
        })

    this.exampleDatabase = []

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
    this.servicioComuna.getComunas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalComunas = todo;
      this.reemplazarIdPorString();

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalComunas);

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
    public servicioProvincia: ProvinciaService,
    public servicioComuna: ComunaService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService) {
      	// Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalProvincias = [];
		this.totalComunas = [];
		this.actualizarProvincias();
		this.actualizarComunas();
	}

	actualizarProvincias ()
	{
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


	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalComunas.length ; i ++)
		{

			for(let j = 0 ; j < this.totalProvincias.length ; j++)
			{
				if( parseInt(this.totalComunas[i].Provincia_id) === this.totalProvincias[j].id)
				{
					this.totalComunas[i].Provincia_id = this.totalProvincias[j].nombre;
					break;
				}
			}

		}
	}

	pasarStringId(comuna)
	{
		for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
		{
		if(comuna.Provincia_id === this.totalProvincias[i].nombre)
		{
			comuna.Provincia_id = this.totalProvincias[i].id;
		}
		}

	}

	// Se obtiene la comuna a modificar desde el frontend
	edicionComuna(comuna) {

		var a = JSON.parse( JSON.stringify(comuna) );

		this.pasarStringId(a);

		//Se abre un dialogo para editar la comuna, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarcomunaComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
				comuna: a,
				provincias: this.totalProvincias,
		        servicioComuna: this.servicioComuna
			}
		});
		
		//Luego de cerrar el dialogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
        	// Si recibe un 'true' se actualiza, si no, significa que se dio en actualizar
        	if (this.actualizar) { this.actualizarComunas();}
		});
	}

	agregacionComuna() {
		// Se abre un nuevo dialogo para agregar una comuna, se abre un componente hijo		
		let dialogRef = this.dialog.open(AgregarcomunaComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data: 
			{
		        provincias: this.totalProvincias,
		        servicioComuna: this.servicioComuna
      		}
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
        	// Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        	if (this.actualizar) { this.actualizarComunas();}
		});
	}
}