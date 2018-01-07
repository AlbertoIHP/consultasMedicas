//Componentes generales
import { Component, Inject,OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { Genero } from '../../../../Models/Genero.model';
import { GeneroService } from '../../../../Services/genero/genero.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-agregargenero',
	templateUrl: './agregargenero.component.html',
	styleUrls: ['./agregargenero.component.css']
})
export class AgregargeneroComponent implements OnInit {
	//Se declaran los atributos
	agregarForm: FormGroup;
	public nuevoGenero: Genero;

	ngOnInit() {
    	// Se inician las validaciones usando un FormGroup y se dan los parámetros		
    	this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),
	        descripcion: new FormControl('', [Validators.required]),
	   	});

	    //Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
 	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<AgregargeneroComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGenero: GeneroService,
    	public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.nuevoGenero = new Genero();
	}

	// Se cierra el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarGenero() {
		// Se registra el nuevo género con los datos obtenidos
		this.servicioGenero.registerGenero(this.nuevoGenero).subscribe(data => {
    		//Se emite un evento para actualizar los datos
    		this.servicioEvento.actualizacion(true);
      
      		// Se cierra el diálogo
      		this.dialogRef.close();
		});
	}
}