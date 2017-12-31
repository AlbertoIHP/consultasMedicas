import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ocupacion } from '../../../../Models/Ocupacion.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregar-ocupacion',
  templateUrl: './agregar-ocupacion.component.html',
  styleUrls: ['./agregar-ocupacion.component.css']
})
export class AgregarOcupacionComponent implements OnInit {
	agregarForm: FormGroup;
	public nuevaOcupacion: Ocupacion;
	public servicioOcupacion: any; 

	ngOnInit(){

	    this.agregarForm = new FormGroup({
	          nombre: new FormControl('', [Validators.required]),
	         
	      });
  	}

  constructor(
  		public dialogRef: MatDialogRef<AgregarOcupacionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) { 

  		this.nuevaOcupacion=new Ocupacion();
  		this.servicioOcupacion=data.servicioOcupacion;
  }


  onNoClick()
	{
		this.dialogRef.close();
	}

	agregarOcupacion()
	{
		this.servicioOcupacion.registerOcupacion(this.nuevaOcupacion).subscribe(data => {
			this.dialogRef.close();
		});
	}

}
