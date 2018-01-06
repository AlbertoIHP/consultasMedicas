// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { EnfermedadCronica } from '../../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editar-enfermedad-cronica',
  templateUrl: './editar-enfermedad-cronica.component.html',
  styleUrls: ['./editar-enfermedad-cronica.component.css']
})
export class EditarEnfermedadCronicaComponent implements OnInit {
	// Declaración de atributos
	editarForm: FormGroup;
	public enfermedadcronica: EnfermedadCronica;

	ngOnInit(){
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.editarForm = new FormGroup({
	          nombre: new FormControl(this.enfermedadcronica.nombre, [Validators.required]),
	    });

	   	// Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarEnfermedadCronicaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEnfermedadCronica: EnfermedadCronicaService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos con los obtenidos en la base de datos
		this.enfermedadcronica = data.enfermedadcronica;
	}
	
	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarEnfermedadCronica() {
		//Utilizando el id de la enfermedad a editar, se modifican sus parámetros
		this.servicioEnfermedadCronica.editEnfermedadCronica(this.enfermedadcronica, this.enfermedadcronica.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}