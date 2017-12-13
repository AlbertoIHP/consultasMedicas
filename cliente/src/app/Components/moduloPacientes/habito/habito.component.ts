import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { Habito } from '../../../Models/Habito.model';
import { HabitoService } from '../../../Services/habito/habito.service';

import { AgregarHabitoComponent } from './agregar-habito/agregar-habito.component';
import { EditarHabitoComponent } from './editar-habito/editar-habito.component';
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
  selector: 'app-habito',
  templateUrl: './habito.component.html',
  styleUrls: ['./habito.component.css']
})
export class HabitoComponent {
	public totalHabitos: Habito[];
	public buscarPorNombre: boolean;
	public usuarioActual;


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

	displayedColumns = ['Acciones', 'Nombre'];


  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Habito');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

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
    public servicioHabito: HabitoService,
    public dialog: MatDialog,
    public router: Router


    )
  {
    
		this.usuarioActual=new UsuarioActual();
		this.totalHabitos = [];
		this.actualizarHabitos();
	}

	actualizarHabitos ()
	{
		this.servicioHabito.getHabitos().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalHabitos = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalHabitos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Habito');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

	eliminarHabito (habito)
	{
		this.servicioHabito.deleteHabito(habito.id).subscribe( data => {
			console.log(data);
			this.actualizarHabitos();
		});
	}



	edicionHabito (habito)
	{

		let dialogRef = this.dialog.open(EditarHabitoComponent, {
			width: '700px',
			data:
			{
			 habito: habito
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarHabitos();
		});
	}

	agregacionHabito()
	{
		let dialogRef = this.dialog.open(AgregarHabitoComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarHabitos();
		});
	}
}