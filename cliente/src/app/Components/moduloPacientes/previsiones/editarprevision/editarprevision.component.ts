// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { PrevisionService } from '../../../../Services/prevision/prevision.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-editarprevision',
	templateUrl: './editarprevision.component.html',
	styleUrls: ['./editarprevision.component.css']
})
export class EditarprevisionComponent implements OnInit {
	//Se declaran los atributos a usar
	editarForm: FormGroup;
	public prevision: any;
	public opciones: any;

	ngOnInit(){
		this.opciones = [{id: '1', nombre: 'Si'},{id: '0', nombre: 'No'}];
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
		this.editarForm = new FormGroup({
	        nombre: new FormControl(this.prevision.nombre, [Validators.required]),
	        descripcion: new FormControl(this.prevision.descripcion, [Validators.required]),
	        isapre: new FormControl(this.prevision.isapre, [Validators.required]),
    	});

    	/*
		    // Se inicializa el evento en false
		    this.servicioEvento.actualizacion(false);
		*/
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarprevisionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioPrevision: PrevisionService,
		public servicioEvento: EventosService
		
		) { 
		// Se inicializan los atributos
		this.prevision = data.prevision; 

		}

	//Cerrar el diálogo
	onNoClick(){
		this.dialogRef.close();
	}

	editarPrevision(){
		//Usando el id de la previsión, se actualiza con los nuevos datos
		this.servicioPrevision.editPrevision(this.prevision, this.prevision.id).subscribe( data => {
			/*
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			*/
			this.dialogRef.close();

		});
	}
}
