// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { RegionService } from '../../../../Services/region/region.service';
import { EventosService } from '../../../../Services/eventos/eventos.service';


@Component({
	selector: 'app-editarregiones',
	templateUrl: './editarregiones.component.html',
	styleUrls: ['./editarregiones.component.css']
})
export class EditarregionesComponent implements OnInit {
	// Se declaran los atributos a usar
	editarForm: FormGroup;
	public region: any;

	ngOnInit(){
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
		this.editarForm = new FormGroup({
	        nombre: new FormControl(this.region.nombre, [Validators.required])
    
    	});

    	// Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarregionesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRegion: RegionService,
		public servicioEvento: EventosService

		) { 
			// Se inicializan los atributos con los obtenidos en la base de datos		
			this.region = data.region; 

		}

	//Cerrar el diálogo
	onNoClick()
	{
		this.dialogRef.close();
	}

	editarRegion()
	{
		//Utilizando el id de la región a editar, se modifican sus parámetros
		this.servicioRegion.editRegion(this.region, this.region.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();

		});
	}


}
