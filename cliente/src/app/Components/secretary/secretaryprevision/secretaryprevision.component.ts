import { Component, Inject , ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Prevision }  from '../../../Models/Prevision.model';
import { PrevisionService } from '../../../Services/prevision/prevision.service';

import { PrevisionActual }  from '../../../Models/PrevisionActual.model';
import { PrevisionactualService } from '../../../Services/previsionactual/previsionactual.service';


import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';

export interface Element extends PrevisionActual{
}

@Component({
	selector: 'app-secretaryprevision',
	templateUrl: './secretaryprevision.component.html',
	styleUrls: ['./secretaryprevision.component.css']
})
export class SecretaryprevisionComponent {

	public totalPrevision: Prevision[];
	public totalPrevisionActual: PrevisionActual[];
	public pacienteActual: Persona;
	public previsionActual: PrevisionActual;
	public nuevaPrevisionActual: PrevisionActual;
	public previsionSeleccionada: any;
	public descripcionSeleccionada: any;


  //table
  displayedColumns = ['Fecha Actualizacion', 'Prevision', 'Estado'];
  previsionesTabla;

	constructor(
		public servicioPrevision: PrevisionService,
		public servicioPrevisionActual: PrevisionactualService,
		public servicioPersona: PersonaService,

  	public dialogRef: MatDialogRef<SecretaryprevisionComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any


		)
	{


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

	  this.previsionesTabla = new ExampleDataSource(this.totalPrevisionActual);
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
	  if(this.totalPrevision[j].isapre === "1")
	  {
		this.totalPrevision[j].isapre = "Isapre";
	  }
	  else
	  {
		this.totalPrevision[j].isapre = "No Isapre";
	  }
	}


	}

}

  /**
  ** Esta clase permite observar cambios en un arreglo de objetos para desplegarlos en una tabla
  **
  **/

export class ExampleDataSource extends DataSource<any> {
  public data;

  constructor (data)
  {
  	super();
  	this.data = data;

  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]>
  {
	return Observable.of(this.data);
  }

  disconnect() {}
}
