// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { PrevisionService } from '../../../../Services/prevision/prevision.service';
import { Prevision } from '../../../../Models/Prevision.model';
import { EventosService } from '../../../../Services/eventos/eventos.service';


@Component({
	selector: 'app-agregarprevision',
	templateUrl: './agregarprevision.component.html',
	styleUrls: ['./agregarprevision.component.css']
})
export class AgregarprevisionComponent implements OnInit {
	// Se declaran los atributos
	agregarForm: FormGroup;
	public nuevaPrevision: any;
	public opciones: any;

	ngOnInit(){
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
		this.opciones = [{id: '1', nombre: 'Si'},{id: '2', nombre: 'No'}];
		this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),
	        descripcion: new FormControl('', [Validators.required]),
	        isapre: new FormControl('', [Validators.required]),
    	});

    	//Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<AgregarprevisionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioPrevision: PrevisionService,
		public servicioEvento: EventosService
		)
	{
		// Se inicializan los atributos
		this.nuevaPrevision = new Prevision();
	}

	//Cerrar el diálogo
	onNoClick(){

		this.dialogRef.close();
	}

	agregarPrevision(){

		//Esto lo hice, porque el ngFor usa el id 0 como valor por defecto para mostrar en el select
		//entonces como la id = 0 es No, siempre está seleccionado el No por default
		if (this.nuevaPrevision.isapre === '2') {
			this.nuevaPrevision.isapre === '0';
		}
		//Se agrega la nueva comuna al dar click en el botón
		this.servicioPrevision.registerPrevision(this.nuevaPrevision).subscribe(data => {
			//Se emite un evento para actualizar los datos
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}
