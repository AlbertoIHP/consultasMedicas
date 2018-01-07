// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { BoxConsulta } from '../../../../Models/BoxConsulta.model';
import { EventosService } from '../../../../Services/eventos/eventos.service';


@Component({
  selector: 'app-agregarboxconsulta',
  templateUrl: './agregarboxconsulta.component.html',
  styleUrls: ['./agregarboxconsulta.component.css']
})
export class AgregarboxconsultaComponent implements OnInit {
  // Se declaran los atributos
  agregarForm: FormGroup;
	public nuevoBoxConsulta: any;
	public totalTipoBoxes: any;
  public servicioTipoBox: any;
  public servicioBoxConsulta: any;

  ngOnInit(){
      // Se inician las validaciones usando un FormGroup y se dan los parámetros
      this.agregarForm = new FormGroup({
            ubicacion: new FormControl('', [Validators.required]),
            tipoBox: new FormControl('', [Validators.required]),
           
        });

      //Se inicializa el evento en false
      this.servicioEvento.actualizacion(false);
    }

  constructor(
    //Se declaran los servicios y componentes a utilizar  
  	public dialogRef: MatDialogRef<AgregarboxconsultaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEvento: EventosService

  	) {
    // Se inicializan los atributos
  	this.nuevoBoxConsulta = new BoxConsulta();
	  this.totalTipoBoxes = data.totalTipoBoxes;
    this.servicioTipoBox = data.servicioTipoBox;
    this.servicioBoxConsulta = data.servicioBoxConsulta;


  }

  //Cerrar el diálogo
  onNoClick() {

		this.dialogRef.close();
	}

	agregarBoxConsulta() {
    //Se agrega el nuevo box al dar click en el botón
 		this.servicioBoxConsulta.registerBoxConsulta(this.nuevoBoxConsulta).subscribe(data => {
			//Se emite un evento para actualizar los datos
      this.servicioEvento.actualizacion(true);
      
      // Se cierra el diálogo
      this.dialogRef.close();
		});
	}
}
