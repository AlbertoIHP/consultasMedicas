// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos
import { Provincia } from '../../../../Models/Provincia.model';

@Component({
	selector: 'app-editarprovincia',
	templateUrl: './editarprovincia.component.html',
	styleUrls: ['./editarprovincia.component.css']
})
export class EditarprovinciaComponent implements OnInit {
	//Se declaran los atributos a usar
	editarForm: FormGroup;
	public provincia: Provincia;
	public totalRegiones: any;
	public servicioProvincia: any;

	ngOnInit(){
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
		this.editarForm = new FormGroup({
		    nombre: new FormControl(this.provincia.nombre, [Validators.required]),
		    region: new FormControl(this.provincia.Region_id, [Validators.required]),
		});
	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarprovinciaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) {
		// Se inicializan los atributos
		this.provincia = new Provincia();
		this.provincia.nombre = data.provincia.nombre;
		this.provincia.Region_id = data.provincia.Region_id;
		this.provincia.id = data.provincia.id;
		this.totalRegiones = data.totalRegiones;
    	this.servicioProvincia = data.servicioProvincia;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarProvincia() {
		//Usando el id de la provincia, se actualiza con los nuevos datos
		this.servicioProvincia.editProvincia(this.provincia, this.provincia.id).subscribe( data => {
			//Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}