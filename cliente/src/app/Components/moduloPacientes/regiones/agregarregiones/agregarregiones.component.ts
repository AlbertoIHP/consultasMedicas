import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RegionService } from '../../../../Services/region/region.service';
import { Region } from '../../../../Models/Region.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-agregarregiones',
	templateUrl: './agregarregiones.component.html',
	styleUrls: ['./agregarregiones.component.css']
})


export class AgregarregionesComponent implements OnInit {
	agregarForm: FormGroup;
	public nuevaRegion: any;


	ngOnInit(){

		this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required])
    
    	});
	}

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
