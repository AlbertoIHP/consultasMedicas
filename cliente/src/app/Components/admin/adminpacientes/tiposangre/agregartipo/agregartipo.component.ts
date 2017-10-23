import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-agregartipo',
  templateUrl: './agregartipo.component.html',
  styleUrls: ['./agregartipo.component.css']
})
export class AgregartipoComponent{
  public nuevoTS: any;
  public servicio: any;

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
