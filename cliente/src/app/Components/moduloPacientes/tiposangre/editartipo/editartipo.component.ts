import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-editartipo',
  templateUrl: './editartipo.component.html',
  styleUrls: ['./editartipo.component.css']
})
export class EditartipoComponent{
  editarForm: FormGroup;
  public ts: any;
  public servicio: any;

  ngOnInit(){

    this.editarForm = new FormGroup({
          nombre: new FormControl(this.ts.nombre, [Validators.required]),
          descripcion: new FormControl(this.ts.descripcion, [Validators.required])
    
      });
  }

  constructor(
    public dialogRef: MatDialogRef<EditartipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
    this.ts = data.ts;
    this.servicio = data.servicioTS;
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

  editarTS()
  {
    this.servicio.editTipoSangre(this.ts, this.ts.id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
