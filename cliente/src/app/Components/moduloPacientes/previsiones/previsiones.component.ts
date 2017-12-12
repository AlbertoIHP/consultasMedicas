
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';


import { Prevision } from '../../../Models/Prevision.model';
import { PrevisionService } from '../../../Services/prevision/prevision.service';


import { AgregarprevisionComponent } from './agregarprevision/agregarprevision.component';
import { EditarprevisionComponent } from './editarprevision/editarprevision.component';

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
	selector: 'app-previsiones',
	templateUrl: './previsiones.component.html',
	styleUrls: ['./previsiones.component.css']
})
export class PrevisionesComponent{
	public totalPrevisiones: Prevision[];
	public usuarioActual;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion', 'Isapre'];


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Prevision');
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
    public servicioPrevisiones: PrevisionService,
    public dialog: MatDialog,
    public router: Router)
  {
    
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

	eliminarPrevision (prevision)
	{
		this.servicioPrevisiones.deletePrevision(prevision.id).subscribe( data => {
			console.log(data);
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

	edicionPrevision (prevision)
	{

		var a = JSON.parse( JSON.stringify(prevision));
		this.pasarStringId(a);

		let dialogRef = this.dialog.open(EditarprevisionComponent, {
			width: '700px',
			data:
			{
			 prevision: a
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarPrevisiones();
		});
	}

	agregacionPrevision()
	{
		let dialogRef = this.dialog.open(AgregarprevisionComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarPrevisiones();
		});
	}

}

