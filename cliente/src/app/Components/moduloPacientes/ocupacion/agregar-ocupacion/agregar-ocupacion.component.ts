import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ocupacion } from '../../../../Models/Ocupacion.model';

@Component({
  selector: 'app-agregar-ocupacion',
  templateUrl: './agregar-ocupacion.component.html',
  styleUrls: ['./agregar-ocupacion.component.css']
})
export class AgregarOcupacionComponent implements OnInit {
	public nuevaOcupacion: Ocupacion;
	public servicioOcupacion: any; 

  constructor(
  		public dialogRef: MatDialogRef<AgregarOcupacionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) { 

  		this.nuevaOcupacion=new Ocupacion();
  		this.servicioOcupacion=data.servicioOcupacion;
  }

  ngOnInit() {
  }

  onNoClick()
	{
		this.dialogRef.close();
	}

	agregarOcupacion()
	{
		this.servicioOcupacion.registerOcupacion(this.nuevaOcupacion).subscribe(data => {
			this.dialogRef.close();
		});
	}

}
