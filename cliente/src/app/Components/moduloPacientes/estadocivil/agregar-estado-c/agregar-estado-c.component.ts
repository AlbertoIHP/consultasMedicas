import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EstadoCivil } from '../../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';

@Component({
  selector: 'app-agregar-estado-c',
  templateUrl: './agregar-estado-c.component.html',
  styleUrls: ['./agregar-estado-c.component.css']
})
export class AgregarEstadoCComponent {
  public nuevoEC: EstadoCivil;
  constructor(
    public dialogRef: MatDialogRef<AgregarEstadoCComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEC: EstadocivilService
    )
    {
      this.nuevoEC = new EstadoCivil();
    }


  onNoClick()
  {
    this.dialogRef.close();
  }


  agregarEC()
  {
    this.servicioEC.registerEstadoCivil(this.nuevoEC).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
