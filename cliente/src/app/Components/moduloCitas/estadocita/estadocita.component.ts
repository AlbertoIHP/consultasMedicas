import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { EstadoCita } from '../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../Services/estadocita/estado-cita.service';

import { AgregarestadocitaComponent } from './agregarestadocita/agregarestadocita.component';
import { EditarestadocitaComponent } from './editarestadocita/editarestadocita.component';

import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ExampleDatabase, dataTable, buscadorPorNombre } from '../../Globals/datasource.component';

import {UsuarioActual} from '../../Globals/usuarioactual.component';


@Component({
  selector: 'app-estadocita',
  templateUrl: './estadocita.component.html',
  styleUrls: ['./estadocita.component.css']
})
export class EstadocitaComponent {
	public totalEstadocitas: EstadoCita[];
	public buscarPorNombre: boolean;
	public usuarioActual;


	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];


	constructor (public servicioEstadoCita: EstadoCitaService, public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
		this.totalEstadocitas = [];
		this.actualizarEstadoCitas();
	}

	actualizarEstadoCitas ()
	{
		this.servicioEstadoCita.getEstadoCitas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadocitas = todo;

			this.bdEstructura = new ExampleDatabase(this.totalEstadocitas );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'EstadoCita');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
	}

	eliminarEstadoCita (estadocita)
	{
		this.servicioEstadoCita.deleteEstadoCita(estadocita.id).subscribe( data => {
			console.log(data);
			this.actualizarEstadoCitas();
		});
	}



	//DATATABLES

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}


	edicionEstadoCita (estadocita)
	{

		let dialogRef = this.dialog.open(EditarestadocitaComponent, {
			width: '1000px',
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
			width: '1000px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCitas();
		});
	}



}


