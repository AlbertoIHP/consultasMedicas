import { Component, ElementRef, ViewChild, Inject } from '@angular/core';


import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';


import { AgregarcomunaComponent } from './agregarcomuna/agregarcomuna.component';
import { EditarcomunaComponent } from './editarcomuna/editarcomuna.component';

//DATATABLE
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


@Component({
	selector: 'app-comunas',
	templateUrl: './comunas.component.html',
	styleUrls: ['./comunas.component.css']
})
export class ComunasComponent {
	public totalProvincias: Provincia[];
	public totalComunas: Comuna[];

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	public buscarPorNombre: boolean;
	displayedColumns = ['Acciones', 'Nombre', 'Provincia'];


	constructor (public servicioProvincia: ProvinciaService, public servicioComuna: ComunaService, public dialog: MatDialog)
	{
		this.buscarPorNombre = false;
		this.totalProvincias = [];
		this.totalComunas = [];
		this.actualizarProvincias();
		this.actualizarComunas();

	}



	actualizarProvincias ()
	{
		this.servicioProvincia.getProvincias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalProvincias = todo;
		});
	}

	actualizarComunas ()
	{
		this.servicioComuna.getComunas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalComunas = todo;
			this.reemplazarIdPorString();

			//DATATABLE
			this.bdEstructura = new ExampleDatabase(this.totalComunas );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'Comuna');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
	}


	eliminarComuna (comuna)
	{
		this.servicioComuna.deleteComuna(comuna.id).subscribe( data => {
			console.log(data);
			this.actualizarComunas();
		});
	}


	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalComunas.length ; i ++)
		{

			for(let j = 0 ; j < this.totalProvincias.length ; j++)
			{
				if( parseInt(this.totalComunas[i].Provincia_id) === this.totalProvincias[j].id)
				{
					this.totalComunas[i].Provincia_id = this.totalProvincias[j].nombre;
					break;
				}
			}

		}
	}

	pasarStringId(comuna)
	{
		for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
		{
		if(comuna.Provincia_id === this.totalProvincias[i].nombre)
		{
			comuna.Provincia_id = this.totalProvincias[i].id;
		}
		}

	}

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}




	edicionComuna (comuna)
	{

		var a = JSON.parse( JSON.stringify(comuna) );

		this.pasarStringId(a);

		let dialogRef = this.dialog.open(EditarcomunaComponent, {
			width: '1000px',
			data:
			{
			 comuna: a,
			 provincias: this.totalProvincias,
       servicioProvincia: this.servicioProvincia,
       servicioComuna: this.servicioComuna
			}
		});

		dialogRef.afterClosed().subscribe(result => {

      this.actualizarProvincias();
			this.actualizarComunas();
		});
	}

	agregacionComuna()
	{
		let dialogRef = this.dialog.open(AgregarcomunaComponent, {
			width: '1000px',
			data: {
        provincias: this.totalProvincias,
        servicioProvincia: this.servicioProvincia
      }
		});

		dialogRef.afterClosed().subscribe(result => {
      this.actualizarProvincias();
			this.actualizarComunas();
		});
	}
}

