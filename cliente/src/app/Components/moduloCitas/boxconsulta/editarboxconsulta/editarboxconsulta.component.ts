import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BoxConsultaService } from '../../../../Services/boxconsulta/box-consulta.service';

@Component({
  selector: 'app-editarboxconsulta',
  templateUrl: './editarboxconsulta.component.html',
  styleUrls: ['./editarboxconsulta.component.css']
})
export class EditarboxconsultaComponent implements OnInit {

	public boxConsulta: any;
	public totalTipoBoxes: any;
	public servicioTipoBox: any;

  constructor(
  	public dialogRef: MatDialogRef<EditarboxconsultaComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
	public servicioBoxConsulta: BoxConsultaService

  	) {

  	this.boxConsulta=data.boxconsulta;
  	this.totalTipoBoxes=data.totalTipoBoxes;
  	this.servicioTipoBox=data.servicioTipoBox;


  }

  ngOnInit() {

  	// this.servicioTipoBox.getTipoBoxes().subscribe( data => {
   //    var todo: any = data;
   //    todo = todo.data;
   //    this.totalTipoBoxes = todo;
   //  });
  }

  onNoClick()
	{
		this.dialogRef.close();
	}

	editarBoxConsulta()
	{
		this.servicioBoxConsulta.editBoxConsulta(this.boxConsulta,this.boxConsulta.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

	tipoBoxSeleccionado(tipobox)
	{
		this.boxConsulta.TipoBox_id = tipobox.id;
	}


}
