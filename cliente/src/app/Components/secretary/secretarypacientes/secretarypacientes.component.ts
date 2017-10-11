import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

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
		public servicioEstadoCivil: EstadocivilService)
	{
		this.mostrarRegiones = true;
		this.mostrarProvincias = false;
		this.mostrarComunas = false;
		this.provinciaActual = "";
		this.totalPacientes = [];
		this.nuevoPaciente = new Persona();

		this.actualizarRegiones();

		this.actualizarProvincias();

		this.actualizarComunas();

		this.actualizarGeneros();

		this.actualizarEstadoCiviles();

    this.actualizarPersonas();
	}


	regionSeleccionada(region)
	{
		var provinciasRegion: any = [];
		for(let i = 0 ; i < this.totalProvincias.length ; i++)
		{
			if(this.totalProvincias[i].Region_idRegion === region.idRegion)
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
			if(this.totalComunas[i].Provincia_idProvincia === provincia.idProvincia)
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
		console.log(JSON.stringify(comuna));
		this.nuevoPaciente.Comuna_idComuna = comuna.idComuna;
	}


	public open(dynamicContent:string = "Example") {
			const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
			config.closeResult = "closed!";
			config.context = { data: dynamicContent };
			this.modalService
					.open(config)
					.onApprove(result => { /* approve callback */ })
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
		this.nuevoPaciente.EstadoCivil_idEstado = estado.idEstadoCivil;
	}

	generoSeleccionado(genero)
	{
		this.nuevoPaciente.idGenero = genero.idGenero;
	}

	ngOnInit()
	{

	}

  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalPacientes.length ; i ++)
    {

      for(let j = 0 ; j < this.totalGeneros.length ; j++)
      {
        if(this.totalPacientes[i].idGenero === this.totalGeneros[j].idGenero)
        {
          this.totalPacientes[i].idGenero = this.totalGeneros[j].nombre;
          break;
        }
      }

      for(let j = 0 ; j < this.totalEstadoCiviles.length ; j++)
      {
        if(this.totalPacientes[i].EstadoCivil_idEstado === this.totalEstadoCiviles[j].idEstadoCivil)
        {
          this.totalPacientes[i].EstadoCivil_idEstado = this.totalEstadoCiviles[j].nombre;
          break;
        }
      }


      for(let j = 0 ; j < this.totalComunas.length ; j++)
      {
        if(this.totalPacientes[i].Comuna_idComuna === this.totalComunas[j].idComuna)
        {
          this.totalPacientes[i].Comuna_idComuna = this.totalComunas[j].nombre;
          break;
        }
      }

      console.log(this.totalPacientes[i]);
    }
  }
}
