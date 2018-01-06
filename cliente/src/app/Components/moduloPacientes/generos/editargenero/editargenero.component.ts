//Componentes generales
import { Component, Inject,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { Genero } from '../../../../Models/Genero.model';
import { GeneroService } from '../../../../Services/genero/genero.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-editargenero',
	templateUrl: './editargenero.component.html',
	styleUrls: ['./editargenero.component.css']
})

export class EditargeneroComponent implements OnInit {
	//Declaración de los atributos
	editarForm: FormGroup;
	public genero: Genero;

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
    	this.editarForm = new FormGroup({
	        nombre: new FormControl(this.genero.nombre, [Validators.required]),
	        descripcion: new FormControl(this.genero.descripcion, [Validators.required]),
   		});

	   	// Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
 	}

	constructor(
		public dialogRef: MatDialogRef<EditargeneroComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGenero: GeneroService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos con los obtenidos en la base de datos
		this.genero = data.genero;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarGenero() {
		//Utilizando el id del género a editar, se modifican sus parámetros
		this.servicioGenero.editGenero(this.genero, this.genero.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}