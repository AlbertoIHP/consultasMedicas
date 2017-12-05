import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BoxConsulta } from '../../../../Models/BoxConsulta.model';

@Component({
  selector: 'app-agregarboxconsulta',
  templateUrl: './agregarboxconsulta.component.html',
  styleUrls: ['./agregarboxconsulta.component.css']
})
export class AgregarboxconsultaComponent implements OnInit {
	public nuevoBoxConsulta: any;
	public totalTipoBoxes: any;
  public servicioTipoBox: any;
  public servicioBoxConsulta: any;

  constructor(
  	public dialogRef: MatDialogRef<AgregarboxconsultaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any

  	) {

  	this.nuevoBoxConsulta = new BoxConsulta();
	  this.totalTipoBoxes = data.totalTipoBoxes;
    this.servicioTipoBox = data.servicioTipoBox;
    this.servicioBoxConsulta = data.servicioBoxConsulta;


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

	agregarBoxConsulta()
	{
    console.log(this.nuevoBoxConsulta)
		this.servicioBoxConsulta.registerBoxConsulta(this.nuevoBoxConsulta).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
