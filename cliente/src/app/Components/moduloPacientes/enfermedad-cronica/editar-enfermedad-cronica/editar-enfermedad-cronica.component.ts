import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EnfermedadCronica } from '../../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';

@Component({
  selector: 'app-editar-enfermedad-cronica',
  templateUrl: './editar-enfermedad-cronica.component.html',
  styleUrls: ['./editar-enfermedad-cronica.component.css']
})
export class EditarEnfermedadCronicaComponent {
	public enfermedadcronica: EnfermedadCronica;

	constructor(
		public dialogRef: MatDialogRef<EditarEnfermedadCronicaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEnfermedadCronica: EnfermedadCronicaService
		)
	{
		this.enfermedadcronica = data.enfermedadcronica;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarEnfermedadCronica()
	{
		this.servicioEnfermedadCronica.editEnfermedadCronica(this.enfermedadcronica, this.enfermedadcronica.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}