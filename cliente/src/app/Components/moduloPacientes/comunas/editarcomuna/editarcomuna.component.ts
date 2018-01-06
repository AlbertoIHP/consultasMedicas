// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Comuna } from '../../../../Models/Comuna.model';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-editarcomuna',
	templateUrl: './editarcomuna.component.html',
	styleUrls: ['./editarcomuna.component.css']
})
export class EditarcomunaComponent implements OnInit{
	//Se declaran los atributos a usar
	editarForm: FormGroup;
	public comuna: Comuna;
	public totalProvincias: any;
    public servicioProvincia: any;
    public servicioComuna: any;

	ngOnInit() {
	  	// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.editarForm = new FormGroup({
	        nombre: new FormControl(this.comuna.nombre, [Validators.required]),
	        provincia: new FormControl(this.comuna.Provincia_id, [Validators.required]),
	    });
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarcomunaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.comuna = data.comuna;
		this.totalProvincias = data.provincias;
	    this.servicioComuna = data.servicioComuna;
		}

	//Cerrar el diálogo
	onNoClick() {
		//Se emite un evento para actualizar los datos
		this.servicioEvento.actualizacion(true);
		this.dialogRef.close();
	}

	editarComuna() {
		//Usando el id de la comuna, se actualiza con los nuevos datos
		this.servicioComuna.editComuna(this.comuna, this.comuna.id).subscribe( data => {
			this.dialogRef.close();
		});
	}
}