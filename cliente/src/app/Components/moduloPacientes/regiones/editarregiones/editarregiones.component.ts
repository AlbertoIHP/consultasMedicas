import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RegionService } from '../../../../Services/region/region.service';


@Component({
	selector: 'app-editarregiones',
	templateUrl: './editarregiones.component.html',
	styleUrls: ['./editarregiones.component.css']
})
export class EditarregionesComponent{

	public region: any;

	constructor(
		public dialogRef: MatDialogRef<EditarregionesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRegion: RegionService
		) { this.region = data.region; }

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarRegion()
	{
		this.servicioRegion.editRegion(this.region, this.region.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}


}
