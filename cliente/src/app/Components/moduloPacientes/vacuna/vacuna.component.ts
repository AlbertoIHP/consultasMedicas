import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { Router } from '@angular/router';

import { Vacuna } from '../../../Models/Vacuna.model';
import { VacunaService } from '../../../Services/vacuna/vacuna.service';

import { AgregarVacunaComponent } from './agregar-vacuna/agregar-vacuna.component';
import { EditarVacunaComponent } from './editar-vacuna/editar-vacuna.component';


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
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent {
  public totalVacunas: Vacuna[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Vacuna');
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



  constructor(public servicioVacuna: VacunaService, public dialog:MatDialog) {
  		this.totalVacunas=[];
  		this.usuarioActual=new UsuarioActual();
  		this.actualizarVacunas();
   }

   actualizarVacunas ()
	{
		this.servicioVacuna.getVacunas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalVacunas = todo;


      //DATATABLE

      this.exampleDatabase  = new ExampleDatabase(this.totalVacunas);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Vacuna');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}


	eliminarVacuna (vacuna)
	{
		this.servicioVacuna.deleteVacuna(vacuna.id).subscribe( data => {
			this.actualizarVacunas();
		});
	}



	edicionVacuna (vacuna)
	{


		let dialogRef = this.dialog.open(EditarVacunaComponent, {
			width: '700px',
			data:
			{
			 vacuna: vacuna,
       		 servicioVacuna: this.servicioVacuna
			}
		});

		dialogRef.afterClosed().subscribe(result => {

       this.actualizarVacunas();
			
		});
	}

	agregacionVacuna()
	{
		let dialogRef = this.dialog.open(AgregarVacunaComponent, {
			width: '700px',
		 	data: {
		        servicioVacuna: this.servicioVacuna
      		}
		});

		dialogRef.afterClosed().subscribe(result => {
        this.actualizarVacunas();
			
		});
	}


  

}
