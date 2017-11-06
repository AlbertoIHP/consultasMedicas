import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { Genero } from '../../../Models/Genero.model';
import { GeneroService } from '../../../Services/genero/genero.service';

import { AgregargeneroComponent } from './agregargenero/agregargenero.component';
import { EditargeneroComponent } from './editargenero/editargenero.component';

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
	selector: 'app-generos',
	templateUrl: './generos.component.html',
	styleUrls: ['./generos.component.css']
})
export class GenerosComponent  {
	public totalGeneros: Genero[];
	public buscarPorNombre: boolean;
	public usuarioActual;


	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];


	constructor (public servicioGenero: GeneroService, public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
		this.totalGeneros = [];
		this.actualizarGeneros();
	}

	actualizarGeneros ()
	{
		this.servicioGenero.getGeneros().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalGeneros = todo;

			this.bdEstructura = new ExampleDatabase(this.totalGeneros );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'Genero');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
	}

	eliminarGenero (genero)
	{
		this.servicioGenero.deleteGenero(genero.id).subscribe( data => {
			console.log(data);
			this.actualizarGeneros();
		});
	}



	//DATATABLES

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}


	edicionGenero (genero)
	{

		let dialogRef = this.dialog.open(EditargeneroComponent, {
			width: '1000px',
			data:
			{
			 genero: genero
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarGeneros();
		});
	}

	agregacionGenero()
	{
		let dialogRef = this.dialog.open(AgregargeneroComponent, {
			width: '1000px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarGeneros();
		});
	}



}


