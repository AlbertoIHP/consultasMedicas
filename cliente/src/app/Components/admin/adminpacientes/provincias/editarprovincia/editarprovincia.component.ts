import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Provincia } from '../../../../../Models/Provincia.model';
import { ProvinciaService } from '../../../../../Services/provincia/provincia.service';

@Component({
	selector: 'app-editarprovincia',
	templateUrl: './editarprovincia.component.html',
	styleUrls: ['./editarprovincia.component.css']
})
export class EditarprovinciaComponent {

	public provincia: Provincia;
	public totalRegiones: any;



	constructor(
		public dialogRef: MatDialogRef<EditarprovinciaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioProvincia: ProvinciaService
		)
	{
		this.provincia = data.provincia;
		this.totalRegiones = data.regiones;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarProvincia()
	{
		this.servicioProvincia.editProvincia(this.provincia, this.provincia.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

	regionSeleccionada(region)
	{
		this.provincia.Region_id = region.id;
	}


}
