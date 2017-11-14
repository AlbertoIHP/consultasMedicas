import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { EstadoCita } from '../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../Services/estadocita/estado-cita.service';

import { Cita } from '../../../Models/Cita.model';
import { CitaService } from '../../../Services/cita/cita.service';

import { AgregarestadocitaComponent } from './agregarestadocita/agregarestadocita.component';
import { EditarestadocitaComponent } from './editarestadocita/editarestadocita.component';

import { MensajeErrorComponent } from '../../Globals/mensaje-error/mensaje-error.component';

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
  selector: 'app-estadocita',
  templateUrl: './estadocita.component.html',
  styleUrls: ['./estadocita.component.css']
})
export class EstadocitaComponent {
	public totalEstadocitas: EstadoCita[];
	public buscarPorNombre: boolean;
	public usuarioActual;

	// Temporal para validación
	public totalCitas: Cita[];
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'EstadoCita');
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







	constructor (public servicioEstadoCita: EstadoCitaService, public servicioCita: CitaService, public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.totalEstadocitas = [];
		this.actualizarEstadoCitas();
		this.actualizarCitas();
	}

	actualizarEstadoCitas ()
	{
		this.servicioEstadoCita.getEstadoCitas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadocitas = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalEstadocitas);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'EstadoCita');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

	actualizarCitas()
	{
		//buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
		this.servicioCita.getCitas().subscribe((data)=>{
			var todo:any= data;
			todo = todo.data;
			this.totalCitas=todo;
		});
	}

	//Función temporal que retornará true en caso de que el estado cita esté en uso
	verificarUsoEstadoCita(estadocita):boolean{

		console.log(this.totalCitas.length);
		for(let i=0;i<this.totalCitas.length;i++){
			console.log(this.totalCitas[i].EstadoCita_id+'-'+estadocita.id);
				if(parseInt(this.totalCitas[i].EstadoCita_id)===parseInt(estadocita.id)){
					return true;
				}
			}
		return false;
	}


	eliminarEstadoCita (estadocita)
	{
		console.log('click');
		if(this.verificarUsoEstadoCita(estadocita)==true){

			this.mostrarMensaje("Esta estado cita está siendo usada por un médico.");

		}else{
			this.servicioEstadoCita.deleteEstadoCita(estadocita.id).subscribe( data => {
				console.log(data);
				this.actualizarEstadoCitas();
			});
		}

	}


	edicionEstadoCita (estadocita)
	{

		let dialogRef = this.dialog.open(EditarestadocitaComponent, {
			width: '700px',
			data:
			{
			 estadocita: estadocita
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCitas();
		});
	}

	agregacionEstadoCita()
	{
		let dialogRef = this.dialog.open(AgregarestadocitaComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCitas();
		});
	}

	mostrarMensaje(mensaje){
		let dialogRef = this.dialog.open(MensajeErrorComponent, {
			width: '400px',
			data:{
				mensajeError:mensaje
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCitas();
		});

	}


}


