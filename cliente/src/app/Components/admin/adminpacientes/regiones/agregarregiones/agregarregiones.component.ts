import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Region } from '../../../../../Models/Region.model';
import { RegionService } from '../../../../../Services/region/region.service';


@Component({
	selector: 'app-agregarregiones',
	templateUrl: './agregarregiones.component.html',
	styleUrls: ['./agregarregiones.component.css']
})


export class AgregarregionesComponent {

	public nuevaRegion: Region;

	constructor(
		public dialogRef: MatDialogRef<AgregarregionesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRegion: RegionService
		)
	{
		this.nuevaRegion = new Region();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarRegion()
	{
		this.servicioRegion.registerRegion(this.nuevaRegion).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
