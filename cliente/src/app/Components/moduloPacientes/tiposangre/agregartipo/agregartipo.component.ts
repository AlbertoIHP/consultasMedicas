import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

    this.agregarForm = new FormGroup({
          nombre: new FormControl('', [Validators.required]),
          descripcion: new FormControl('', [Validators.required])
    
      });
  }

  constructor(
    public dialogRef: MatDialogRef<AgregartipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
    this.nuevoTS = data.ts;
    this.servicio = data.servicioTS;
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

  agregarTS()
  {
    this.servicio.registerTipoSangre(this.nuevoTS).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

}
