import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Genero } from '../../../../../Models/Genero.model';
import { GeneroService } from '../../../../../Services/genero/genero.service';

@Component({
	selector: 'app-agregargenero',
	templateUrl: './agregargenero.component.html',
	styleUrls: ['./agregargenero.component.css']
})
export class AgregargeneroComponent{
	public nuevoGenero: Genero;
	constructor(
		public dialogRef: MatDialogRef<AgregargeneroComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGenero: GeneroService
		)
	{
		this.nuevoGenero = new Genero();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarGenero()
	{
		this.servicioGenero.registerGenero(this.nuevoGenero).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
