import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EnfermedadCronica } from '../../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';

@Component({
  selector: 'app-agregar-enfermedad-cronica',
  templateUrl: './agregar-enfermedad-cronica.component.html',
  styleUrls: ['./agregar-enfermedad-cronica.component.css']
})
export class AgregarEnfermedadCronicaComponent {
	public nuevaEnfermedadCronica: EnfermedadCronica;
	constructor(
		public dialogRef: MatDialogRef<AgregarEnfermedadCronicaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEnfermedadCronica: EnfermedadCronicaService
		)
	{
		this.nuevaEnfermedadCronica = new EnfermedadCronica();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarEnfermedadCronica()
	{
		this.servicioEnfermedadCronica.registerEnfermedadCronica(this.nuevaEnfermedadCronica).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
