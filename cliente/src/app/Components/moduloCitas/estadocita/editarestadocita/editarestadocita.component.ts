import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EstadoCita } from '../../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../../Services/estadocita/estado-cita.service';

@Component({
  selector: 'app-editarestadocita',
  templateUrl: './editarestadocita.component.html',
  styleUrls: ['./editarestadocita.component.css']
})
export class EditarestadocitaComponent {
	public estadocita: EstadoCita;

	constructor(
		public dialogRef: MatDialogRef<EditarestadocitaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEstadoCita: EstadoCitaService
		)
	{
		this.estadocita = data.estadocita;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarEstadoCita()
	{
		this.servicioEstadoCita.editEstadoCita(this.estadocita, this.estadocita.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
