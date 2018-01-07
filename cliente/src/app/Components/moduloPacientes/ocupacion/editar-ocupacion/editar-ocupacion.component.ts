//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { Ocupacion } from '../../../../Models/Ocupacion.model';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editar-ocupacion',
  templateUrl: './editar-ocupacion.component.html',
  styleUrls: ['./editar-ocupacion.component.css']
})
export class EditarOcupacionComponent implements OnInit {
  //Declaración de los atributos
  editarForm: FormGroup;
  public ocupacion: Ocupacion;
  public servicioOcupacion: any;

  ngOnInit() {
    // Se inician las validaciones usando un FormGroup y se dan los parámetros
    this.editarForm = new FormGroup({
      nombre: new FormControl(this.ocupacion.nombre, [Validators.required]),
    });

    // Se inicializa el evento en false
    this.servicioEvento.actualizacion(false);
  }

  constructor(
  	public dialogRef: MatDialogRef<EditarOcupacionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEvento: EventosService
    ) {
    // Se inicializan los atributos con los obtenidos en la base de datos
  	this.ocupacion = data.ocupacion;
  	this.servicioOcupacion = data.servicioOcupacion;
  }

  //Cerrar el diálogo
  onNoClick() {
    this.dialogRef.close();
  }

	editarOcupacion() {
    //Utilizando la id de la ocupación a editar, se modifican sus parámetros
		this.servicioOcupacion.editOcupacion(this.ocupacion, this.ocupacion.id).subscribe( data => {
			//Se emite un evento para no actualizar la vista
      this.servicioEvento.actualizacion(true);
      
      // Se cierra el diálogo
      this.dialogRef.close();
		});
	}
}