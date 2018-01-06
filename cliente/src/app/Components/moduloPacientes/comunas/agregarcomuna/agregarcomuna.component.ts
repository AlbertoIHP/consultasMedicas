// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Comuna } from '../../../../Models/Comuna.model';
import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-agregarcomuna',
	templateUrl: './agregarcomuna.component.html',
	styleUrls: ['./agregarcomuna.component.css']
})
export class AgregarcomunaComponent implements OnInit{
	// Se declaran los atributos
	agregarForm: FormGroup;
	public nuevaComuna: Comuna;
	public totalProvincias: any;
	public servicioProvincia: any;
	public servicioComuna: any;

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),
	        provincia: new FormControl('', [Validators.required]),
	    });

	   	//Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar	
		public dialogRef: MatDialogRef<AgregarcomunaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.nuevaComuna = new Comuna();
		this.totalProvincias = data.provincias;
	    this.servicioComuna = data.servicioComuna;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarComuna() {
		//Se agrega la nueva comuna al dar click en el botón
		this.servicioComuna.registerComuna(this.nuevaComuna).subscribe(data => {
			//Se emite un evento para actualizar los datos
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}