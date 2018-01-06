// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';

import { AlergiasComunesPacienteService } from '../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-alergia',
  templateUrl: './agregar-alergia.component.html',
  styleUrls: ['./agregar-alergia.component.css']
})

export class AgregarAlergiaComponent implements OnInit {
	
	// Se declaran los atributos a usar
	agregarForm: FormGroup;
	public nuevaAlergia: Alergia;
	public totalPacientes: Paciente[];
	public nuevaAlergiasComunesPaciente: AlergiasComunesPaciente;
	public totalAlergiasComunes: Alergia[];

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]), 
	    });
  	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<AgregarAlergiaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioAlergia: AlergiaService,
		public servicioAlergiasComunesPaciente: AlergiasComunesPacienteService,
		public servicioPacientes: PacienteService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.nuevaAlergia = new Alergia();
		this.totalPacientes=[];
		this.nuevaAlergiasComunesPaciente= new AlergiasComunesPaciente();
		this.totalAlergiasComunes=[];
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarAlergia() {
		// Se registra  la nueva alergia con los datos obtenidos
		this.servicioAlergia.registerAlergia(this.nuevaAlergia).subscribe(data => {
			// Se obtienen los pacientes
			this.servicioPacientes.getPacientes().subscribe(data => {
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				// Se obtienen todas las alergias
				this.servicioAlergia.getAlergias().subscribe(data => {
					var todo: any = data;
					todo = todo.data;
					this.totalAlergiasComunes = todo;

					//Se obtiene la alergia que se acaba de agregar
					let currentAlergia = this.totalAlergiasComunes.filter( alergia => alergia.nombre === this.nuevaAlergia.nombre);

					// Agregar nueva alergia a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevaAlergiasComunesPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevaAlergiasComunesPaciente.Alergia_id = currentAlergia[0].id;
						this.servicioAlergiasComunesPaciente.registerAlergiasComunesPaciente(this.nuevaAlergiasComunesPaciente).subscribe(data => {});
					}
				});
				
				//Se emite un evento para actualizar los datos
				this.servicioEvento.actualizacion(true);
				
				// Se cierra el diálogo
				this.dialogRef.close();
			});
		});	
	}
}