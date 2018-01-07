// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { EventosService } from '../../../../Services/eventos/eventos.service';


@Component({
  selector: 'app-agregartipo',
  templateUrl: './agregartipo.component.html',
  styleUrls: ['./agregartipo.component.css']
})
export class AgregartipoComponent implements OnInit {
  agregarForm: FormGroup;
  public nuevoTS: any;
  public servicio: any;

  ngOnInit(){

     // Se inician las validaciones usando un FormGroup y se dan los parámetros
    this.agregarForm = new FormGroup({
          nombre: new FormControl('', [Validators.required]),
          descripcion: new FormControl('', [Validators.required])
    
      });

    //Se inicializa el evento en false
    this.servicioEvento.actualizacion(false);
  }

  constructor(
    //Se declaran los servicios y componentes a utilizar
    public dialogRef: MatDialogRef<AgregartipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEvento: EventosService
    )
  {
    // Se inicializan los atributos
    this.nuevoTS = data.ts;
    this.servicio = data.servicioTS;
  }

  //Cerrar el diálogo
  onNoClick()
  {
    this.dialogRef.close();
  }

  agregarTS()
  {
    // Se registra el nuevo tipo de sangre con los datos obtenidos
    this.servicio.registerTipoSangre(this.nuevoTS).subscribe(data => {
     
        //Se emite un evento para actualizar los datos
        this.servicioEvento.actualizacion(true);

        // Se cierra el diálogo        
        this.dialogRef.close();
    });
  }

}
