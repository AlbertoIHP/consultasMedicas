import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Prevision } from '../../../../../Models/Prevision.model';
import { PrevisionService } from '../../../../../Services/prevision/prevision.service';

@Component({
	selector: 'app-agregarprevision',
	templateUrl: './agregarprevision.component.html',
	styleUrls: ['./agregarprevision.component.css']
})
export class AgregarprevisionComponent{

	public nuevaPrevision: Prevision;

	constructor(
		public dialogRef: MatDialogRef<AgregarprevisionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioPrevision: PrevisionService
		)
	{
		this.nuevaPrevision = new Prevision();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarPrevision()
	{
		this.servicioPrevision.registerPrevision(this.nuevaPrevision).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}

}
