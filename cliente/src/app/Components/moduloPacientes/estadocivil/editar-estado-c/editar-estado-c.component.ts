import { Component, Inject,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EstadoCivil } from '../../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-editar-estado-c',
	templateUrl: './editar-estado-c.component.html',
	styleUrls: ['./editar-estado-c.component.css']
})
export class EditarEstadoCComponent implements OnInit  {
	editarForm: FormGroup;

	public EC: EstadoCivil;

	ngOnInit(){

      this.editarForm = new FormGroup({
        nombre: new FormControl(this.EC.nombre, [Validators.required]),
        descripcion: new FormControl(this.EC.descripcion, [Validators.required]),
     
    });
  }

	constructor(
		public dialogRef: MatDialogRef<EditarEstadoCComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEC: EstadocivilService
		)
	{
		this.EC = data.ec;

	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarEC()
	{
		this.servicioEC.editEstadoCivil(this.EC, this.EC.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
