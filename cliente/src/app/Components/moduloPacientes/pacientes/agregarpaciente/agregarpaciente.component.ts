import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
	selector: 'app-agregarpaciente',
	templateUrl: './agregarpaciente.component.html',
	styleUrls: ['./agregarpaciente.component.css']
})
export class AgregarpacienteComponent implements OnInit {
	public paciente: any;
	public totalPacientes: any;
	public totalPersonas: any;
	public totalTS: any;
	public totalGruposEtnicos: any;
	public totalOcupaciones: any;
	public servicioPaciente: any;
	public servicioPersona: any;
	public servicioTS: any;
	public personasDisponibles: any;

	// Necesarios para autocomplete
	public personaCtrl: FormControl;
  	public filteredPersonas: Observable<any[]>;


	constructor(
		public dialogRef: MatDialogRef<AgregarpacienteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) {
			this.personasDisponibles = [];
			this.paciente = data.paciente;
			this.totalPacientes = data.pacientes;
			this.totalPersonas = data.personas;
			this.totalTS = data.tipoSangres;
			this.totalGruposEtnicos = data.gruposEtnicos;
			this.totalOcupaciones = data.ocupaciones;
			this.servicioPaciente = data.servicioPaciente;
			this.servicioPersona = data.servicioPersona;
			this.servicioTS = data.servicioTS;
			this.personasDisponibles = data.personasDisponibles;

		 }

	ngOnInit()
	{
		this.personaCtrl = new FormControl();
		    this.filteredPersonas = this.personaCtrl.valueChanges
		      .pipe(
		        startWith(''),
		        map(persona => persona ? this.filterPersonas(persona) : this.personasDisponibles.slice())
		);
	}

	filterPersonas(rut: string) {
	    return this.personasDisponibles.filter(persona =>
	      persona.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0);
    }

	onNoClick()
	{

		this.dialogRef.close();
	}

	agregarPaciente()
	{
		this.servicioPaciente.registerPaciente(this.paciente).subscribe(data => {
			this.dialogRef.close();

		},
		//Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
		(err) => {
		if (err === 'Used') {
		alert("Esta persona ya tiene asignado un paciente")
		}

	});
	}

}