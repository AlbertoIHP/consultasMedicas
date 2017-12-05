import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Diagnostico } from '../../../../Models/Diagnostico.model';
import { DiagnosticoService } from '../../../../Services/diagnostico/diagnostico.service';


@Component({
  selector: 'app-editar-diagnostico',
  templateUrl: './editar-diagnostico.component.html',
  styleUrls: ['./editar-diagnostico.component.css']
})
export class EditarDiagnosticoComponent{

public diagnostico:Diagnostico;

  constructor(
  	public dialogRef: MatDialogRef<EditarDiagnosticoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
	public servicioDiagnostico: DiagnosticoService
	) {

  	this.diagnostico=data.diagnostico;
  }


  editarDiagnostico(){
  	this.servicioDiagnostico.editDiagnostico(this.diagnostico,this.diagnostico.id).subscribe(data=>{
  		this.dialogRef.close();
  	});
  }

	onNoClick()
		{
			this.dialogRef.close();
		}

  
}
