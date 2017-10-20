
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';
import { Genero } from '../../../Models/Genero.model';
import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { Region } from '../../../Models/Region.model';
import { Provincia } from '../../../Models/Provincia.model';
import { Comuna } from '../../../Models/Comuna.model';

@Component({
	selector: 'app-editarpersona',
	templateUrl: './editarpersona.component.html',
	styleUrls: ['./editarpersona.component.css']
})
export class EditarpersonaComponent {
	public persona: Persona;
	public totalPersonas: Persona[];
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

	public provinciasMostrar: Provincia[];
	public comunasMostrar: Comuna[];

	constructor(
		public dialogRef: MatDialogRef<EditarpersonaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioPersona: PersonaService
		)
	{
		this.defaultValues();
	}

	defaultValues()
	{
		this.mostrarComunas = false;
		this.mostrarProvincias = false;
		this.mostrarRegiones = true;
		this.persona = this.data.persona;
		this.totalRegiones = this.data.regiones;
		this.totalProvincias = this.data.provincias;
		this.totalComunas = this.data.comunas;
		this.totalEstadoCiviles = this.data.ec;
		this.totalGeneros = this.data.generos;
		this.provinciasMostrar = [];
		this.comunasMostrar = [];
	}

	onNoClick(): void
	{
	 this.dialogRef.close();
	}

	regionSeleccionada(region)
	{
		for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
		{
			if(this.totalProvincias[i].Region_id === region.id)
			{
				this.provinciasMostrar.push(this.totalProvincias[i]);
			}
		}

		this.mostrarRegiones = false;
		this.mostrarProvincias = true;
	}

	provinciaSeleccionada(provincia)
	{
		for ( let i = 0 ; i < this.totalComunas.length ; i ++)
		{
			if(this.totalComunas[i].Provincia_id === provincia.id)
			{
				this.comunasMostrar.push(this.totalComunas[i]);
			}
		}

		this.mostrarProvincias = false;
		this.mostrarComunas = true;
	}

	actualizarPersona()
	{
		console.log(this.persona);
		this.servicioPersona.editPersona(this.persona, this.persona.id).subscribe(data => {
			this.defaultValues();
			this.onNoClick();
		});
	}

	comunaSeleccionada(comuna)
	{
		this.persona.Comuna_id = comuna.id;
	}

	ecSeleccionado(ec)
	{
		this.persona.EstadoCivil_id = ec.id;
	}

	generoSeleccionado(genero)
	{
		this.persona.Genero_id = genero.id;
	}

}