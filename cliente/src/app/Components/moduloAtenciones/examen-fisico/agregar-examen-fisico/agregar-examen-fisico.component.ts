import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ExamenFisico } from '../../../../Models/ExamenFisico.model';


@Component({
  selector: 'app-agregar-examen-fisico',
  templateUrl: './agregar-examen-fisico.component.html',
  styleUrls: ['./agregar-examen-fisico.component.css']
})
export class AgregarExamenFisicoComponent implements OnInit {
	public nuevoExamenFisico: ExamenFisico;
	public servicioExamenFisico: any; 

constructor(
  		public dialogRef: MatDialogRef<AgregarExamenFisicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) { 

  		this.nuevoExamenFisico=new ExamenFisico();
  		this.servicioExamenFisico=data.servicioExamenFisico;
  }

  ngOnInit() {
  }

  onNoClick()
	{
		this.dialogRef.close();
	}

	agregarExamenFisico()
	{
		this.servicioExamenFisico.registerExamenFisico(this.nuevoExamenFisico).subscribe(data => {
			this.dialogRef.close();
		});
	}

}
