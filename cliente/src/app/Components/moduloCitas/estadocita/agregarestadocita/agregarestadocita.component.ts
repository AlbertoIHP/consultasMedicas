// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { EstadoCita } from '../../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../../Services/estadocita/estado-cita.service';
import { EventosService } from '../../../../Services/eventos/eventos.service';


@Component({
  selector: 'app-agregarestadocita',
  templateUrl: './agregarestadocita.component.html',
  styleUrls: ['./agregarestadocita.component.css']
})
export class AgregarestadocitaComponent implements OnInit {
	// Se declaran los atributos
	agregarForm: FormGroup;
	public nuevoEstadoCita: EstadoCita;

	ngOnInit(){
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
		public dialogRef: MatDialogRef<AgregarestadocitaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEstadoCita: EstadoCitaService,
		public servicioEvento: EventosService
		)
	{
		// Se inicializan los atributos
		this.nuevoEstadoCita = new EstadoCita();
	}

	//Cerrar el diálogo
	onNoClick() {

		this.dialogRef.close();
	}

	agregarEstadoCita()
	{
		 //Se agrega el nuevo estado al dar click en el botón
		this.servicioEstadoCita.registerEstadoCita(this.nuevoEstadoCita).subscribe(data => {
			//Se emite un evento para actualizar los datos
		    this.servicioEvento.actualizacion(true);
		      
		    // Se cierra el diálogo
		    this.dialogRef.close();
		});
	}
}
