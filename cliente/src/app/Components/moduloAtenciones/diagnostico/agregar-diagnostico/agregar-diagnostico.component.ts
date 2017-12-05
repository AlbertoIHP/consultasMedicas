import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Diagnostico } from '../../../../Models/Diagnostico.model';
import { DiagnosticoService } from '../../../../Services/diagnostico/diagnostico.service';

@Component({
  selector: 'app-agregar-diagnostico',
  templateUrl: './agregar-diagnostico.component.html',
  styleUrls: ['./agregar-diagnostico.component.css']
})
export class AgregarDiagnosticoComponent{

public nuevoDiagnostico:Diagnostico;


  constructor(
  	public dialogRef: MatDialogRef<AgregarDiagnosticoComponent>,
	public servicioDiagnostico:DiagnosticoService

  	) {

  		this.nuevoDiagnostico=new Diagnostico();
  }


 agregarDiagnostico(){
 	this.servicioDiagnostico.registerDiagnostico(this.nuevoDiagnostico).subscribe(data=>{
 		this.dialogRef.close();
 	});
 }

 onNoClick()
	{
		this.dialogRef.close();
	}


 

}
