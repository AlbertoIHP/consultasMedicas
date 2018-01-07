//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { GrupoEtnico } from '../../../../Models/GrupoEtnico.model';
import { GrupoEtnicoService } from '../../../../Services/grupoetnico/grupo-etnico.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-grupo-etnico',
  templateUrl: './agregar-grupo-etnico.component.html',
  styleUrls: ['./agregar-grupo-etnico.component.css']
})
export class AgregarGrupoEtnicoComponent implements OnInit {
	//Se declaran los atributos
	agregarForm: FormGroup;
	public nuevoGrupoEtnico: GrupoEtnico;

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
		public dialogRef: MatDialogRef<AgregarGrupoEtnicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGrupoEtnico: GrupoEtnicoService,
    	public servicioEvento: EventosService
		) {
		// Se inicializan los atributos
		this.nuevoGrupoEtnico = new GrupoEtnico();
	}

	// Se cierra el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarGrupoEtnico() {
		// Se registra el nuevo grupo con los datos obtenidos
		this.servicioGrupoEtnico.registerGrupoEtnico(this.nuevoGrupoEtnico).subscribe(data => {
    		//Se emite un evento para actualizar los datos
    		this.servicioEvento.actualizacion(true);
      
      		// Se cierra el diálogo
      		this.dialogRef.close();
		});
	}
}