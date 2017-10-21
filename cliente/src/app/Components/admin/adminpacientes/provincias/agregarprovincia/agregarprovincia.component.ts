import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Provincia } from '../../../../../Models/Provincia.model';
import { ProvinciaService } from '../../../../../Services/provincia/provincia.service';


@Component({
	selector: 'app-agregarprovincia',
	templateUrl: './agregarprovincia.component.html',
	styleUrls: ['./agregarprovincia.component.css']
})
export class AgregarprovinciaComponent {
	public nuevaProvincia: Provincia;
	public totalRegiones: any;


	constructor(
		public dialogRef: MatDialogRef<AgregarprovinciaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioProvincia: ProvinciaService
		)
	{
		this.nuevaProvincia = new Provincia();
		this.totalRegiones = data.regiones;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarProvincia()
	{
		this.servicioProvincia.registerProvincia(this.nuevaProvincia).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}


	regionSeleccionada(region)
	{
		this.nuevaProvincia.Region_id = region.id;
	}


}
