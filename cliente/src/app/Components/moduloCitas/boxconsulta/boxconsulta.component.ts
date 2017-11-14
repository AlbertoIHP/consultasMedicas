import {Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { BoxConsulta } from '../../../Models/BoxConsulta.model';
import { BoxConsultaService } from '../../../Services/boxconsulta/box-consulta.service';

import { TipoBox } from '../../../Models/TipoBox.model';
import { TipoBoxService } from '../../../Services/tipobox/tipo-box.service';

import { Cita } from '../../../Models/Cita.model';
import { CitaService } from '../../../Services/cita/cita.service';

import { AgregarboxconsultaComponent } from './agregarboxconsulta/agregarboxconsulta.component';
import { EditarboxconsultaComponent } from './editarboxconsulta/editarboxconsulta.component';

import { MensajeErrorComponent } from '../../Globals/mensaje-error/mensaje-error.component';
import {UsuarioActual} from '../../Globals/usuarioactual.component';

//DATATABLE
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExampleDatabase, ExampleDataSource } from '../../Globals/datasource.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-boxconsulta',
  templateUrl: './boxconsulta.component.html',
  styleUrls: ['./boxconsulta.component.css']
})
export class BoxconsultaComponent {
	public totalBoxConsultas: BoxConsulta[];
	public totalTipoBoxes: TipoBox[];
	public buscarPorNombre: boolean;
	public usuarioActual;

	// Temporal para validación
	public totalCitas: Cita[];
	displayedColumns = ['Acciones', 'Ubicacion', 'TipoBox'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'BoxConsulta');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

  }


  isAllSelected(): boolean
  {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.exampleDatabase.data.length;
    }
  }

  masterToggle()
  {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filter.nativeElement.value) {
      this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
    } else {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
    }
  }




  constructor(public servicioBoxConsulta: BoxConsultaService, public servicioTipoBox: TipoBoxService, public servicioCita: CitaService, public dialog: MatDialog)
  {

  	this.usuarioActual=new UsuarioActual();
	this.totalBoxConsultas = [];
	this.totalTipoBoxes=[];
	this.actualizarTipoBoxes();
	this.actualizarBoxConsultas();
	this.actualizarCitas();

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

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalBoxConsultas);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'BoxConsulta');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


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

	//Función temporal que retornará true en caso de que la box consulta esté en uso
	verificarUsoBoxConsulta(boxconsulta):boolean{

		console.log(this.totalCitas.length);
		for(let i=0;i<this.totalCitas.length;i++){
			console.log(this.totalCitas[i].BoxConsulta_id+'-'+boxconsulta.id);
				if(parseInt(this.totalCitas[i].BoxConsulta_id)===parseInt(boxconsulta.id)){
					return true;
				}
			}
		return false;
	}


	eliminarBoxConsulta (boxconsulta)
	{
		console.log('click');
		if(this.verificarUsoBoxConsulta(boxconsulta)==true){

			this.mostrarMensaje("Esta box consulta está siendo usada por un médico.");

		}else{
			this.servicioBoxConsulta.deleteBoxConsulta(boxconsulta.id).subscribe( data => {
				console.log(data);
				this.actualizarBoxConsultas();
			});
		}

	}






	edicionBoxConsulta (boxconsulta)
	{

		var a = JSON.parse( JSON.stringify(boxconsulta) );

		this.pasarStringId(a);

		let dialogRef = this.dialog.open(EditarboxconsultaComponent, {
			width: '700px',
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
			width: '700px',
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
