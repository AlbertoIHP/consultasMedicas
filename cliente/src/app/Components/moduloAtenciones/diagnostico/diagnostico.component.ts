import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { Diagnostico } from '../../../Models/Diagnostico.model';
import { DiagnosticoService } from '../../../Services/diagnostico/diagnostico.service';

import { AgregarDiagnosticoComponent } from './agregar-diagnostico/agregar-diagnostico.component';
import { EditarDiagnosticoComponent } from './editar-diagnostico/editar-diagnostico.component';

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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {UsuarioActual} from '../../Globals/usuarioactual.component';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
	public totalDiagnosticos:Diagnostico[];
	public usuarioActual;

	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	displayedColumns = ['Acciones', 'Diagnostico'];


	ngOnInit()
	  {
	    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Diagnostico');
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

	constructor (public servicioDiagnostico:DiagnosticoService, public dialog: MatDialog)
		{
			this.usuarioActual=new UsuarioActual();
			this.totalDiagnosticos=[];
			this.actualizarDiagnosticos();
		}

	actualizarDiagnosticos ()
	{
		this.servicioDiagnostico.getDiagnosticos().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalDiagnosticos = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalDiagnosticos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Diagnostico');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

	eliminarDiagnostico (diagnostico)
	{
		this.servicioDiagnostico.deleteDiagnostico(diagnostico.id).subscribe( data => {
				this.actualizarDiagnosticos();
			});
	}



	edicionDiagnostico (diagnostico)
	{

		let dialogRef = this.dialog.open(EditarDiagnosticoComponent, {
			width: '700px',
			data:
			{
			 diagnostico: diagnostico
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarDiagnosticos();
		});
	}

	agregacionDiagnostico()
	{
		let dialogRef = this.dialog.open(AgregarDiagnosticoComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarDiagnosticos();
		});
	}


 

}
