import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { TipoBox } from '../../../Models/TipoBox.model';
import { TipoBoxService } from '../../../Services/tipobox/tipo-box.service';

import { BoxConsulta } from '../../../Models/BoxConsulta.model';
import { BoxConsultaService } from '../../../Services/boxconsulta/box-consulta.service';


import { AgregartipoboxComponent } from './agregartipobox/agregartipobox.component';
import { EditartipoboxComponent } from './editartipobox/editartipobox.component';

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
  selector: 'app-tipobox',
  templateUrl: './tipobox.component.html',
  styleUrls: ['./tipobox.component.css']
})
export class TipoboxComponent {
	public totalTipoboxes: TipoBox[];
	public buscarPorNombre: boolean;
	public usuarioActual;
	//temporal
	public totalBoxConsultas: BoxConsulta[];
	
	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];


	constructor (public servicioTipoBox: TipoBoxService, 
		public servicioBoxConsulta:BoxConsultaService, public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
		this.totalTipoboxes = [];
		this.totalBoxConsultas=[];
		this.actualizarTipoBoxs();
		this.actualizarBoxConsulta();
	}

	actualizarTipoBoxs()
	{
		this.servicioTipoBox.getTipoBoxes().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalTipoboxes = todo;

			this.bdEstructura = new ExampleDatabase(this.totalTipoboxes );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'TipoBox');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
	}

	actualizarBoxConsulta()
	{
		//buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
		this.servicioBoxConsulta.getBoxConsultas().subscribe((data)=>{
			var todo:any= data;
			todo = todo.data;
			this.totalBoxConsultas=todo;
		});
	}

	//función temporal que retornará true en caso de que el tipo box esté en uso
	verificarUsoTipoBox(tipobox):boolean{
		
		console.log(this.totalBoxConsultas.length);
		for(let i=0;i<this.totalBoxConsultas.length;i++){
			console.log(this.totalBoxConsultas[i].TipoBox_id+'-'+tipobox.id);
				if(parseInt(this.totalBoxConsultas[i].TipoBox_id)===parseInt(tipobox.id)){
					return true;
				}
			}
		return false;
	}


	eliminarTipoBox (tipobox)
	{	
		console.log('click');
		if(this.verificarUsoTipoBox(tipobox)==true){

			this.mostrarMensaje("Este tipo de box está siendo usado por un box de consulta.");

		}else{
			this.servicioTipoBox.deleteTipoBox(tipobox.id).subscribe( data => {
				console.log(data);
				this.actualizarTipoBoxs();
			});
		}
		
	}



	//DATATABLES

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}


	edicionTipoBox (tipobox)
	{

		let dialogRef = this.dialog.open(EditartipoboxComponent, {
			width: '1000px',
			data:
			{
			 tipobox: tipobox
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarTipoBoxs();
		});
	}

	agregacionTipoBox()
	{
		let dialogRef = this.dialog.open(AgregartipoboxComponent, {
			width: '1000px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarTipoBoxs();
		});
	}

	mostrarMensaje(mensaje){
		let dialogRef = this.dialog.open(MensajeErrorComponent, {
			width: '400px',
			data:{
				mensajeError:mensaje
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarTipoBoxs();
		});

	}



}


