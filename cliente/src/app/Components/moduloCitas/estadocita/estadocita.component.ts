import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { EstadoCita } from '../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../Services/estadocita/estado-cita.service';

import { Cita } from '../../../Models/Cita.model';
import { CitaService } from '../../../Services/cita/cita.service';

import { AgregarestadocitaComponent } from './agregarestadocita/agregarestadocita.component';
import { EditarestadocitaComponent } from './editarestadocita/editarestadocita.component';

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
  selector: 'app-estadocita',
  templateUrl: './estadocita.component.html',
  styleUrls: ['./estadocita.component.css']
})
export class EstadocitaComponent {
	public totalEstadocitas: EstadoCita[];
	public buscarPorNombre: boolean;
	public usuarioActual;

	// Temporal para validación
	public totalCitas: Cita[];


	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];


	constructor (public servicioEstadoCita: EstadoCitaService, public servicioCita: CitaService, public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
		this.totalEstadocitas = [];
		this.actualizarEstadoCitas();
		this.actualizarCitas();
	}

	actualizarEstadoCitas ()
	{
		this.servicioEstadoCita.getEstadoCitas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadocitas = todo;

			this.bdEstructura = new ExampleDatabase(this.totalEstadocitas );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'EstadoCita');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
	}

	actualizarCitas()
	{
		//buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
		this.servicioCita.getCitas().subscribe((data)=>{
			var todo:any= data;
			todo = todo.data;
			this.totalCitas=todo;
		});
	}

	//Función temporal que retornará true en caso de que el estado cita esté en uso
	verificarUsoEstadoCita(estadocita):boolean{
		
		console.log(this.totalCitas.length);
		for(let i=0;i<this.totalCitas.length;i++){
			console.log(this.totalCitas[i].EstadoCita_id+'-'+estadocita.id);
				if(parseInt(this.totalCitas[i].EstadoCita_id)===parseInt(estadocita.id)){
					return true;
				}
			}
		return false;
	}


	eliminarEstadoCita (estadocita)
	{	
		console.log('click');
		if(this.verificarUsoEstadoCita(estadocita)==true){

			this.mostrarMensaje("Esta estado cita está siendo usada por un médico.");

		}else{
			this.servicioEstadoCita.deleteEstadoCita(estadocita.id).subscribe( data => {
				console.log(data);
				this.actualizarEstadoCitas();
			});
		}
		
	}



	//DATATABLES

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}


	edicionEstadoCita (estadocita)
	{

		let dialogRef = this.dialog.open(EditarestadocitaComponent, {
			width: '700px',
			data:
			{
			 estadocita: estadocita
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCitas();
		});
	}

	agregacionEstadoCita()
	{
		let dialogRef = this.dialog.open(AgregarestadocitaComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEstadoCitas();
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

			this.actualizarEstadoCitas();
		});

	}


}


