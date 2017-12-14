import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';
import { HabitosSexualesPacienteService } from '../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';

import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';
import { AlergiasComunesPacienteService } from '../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';

import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';

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

	public nuevoHabitosSexualesPaciente: any;
	public habitosSexuales: HabitoSexual[];

	public nuevaAlergiaComunPaciente: any;
	public alergias: Alergia[];


	// Necesarios para autocomplete
	public personaCtrl: FormControl;
  	public filteredPersonas: Observable<any[]>;


	constructor(
		public dialogRef: MatDialogRef<AgregarpacienteComponent>,
		public servicioHabitosSexualesPaciente: HabitosSexualesPacienteService,
  		public servicioHabitoSexual: HabitoSexualService,
  		public servicioAlergiasComunesPaciente: AlergiasComunesPacienteService,
  		public servicioAlergia: AlergiaService,
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
			this.habitosSexuales = [];
			this.nuevoHabitosSexualesPaciente = new HabitosSexualesPaciente();
			this.alergias = [];
			this.nuevaAlergiaComunPaciente = new AlergiasComunesPaciente();
			this.actualizarAtributos();

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

	actualizarAtributos()
 	{
	    this.servicioHabitoSexual.getHabitoSexuales().subscribe(data => {
	      var todo: any = data;
	      todo = todo.data;
	      this.habitosSexuales = todo;

	      this.servicioAlergia.getAlergias().subscribe(data => {
		      var todo: any = data;
		      todo = todo.data;
		      this.alergias = todo;

	    	});
	    });
 	}

	agregarPaciente()
	{
		this.servicioPaciente.registerPaciente(this.paciente).subscribe(data => {
			let pacienteAgregado: any;

			this.servicioPaciente.getPacientes().subscribe(data=>{
	          var todo: any = data;
	          todo = todo.data;
	          console.log(todo)
	          this.totalPacientes = todo;

				pacienteAgregado = this.totalPacientes.filter(paciente => paciente.Persona_id === this.paciente.Persona_id);
				console.log(pacienteAgregado[0]);
				
				// Crear habitossexuales paciente
				for (let i = 0; i < this.habitosSexuales.length; i++) {
					this.nuevoHabitosSexualesPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevoHabitosSexualesPaciente.HabitoSexual_id = this.habitosSexuales[i].id;
					this.servicioHabitosSexualesPaciente.registerHabitosSexualesPaciente(this.nuevoHabitosSexualesPaciente).subscribe(data => {});
				}

				// Crear alergías comunes paciente
				for (let i = 0; i < this.alergias.length; i++) {
					this.nuevaAlergiaComunPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevaAlergiaComunPaciente.Alergia_id = this.alergias[i].id;
					this.servicioAlergiasComunesPaciente.registerAlergiasComunesPaciente(this.nuevaAlergiaComunPaciente).subscribe(data => {});
				}

			});
			
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