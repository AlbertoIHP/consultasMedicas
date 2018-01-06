import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BoxConsulta } from '../../../../Models/BoxConsulta.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-agregarboxconsulta',
  templateUrl: './agregarboxconsulta.component.html',
  styleUrls: ['./agregarboxconsulta.component.css']
})
export class AgregarboxconsultaComponent implements OnInit {
  agregarForm: FormGroup;
	public nuevoBoxConsulta: any;
	public totalTipoBoxes: any;
  public servicioTipoBox: any;
  public servicioBoxConsulta: any;

  ngOnInit(){

      this.agregarForm = new FormGroup({
            ubicacion: new FormControl('', [Validators.required]),
            tipoBox: new FormControl('', [Validators.required]),
           
        });
    }

  constructor(
  	public dialogRef: MatDialogRef<AgregarboxconsultaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any

  	) {

  	this.nuevoBoxConsulta = new BoxConsulta();
	  this.totalTipoBoxes = data.totalTipoBoxes;
    this.servicioTipoBox = data.servicioTipoBox;
    this.servicioBoxConsulta = data.servicioBoxConsulta;


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
