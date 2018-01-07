//Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Modelos y servicios
import { Genero } from '../../../Models/Genero.model';
import { GeneroService } from '../../../Services/genero/genero.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { AgregargeneroComponent } from './agregargenero/agregargenero.component';
import { EditargeneroComponent } from './editargenero/editargenero.component';

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
	selector: 'app-generos',
	templateUrl: './generos.component.html',
	styleUrls: ['./generos.component.css']
})

export class GenerosComponent  {
  //Se declaran los atributos
	public totalGeneros: Genero[];
	public buscarPorNombre: boolean;
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Genero');
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

	constructor (
    public servicioGenero: GeneroService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
    ) {

    // Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalGeneros = [];

    // Se obtienen los registros de generos de la base de datos
		this.actualizarGeneros();
	}

	actualizarGeneros () {
    // Se obtienen todas los géneros desde la API    
		this.servicioGenero.getGeneros().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalGeneros = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalGeneros);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Genero');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

  //Se obtiene el género desde la fila
	eliminarGenero(genero) {
    // Se elimina usando el id del género
		this.servicioGenero.deleteGenero(genero.id).subscribe( data => {
			//Se actualiza la tabla
      this.actualizarGeneros();
		});
	}

  // Se envía el género a modificar desde el frontend
	edicionGenero(genero) {
    //Se abre un diálogo para editar la género, se abre un componente hijo
		let dialogRef = this.dialog.open(EditargeneroComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 genero: genero
			}
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarGeneros();}
    });
	}

	agregacionGenero() {
    // Se abre un nuevo diálogo para agregar un género, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregargeneroComponent, {
      //Se asignan los parámetros
			width: '700px'
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarGeneros();}
    });
	}
}