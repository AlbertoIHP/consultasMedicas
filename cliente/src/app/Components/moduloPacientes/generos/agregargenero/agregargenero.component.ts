import { Component, Inject,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Genero } from '../../../../Models/Genero.model';
import { GeneroService } from '../../../../Services/genero/genero.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
	selector: 'app-agregargenero',
	templateUrl: './agregargenero.component.html',
	styleUrls: ['./agregargenero.component.css']
})
export class AgregargeneroComponent implements OnInit {
	agregarForm: FormGroup;

	public nuevoGenero: Genero;

	ngOnInit(){

      this.agregarForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
     
   		});
 	}

	
	constructor(
		public dialogRef: MatDialogRef<AgregargeneroComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGenero: GeneroService
		)
	{
		this.nuevoGenero = new Genero();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarGenero()
	{
		this.servicioGenero.registerGenero(this.nuevoGenero).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
