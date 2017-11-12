import {Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { BoxConsulta } from '../../../Models/BoxConsulta.model';
import { BoxConsultaService } from '../../../Services/boxconsulta/box-consulta.service';

import { TipoBox } from '../../../Models/TipoBox.model';
import { TipoBoxService } from '../../../Services/tipobox/tipo-box.service';

import { AgregarboxconsultaComponent } from './agregarboxconsulta/agregarboxconsulta.component';
import { EditarboxconsultaComponent } from './editarboxconsulta/editarboxconsulta.component';

import { MensajeErrorComponent } from '../../Globals/mensaje-error/mensaje-error.component';

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
  selector: 'app-boxconsulta',
  templateUrl: './boxconsulta.component.html',
  styleUrls: ['./boxconsulta.component.css']
})
export class BoxconsultaComponent implements OnInit {
	public totalBoxConsultas: BoxConsulta[];
	public totalTipoBoxes: TipoBox[];
	public buscarPorNombre: boolean;
	public usuarioActual;

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	displayedColumns = ['Acciones', 'Ubicacion', 'TipoBox'];


  constructor(public servicioBoxConsulta: BoxConsultaService, public servicioTipoBox: TipoBoxService, public dialog: MatDialog) 
  {

  	this.usuarioActual=new UsuarioActual();
	this.buscarPorNombre = false;
	this.totalBoxConsultas = [];
	this.totalTipoBoxes=[];
	this.actualizarTipoBoxes();
	this.actualizarBoxConsultas();
	


   }

  ngOnInit() {
  }

actualizarTipoBoxes ()
	{
		this.servicioTipoBox.getTipoBoxes().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalTipoBoxes = todo;
		});
	}

 actualizarBoxConsultas(){

 	this.servicioBoxConsulta.getBoxConsultas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalBoxConsultas = todo;
			this.reemplazarIdPorString();

			this.bdEstructura = new ExampleDatabase(this.totalBoxConsultas );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'BoxConsulta');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
 }

 eliminarBoxConsulta (boxconsulta)
	{
		//si está siendo usado...
		//this.mostrarMensaje("Este box se encuentra siendo usado en una cita.");
		
		this.servicioBoxConsulta.deleteBoxConsulta(boxconsulta.id).subscribe( data => {
			console.log(data);
			this.actualizarBoxConsultas();
		});
		
		
	}


//DATATABLES

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}


	edicionBoxConsulta (boxconsulta)
	{

		var a = JSON.parse( JSON.stringify(boxconsulta) );

		this.pasarStringId(a);

		let dialogRef = this.dialog.open(EditarboxconsultaComponent, {
			width: '1000px',
			data:
			{
			 boxconsulta: a,
			 tipoboxes: this.totalTipoBoxes,
			 servicioTipoBox: this.servicioTipoBox
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarBoxConsultas();
		});
	}

	agregacionBoxConsulta()
	{
		let dialogRef = this.dialog.open(AgregarboxconsultaComponent, {
			width: '1000px',
			data:{
				totalTipoBoxes:this.totalTipoBoxes,
				servicioTipoBox:this.servicioTipoBox,
				servicioBoxConsulta:this.servicioBoxConsulta
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarBoxConsultas();
		});
	}

	//función para mostrar un mensaje de error
	mostrarMensaje(mensaje){
		let dialogRef = this.dialog.open(MensajeErrorComponent, {
			width: '400px',
			data:{
				mensajeError:mensaje
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarBoxConsultas();
		});
	}

reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalBoxConsultas.length ; i ++)
		{

			for(let j = 0 ; j < this.totalTipoBoxes.length ; j++)
			{
				if( parseInt(this.totalBoxConsultas[i].TipoBox_id) === this.totalTipoBoxes[j].id)
				{
					this.totalBoxConsultas[i].TipoBox_id = this.totalTipoBoxes[j].nombre;
					break;
				}
			}

		}
	}


	pasarStringId(boxconsulta)
	{
		for ( let i = 0 ; i < this.totalTipoBoxes.length ; i ++)
		{
		if(boxconsulta.TipoBox_id === this.totalTipoBoxes[i].nombre)
		{
			boxconsulta.TipoBox_id = this.totalTipoBoxes[i].id;
		}
		}

	}




}
