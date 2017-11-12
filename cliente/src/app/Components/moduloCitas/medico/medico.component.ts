import { Component, ElementRef, ViewChild, Inject, OnInit, Input } from '@angular/core';

//DATATABLES
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

import { EventosService } from '../../../Services/eventos/eventos.service';

import {UsuarioActual} from '../../Globals/usuarioactual.component';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
	public totalPersonas: Persona[];
	public totalMedicos: Medico[];
	public totalEspecialidad: Especialidad[];
	public usuarioActual;

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	public buscarPorNombre: boolean;
	displayedColumns = ['Acciones', 'Rut', 'Persona', 'Especialidad'];

	constructor(
		public servicioPersona: PersonaService,
		public servicioEspecialidad: EspecialidadService,
		public servicioMedico: MedicoService,
		public dialog: MatDialog,
    	public servicioEventos: EventosService
	)
	{
		this.usuarioActual=new UsuarioActual();
		this.buscarPorNombre = false;
		this.totalEspecialidad = [];
		this.totalMedicos = [];
		this.totalPersonas = [];
		this.actualizarPersonas();
		this.actualizarEspecialidads();
    	this.servicioEventos.seActivo.subscribe(() => {
      	this.actualizarPersonas();
    });

	}

	ngOnInit() {
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
			this.bdEstructura = new ExampleDatabase(this.totalMedicos );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, "Medico");
			Observable.fromEvent(this.filter.nativeElement, 'keyup')
				.debounceTime(150)
				.distinctUntilChanged()
				.subscribe(() => {
				if (!this.sourcePorNombre) { return; }
				this.sourcePorNombre.filter = this.filter.nativeElement.value;
				});





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


	cambiarBusqueda()
	{
	this.buscarPorNombre = !this.buscarPorNombre;
	}



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
		width: '1000px',
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
			width: '1000px',
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
		width: '1000px',
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

}
