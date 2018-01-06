// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Especialidad } from '../../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../../Services/especialidad/especialidad.service';
import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editarespecialidad',
  templateUrl: './editarespecialidad.component.html',
  styleUrls: ['./editarespecialidad.component.css']
})
export class EditarespecialidadComponent implements OnInit {
	//Se declaran los atributos a usar
	editarForm: FormGroup;
	public especialidad: Especialidad;

	ngOnInit(){
	  // Se inician las validaciones usando un FormGroup y se dan los parámetros
      this.editarForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
           
        });

      // Se inicializa el evento en false
	  this.servicioEvento.actualizacion(false);
    }

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarespecialidadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEspecialidad: EspecialidadService,
		public servicioEvento: EventosService
		)
	{
		// Se inicializan los atributos
		this.especialidad = data.especialidad;
	}

	//Cerrar el diálogo
	onNoClick(){

		this.dialogRef.close();
	}

	editarEspecialidad(){

		//Usando el id de la especialidad, se actualiza con los nuevos datos
		this.servicioEspecialidad.editEspecialidad(this.especialidad, this.especialidad.id).subscribe( data => {
			
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			this.dialogRef.close();

		});
	}

}
