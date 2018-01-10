//Componentes generales
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//Modelos y servicios
import { Feriado } from '../../../Models/Feriado.model';
import { FeriadoService } from '../../../Services/feriado/feriado.service';

//Componentes hijos
import { EditarferiadoComponent } from './editarferiado/editarferiado.component';
import { AgregarferiadoComponent } from './agregarferiado/agregarferiado.component';

//Componente verificador de roles
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
  selector: 'app-feriados',
  templateUrl: './feriados.component.html',
  styleUrls: ['./feriados.component.css']
})
export class FeriadosComponent {

	public totalFeriados: Feriado[];
	public usuarioActual;
  length: any;

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
	displayedColumns = ['Acciones', 'Fecha', 'Descripcion'];


  ngOnInit() {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Feriado');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    this.exampleDatabase = [];
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
    public servicioFeriado: FeriadoService,
    public dialog: MatDialog,
    public router: Router
    ) {
		this.usuarioActual=new UsuarioActual();
		this.totalFeriados = [];
		this.actualizarFeriados();
	}

	actualizarFeriados() {
		this.servicioFeriado.getFeriados().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalFeriados = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalFeriados);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Feriado');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

  //Se obtiene el feriado desde la fila
	eliminarFeriado(feriado) {
    //Se elimina el feriado usando su id
		this.servicioFeriado.deleteFeriado(feriado.id).subscribe( data => {
			//Se actualiza la tabla
			this.actualizarFeriados();
		});
	}

	edicionFeriado(feriado) {

		let dialogRef = this.dialog.open(EditarferiadoComponent, {
			width: '700px',
			data:
			{
			  feriado: feriado
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.actualizarFeriados();
		});
	}

	agregacionFeriado() {
		let dialogRef = this.dialog.open(AgregarferiadoComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.actualizarFeriados();
		});
	}
}