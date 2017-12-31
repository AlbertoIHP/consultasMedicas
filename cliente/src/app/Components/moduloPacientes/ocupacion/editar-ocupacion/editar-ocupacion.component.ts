import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ocupacion } from '../../../../Models/Ocupacion.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-ocupacion',
  templateUrl: './editar-ocupacion.component.html',
  styleUrls: ['./editar-ocupacion.component.css']
})
export class EditarOcupacionComponent implements OnInit {
  editarForm: FormGroup;
  public ocupacion: Ocupacion;
  public servicioOcupacion: any;

  ngOnInit(){

      this.editarForm = new FormGroup({
            nombre: new FormControl(this.ocupacion.nombre, [Validators.required]),
           
        });
    }

  constructor(
  	public dialogRef: MatDialogRef<EditarOcupacionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) { 

  	this.ocupacion = data.ocupacion;
  	this.servicioOcupacion = data.servicioOcupacion;
  }

  onNoClick()
	{
		this.dialogRef.close();
	}

	editarOcupacion()
	{
		this.servicioOcupacion.editOcupacion(this.ocupacion, this.ocupacion.id).subscribe( data => {
			this.dialogRef.close();

		});
	}

}
