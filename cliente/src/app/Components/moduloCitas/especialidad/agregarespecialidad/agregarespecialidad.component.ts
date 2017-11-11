import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Especialidad } from '../../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../../Services/especialidad/especialidad.service';

@Component({
  selector: 'app-agregarespecialidad',
  templateUrl: './agregarespecialidad.component.html',
  styleUrls: ['./agregarespecialidad.component.css']
})
export class AgregarespecialidadComponent {
	public nuevaEspecialidad: Especialidad;
	constructor(
		public dialogRef: MatDialogRef<AgregarespecialidadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEspecialidad: EspecialidadService
		)
	{
		this.nuevaEspecialidad = new Especialidad();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarEspecialidad()
	{
		this.servicioEspecialidad.registerEspecialidad(this.nuevaEspecialidad).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
