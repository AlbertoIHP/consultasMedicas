import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';

@Component({
  selector: 'app-agregar-alergia',
  templateUrl: './agregar-alergia.component.html',
  styleUrls: ['./agregar-alergia.component.css']
})
export class AgregarAlergiaComponent {
	public nuevaAlergia: Alergia;
	constructor(
		public dialogRef: MatDialogRef<AgregarAlergiaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioAlergia: AlergiaService
		)
	{
		this.nuevaAlergia = new Alergia();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarAlergia()
	{
		this.servicioAlergia.registerAlergia(this.nuevaAlergia).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
