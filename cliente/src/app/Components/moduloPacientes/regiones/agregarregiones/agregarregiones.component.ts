// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { RegionService } from '../../../../Services/region/region.service';
import { Region } from '../../../../Models/Region.model';
import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-agregarregiones',
	templateUrl: './agregarregiones.component.html',
	styleUrls: ['./agregarregiones.component.css']
})


export class AgregarregionesComponent implements OnInit {
	// Se declaran los atributos
	agregarForm: FormGroup;
	public nuevaRegion: any;

	ngOnInit(){
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
		this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required])
    
    	});

    	//Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<AgregarregionesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRegion: RegionService,
		public servicioEvento: EventosService
		)
	{
		// Se inicializan los atributos
		this.nuevaRegion = new Region();
	}

	//Cerrar el diálogo
	onNoClick(){

		this.dialogRef.close();
	}

	agregarRegion(){
		//Se agrega la nueva región al dar click en el botón
		this.servicioRegion.registerRegion(this.nuevaRegion).subscribe(data => {
			//Se emite un evento para actualizar los datos
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}
