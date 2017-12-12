import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { EditarEstadoCComponent } from './editar-estado-c/editar-estado-c.component';
import { AgregarEstadoCComponent } from './agregar-estado-c/agregar-estado-c.component';
import { Router } from '@angular/router';
import {UsuarioActual} from '../../Globals/usuarioactual.component';



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
	selector: 'app-estadocivil',
	templateUrl: './estadocivil.component.html',
	styleUrls: ['./estadocivil.component.css']
})

export class EstadocivilComponent{
	public totalEstadoCiviles: EstadoCivil[];
	public usuarioActual;


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];


  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'EC');
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
    public servicioEstadoCivil: EstadocivilService,
    public dialog: MatDialog,
    public router: Router)
  {
   
		this.usuarioActual=new UsuarioActual();
		this.totalEstadoCiviles = [];
		this.actualizarEstadoCiviles();
	}

	actualizarEstadoCiviles ()
	{
		this.servicioEstadoCivil.getEstadoCivils().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadoCiviles = todo;


      //DATATABLE

      this.exampleDatabase  = new ExampleDatabase(this.totalEstadoCiviles);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'EC');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}

	eliminarEstadoCivil (ec)
	{
		this.servicioEstadoCivil.deleteEstadoCivil(ec.id).subscribe( data => {
			console.log(data);
			this.actualizarEstadoCiviles();
		});
	}

	edicionEC (ec)
	{

		let dialogRef = this.dialog.open(EditarEstadoCComponent, {
			width: '700px',
			data:
			{
			 ec: ec
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCiviles();
		});
	}

	agregacionEC()
	{
		let dialogRef = this.dialog.open(AgregarEstadoCComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCiviles();
		});
	}

}
