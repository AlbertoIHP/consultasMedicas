// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { EnfermedadCronica } from '../../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { EnfermedadesCronicasPaciente } from '../../../../Models/EnfermedadesCronicasPaciente.model';
import { EnfermedadesCronicasPacienteService } from '../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-enfermedad-cronica',
  templateUrl: './agregar-enfermedad-cronica.component.html',
  styleUrls: ['./agregar-enfermedad-cronica.component.css']
})

export class AgregarEnfermedadCronicaComponent implements OnInit {
	// Se declaran los atributos a usar
	agregarForm: FormGroup;
	public nuevaEnfermedadCronica: EnfermedadCronica;
	public totalPacientes: Paciente[];
	public nuevaEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente;
	public totalEnfermedadesCronicas: EnfermedadCronica[];

	ngOnInit(){
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),     
	    });

	   	//Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<AgregarEnfermedadCronicaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEnfermedadCronica: EnfermedadCronicaService,
		public servicioEnfermedadesCronicasPaciente: EnfermedadesCronicasPacienteService,
		public servicioPacientes: PacienteService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.nuevaEnfermedadCronica = new EnfermedadCronica();
		this.totalPacientes=[];
		this.nuevaEnfermedadesCronicasPaciente= new EnfermedadesCronicasPaciente();
		this.totalEnfermedadesCronicas=[];
	}

	//Se cierra el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarEnfermedadCronica() {
		// Se registra  la nueva enfermedad con los datos obtenidos
		this.servicioEnfermedadCronica.registerEnfermedadCronica(this.nuevaEnfermedadCronica).subscribe(data => {
			// Se obtienen los pacientes	
			this.servicioPacientes.getPacientes().subscribe(data=>{
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				// Se obtienen todas las enfermedades
				this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(data=>{
					var todo: any = data;
					todo = todo.data;
					this.totalEnfermedadesCronicas = todo;

					//Se obtiene la enfermedad que se acaba de agregar
					let currentEnfermedadCronica=this.totalEnfermedadesCronicas.filter( enfermedadcronica => enfermedadcronica.nombre === this.nuevaEnfermedadCronica.nombre);

					// Agregar nueva enfermedad crónica a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevaEnfermedadesCronicasPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevaEnfermedadesCronicasPaciente.EnfermedadCronica_id = currentEnfermedadCronica[0].id;
						this.servicioEnfermedadesCronicasPaciente.registerEnfermedadesCronicasPaciente(this.nuevaEnfermedadesCronicasPaciente).subscribe(data => {});
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