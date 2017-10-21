import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Comuna } from '../../../../../Models/Comuna.model';
import { ComunaService } from '../../../../../Services/comuna/comuna.service';

@Component({
	selector: 'app-agregarcomuna',
	templateUrl: './agregarcomuna.component.html',
	styleUrls: ['./agregarcomuna.component.css']
})
export class AgregarcomunaComponent {

	public nuevaComuna: Comuna;
	public totalProvincias: any;

	constructor(
		public dialogRef: MatDialogRef<AgregarcomunaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioComuna: ComunaService
		)
	{
		this.nuevaComuna = new Comuna();
		this.totalProvincias = data.provincias;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarComuna()
	{
		this.servicioComuna.registerComuna(this.nuevaComuna).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}

	provinciaSeleccionada(provincia)
	{
		this.nuevaComuna.Provincia_id = provincia.id;
	}

}
