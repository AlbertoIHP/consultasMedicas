import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-editartipo',
  templateUrl: './editartipo.component.html',
  styleUrls: ['./editartipo.component.css']
})
export class EditartipoComponent{
  public ts: any;
  public servicio: any;

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
