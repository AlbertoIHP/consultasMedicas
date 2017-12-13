import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

@Component({
  selector: 'app-agregar-habito-sexual',
  templateUrl: './agregar-habito-sexual.component.html',
  styleUrls: ['./agregar-habito-sexual.component.css']
})
export class AgregarHabitoSexualComponent {
	public nuevoHabitoSexual: HabitoSexual;
	constructor(
		public dialogRef: MatDialogRef<AgregarHabitoSexualComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabitoSexual: HabitoSexualService
		)
	{
		this.nuevoHabitoSexual = new HabitoSexual();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarHabitoSexual()
	{
		this.servicioHabitoSexual.registerHabitoSexual(this.nuevoHabitoSexual).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}