// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { ProvinciaService } from '../../../../Services/provincia/provincia.service';

@Component({
	selector: 'app-editarprovincia',
	templateUrl: './editarprovincia.component.html',
	styleUrls: ['./editarprovincia.component.css']
})
export class EditarprovinciaComponent implements OnInit {
	//Se declaran los atributos a usar
	editarForm: FormGroup;
	public provincia: any;
	public totalRegiones: any;
  	public servicioRegion: any;

  ngOnInit(){

    this.servicioRegion.getRegions().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRegiones = todo;
    });

    // Se inician las validaciones usando un FormGroup y se dan los parámetros
    this.editarForm = new FormGroup({
        nombre: new FormControl(this.provincia.nombre, [Validators.required]),
        region: new FormControl(this.provincia.Region_id, [Validators.required]),
     
    });

    /*
	    // Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
	*/
  }

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarprovinciaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioProvincia: ProvinciaService
		)
	{
		// Se inicializan los atributos
		this.provincia = data.provincia;
		this.totalRegiones = data.regiones;
    	this.servicioRegion = data.servicioRegion;
	}

	//Cerrar el diálogo
	onNoClick(){

		this.dialogRef.close();
	}

	editarProvincia(){
		//Usando el id de la provincia, se actualiza con los nuevos datos
		this.servicioProvincia.editProvincia(this.provincia, this.provincia.id).subscribe( data => {
			/*
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			*/
			this.dialogRef.close();

		});
	}

}
