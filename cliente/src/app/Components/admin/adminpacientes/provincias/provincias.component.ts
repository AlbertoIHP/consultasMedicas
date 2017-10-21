import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { Provincia } from '../../../../Models/Provincia.model';
import { ProvinciaService } from '../../../../Services/provincia/provincia.service';

import { Region } from '../../../../Models/Region.model';
import { RegionService } from '../../../../Services/region/region.service';

import { AgregarprovinciaComponent } from './agregarprovincia/agregarprovincia.component';
import { EditarprovinciaComponent } from './editarprovincia/editarprovincia.component';

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



import { ExampleDatabase, dataTable, buscadorPorNombre } from '../../../Globals/datasource.component';


@Component({
	selector: 'app-provincias',
	templateUrl: './provincias.component.html',
	styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent {
public totalRegiones: Region[];
	public totalProvincias: Provincia[];

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	public buscarPorNombre: boolean;
	displayedColumns = ['Acciones', 'Nombre', 'Region'];


	constructor (public servicioRegion: RegionService, public servicioProvincia: ProvinciaService, public dialog: MatDialog)
	{
		this.buscarPorNombre = false;
		this.totalRegiones = [];
		this.totalProvincias = [];
		this.actualizarRegiones();
		this.actualizarProvincias();
	}


	actualizarRegiones ()
	{
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;
		});
	}



	actualizarProvincias ()
	{
		this.servicioProvincia.getProvincias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalProvincias = todo;
			this.reemplazarIdPorString();

			this.bdEstructura = new ExampleDatabase(this.totalProvincias );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'Provincia');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});

		});
	}




	eliminarProvincia (provincia)
	{
		this.servicioProvincia.deleteProvincia(provincia.id).subscribe( data => {
			console.log(data);
			this.actualizarProvincias();
		});
	}




	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalProvincias.length ; i ++)
		{

			for(let j = 0 ; j < this.totalRegiones.length ; j++)
			{
				if( parseInt(this.totalProvincias[i].Region_id) === this.totalRegiones[j].id)
				{
					this.totalProvincias[i].Region_id = this.totalRegiones[j].nombre;
					break;
				}
			}

		}
	}


	pasarStringId(provincia)
	{
		for ( let i = 0 ; i < this.totalRegiones.length ; i ++)
		{
		if(provincia.Region_id === this.totalRegiones[i].nombre)
		{
			provincia.Region_id = this.totalRegiones[i].id;
		}
		}

	}

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}


	edicionProvincia (provincia)
	{

	 var a = JSON.parse( JSON.stringify(provincia) );

	this.pasarStringId(a);

		let dialogRef = this.dialog.open(EditarprovinciaComponent, {
			width: '1000px',
			data:
			{
			 provincia: a,
			 regiones: this.totalRegiones,
       servicioRegion: this.servicioRegion
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarProvincias();
		});
	}

	agregacionProvincia()
	{
		let dialogRef = this.dialog.open(AgregarprovinciaComponent, {
			width: '1000px',
			data : {
        regiones: this.totalRegiones,
        servicioRegion: this.servicioRegion,
        servicioProvincia: this.servicioProvincia }
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarProvincias();
		});
	}



}

