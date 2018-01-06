//Componentes generales
import { Component, Inject,OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { EstadoCivil } from '../../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-estado-c',
  templateUrl: './agregar-estado-c.component.html',
  styleUrls: ['./agregar-estado-c.component.css']
})
export class AgregarEstadoCComponent implements OnInit{

  //Se declaran los atributos a usar
  agregarForm: FormGroup;
  public nuevoEC: EstadoCivil;

  ngOnInit() {
    // Se inician las validaciones usando un FormGroup y se dan los parámetros
    this.agregarForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
    
    //Se inicializa el evento en false
    this.servicioEvento.actualizacion(false);
  }

  constructor(
    //Se declaran los servicios y componentes a utilizar
    public dialogRef: MatDialogRef<AgregarEstadoCComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEC: EstadocivilService,
    public servicioEvento: EventosService
    ) {
    //Se inicializan los atributos 
    this.nuevoEC = new EstadoCivil();
  }

  // Se cierra el diálogo
  onNoClick() {
    this.dialogRef.close();
  }

  agregarEC() {
    // Se registra el nuevo estado civil con los datos obtenidos
    this.servicioEC.registerEstadoCivil(this.nuevoEC).subscribe(data => {
      //Se emite un evento para actualizar los datos
      this.servicioEvento.actualizacion(true);
      
      // Se cierra el diálogo
      this.dialogRef.close();
    });
  }
}