import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EstadoCita } from '../../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../../Services/estadocita/estado-cita.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregarestadocita',
  templateUrl: './agregarestadocita.component.html',
  styleUrls: ['./agregarestadocita.component.css']
})
export class AgregarestadocitaComponent implements OnInit {

	agregarForm: FormGroup;
	public nuevoEstadoCita: EstadoCita;

	ngOnInit(){

      this.agregarForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
            descripcion: new FormControl('', [Validators.required]),
           
        });
    }
	constructor(
		public dialogRef: MatDialogRef<AgregarestadocitaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioEstadoCita: EstadoCitaService
		)
	{
		this.nuevoEstadoCita = new EstadoCita();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarEstadoCita()
	{
		this.servicioEstadoCita.registerEstadoCita(this.nuevoEstadoCita).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
