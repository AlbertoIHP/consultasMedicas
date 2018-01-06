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
	public opciones: any;

	ngOnInit(){
		this.opciones = [{id: '1', nombre: 'Si'},{id: '2', nombre: 'No'}];
		this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),
	        descripcion: new FormControl('', [Validators.required]),
	        isapre: new FormControl('', [Validators.required]),
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
		//Esto lo hice, porque el ngFor usa el id 0 como valor por defecto para mostrar en el select
		//entonces como la id = 0 es No, siempre está seleccionado el No por default
		if (this.nuevaPrevision.isapre === '2') {
			this.nuevaPrevision.isapre === '0';
		}
		this.servicioPrevision.registerPrevision(this.nuevaPrevision).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
