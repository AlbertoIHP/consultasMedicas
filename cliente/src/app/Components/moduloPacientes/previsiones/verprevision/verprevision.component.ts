import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { PersonaService } from '../../../../Services/persona/persona.service';

import { PrevisionService } from '../../../../Services/prevision/prevision.service';

import { PrevisionactualService } from '../../../../Services/previsionactual/previsionactual.service';
import { Prevision } from '../../../../Models/Prevision.model';
import { PrevisionActual } from '../../../../Models/PrevisionActual.model';


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
	selector: 'app-verprevision',
	templateUrl: './verprevision.component.html',
	styleUrls: ['./verprevision.component.css']
})
export class VerPrevisionComponent {

	public totalPrevision: any[];
	public totalPrevisionActual: any[];
	public pacienteActual: any;
	public previsionActual: any;
	public nuevaPrevisionActual: any;
	public previsionSeleccionada: any;
	public descripcionSeleccionada: any;

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	public buscarPorNombre: boolean;
	displayedColumns = ['Fecha Actualizacion', 'Prevision', 'Estado'];



	constructor(
		public servicioPrevision: PrevisionService,
		public servicioPrevisionActual: PrevisionactualService,
		public servicioPersona: PersonaService,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<VerPrevisionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,

		)
	{

		this.buscarPorNombre = false;
		this.totalPrevision = [];
		this.totalPrevisionActual = [];
		this.previsionActual = new PrevisionActual();
		this.nuevaPrevisionActual = new PrevisionActual();
		this.pacienteActual = data.persona;
		this.nuevaPrevisionActual.Persona_id = this.pacienteActual.id.toString();
		this.actualizarPrevision();
		this.actualizarPrevisionActual();


	}



	seleccionPrevision(prevision)
	{
		this.descripcionSeleccionada = prevision.descripcion;
		this.nuevaPrevisionActual.Prevision_id = prevision.id;

	console.log(this.nuevaPrevisionActual);

	}

	cambiarPrevision()
	{
		if(this.totalPrevisionActual.length>=1)
		{
			this.previsionActual.activado = 0;
			for(let j = 0 ; j < this.totalPrevision.length ; j++)
			{
				if(this.previsionActual.Prevision_id === this.totalPrevision[j].nombre)
				{
					this.previsionActual.Prevision_id = this.totalPrevision[j].id.toString();
				}
			}

			this.servicioPrevisionActual.editPrevisionActual(this.previsionActual, this.previsionActual.id).subscribe( data => {

				this.servicioPrevisionActual.registerPrevisionActual(this.nuevaPrevisionActual).subscribe( data  => {
					this.actualizarPrevisionActual();
					this.previsionActual = new PrevisionActual();
				});


			});
		}
		else
		{
				this.servicioPrevisionActual.registerPrevisionActual(this.nuevaPrevisionActual).subscribe( data  => {
					this.previsionActual = this.nuevaPrevisionActual;
					this.previsionActual = new PrevisionActual();
					this.actualizarPrevisionActual();
				});
		}


	}

	onNoClick()
	{
	this.dialogRef.close();
	}


	/**
	**Este metodo consume todas las previsiones registradas en la API
	**/
	actualizarPrevision ()
	{
		this.totalPrevision = [];
		this.servicioPrevision.getPrevisions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;

			this.totalPrevision = todo;
		});
	}


	/**
	** Este metodo filtra el total de las previsiones a aquellas que solamente son del paciente y luego filtra aquellas activadas y desactivadas
	**/
	actualizarPrevisionActual ()
	{
		this.totalPrevisionActual = [];
		this.servicioPrevisionActual.getPrevisionActuals().subscribe(data => {
			var todo: any = data;
			todo = todo.data;

		for ( let i = 0 ; i < todo.length ; i ++)
		{
			if ( todo[i].Persona_id === this.pacienteActual.id )
			{
				this.totalPrevisionActual.push(todo[i]);
			}
		}

		if (this.totalPrevisionActual.length >= 1)
		{
		 this.identificarPrevisionActiva();

		}

			this.bdEstructura = new ExampleDatabase(this.totalPrevisionActual );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);




		});
	}



	/**
	** Este metodo identifica la prevision que esta activa de todas las filtradas arriba
	** Luego se cambian las ID por String para desplegarlas en la table
	**/

	identificarPrevisionActiva()
	{
		for ( let i = 0 ; i < this.totalPrevisionActual.length ; i++)
		{
			if (this.totalPrevisionActual[i].activado === 1)
			{
				this.previsionActual = this.totalPrevisionActual[i];
				break;

			}
		}

		this.cambiarIdPorString();
	}

	/**
	** Este metodo cambia los ID por String
	**/

	cambiarIdPorString ()
	{
		for(let x = 0 ; x < this.totalPrevisionActual.length ; x ++)
		{
			for( let j = 0 ; j < this.totalPrevision.length ; j ++)
			{
				if( parseInt(this.totalPrevisionActual[x].Prevision_id) === this.totalPrevision[j].id)
				{
					this.totalPrevisionActual[x].Prevision_id = this.totalPrevision[j].nombre;
				}
			}

		}

	for( let j = 0 ; j < this.totalPrevision.length ; j ++)
	{
		if(parseInt(this.totalPrevision[j].isapre) === 1)
		{
		this.totalPrevision[j].isapre = "Isapre";
		}
		else
		{
		this.totalPrevision[j].isapre = "No Isapre";
		}
	}


	}

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}

}
