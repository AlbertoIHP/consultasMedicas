// Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

// Modelos y servicios
import { Especialidad } from '../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../Services/especialidad/especialidad.service';

import { Medico } from '../../../Models/Medico.model';
import { MedicoService } from '../../../Services/medico/medico.service';

// Componentes hijos
import { AgregarespecialidadComponent } from './agregarespecialidad/agregarespecialidad.component';
import { EditarespecialidadComponent } from './editarespecialidad/editarespecialidad.component';

import { MensajeErrorComponent } from '../../Globals/mensaje-error/mensaje-error.component';

// Componente para verificación de roles
import {UsuarioActual} from '../../Globals/usuarioactual.component';

import { EventosService } from '../../../Services/eventos/eventos.service';



//DATATABLE
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExampleDatabase, ExampleDataSource } from '../../Globals/datasource.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent {
	//Se declaran los atributos a usar
	public totalEspecialidades: Especialidad[];
	public buscarPorNombre: boolean;
	public usuarioActual;
	public actualizar;

	// Temporal para validación
	public totalMedicos: Medico[];
	displayedColumns = ['Acciones', 'Nombre'];


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
  	// Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Especialidad');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

    // Se obtiene el evento emitido desde agregar
    this.servicioEvento.actualizar.subscribe((data: any) => { this.actualizar = data; });
 

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

	constructor (
		//Se declaran los servicios y componentes a utilizar	
		public servicioEspecialidad: EspecialidadService, 
		public servicioMedico: MedicoService, 
		public dialog: MatDialog,
		public servicioEvento: EventosService
	
	){
		// Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
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

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalEspecialidades);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Especialidad');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


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

	//Se obtiene la especialidad desde la fila para obtener su id
	eliminarEspecialidad (especialidad)
	{
		if(this.verificarUsoEspecialidad(especialidad)==true){

			this.mostrarMensaje("Esta especialidad está siendo usada por un médico.");

		}else{
			//Usando el id, de la especialidad se elimina esta
			this.servicioEspecialidad.deleteEspecialidad(especialidad.id).subscribe( data => {
			    //Se actualizan las especialidades a mostrar
				this.actualizarEspecialidades();
			});
		}

	}


	// Se obtiene la especialidad a modificar desde el frontend
	edicionEspecialidad (especialidad)
	{
		//Se abre un dialogo para editar la especialidad, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarespecialidadComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 especialidad: especialidad
			}
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
			
        	// Si recibe un 'false' se actualiza, si no, significa que se dio en editar
          	if (!this.actualizar) { this.actualizarEspecialidades();}
          	
		});
	}

	agregacionEspecialidad()
	{
		// Se abre un nuevo dialogo para agregar una especialidad, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarespecialidadComponent, {
			//Los parámetros se asignan y se envían los datos necesarios
			width: '700px'
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
		dialogRef.afterClosed().subscribe(result => {
        	// Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        	if (this.actualizar) { this.actualizarEspecialidades();}
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

			
		});

	}


}


