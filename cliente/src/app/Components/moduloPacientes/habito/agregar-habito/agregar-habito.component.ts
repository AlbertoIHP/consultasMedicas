import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Habito } from '../../../../Models/Habito.model';
import { HabitoService } from '../../../../Services/habito/habito.service';
@Component({
  selector: 'app-agregar-habito',
  templateUrl: './agregar-habito.component.html',
  styleUrls: ['./agregar-habito.component.css']
})
export class AgregarHabitoComponent {
	public nuevoHabito: Habito;
	constructor(
		public dialogRef: MatDialogRef<AgregarHabitoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabito: HabitoService
		)
	{
		this.nuevoHabito = new Habito();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarHabito()
	{
		this.servicioHabito.registerHabito(this.nuevoHabito).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
