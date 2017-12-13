import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

@Component({
  selector: 'app-editar-habito-sexual',
  templateUrl: './editar-habito-sexual.component.html',
  styleUrls: ['./editar-habito-sexual.component.css']
})
export class EditarHabitoSexualComponent {
	public habitosexual: HabitoSexual;

	constructor(
		public dialogRef: MatDialogRef<EditarHabitoSexualComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabitoSexual: HabitoSexualService
		)
	{
		this.habitosexual = data.habitosexual;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarHabitoSexual()
	{
		this.servicioHabitoSexual.editHabitoSexual(this.habitosexual, this.habitosexual.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}