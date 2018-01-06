// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editar-alergia',
  templateUrl: './editar-alergia.component.html',
  styleUrls: ['./editar-alergia.component.css']
})
export class EditarAlergiaComponent implements OnInit {

	// Se declaran los atributos a usar
	editarForm: FormGroup;
	public alergia: Alergia;

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.editarForm = new FormGroup({
	        nombre: new FormControl(this.alergia.nombre, [Validators.required]),     
	    });

	    // Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarAlergiaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioAlergia: AlergiaService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos con los obtenidos en la base de datos		
		this.alergia = data.alergia;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarAlergia() {
		//Utilizando el id de la alergia a editar, se modifican sus parámetros
		this.servicioAlergia.editAlergia(this.alergia, this.alergia.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}