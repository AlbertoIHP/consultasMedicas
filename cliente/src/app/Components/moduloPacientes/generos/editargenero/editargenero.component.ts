import { Component, Inject,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Genero } from '../../../../Models/Genero.model';
import { GeneroService } from '../../../../Services/genero/genero.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
	selector: 'app-editargenero',
	templateUrl: './editargenero.component.html',
	styleUrls: ['./editargenero.component.css']
})

export class EditargeneroComponent implements OnInit {
	editarForm: FormGroup;

	public genero: Genero;

	ngOnInit(){

      this.editarForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
     
   		});
 	}

	constructor(
		public dialogRef: MatDialogRef<EditargeneroComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGenero: GeneroService
		)
	{
		this.genero = data.genero;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarGenero()
	{
		this.servicioGenero.editGenero(this.genero, this.genero.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
