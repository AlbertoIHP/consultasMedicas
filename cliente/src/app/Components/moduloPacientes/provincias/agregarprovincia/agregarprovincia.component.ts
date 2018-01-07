// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Provincia } from '../../../../Models/Provincia.model';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-agregarprovincia',
	templateUrl: './agregarprovincia.component.html',
	styleUrls: ['./agregarprovincia.component.css']
})
export class AgregarprovinciaComponent implements OnInit{
	// Se declaran los atributos
	agregarForm: FormGroup;
	public nuevaProvincia: Provincia;
	public totalRegiones: any;
	public servicioProvincia: any;

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
		this.agregarForm = new FormGroup({
		    nombre: new FormControl('', [Validators.required]),
		    region: new FormControl('', [Validators.required]),
		});

		//Se inicializa el evento en false
		this.servicioEvento.actualizacion(false);
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<AgregarprovinciaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.nuevaProvincia = new Provincia();
		this.totalRegiones = data.totalRegiones;
	    this.servicioProvincia = data.servicioProvincia;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarProvincia() {
		//Se agrega la nueva provincia al dar click en el botón
		this.servicioProvincia.registerProvincia(this.nuevaProvincia).subscribe(data => {
			//Se emite un evento para actualizar los datos
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}