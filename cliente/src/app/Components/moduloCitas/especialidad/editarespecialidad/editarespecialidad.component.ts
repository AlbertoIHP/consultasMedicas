import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Especialidad } from '../../../../Models/Especialidad.model';
import { EspecialidadService } from '../../../../Services/especialidad/especialidad.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editarespecialidad',
  templateUrl: './editarespecialidad.component.html',
  styleUrls: ['./editarespecialidad.component.css']
})
export class EditarespecialidadComponent implements OnInit {
	editarForm: FormGroup;
	public especialidad: Especialidad;

	ngOnInit(){

      this.editarForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
           
        });
    }

	constructor(
		public dialogRef: MatDialogRef<EditarespecialidadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEspecialidad: EspecialidadService
		)
	{
		this.especialidad = data.especialidad;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarEspecialidad()
	{
		this.servicioEspecialidad.editEspecialidad(this.especialidad, this.especialidad.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
