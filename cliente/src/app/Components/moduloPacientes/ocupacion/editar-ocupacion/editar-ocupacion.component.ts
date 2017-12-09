import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ocupacion } from '../../../../Models/Ocupacion.model';

@Component({
  selector: 'app-editar-ocupacion',
  templateUrl: './editar-ocupacion.component.html',
  styleUrls: ['./editar-ocupacion.component.css']
})
export class EditarOcupacionComponent{
  public ocupacion: Ocupacion;
  public servicioOcupacion: any;
  constructor(
  	public dialogRef: MatDialogRef<EditarOcupacionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) { 

  	this.ocupacion = data.ocupacion;
  	this.servicioOcupacion = data.servicioOcupacion;
  }

  onNoClick()
	{
		this.dialogRef.close();
	}

	editarOcupacion()
	{
		this.servicioOcupacion.editOcupacion(this.ocupacion, this.ocupacion.id).subscribe( data => {
			this.dialogRef.close();

		});
	}



  ngOnInit() {
  }

}
