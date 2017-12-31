import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-alergia',
  templateUrl: './editar-alergia.component.html',
  styleUrls: ['./editar-alergia.component.css']
})
export class EditarAlergiaComponent implements OnInit {
	editarForm: FormGroup;
	public alergia: Alergia;

	ngOnInit(){

	    this.editarForm = new FormGroup({
	          nombre: new FormControl(this.alergia.nombre, [Validators.required]),
	         
	      });
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarAlergiaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioAlergia: AlergiaService
		)
	{
		this.alergia = data.alergia;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarAlergia()
	{
		this.servicioAlergia.editAlergia(this.alergia, this.alergia.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}