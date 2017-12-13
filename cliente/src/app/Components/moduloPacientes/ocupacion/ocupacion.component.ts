import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { Router } from '@angular/router';

import { Ocupacion } from '../../../Models/Ocupacion.model';
import { OcupacionService } from '../../../Services/ocupacion/ocupacion.service';

import { AgregarOcupacionComponent } from './agregar-ocupacion/agregar-ocupacion.component';
import { EditarOcupacionComponent } from './editar-ocupacion/editar-ocupacion.component';


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
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.css']
})
export class OcupacionComponent {
  public totalOcupaciones: Ocupacion[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Ocupacion');
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



  constructor(public servicioOcupacion:OcupacionService, public dialog: MatDialog) {

  		this.usuarioActual=new UsuarioActual();
		this.totalOcupaciones = [];
		this.actualizarOcupaciones();

   }

   actualizarOcupaciones ()
	{
		this.servicioOcupacion.getOcupacions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalOcupaciones = todo;


      //DATATABLE

      this.exampleDatabase  = new ExampleDatabase(this.totalOcupaciones);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Ocupacion');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}


	eliminarOcupacion (ocupacion)
	{
		this.servicioOcupacion.deleteOcupacion(ocupacion.id).subscribe( data => {
			this.actualizarOcupaciones();
		});
	}



	edicionOcupacion (ocupacion)
	{


		let dialogRef = this.dialog.open(EditarOcupacionComponent, {
			width: '700px',
			data:
			{
			 ocupacion: ocupacion,
       		 servicioOcupacion: this.servicioOcupacion
			}
		});

		dialogRef.afterClosed().subscribe(result => {

       this.actualizarOcupaciones();
			
		});
	}

	agregacionOcupacion()
	{
		let dialogRef = this.dialog.open(AgregarOcupacionComponent, {
			width: '700px',
		 	data: {
		        servicioOcupacion: this.servicioOcupacion
      		}
		});

		dialogRef.afterClosed().subscribe(result => {
        this.actualizarOcupaciones();
			
		});
	}

 

}
