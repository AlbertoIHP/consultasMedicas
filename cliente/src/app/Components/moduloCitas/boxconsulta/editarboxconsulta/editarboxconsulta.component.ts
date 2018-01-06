import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BoxConsultaService } from '../../../../Services/boxconsulta/box-consulta.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editarboxconsulta',
  templateUrl: './editarboxconsulta.component.html',
  styleUrls: ['./editarboxconsulta.component.css']
})
export class EditarboxconsultaComponent implements OnInit {

  editarForm: FormGroup;
	public boxConsulta: any;
	public totalTipoBoxes: any;
	public servicioTipoBox: any;

  ngOnInit(){

      this.editarForm = new FormGroup({
            ubicacion: new FormControl(this.boxConsulta.ubicacion, [Validators.required]),
            tipoBox: new FormControl(this.boxConsulta.TipoBox_id, [Validators.required]),
           
        });
    }

  constructor(
  	public dialogRef: MatDialogRef<EditarboxconsultaComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
	public servicioBoxConsulta: BoxConsultaService

  	) {

  	this.boxConsulta=data.boxconsulta;
  	this.totalTipoBoxes=data.tipoboxes;
  	this.servicioTipoBox=data.servicioTipoBox;

  	console.log(this.boxConsulta);
  	console.log(this.totalTipoBoxes);

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
}
