import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-verdis',
  templateUrl: './verdis.component.html',
  styleUrls: ['./verdis.component.css']
})
export class VerdisComponent implements OnInit {

  private horarios: any

  constructor(
    public dialogRef: MatDialogRef<VerdisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
    this.horarios = data.disponibilidad
    console.log(this.horarios)
  }

  ngOnInit() {
  }


  onNoClick()
  {

    this.dialogRef.close();
  }

}
