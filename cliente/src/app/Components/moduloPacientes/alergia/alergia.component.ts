import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { Alergia } from '../../../Models/Alergia.model';
import { AlergiaService } from '../../../Services/alergia/alergia.service';

import { AgregarAlergiaComponent } from './agregar-alergia/agregar-alergia.component';
import { EditarAlergiaComponent } from './editar-alergia/editar-alergia.component';
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
  selector: 'app-alergia',
  templateUrl: './alergia.component.html',
  styleUrls: ['./alergia.component.css']
})
export class AlergiaComponent {

	public totalAlergias: Alergia[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Alergia');
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
    public servicioAlergia: AlergiaService,
    public dialog: MatDialog,
    public router: Router


    )
  {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['login'])
    }

		this.usuarioActual=new UsuarioActual();
		this.totalAlergias = [];
		this.actualizarAlergias();
	}

	actualizarAlergias ()
	{
		this.servicioAlergia.getAlergias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalAlergias = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalAlergias);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Alergia');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

	eliminarAlergia (alergia)
	{
		this.servicioAlergia.deleteAlergia(alergia.id).subscribe( data => {
			console.log(data);
			this.actualizarAlergias();
		});
	}



	edicionAlergia (alergia)
	{

		let dialogRef = this.dialog.open(EditarAlergiaComponent, {
			width: '700px',
			data:
			{
			 alergia: alergia
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarAlergias();
		});
	}

	agregacionAlergia()
	{
		let dialogRef = this.dialog.open(AgregarAlergiaComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarAlergias();
		});
	}
}