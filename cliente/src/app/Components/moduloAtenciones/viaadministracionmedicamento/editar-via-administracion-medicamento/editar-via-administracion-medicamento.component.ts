import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViaAdministracionMedicamento } from '../../../../Models/ViaAdministracionMedicamento.model';
import { ViaAdministracionMedicamentoService } from '../../../../Services/viaAdministracionMedicamento/via-administracion-medicamento.service';

@Component({
  selector: 'app-editar-via-administracion-medicamento',
  templateUrl: './editar-via-administracion-medicamento.component.html',
  styleUrls: ['./editar-via-administracion-medicamento.component.css']
})
export class EditarViaAdministracionMedicamentoComponent{

	public viaAdminMed:ViaAdministracionMedicamento;

  constructor(
  	public dialogRef:MatDialogRef<EditarViaAdministracionMedicamentoComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public servicioAdminViaMed:ViaAdministracionMedicamentoService 
  	) {

  	this.viaAdminMed=data.viaAdminMed;
   }


   editarViaAdminMed(){
   	this.servicioAdminViaMed.editViaAdministracionMedicamento(this.viaAdminMed,this.viaAdminMed.id).subscribe(data=>{
   		this.dialogRef.close();
   	});
   }


   onNoClick(){
   	this.dialogRef.close();
   }

 

}
