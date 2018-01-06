import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GrupoEtnico } from '../../../../Models/GrupoEtnico.model';
import { GrupoEtnicoService } from '../../../../Services/grupoetnico/grupo-etnico.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-grupo-etnico',
  templateUrl: './editar-grupo-etnico.component.html',
  styleUrls: ['./editar-grupo-etnico.component.css']
})
export class EditarGrupoEtnicoComponent implements OnInit {
	editarForm: FormGroup;
	public grupoetnico: GrupoEtnico;

	ngOnInit(){

	    this.editarForm = new FormGroup({
	          nombre: new FormControl(this.grupoetnico.nombre, [Validators.required]),
	         
	      });
  	}

	constructor(
		public dialogRef: MatDialogRef<EditarGrupoEtnicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGrupoEtnico: GrupoEtnicoService
		)
	{
		this.grupoetnico = data.grupoetnico;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarGrupoEtnico()
	{
		this.servicioGrupoEtnico.editGrupoEtnico(this.grupoetnico, this.grupoetnico.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}