import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vacuna } from '../../../../Models/Vacuna.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-vacuna',
  templateUrl: './editar-vacuna.component.html',
  styleUrls: ['./editar-vacuna.component.css']
})
export class EditarVacunaComponent implements OnInit {
  editarForm: FormGroup;
  public vacuna: Vacuna;
  public servicioVacuna:any; 

  ngOnInit(){

      this.editarForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
           
        });
    }

  constructor(
  		public dialogRef: MatDialogRef<EditarVacunaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
  	) { 
  		this.vacuna = data.vacuna;
  		this.servicioVacuna = data.servicioVacuna;

  }

   onNoClick()
	{
		this.dialogRef.close();
	}

	editarVacuna()
	{
		this.servicioVacuna.editVacuna(this.vacuna, this.vacuna.id).subscribe( data => {
			this.dialogRef.close();

		});
	}


}
