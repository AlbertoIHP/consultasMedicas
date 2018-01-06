import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Habito } from '../../../../Models/Habito.model';
import { HabitoService } from '../../../../Services/habito/habito.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-editar-habito',
  templateUrl: './editar-habito.component.html',
  styleUrls: ['./editar-habito.component.css']
})
export class EditarHabitoComponent implements OnInit {
	editarForm: FormGroup;
	public habito: Habito;

	ngOnInit(){

	    this.editarForm = new FormGroup({
	          nombre: new FormControl(this.habito.nombre, [Validators.required]),
	         
	      });
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarHabitoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabito: HabitoService
		)
	{
		this.habito = data.habito;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarHabito()
	{
		this.servicioHabito.editHabito(this.habito, this.habito.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}