import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PrevisionService } from '../../../../Services/prevision/prevision.service';
import { Prevision } from '../../../../Models/Prevision.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
	selector: 'app-agregarprevision',
	templateUrl: './agregarprevision.component.html',
	styleUrls: ['./agregarprevision.component.css']
})
export class AgregarprevisionComponent implements OnInit {
	agregarForm: FormGroup;
	public nuevaPrevision: any;

	ngOnInit(){

		this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),
	        descripcion: new FormControl('', [Validators.required]),
	        isapre: new FormControl(null, [Validators.required]),
    	});
	}

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
