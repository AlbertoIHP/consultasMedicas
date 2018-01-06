// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { BoxConsultaService } from '../../../../Services/boxconsulta/box-consulta.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editarboxconsulta',
  templateUrl: './editarboxconsulta.component.html',
  styleUrls: ['./editarboxconsulta.component.css']
})
export class EditarboxconsultaComponent implements OnInit {
  //Se declaran los atributos a usar
  editarForm: FormGroup;
	public boxConsulta: any;
	public totalTipoBoxes: any;
	public servicioTipoBox: any;

  ngOnInit(){
      // Se inician las validaciones usando un FormGroup y se dan los parámetros
      this.editarForm = new FormGroup({
            ubicacion: new FormControl(this.boxConsulta.ubicacion, [Validators.required]),
            tipoBox: new FormControl(this.boxConsulta.TipoBox_id, [Validators.required]),
           
        });

     /*
      // Se inicializa el evento en false
      this.servicioEvento.actualizacion(false);
    */
    }

  constructor(
    //Se declaran los servicios y componentes a utilizar
  	public dialogRef: MatDialogRef<EditarboxconsultaComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public servicioBoxConsulta: BoxConsultaService,
    public servicioEvento: EventosService

  	) {
    // Se inicializan los atributos
  	this.boxConsulta=data.boxconsulta;
  	this.totalTipoBoxes=data.tipoboxes;
  	this.servicioTipoBox=data.servicioTipoBox;

  
  }

  //Cerrar el diálogo
  onNoClick() {

		this.dialogRef.close();
	}

	editarBoxConsulta()
	{
    //Usando el id del box, se actualiza con los nuevos datos
		this.servicioBoxConsulta.editBoxConsulta(this.boxConsulta,this.boxConsulta.id).subscribe( data => {
			/*
      //Se emite un evento para no actualizar la vista
      this.servicioEvento.actualizacion(true);
      */
      this.dialogRef.close();

		});
	}
}
