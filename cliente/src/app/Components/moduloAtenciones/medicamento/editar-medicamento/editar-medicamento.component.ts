import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Medicamento } from '../../../../Models/Medicamento.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-medicamento',
  templateUrl: './editar-medicamento.component.html',
  styleUrls: ['./editar-medicamento.component.css']
})
export class EditarMedicamentoComponent implements OnInit {
  editarForm: FormGroup;
  public medicamento: Medicamento;
  public servicioMedicamento:any; 

   ngOnInit(){

      this.editarForm = new FormGroup({
            nombreComun: new FormControl(this.medicamento.nombrecomun, [Validators.required]),
            nombreCientifico: new FormControl(this.medicamento.nombrecientifico, [Validators.required]),
           
        });
    }

  constructor(
  		public dialogRef: MatDialogRef<EditarMedicamentoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
  	) { 
  		this.medicamento = data.medicamento;
  		this.servicioMedicamento = data.servicioMedicamento;

  }

   onNoClick()
	{
		this.dialogRef.close();
	}

	editarMedicamento()
	{
		this.servicioMedicamento.editMedicamento(this.medicamento, this.medicamento.id).subscribe( data => {
			this.dialogRef.close();

		});
	}


}
