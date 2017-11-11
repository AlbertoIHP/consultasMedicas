import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TipoBox } from '../../../../Models/TipoBox.model';
import { TipoBoxService } from '../../../../Services/tipobox/tipo-box.service';

@Component({
  selector: 'app-editartipobox',
  templateUrl: './editartipobox.component.html',
  styleUrls: ['./editartipobox.component.css']
})
export class EditartipoboxComponent {
	public tipobox: TipoBox;

	constructor(
		public dialogRef: MatDialogRef<EditartipoboxComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioTipoBox: TipoBoxService
		)
	{
		this.tipobox = data.tipobox;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarTipoBox()
	{
		this.servicioTipoBox.editTipoBox(this.tipobox, this.tipobox.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
