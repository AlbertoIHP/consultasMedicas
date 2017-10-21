import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Comuna } from '../../../../../Models/Comuna.model';
import { ComunaService } from '../../../../../Services/comuna/comuna.service';

@Component({
	selector: 'app-editarcomuna',
	templateUrl: './editarcomuna.component.html',
	styleUrls: ['./editarcomuna.component.css']
})
export class EditarcomunaComponent {

	public comuna: Comuna;
	public totalProvincias: any;

	constructor(
		public dialogRef: MatDialogRef<EditarcomunaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioComuna: ComunaService
		) {
		this.comuna = data.comuna;
		this.totalProvincias = data.provincias;
		 }

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarComuna()
	{
		this.servicioComuna.editComuna(this.comuna, this.comuna.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

	provinciaSeleccionada(provincia)
	{
		this.comuna.Provincia_id = provincia.id;
	}

}
