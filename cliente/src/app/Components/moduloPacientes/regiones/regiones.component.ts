import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { AgregarregionesComponent } from './agregarregiones/agregarregiones.component';
import { EditarregionesComponent } from './editarregiones/editarregiones.component';



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
	selector: 'app-regiones',
	templateUrl: './regiones.component.html',
	styleUrls: ['./regiones.component.css']
})
export class RegionesComponent {

	public totalRegiones: Region[];
	public usuarioActual;

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;

	displayedColumns = ['Acciones', 'Nombre'];
	public buscarPorNombre: boolean;




	constructor (public servicioRegion: RegionService , public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
		this.totalRegiones = [];
		this.actualizarRegiones();
	}


	actualizarRegiones ()
	{
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;

			this.bdEstructura = new ExampleDatabase(this.totalRegiones );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'Region');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
	}

	eliminarRegion (region)
	{
		this.servicioRegion.deleteRegion(region.id).subscribe( data => {
			console.log(data);
			this.actualizarRegiones();
		});

	}


	edicionRegion (region)
	{

		let dialogRef = this.dialog.open(EditarregionesComponent, {
			width: '700px',
			data:
			{
			 region: region
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarRegiones();
		});
	}

		cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}

	agregacionRegion()
	{
		let dialogRef = this.dialog.open(AgregarregionesComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarRegiones();
		});
	}


}

