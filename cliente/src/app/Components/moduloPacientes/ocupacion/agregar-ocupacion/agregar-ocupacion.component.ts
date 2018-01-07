//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { Ocupacion } from '../../../../Models/Ocupacion.model';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-ocupacion',
  templateUrl: './agregar-ocupacion.component.html',
  styleUrls: ['./agregar-ocupacion.component.css']
})
export class AgregarOcupacionComponent implements OnInit {
	//Se declaran los atributos
	agregarForm: FormGroup;
	public nuevaOcupacion: Ocupacion;
	public servicioOcupacion: any; 

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),     
	    });

	    //Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

  	constructor(
  		//Se declaran los servicios y componentes a utilizar
  		public dialogRef: MatDialogRef<AgregarOcupacionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    	public servicioEvento: EventosService
		) { 
		//Se inicializan los atributos
  		this.nuevaOcupacion=new Ocupacion();
  		this.servicioOcupacion=data.servicioOcupacion;
	}

	// Se cierra el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarOcupacion() {
		//Se registra la nueva ocupación con los datos obtenidos
		this.servicioOcupacion.registerOcupacion(this.nuevaOcupacion).subscribe(data => {
			//Se emite un evento para actualizar los datos
    		this.servicioEvento.actualizacion(true);
      
      		// Se cierra el diálogo
      		this.dialogRef.close();
		});
	}
}