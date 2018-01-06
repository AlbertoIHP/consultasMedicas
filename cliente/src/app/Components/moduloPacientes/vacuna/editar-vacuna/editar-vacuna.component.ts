// Componentes generales

import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios

import { Vacuna } from '../../../../Models/Vacuna.model';

import { EventosService } from '../../../../Services/eventos/eventos.service';


@Component({
  selector: 'app-editar-vacuna',
  templateUrl: './editar-vacuna.component.html',
  styleUrls: ['./editar-vacuna.component.css']
})
export class EditarVacunaComponent implements OnInit {

  // Se declaran los atributos a usar
  editarForm: FormGroup;
  public vacuna: Vacuna;
  public servicioVacuna:any; 

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
  		public dialogRef: MatDialogRef<EditarVacunaComponent>,
		  @Inject(MAT_DIALOG_DATA) public data: any,
      public servicioEvento: EventosService
  	) { 

      // Se inicializan los atributos con los obtenidos en la base de datos    
  		this.vacuna = data.vacuna;
  		this.servicioVacuna = data.servicioVacuna;

  }

   onNoClick()
	{
		this.dialogRef.close();
	}

	editarVacuna()
	{
    //Utilizando el id de la vacuna a editar, se modifican sus parámetros
		this.servicioVacuna.editVacuna(this.vacuna, this.vacuna.id).subscribe( data => {

      //Se emite un evento para no actualizar la vista
      this.servicioEvento.actualizacion(true);
      
      // Se cierra el diálogo
			this.dialogRef.close();

		});
	}


}
