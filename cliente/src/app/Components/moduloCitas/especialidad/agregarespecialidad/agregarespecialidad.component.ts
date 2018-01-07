// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Especialidad } from '../../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../../Services/especialidad/especialidad.service';
import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregarespecialidad',
  templateUrl: './agregarespecialidad.component.html',
  styleUrls: ['./agregarespecialidad.component.css']
})
export class AgregarespecialidadComponent implements OnInit {
	// Se declaran los atributos
	agregarForm: FormGroup;
	public nuevaEspecialidad: Especialidad;

	ngOnInit(){
	  // Se inician las validaciones usando un FormGroup y se dan los parámetros
      this.agregarForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
           
        });

      //Se inicializa el evento en false
	   this.servicioEvento.actualizacion(false);
    }

	constructor(
		//Se declaran los servicios y componentes a utilizar	
		public dialogRef: MatDialogRef<AgregarespecialidadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEspecialidad: EspecialidadService,
		public servicioEvento: EventosService
		)
	{
		// Se inicializan los atributos
		this.nuevaEspecialidad = new Especialidad();
	}

	//Cerrar el diálogo
	onNoClick(){

		this.dialogRef.close();
	}

	agregarEspecialidad(){

		//Se agrega la nueva especialidad al dar click en el botón
		this.servicioEspecialidad.registerEspecialidad(this.nuevaEspecialidad).subscribe(data => {
			//Se emite un evento para actualizar los datos
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}
