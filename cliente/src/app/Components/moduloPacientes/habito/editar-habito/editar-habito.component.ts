//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { Habito } from '../../../../Models/Habito.model';
import { HabitoService } from '../../../../Services/habito/habito.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editar-habito',
  templateUrl: './editar-habito.component.html',
  styleUrls: ['./editar-habito.component.css']
})
export class EditarHabitoComponent implements OnInit {
	//Declaración de los atributos
	editarForm: FormGroup;
	public habito: Habito;

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.editarForm = new FormGroup({
	        nombre: new FormControl(this.habito.nombre, [Validators.required]),      
	    });

	    // Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarHabitoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabito: HabitoService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos con los obtenidos en la base de datos
		this.habito = data.habito;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarHabito() {
		//Utilizando el id del hábito a editar, se modifican sus parámetros
		this.servicioHabito.editHabito(this.habito, this.habito.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}