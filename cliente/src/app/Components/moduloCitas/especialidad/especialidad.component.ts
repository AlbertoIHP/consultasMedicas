import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { Especialidad } from '../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../Services/especialidad/especialidad.service';

import { Medico } from '../../../Models/Medico.model';
import { MedicoService } from '../../../Services/medico/medico.service';

import { AgregarespecialidadComponent } from './agregarespecialidad/agregarespecialidad.component';
import { EditarespecialidadComponent } from './editarespecialidad/editarespecialidad.component';

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
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent {
	public totalEspecialidades: Especialidad[];
	public buscarPorNombre: boolean;
	public usuarioActual;

	// Temporal para validación
	public totalMedicos: Medico[];

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	displayedColumns = ['Acciones', 'Nombre'];


	constructor (public servicioEspecialidad: EspecialidadService, public servicioMedico: MedicoService, public dialog: MatDialog)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
		this.totalEspecialidades = [];
		this.actualizarEspecialidades();
		this.actualizarMedicos();
	}

	actualizarEspecialidades ()
	{
		this.servicioEspecialidad.getEspecialidads().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEspecialidades = todo;

			this.bdEstructura = new ExampleDatabase(this.totalEspecialidades );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'Especialidad');
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
					.debounceTime(150)
					.distinctUntilChanged()
					.subscribe(() => {
						if (!this.sourcePorNombre) { return; }
						this.sourcePorNombre.filter = this.filter.nativeElement.value;
					});


		});
	}

	actualizarMedicos()
	{
		//buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
		this.servicioMedico.getMedicos().subscribe((data)=>{
			var todo:any= data;
			todo = todo.data;
			this.totalMedicos=todo;
		});
	}

	//Función temporal que retornará true en caso de que la especialidad esté en uso
	verificarUsoEspecialidad(especialidad):boolean{
		
		console.log(this.totalMedicos.length);
		for(let i=0;i<this.totalMedicos.length;i++){
			console.log(this.totalMedicos[i].Especialidad_id+'-'+especialidad.id);
				if(parseInt(this.totalMedicos[i].Especialidad_id)===parseInt(especialidad.id)){
					return true;
				}
			}
		return false;
	}


	eliminarEspecialidad (especialidad)
	{	
		console.log('click');
		if(this.verificarUsoEspecialidad(especialidad)==true){

			this.mostrarMensaje("Esta especialidad está siendo usada por un médico.");

		}else{
			this.servicioEspecialidad.deleteEspecialidad(especialidad.id).subscribe( data => {
				console.log(data);
				this.actualizarEspecialidades();
			});
		}
		
	}


	//DATATABLES

	cambiarBusqueda()
	{
		this.buscarPorNombre = !this.buscarPorNombre;
	}


	edicionEspecialidad (especialidad)
	{

		let dialogRef = this.dialog.open(EditarespecialidadComponent, {
			width: '1000px',
			data:
			{
			 especialidad: especialidad
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEspecialidades();
		});
	}

	agregacionEspecialidad()
	{
		let dialogRef = this.dialog.open(AgregarespecialidadComponent, {
			width: '1000px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarEspecialidades();
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

			this.actualizarEspecialidades();
		});

	}


}


