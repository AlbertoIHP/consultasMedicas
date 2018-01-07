//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editar-habito-sexual',
  templateUrl: './editar-habito-sexual.component.html',
  styleUrls: ['./editar-habito-sexual.component.css']
})
export class EditarHabitoSexualComponent implements OnInit {
	//Declaración de los atributos
	editarForm: FormGroup;
	public habitosexual: HabitoSexual;

	ngOnInit(){
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.editarForm = new FormGroup({
	        nombre: new FormControl(this.habitosexual.nombre, [Validators.required]),
	         
	    });

	    // Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarHabitoSexualComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabitoSexual: HabitoSexualService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos con los obtenidos en la base de datos
		this.habitosexual = data.habitosexual;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarHabitoSexual() {
		//Utilizando el id del hábito sexual a editar, se modifican sus parámetros
		this.servicioHabitoSexual.editHabitoSexual(this.habitosexual, this.habitosexual.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}