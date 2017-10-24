import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';

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

import { TipoSangre } from '../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../Services/tiposangre/tiposangre.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { VerfichapacienteComponent } from './verfichapaciente/verfichapaciente.component';


@Component({
  selector: 'app-medicpacientes',
  templateUrl: './medicpacientes.component.html',
  styleUrls: ['./medicpacientes.component.css']
})
export class MedicpacientesComponent implements OnInit {

  public totalPersonas: Persona[];
	public totalPacientes: Paciente[];
	public totalTS: TipoSangre[];

	//DATATABLE
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('filter') filter: ElementRef;
	public sourceDatatable: dataTable | null;
	public sourcePorNombre: buscadorPorNombre | null;
	public bdEstructura;
	public buscarPorNombre: boolean;
	displayedColumns = ['Acciones', 'Rut', 'Tipo Sangre'];

	constructor(
		public servicioPersona: PersonaService,
		public servicioTS: TipoSangreService,
		public servicioPaciente: PacienteService,
		public dialog: MatDialog
		)
	{
		this.buscarPorNombre = false;
		this.totalTS = [];
		this.totalPacientes = [];
		this.totalPersonas = [];
		this.actualizarPersonas();
		this.actualizarTSs();

	}

	ngOnInit() {
	}



	desplegarFichaPaciente(paciente)
	{
	this.servicioPersona.getPersona(parseInt(paciente.Persona_id)).subscribe(data => {

		var persona: any = data;
		persona = persona.data;

		console.log(persona);

		let dialogRef = this.dialog.open(VerfichapacienteComponent, {
		width: '1000px',
		height:'500px',
		data: { persona: persona }
		});

		dialogRef.afterClosed().subscribe(result => {

		this.actualizarPacientes();
		});

	});


	}

	actualizarPersonas()
	{
		this.totalPersonas = [];
		this.servicioPersona.getPersonas().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
      this.actualizarPacientes();

		});

	}



	actualizarTSs ()
	{
		this.totalTS = [];
		this.servicioTS.getTipoSangres().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalTS = todo;
		});
	}


	actualizarPacientes()
	{
		this.totalPacientes = [];
		this.servicioPaciente.getPacientes().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPacientes = todo;

      //Asignar rut busca el rut de cad apacietne buscando en su persona
      this.asignarRut();

      //Lo mismo que arriba solo que con activado
      this.reconocerActivado();

			this.reemplazarIdPorString();

		//DATATABLE
			this.bdEstructura = new ExampleDatabase(this.totalPacientes );
			this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
			this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, "Paciente");
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
     for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
      for( let j = 0 ; j < this.totalPersonas.length ; j ++)
      {
        if( parseInt(this.totalPacientes[i].Persona_id) === this.totalPersonas[j].id )
        {

          this.totalPersonas[j].estado === 0 ? this.totalPacientes[i].activado = 0 : this.totalPacientes[i].activado = 1;
          console.log(this.totalPacientes)
          break;
        }
      }
    }
  }


  asignarRut()
  {
    for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
      for( let j = 0 ; j < this.totalPersonas.length ; j ++)
      {
        if( parseInt(this.totalPacientes[i].Persona_id) === this.totalPersonas[j].id)
        {
          console.log(this.totalPersonas[j].rut)
          this.totalPacientes[i].rut = this.totalPersonas[j].rut;
          console.log(this.totalPacientes[i]);
          break;
        }
      }
    }
  }


	cambiarBusqueda()
	{
	this.buscarPorNombre = !this.buscarPorNombre;
	}



	eliminarPaciente (paciente)
	{
		this.servicioPaciente.deletePaciente(paciente.id).subscribe( data => {
			this.actualizarPacientes();
		});
	}



	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalPacientes.length ; i ++)
		{

			for(let j = 0 ; j < this.totalTS.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].TipoSangre_id) === this.totalTS[j].id)
				{
					this.totalPacientes[i].TipoSangre_id = this.totalTS[j].nombre;
					break;
				}
			}

		}
	}


	pasarStringId(paciente)
	{
		for ( let i = 0 ; i < this.totalTS.length ; i ++)
		{
			if(paciente.TipoSangre_id === this.totalTS[i].nombre)
			{
				paciente.TipoSangre_id = this.totalTS[i].id;
			}
		}
	}

}
