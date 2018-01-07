//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { GrupoEtnico } from '../../../../Models/GrupoEtnico.model';
import { GrupoEtnicoService } from '../../../../Services/grupoetnico/grupo-etnico.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editar-grupo-etnico',
  templateUrl: './editar-grupo-etnico.component.html',
  styleUrls: ['./editar-grupo-etnico.component.css']
})
export class EditarGrupoEtnicoComponent implements OnInit {
	//Declaración de los atributos
	editarForm: FormGroup;
	public grupoetnico: GrupoEtnico;

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.editarForm = new FormGroup({
	        nombre: new FormControl(this.grupoetnico.nombre, [Validators.required]),
	    });

	   	// Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);	    
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarGrupoEtnicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGrupoEtnico: GrupoEtnicoService,
		public servicioEvento: EventosService
		) {
		// Se inicializan los atributos con los obtenidos en la base de datos
		this.grupoetnico = data.grupoetnico;
	}

	//Cerrar el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	editarGrupoEtnico() {
		//Utilizando el id del grupo a editar, se modifican sus parámetros
		this.servicioGrupoEtnico.editGrupoEtnico(this.grupoetnico, this.grupoetnico.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
			this.servicioEvento.actualizacion(true);
			
			// Se cierra el diálogo
			this.dialogRef.close();
		});
	}
}