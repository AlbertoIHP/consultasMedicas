// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editartipo',
  templateUrl: './editartipo.component.html',
  styleUrls: ['./editartipo.component.css']
})
export class EditartipoComponent{
  //Se declaran los atributos a usar
  editarForm: FormGroup;
  public ts: any;
  public servicio: any;

  ngOnInit(){
    // Se inician las validaciones usando un FormGroup y se dan los parámetros
    this.editarForm = new FormGroup({
          nombre: new FormControl(this.ts.nombre, [Validators.required]),
          descripcion: new FormControl(this.ts.descripcion, [Validators.required])
    
      });

     // Se inicializa el evento en false
     this.servicioEvento.actualizacion(false);
  }

  constructor(
    //Se declaran los servicios y componentes a utilizar
    public dialogRef: MatDialogRef<EditartipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEvento: EventosService
    )
  {
    // Se inicializan los atributos
    this.ts = data.ts;
    this.servicio = data.servicioTS;
  }

  //Cerrar el diálogo
  onNoClick()
  {
    this.dialogRef.close();
  }

  editarTS()
  {
    //Usando el id del tipo sangre, se actualiza con los nuevos datos
    this.servicio.editTipoSangre(this.ts, this.ts.id).subscribe(data => {
      
        //Se emite un evento para no actualizar la vista
        this.servicioEvento.actualizacion(true);

        this.dialogRef.close();
    });
  }
}
