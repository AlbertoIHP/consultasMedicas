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



export interface UserData extends Provincia{}

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
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura);
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
			 regiones: this.totalRegiones
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
			data : { regiones: this.totalRegiones }
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarProvincias();
		});
	}



}



export class ExampleDatabase {
	/** Stream that emits whenever the data has been modified. */
	dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
	get data(): UserData[] { return this.dataChange.value; }

	constructor(ec)
	{
		// Fill up the database with 100 users.
		for (let i = 0; i < ec.length; i++) { this.addUser(ec[i]); }
	}

	/** Adds a new user to the database. */
	addUser(ec) {
		const copiedData = this.data.slice();
		copiedData.push(ec);
		this.dataChange.next(copiedData);
	}



}


export class dataTable extends DataSource<any> {
	_filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
		super();
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<UserData[]> {

		const displayDataChanges = [
			this._exampleDatabase.dataChange,
			this._paginator.page,
			this._filterChange,
		];

		return Observable.merge(...displayDataChanges).map(() => {

			const data = this._exampleDatabase.data.slice();
			const startIndex = this._paginator.pageIndex * this._paginator.pageSize;


			return data.splice(startIndex, this._paginator.pageSize);

		});
	}

	disconnect() {}
}



export class buscadorPorNombre extends DataSource<any> {
	_filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	constructor(private _exampleDatabase: ExampleDatabase) {
		super();
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<UserData[]> {
		const displayDataChanges = [
			this._exampleDatabase.dataChange,
			this._filterChange,
		];

		return Observable.merge(...displayDataChanges).map(() => {
			return this._exampleDatabase.data.slice().filter((item: UserData) => {
				let searchStr = (item.nombre ).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) != -1;
			});
		});
	}

	disconnect() {}
}

