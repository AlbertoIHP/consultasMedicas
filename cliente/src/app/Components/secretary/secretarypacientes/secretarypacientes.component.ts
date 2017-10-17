import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { Router } from '@angular/router';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Genero } from '../../../Models/Genero.model';
import { GeneroService } from '../../../Services/genero/genero.service';

import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

export interface IContext {
		data:string;
}


@Component({
	selector: 'app-secretarypacientes',
	templateUrl: './secretarypacientes.component.html',
	styleUrls: ['./secretarypacientes.component.css']
})
export class SecretarypacientesComponent implements OnInit {
	@ViewChild('modalTemplate')
	public modalTemplate:ModalTemplate<IContext, string, string>;
	public nuevoPaciente: Persona;
	public totalPacientes: Persona[];
	public totalRegiones: Region[];
	public totalProvincias: Provincia[];
	public totalComunas: Comuna[];
	public totalGeneros: Genero[];
	public totalEstadoCiviles: EstadoCivil[];
	public provinciaActual: string;
	public regionActual: string;
	public mostrarRegiones: boolean;
	public mostrarProvincias: boolean;
	public mostrarComunas: boolean;
  public pacienteEditar: Persona;

	actualizarRegiones()
	{
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;
		});
	}

	actualizarPersonas()
	{
		this.servicioPersona.getPersonas().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPacientes = todo;
			this.reemplazarIdPorString();
		});
	}

	actualizarProvincias()
	{
		this.servicioProvincia.getProvincias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalProvincias = todo;
		});

	}

	actualizarComunas()
	{
		this.servicioComuna.getComunas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalComunas = todo;
		});
	}

	actualizarGeneros()
	{
		this.servicioGenero.getGeneros().subscribe(data =>{
			var todo: any = data;
			todo = todo.data;
			this.totalGeneros = todo;
		});
	}

	actualizarEstadoCiviles()
	{
		this.servicioEstadoCivil.getEstadoCivils().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadoCiviles = todo;
		});
	}

	constructor(
		public modalService:SuiModalService,
		public servicioPersona: PersonaService,
		public servicioRegion: RegionService,
		public servicioProvincia: ProvinciaService,
		public servicioComuna: ComunaService,
		public servicioGenero: GeneroService,
		public servicioEstadoCivil: EstadocivilService,
	public router: Router)
	{
		this.mostrarRegiones = true;
		this.mostrarProvincias = false;
		this.mostrarComunas = false;
		this.provinciaActual = "";
		this.totalPacientes = [];
		this.nuevoPaciente = new Persona();
	  this.pacienteEditar = new Persona();

		this.actualizarRegiones();

		this.actualizarProvincias();

		this.actualizarComunas();

		this.actualizarGeneros();

		this.actualizarEstadoCiviles();

		this.actualizarPersonas();
	}

  previsionPaciente(paciente: Persona)
  {

	localStorage.setItem('currentPacient', JSON.stringify(paciente));
	this.router.navigate(['secretary/pacientes/prevision']);
  }

	regionSeleccionada(region)
	{
		var provinciasRegion: any = [];
		for(let i = 0 ; i < this.totalProvincias.length ; i++)
		{
			if(this.totalProvincias[i].Region_id === region.id)
			{
				provinciasRegion.push(this.totalProvincias[i]);
			}
		}

		this.totalProvincias = provinciasRegion;
		this.mostrarRegiones = false;
		this.mostrarProvincias = true;
	}

	provinciaSeleccionada(provincia){
		var comunasProvincia: any = [];

		for(let i = 0; i < this.totalComunas.length; i++)
		{
			if(this.totalComunas[i].Provincia_id === provincia.id)
			{
				comunasProvincia.push(this.totalComunas[i]);
			}
		}

		this.totalComunas = comunasProvincia;
		this.mostrarProvincias = false;
		this.mostrarComunas = true;
	}

	comunaSeleccionada(comuna)
	{
		this.nuevoPaciente.Comuna_id = comuna.id;
	  this.pacienteEditar.Comuna_id = comuna.id;
	}

  actualizarPaciente()
  {

	this.pasarStringId(this.pacienteEditar);

	  this.servicioPersona.editPersona(this.pacienteEditar, this.pacienteEditar.id).subscribe( data => {

	  console.log(data);

	  this.actualizarRegiones();

	  this.actualizarProvincias();

	  this.actualizarComunas();

	  this.actualizarGeneros();

	  this.actualizarEstadoCiviles();

	  this.actualizarPersonas();
	  });







  }

	public open(tipo, persona) {
	const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
	if(persona != null)
	{
		 this.pacienteEditar = persona;
	}


	config.context = { data: tipo};

	this.modalService
		.open(config)
		.onApprove(result => {
		  if(tipo === "editarPaciente")
		  {
			this.actualizarPaciente();
		  }
		  else if(tipo === "nuevoPaciente")
		  {
			  this.agregarPaciente()
		  }

		})
		.onDeny(result => { /* deny callback */});
	}

	agregarPaciente()
	{
		this.mostrarRegiones = true;
		this.mostrarProvincias = false;
		this.mostrarComunas = false;
		this.actualizarComunas();
		this.actualizarProvincias();
	this.servicioPersona.registerPersona(this.nuevoPaciente).subscribe(data => {
		console.log(data);
		this.actualizarPersonas();
	});
	this.nuevoPaciente = new Persona();
	}

	estadoCivilSeleccionado(estado)
	{
		this.nuevoPaciente.EstadoCivil_id = estado.id;
	  this.pacienteEditar.EstadoCivil_id = estado.id;
	}

	generoSeleccionado(genero)
	{
		this.nuevoPaciente.Genero_id = genero.id;
	  this.pacienteEditar.Genero_id = genero.id;
	}

	ngOnInit()
	{

	}


  pasarStringId(paciente)
  {
	for ( let i = 0 ; i < this.totalComunas.length ; i ++)
	{
	if(paciente.Comuna_id === this.totalComunas[i].nombre)
	{
	  paciente.Comuna_id = this.totalComunas[i].id;
	}
	}

	for ( let i = 0 ; i < this.totalGeneros.length ; i ++)
	{
	if(paciente.Genero_id === this.totalGeneros[i].nombre)
	{
	  paciente.Genero_id = this.totalGeneros[i].id;
	}
	}

	for ( let i = 0 ; i < this.totalEstadoCiviles.length ; i ++)
	{
	if(paciente.EstadoCivil_id === this.totalEstadoCiviles[i].nombre)
	{
	  paciente.EstadoCivil_id = this.totalEstadoCiviles[i].id;
	}
	}
  }

	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalPacientes.length ; i ++)
		{

			for(let j = 0 ; j < this.totalGeneros.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].Genero_id) === this.totalGeneros[j].id)
				{
					this.totalPacientes[i].Genero_id = this.totalGeneros[j].nombre;
					break;
				}
			}

			for(let j = 0 ; j < this.totalEstadoCiviles.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].EstadoCivil_id) === this.totalEstadoCiviles[j].id)
				{
					this.totalPacientes[i].EstadoCivil_id = this.totalEstadoCiviles[j].nombre;
					break;
				}
			}


			for(let j = 0 ; j < this.totalComunas.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].Comuna_id) === this.totalComunas[j].id)
				{
					this.totalPacientes[i].Comuna_id = this.totalComunas[j].nombre;
					break;
				}
			}

		}
	}
}
