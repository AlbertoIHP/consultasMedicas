import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TipoBox } from '../../../../Models/TipoBox.model';
import { TipoBoxService } from '../../../../Services/tipobox/tipo-box.service';

@Component({
  selector: 'app-agregartipobox',
  templateUrl: './agregartipobox.component.html',
  styleUrls: ['./agregartipobox.component.css']
})
export class AgregartipoboxComponent {
	public nuevoTipoBox: TipoBox;
	constructor(
		public dialogRef: MatDialogRef<AgregartipoboxComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioTipoBox: TipoBoxService
		)
	{
		this.nuevoTipoBox = new TipoBox();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarTipoBox()
	{
		this.servicioTipoBox.registerTipoBox(this.nuevoTipoBox).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}