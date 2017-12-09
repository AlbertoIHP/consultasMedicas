import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ExamenFisico } from '../../../../Models/ExamenFisico.model';


@Component({
  selector: 'app-editar-examen-fisico',
  templateUrl: './editar-examen-fisico.component.html',
  styleUrls: ['./editar-examen-fisico.component.css']
})
export class EditarExamenFisicoComponent{
	public  examenFisico:ExamenFisico;
	public servicioExamenFisico: any;

  constructor(
  	public dialogRef: MatDialogRef<EditarExamenFisicoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.examenFisico=data.examenFisico;
  		this.servicioExamenFisico=data.servicioExamenFisico;
  	 }


  	 onNoClick()
	{
		this.dialogRef.close();
	}

	editarExamenFisico()
	{
		this.servicioExamenFisico.editExamenFisico(this.examenFisico, this.examenFisico.id).subscribe( data => {
			this.dialogRef.close();

		});
	}


  ngOnInit() {
  }

}
