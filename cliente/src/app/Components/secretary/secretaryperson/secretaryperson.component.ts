import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Genero } from '../../../Models/Genero.model';
import { GeneroService } from '../../../Services/genero/genero.service';

import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

import { AgregarpersonaComponent } from '../agregarpersona/agregarpersona.component';


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


export interface UserData {
	id: number;
	rut: string;
	nombre1: string;
	nombre2: string;
	apellido1: string;
	apellido2: string;
	fono_casa: string;
	fono_trabajo: string;
	movil: string;
	Genero_id: string;
	EstadoCivil_id: string;
	Comuna_id: string;
	estado: number;
}

@Component({
	selector: 'app-secretaryperson',
	templateUrl: './secretaryperson.component.html',
	styleUrls: ['./secretaryperson.component.css']
})
export class SecretarypersonComponent {
	displayedColumns = [
	'Acciones',
	'Rut',
	'Primer Nombre',
	'Segundo Nombre',
	'Primer Apellido',
	'Segundo Apellido',
	'Telefono de Casa',
	'Telefono de Trabajo',
	'Celular',
	'Sexo',
	'Estado Civil',
	'Comuna'
	];

	public totalPacientes: Persona[];
	public totalRegiones: Region[];
	public totalProvincias: Provincia[];
	public totalComunas: Comuna[];
	public totalGeneros: Genero[];
	public totalEstadoCiviles: EstadoCivil[];


	//DATATABLE
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
	public dataSource2: ExampleDataSource2 | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public buscarPorRut: boolean;


	constructor(
		public servicioPersona: PersonaService,
		public servicioRegion: RegionService,
		public servicioProvincia: ProvinciaService,
		public servicioComuna: ComunaService,
		public servicioGenero: GeneroService,
		public servicioEstadoCivil: EstadocivilService,
		public router: Router,
		public dialog: MatDialog

		)
	{
		this.totalPacientes = [];
		this.buscarPorRut = false;

		this.actualizarRegiones();

		this.actualizarProvincias();

		this.actualizarComunas();

		this.actualizarGeneros();

		this.actualizarEstadoCiviles();

		this.actualizarPersonas();
	}

	crearPersona(): void {

		let dialogRef = this.dialog.open(AgregarpersonaComponent, {
			width: '500px',
	  data: {
		regiones: this.totalRegiones,
		provincias: this.totalProvincias,
		comunas: this.totalComunas,
		ec: this.totalEstadoCiviles,
		generos: this.totalGeneros
	  }
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarPersonas();
		});
	}

	cambiarBusqueda()
	{
		this.buscarPorRut = !this.buscarPorRut;
	}


  editarPersona (persona)
  {

  }

  previsionPersona (persona)
  {

  }




	pasarStringId(paciente)
	{
		for ( let i = 0 ; i < this.totalComunas.length ; i ++)
		{
		if(paciente.Comuna_id === this.totalComunas[i].nombre)
		{
			paciente.Comuna_id = this.totalComunas[i].id;
		}
		}

		for ( let i = 0 ; i < this.totalGeneros.length ; i ++)
		{
		if(paciente.Genero_id === this.totalGeneros[i].nombre)
		{
			paciente.Genero_id = this.totalGeneros[i].id;
		}
		}

		for ( let i = 0 ; i < this.totalEstadoCiviles.length ; i ++)
		{
		if(paciente.EstadoCivil_id === this.totalEstadoCiviles[i].nombre)
		{
			paciente.EstadoCivil_id = this.totalEstadoCiviles[i].id;
		}
		}
	}

	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalPacientes.length ; i ++)
		{

			for(let j = 0 ; j < this.totalGeneros.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].Genero_id) === this.totalGeneros[j].id)
				{
					this.totalPacientes[i].Genero_id = this.totalGeneros[j].nombre;
					break;
				}
			}

			for(let j = 0 ; j < this.totalEstadoCiviles.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].EstadoCivil_id) === this.totalEstadoCiviles[j].id)
				{
					this.totalPacientes[i].EstadoCivil_id = this.totalEstadoCiviles[j].nombre;
					break;
				}
			}


			for(let j = 0 ; j < this.totalComunas.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].Comuna_id) === this.totalComunas[j].id)
				{
					this.totalPacientes[i].Comuna_id = this.totalComunas[j].nombre;
					break;
				}
			}

		}
	}

	actualizarRegiones()
	{
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;
		});
	}

	actualizarPersonas()
	{
		this.servicioPersona.getPersonas().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPacientes = todo;
			this.reemplazarIdPorString();
			this.exampleDatabase = new ExampleDatabase(this.totalPacientes );
			this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);
			this.dataSource2 = new ExampleDataSource2(this.exampleDatabase);

			Observable.fromEvent(this.filter.nativeElement, 'keyup')
				.debounceTime(150)
				.distinctUntilChanged()
				.subscribe(() => {
					if (!this.dataSource) { return; }
					this.dataSource2.filter = this.filter.nativeElement.value;
				});
		});
	}

	actualizarProvincias()
	{
		this.servicioProvincia.getProvincias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalProvincias = todo;
		});

	}

	actualizarComunas()
	{
		this.servicioComuna.getComunas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalComunas = todo;
		});
	}

	actualizarGeneros()
	{
		this.servicioGenero.getGeneros().subscribe(data =>{
			var todo: any = data;
			todo = todo.data;
			this.totalGeneros = todo;
		});
	}

	actualizarEstadoCiviles()
	{
		this.servicioEstadoCivil.getEstadoCivils().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadoCiviles = todo;
		});
	}




}


export class ExampleDatabase {
	/** Stream that emits whenever the data has been modified. */
	dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
	get data(): UserData[] { return this.dataChange.value; }

	constructor(personas)
	{
		// Fill up the database with 100 users.
		for (let i = 0; i < personas.length; i++) { this.addUser(personas[i]); }
	}

	/** Adds a new user to the database. */
	addUser(persona) {
		const copiedData = this.data.slice();
		copiedData.push(persona);
		this.dataChange.next(copiedData);
	}

}


export class ExampleDataSource extends DataSource<any> {
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

export class ExampleDataSource2 extends DataSource<any> {
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
				let searchStr = (item.rut ).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) != -1;
			});
		});
	}

	disconnect() {}
}

