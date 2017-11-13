import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { EditarEstadoCComponent } from './editar-estado-c/editar-estado-c.component';
import { AgregarEstadoCComponent } from './agregar-estado-c/agregar-estado-c.component';

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
	selector: 'app-estadocivil',
	templateUrl: './estadocivil.component.html',
	styleUrls: ['./estadocivil.component.css']
})

export class EstadocivilComponent{
	public totalEstadoCiviles: EstadoCivil[];
	public usuarioActual;


	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
  public buscarPorNombre: boolean;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];


	constructor (public servicioEstadoCivil: EstadocivilService, public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
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
			this.bdEstructura = new ExampleDatabase(this.totalEstadoCiviles );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'EC');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});

		});
	}

	eliminarEstadoCivil (ec)
	{
		this.servicioEstadoCivil.deleteEstadoCivil(ec.id).subscribe( data => {
			console.log(data);
			this.actualizarEstadoCiviles();
		});
	}

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
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
