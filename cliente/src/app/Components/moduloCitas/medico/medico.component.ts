import { Component, ElementRef, ViewChild, Inject, OnInit, Input } from '@angular/core';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Especialidad } from '../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../Services/especialidad/especialidad.service';

import { Medico } from '../../../Models/Medico.model';
import { MedicoService } from '../../../Services/medico/medico.service';

import { Role } from '../../../Models/Role.model';

import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';

import { AgregarmedicoComponent } from './agregarmedico/agregarmedico.component';
import { EditarmedicoComponent } from './editarmedico/editarmedico.component';

import { MensajeErrorComponent } from '../../Globals/mensaje-error/mensaje-error.component';

import { EventosService } from '../../../Services/eventos/eventos.service';

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
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent  {
	public totalPersonas: Persona[];
	public totalMedicos: Medico[];
	public totalEspecialidad: Especialidad[];
	public usuarioActual;

	/*Temporal para validación
	public totalCitas: Cita[];*/
	displayedColumns = ['Acciones', 'Rut', 'Persona', 'Especialidad'];


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Medico');
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





	constructor(
		public servicioPersona: PersonaService,
		public servicioEspecialidad: EspecialidadService,
		public servicioMedico: MedicoService,
		//public servicioCita: CitaService,
		public dialog: MatDialog,
    	public servicioEventos: EventosService
	)
	{
		this.usuarioActual=new UsuarioActual();
		this.totalEspecialidad = [];
		this.totalMedicos = [];
		this.totalPersonas = [];
		this.actualizarPersonas();
		this.actualizarEspecialidads();
		//this.actualizarCitas();
    	this.servicioEventos.seActivo.subscribe(() => {
      		this.actualizarPersonas();
    	});

	}


	actualizarPersonas()
	{
		this.totalPersonas = [];
		this.servicioPersona.getPersonas().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
	      	this.actualizarMedicos();
		});
	}

	actualizarEspecialidads ()
	{
		this.totalEspecialidad = [];
		this.servicioEspecialidad.getEspecialidads().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEspecialidad = todo;
		});
	}


	actualizarMedicos()
	{
		this.totalMedicos = [];
		this.servicioMedico.getMedicos().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalMedicos = todo;

	      //Asignar rut busca el rut de cad apacietne buscando en su persona
	      this.asignarRut();

	      //Lo mismo que arriba solo que con activado
	      this.reconocerActivado();

			this.reemplazarIdPorString();

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalMedicos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Medico');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })





		});
	}


  reconocerActivado ()
  {
     for ( let i = 0 ; i < this.totalMedicos.length ; i ++)
    {
      for( let j = 0 ; j < this.totalPersonas.length ; j ++)
      {
        if( parseInt(this.totalMedicos[i].Persona_id) === this.totalPersonas[j].id )
        {

          this.totalPersonas[j].estado === 0 ? this.totalMedicos[i].activado = 0 : this.totalMedicos[i].activado = 1;
          console.log(this.totalMedicos)
          break;
        }
      }
    }
  }


  asignarRut()
  {
    for ( let i = 0 ; i < this.totalMedicos.length ; i ++)
    {
      for( let j = 0 ; j < this.totalPersonas.length ; j ++)
      {
        if( parseInt(this.totalMedicos[i].Persona_id) === this.totalPersonas[j].id)
        {
          console.log(this.totalPersonas[j].rut)
          this.totalMedicos[i].rut = this.totalPersonas[j].rut;
          console.log(this.totalMedicos[i]);
          break;
        }
      }
    }
  }


	/*
	actualizarCitas()
	{
		//buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
		this.servicioCita.getCitas().subscribe((data)=>{
			var todo:any= data;
			todo = todo.data;
			this.totalCitas=todo;
		});
	}

	//Función temporal que retornará true en caso de que el médico esté en uso
	verificarUsoMedico(medico):boolean{

		console.log(this.totalCitas.length);
		for(let i=0;i<this.totalCitas.length;i++){
			console.log(this.totalCitas[i].Medico_id+'-'+medico.id);
				if(parseInt(this.totalCitas[i].Medico_id)===parseInt(medico.id)){
					return true;
				}
			}
		return false;
	}


	eliminarMedico (medico)
	{
		console.log('click');
		if(this.verificarUsoMedico(medico)==true){

			this.mostrarMensaje("Esta estado cita está siendo usada por un médico.");

		}else{
			this.servicioMedico.deleteMedico(medico.id).subscribe( data => {
				console.log(data);
				this.actualizarMedicos();
			});
		}

	} */

	eliminarMedico (medico)
	{
		this.servicioMedico.deleteMedico(medico.id).subscribe( data => {
			this.actualizarPersonas();
		});
	}




	edicionMedico (medico)
	{
	var a = JSON.parse(JSON.stringify(medico));

	this.pasarStringId(a);

	console.log(a);
	let dialogRef = this.dialog.open(EditarmedicoComponent, {
		width: '700px',
		data:
		{
     medicos: this.totalMedicos,
		 medico: a,
		 personas: this.totalPersonas,
		 especialidades:this.totalEspecialidad,
		 servicioMedico: this.servicioMedico,
		 servicioPersona: this.servicioPersona,
		 servicioEspecialidad: this.servicioEspecialidad

		}
	});

	dialogRef.afterClosed().subscribe(result => {

		this.actualizarPersonas();
	});
	}

	agregacionMedico()
	{

		let dialogRef = this.dialog.open(AgregarmedicoComponent, {
			width: '700px',
		data: {
			 medico: new Medico(),
			 personas: this.totalPersonas,
			 especialidades:this.totalEspecialidad,
			 servicioMedico: this.servicioMedico,
			 servicioPersona: this.servicioPersona,
			 servicioEspecialidad: this.servicioEspecialidad
			 }
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarPersonas();
		});
	}

	desplegarPersona(medico)
	{
	this.servicioPersona.getPersona(parseInt(medico.Persona_id)).subscribe(data => {

		var persona: any = data;
		persona = persona.data;

		console.log(persona);

		let dialogRef = this.dialog.open(VerpersonaComponent, {
		width: '700px',
		data: { persona: persona }
		});

		dialogRef.afterClosed().subscribe(result => {

		//this.actualizarPersonas();
		});

	});


	}



	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalMedicos.length ; i ++)
		{

			for(let j = 0 ; j < this.totalEspecialidad.length ; j++)
			{
				if( parseInt(this.totalMedicos[i].Especialidad_id) === this.totalEspecialidad[j].id)
				{
					this.totalMedicos[i].Especialidad_id = this.totalEspecialidad[j].nombre;
					break;
				}
			}

		}
	}


	pasarStringId(medico)
	{
		for ( let i = 0 ; i < this.totalEspecialidad.length ; i ++)
		{
			if(medico.Especialidad_id === this.totalEspecialidad[i].nombre)
			{
				medico.Especialidad_id = this.totalEspecialidad[i].id;
			}
		}
	}

  desactivarMedico(medico)
  {
    this.servicioPersona.getPersona(medico.Persona_id).subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      todo.estado = 0;
      this.servicioPersona.editPersona(todo, todo.id).subscribe(data => {
        console.log(data);
        this.actualizarPersonas();

        //El servicio con este metodo emite un evento que cualqueir componetne que este suscrito a dicho evento reaccionara
        console.log("Yo hice un cambio (SoyMedico)")
       this.servicioEventos.hiceUnCambio();

      })
    });

  }

 activarMedico(medico)
 {
    this.servicioPersona.getPersona(medico.Persona_id).subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      todo.estado = 1;
      this.servicioPersona.editPersona(todo, todo.id).subscribe(data => {
        console.log(data);
        this.actualizarPersonas();
        this.servicioEventos.hiceUnCambio();
      })
    });
 }

 /*mostrarMensaje(mensaje){
		let dialogRef = this.dialog.open(MensajeErrorComponent, {
			width: '400px',
			data:{
				mensajeError:mensaje
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarMedicos();
		});

 } */

}
