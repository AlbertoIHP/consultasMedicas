import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { EnfermedadCronica } from '../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { AgregarEnfermedadCronicaComponent } from './agregar-enfermedad-cronica/agregar-enfermedad-cronica.component';
import { EditarEnfermedadCronicaComponent } from './editar-enfermedad-cronica/editar-enfermedad-cronica.component';
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
  selector: 'app-enfermedad-cronica',
  templateUrl: './enfermedad-cronica.component.html',
  styleUrls: ['./enfermedad-cronica.component.css']
})
export class EnfermedadCronicaComponent {

	public totalEnfermedadCronicas: EnfermedadCronica[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'EnfermedadCronica');
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
    public servicioEnfermedadCronica: EnfermedadCronicaService,
    public dialog: MatDialog,
    public router: Router


    )
  {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['login'])
    }

		this.usuarioActual=new UsuarioActual();
		this.totalEnfermedadCronicas = [];
		this.actualizarEnfermedadCronicas();
	}

	actualizarEnfermedadCronicas ()
	{
		this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEnfermedadCronicas = todo;

      console.log(this.totalEnfermedadCronicas)

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalEnfermedadCronicas);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'EnfermedadCronica');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

	eliminarEnfermedadCronica (enfermedadcronica)
	{
		this.servicioEnfermedadCronica.deleteEnfermedadCronica(enfermedadcronica.id).subscribe( data => {
			console.log(data);
			this.actualizarEnfermedadCronicas();
		});
	}



	edicionEnfermedadCronica (enfermedadcronica)
	{

		let dialogRef = this.dialog.open(EditarEnfermedadCronicaComponent, {
			width: '700px',
			data:
			{
			 enfermedadcronica: enfermedadcronica
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEnfermedadCronicas();
		});
	}

	agregacionEnfermedadCronica()
	{
		let dialogRef = this.dialog.open(AgregarEnfermedadCronicaComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEnfermedadCronicas();
		});
	}
}