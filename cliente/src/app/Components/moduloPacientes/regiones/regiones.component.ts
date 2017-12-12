import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { AgregarregionesComponent } from './agregarregiones/agregarregiones.component';
import { EditarregionesComponent } from './editarregiones/editarregiones.component';

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

	public totalRegiones: Region[];
	public usuarioActual;
	displayedColumns = ['Acciones', 'Nombre'];


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Region');
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
    public servicioRegion: RegionService,
    public dialog: MatDialog,
    public router: Router)
  {
   
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

	eliminarRegion (region)
	{
		this.servicioRegion.deleteRegion(region.id).subscribe( data => {
			console.log(data);
			this.actualizarRegiones();
		});

	}


	edicionRegion (region)
	{

		let dialogRef = this.dialog.open(EditarregionesComponent, {
			width: '700px',
			data:
			{
			 region: region
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarRegiones();
		});
	}

	agregacionRegion()
	{
		let dialogRef = this.dialog.open(AgregarregionesComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarRegiones();
		});
	}


}

