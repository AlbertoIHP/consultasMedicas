import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-verpersona',
  templateUrl: './verpersona.component.html',
  styleUrls: ['./verpersona.component.css']
})

export class VerpersonaComponent {
  public persona: any;

  constructor(
      public dialogRef: MatDialogRef<VerpersonaComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
    this.persona = data.persona;
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

}
