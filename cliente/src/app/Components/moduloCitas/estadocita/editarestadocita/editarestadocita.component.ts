import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EstadoCita } from '../../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../../Services/estadocita/estado-cita.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editarestadocita',
  templateUrl: './editarestadocita.component.html',
  styleUrls: ['./editarestadocita.component.css']
})
export class EditarestadocitaComponent implements OnInit {
	editarForm: FormGroup;
	public estadocita: EstadoCita;

	ngOnInit(){

      this.editarForm = new FormGroup({
            nombre: new FormControl(this.estadocita.nombre, [Validators.required]),
            descripcion: new FormControl(this.estadocita.descripcion, [Validators.required]),
           
        });
    }

	constructor(
		public dialogRef: MatDialogRef<EditarestadocitaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEstadoCita: EstadoCitaService
		)
	{
		this.estadocita = data.estadocita;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarEstadoCita()
	{
		this.servicioEstadoCita.editEstadoCita(this.estadocita, this.estadocita.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
