import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Especialidad } from '../../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../../Services/especialidad/especialidad.service';

@Component({
  selector: 'app-editarespecialidad',
  templateUrl: './editarespecialidad.component.html',
  styleUrls: ['./editarespecialidad.component.css']
})
export class EditarespecialidadComponent {
	public especialidad: Especialidad;

	constructor(
		public dialogRef: MatDialogRef<EditarespecialidadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEspecialidad: EspecialidadService
		)
	{
		this.especialidad = data.especialidad;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarEspecialidad()
	{
		this.servicioEspecialidad.editEspecialidad(this.especialidad, this.especialidad.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
