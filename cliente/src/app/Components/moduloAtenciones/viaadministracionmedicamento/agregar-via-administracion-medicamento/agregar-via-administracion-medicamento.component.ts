import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViaAdministracionMedicamento } from '../../../../Models/ViaAdministracionMedicamento.model';
import { ViaAdministracionMedicamentoService } from '../../../../Services/viaAdministracionMedicamento/via-administracion-medicamento.service';

@Component({
  selector: 'app-agregar-via-administracion-medicamento',
  templateUrl: './agregar-via-administracion-medicamento.component.html',
  styleUrls: ['./agregar-via-administracion-medicamento.component.css']
})
export class AgregarViaAdministracionMedicamentoComponent {
	public nuevoViaAdminMed:ViaAdministracionMedicamento;

  constructor(
  	public dialogRef:MatDialogRef<AgregarViaAdministracionMedicamentoComponent>,
  	public servicioAdminViaMed:ViaAdministracionMedicamentoService 

  	) { 

  	this.nuevoViaAdminMed=new ViaAdministracionMedicamento();

  	}


  agregarViaAdminMed(){
  	this.servicioAdminViaMed.registerViaAdministracionMedicamento(this.nuevoViaAdminMed).subscribe(data=>{
  		this.dialogRef.close();
  	});
  }

  onNoClick(){
  	this.dialogRef.close();
  }

  

}
