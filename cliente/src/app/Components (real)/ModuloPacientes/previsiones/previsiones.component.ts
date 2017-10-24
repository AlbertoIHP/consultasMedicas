
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';


import { Prevision } from '../../../../Models/Prevision.model';
import { PrevisionService } from '../../../../Services/prevision/prevision.service';


import { AgregarprevisionComponent } from './agregarprevision/agregarprevision.component';
import { EditarprevisionComponent } from './editarprevision/editarprevision.component';

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
	selector: 'app-previsiones',
	templateUrl: './previsiones.component.html',
	styleUrls: ['./previsiones.component.css']
})
export class PrevisionesComponent{
	public totalPrevisiones: Prevision[];


	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	public buscarPorNombre: boolean;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion', 'Isapre'];

	constructor (public servicioPrevisiones: PrevisionService, public dialog: MatDialog)
	{
		this.buscarPorNombre = false;
		this.totalPrevisiones = [];
		this.actualizarPrevisiones();
	}

	actualizarPrevisiones ()
	{
		this.servicioPrevisiones.getPrevisions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPrevisiones = todo;
			this.pasarIdString();


			//DATATABLE
			this.bdEstructura = new ExampleDatabase(this.totalPrevisiones );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'Prevision');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});
		});
	}

	eliminarPrevision (prevision)
	{
		this.servicioPrevisiones.deletePrevision(prevision.id).subscribe( data => {
			console.log(data);
			this.actualizarPrevisiones();
		});
	}

	pasarIdString()
	{
		for ( let i = 0 ; i < this.totalPrevisiones.length ; i ++)
		{
			if( parseInt(this.totalPrevisiones[i].isapre) === 1)
			{
				this.totalPrevisiones[i].isapre = "ISAPRE";
			}
			else
			{
				this.totalPrevisiones[i].isapre = "NO ISAPRE";
			}
		}
	}

	pasarStringId(prevision)
	{
		if (prevision.isapre === "ISAPRE")
		{
			prevision.isapre = "1";
		}
		else
		{
			prevision.isapre = "0";
		}
	}

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}

	edicionPrevision (prevision)
	{

		var a = JSON.parse( JSON.stringify(prevision));
		this.pasarStringId(a);

		let dialogRef = this.dialog.open(EditarprevisionComponent, {
			width: '1000px',
			data:
			{
			 prevision: a
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarPrevisiones();
		});
	}

	agregacionPrevision()
	{
		let dialogRef = this.dialog.open(AgregarprevisionComponent, {
			width: '1000px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarPrevisiones();
		});
	}

}

