//Componentes generales
import { Component, Inject,OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { EstadoCivil } from '../../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-editar-estado-c',
	templateUrl: './editar-estado-c.component.html',
	styleUrls: ['./editar-estado-c.component.css']
})
export class EditarEstadoCComponent implements OnInit  {
	// Declaración de atributos
	editarForm: FormGroup;
	public EC: EstadoCivil;

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
      	this.editarForm = new FormGroup({
	        nombre: new FormControl(this.EC.nombre, [Validators.required]),
	        descripcion: new FormControl(this.EC.descripcion, [Validators.required]),
    	});
	   	
	   	// Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarEstadoCComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEC: EstadocivilService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos con los obtenidos en la base de datos
		this.EC = data.ec;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarEC() {
		//Utilizando el id de el estado civil a editar, se modifican sus parámetros
		this.servicioEC.editEstadoCivil(this.EC, this.EC.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}