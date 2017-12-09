import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { ExamenFisico } from '../../../Models/ExamenFisico.model';
import { ExamenFisicoService } from '../../../Services/examenfisico/examen-fisico.service';

import { EditarExamenFisicoComponent } from './editar-examen-fisico/editar-examen-fisico.component';
import { AgregarExamenFisicoComponent } from './agregar-examen-fisico/agregar-examen-fisico.component';
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
  selector: 'app-examen-fisico',
  templateUrl: './examen-fisico.component.html',
  styleUrls: ['./examen-fisico.component.css']
})
export class ExamenFisicoComponent {
	public totalExamenesFisicos: ExamenFisico[];
	public usuarioActual;

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  displayedColumns = ['Acciones', 'Fecha Examen','Peso','Estatura'];


 ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'ExamenFisico');
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



  constructor(public servicioExamenFisico:ExamenFisicoService, public dialog: MatDialog) {

  		this.usuarioActual=new UsuarioActual();
		this.totalExamenesFisicos = [];
		this.actualizarExamanesFisicos();

   }

   actualizarExamanesFisicos ()
	{
		this.servicioExamenFisico.getExamenFisicos().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalExamenesFisicos = todo;


      //DATATABLE

      this.exampleDatabase  = new ExampleDatabase(this.totalExamenesFisicos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'ExamenFisico');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}


	eliminarExamenFisico (examenFisico)
	{
		this.servicioExamenFisico.deleteExamenFisico(examenFisico.id).subscribe( data => {
			this.actualizarExamanesFisicos();
		});
	}



	edicionExamenFisico (examenFisico)
	{


		let dialogRef = this.dialog.open(EditarExamenFisicoComponent, {
			width: '700px',
			data:
			{
			 examenFisico: examenFisico,
       		 servicioExamenFisico: this.servicioExamenFisico
			}
		});

		dialogRef.afterClosed().subscribe(result => {

       this.actualizarExamanesFisicos();
			
		});
	}

	agregacionExamenFisico()
	{
		let dialogRef = this.dialog.open(AgregarExamenFisicoComponent, {
			width: '700px',
		 	data: {
		        servicioExamenFisico: this.servicioExamenFisico
      		}
		});

		dialogRef.afterClosed().subscribe(result => {
        this.actualizarExamanesFisicos();
			
		});
	}

}
