import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EnfermedadCronica } from '../../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';
import { EnfermedadesCronicasPaciente } from '../../../../Models/EnfermedadesCronicasPaciente.model';
import { EnfermedadesCronicasPacienteService } from '../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';
import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregar-enfermedad-cronica',
  templateUrl: './agregar-enfermedad-cronica.component.html',
  styleUrls: ['./agregar-enfermedad-cronica.component.css']
})
export class AgregarEnfermedadCronicaComponent implements OnInit {
	agregarForm: FormGroup;
	public nuevaEnfermedadCronica: EnfermedadCronica;
	public totalPacientes: Paciente[];
	public nuevaEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente;
	public totalEnfermedadesCronicas: EnfermedadCronica[];

	ngOnInit(){

	    this.agregarForm = new FormGroup({
	          nombre: new FormControl('', [Validators.required]),
	         
	      });
  	}

	constructor(
		public dialogRef: MatDialogRef<AgregarEnfermedadCronicaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEnfermedadCronica: EnfermedadCronicaService,
		public servicioEnfermedadesCronicasPaciente: EnfermedadesCronicasPacienteService,
		public servicioPacientes: PacienteService
		)
	{
		this.nuevaEnfermedadCronica = new EnfermedadCronica();
		this.totalPacientes=[];
		this.nuevaEnfermedadesCronicasPaciente= new EnfermedadesCronicasPaciente();
		this.totalEnfermedadesCronicas=[];
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarEnfermedadCronica()
	{
		this.servicioEnfermedadCronica.registerEnfermedadCronica(this.nuevaEnfermedadCronica).subscribe(data => {
	
			this.servicioPacientes.getPacientes().subscribe(data=>{
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(data=>{
					var todo: any = data;
					todo = todo.data;
					this.totalEnfermedadesCronicas = todo;

					let currentEnfermedadCronica=this.totalEnfermedadesCronicas.filter( enfermedadcronica => enfermedadcronica.nombre === this.nuevaEnfermedadCronica.nombre);

					
					// Agregar nueva enfermedad crónica a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevaEnfermedadesCronicasPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevaEnfermedadesCronicasPaciente.EnfermedadCronica_id = currentEnfermedadCronica[0].id;
						this.servicioEnfermedadesCronicasPaciente.registerEnfermedadesCronicasPaciente(this.nuevaEnfermedadesCronicasPaciente).subscribe(data => {

						});
					}
					
				
				});

				console.log(data);
				this.dialogRef.close();
			});
		});

		
	}
}