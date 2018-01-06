import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PrevisionService } from '../../../../Services/prevision/prevision.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-editarprevision',
	templateUrl: './editarprevision.component.html',
	styleUrls: ['./editarprevision.component.css']
})
export class EditarprevisionComponent implements OnInit {
	editarForm: FormGroup;
	public prevision: any;
	public opciones: any;

	ngOnInit(){
		this.opciones = [{id: '1', nombre: 'Si'},{id: '0', nombre: 'No'}];

		this.editarForm = new FormGroup({
	        nombre: new FormControl(this.prevision.nombre, [Validators.required]),
	        descripcion: new FormControl(this.prevision.descripcion, [Validators.required]),
	        isapre: new FormControl(this.prevision.isapre, [Validators.required]),
    	});
	}

	constructor(
		public dialogRef: MatDialogRef<EditarprevisionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioPrevision: PrevisionService
		) { 
		this.prevision = data.prevision; 
		}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarPrevision()
	{
		this.servicioPrevision.editPrevision(this.prevision, this.prevision.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}
}
