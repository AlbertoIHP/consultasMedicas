import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.css']
})
export class DisponibilidadComponent implements OnInit {

  private horarios: any

  constructor(
    public dialogRef: MatDialogRef<DisponibilidadComponent>,
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
