import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ExamenFisico } from '../../../../Models/ExamenFisico.model';
import { DatepickerOptions } from 'ng2-datepicker';


@Component({
  selector: 'app-editar-examen-fisico',
  templateUrl: './editar-examen-fisico.component.html',
  styleUrls: ['./editar-examen-fisico.component.css']
})
export class EditarExamenFisicoComponent{
	public  examenFisico:ExamenFisico;
	public servicioExamenFisico: any;
	options: DatepickerOptions = {
	minYear: 1970,
	maxYear: 2030,
	displayFormat: 'YYYY[-]MM[-]DD',
	barTitleFormat: 'MMMM YYYY',
	firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
	
	};

  constructor(
  	public dialogRef: MatDialogRef<EditarExamenFisicoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.examenFisico=data.examenFisico;
  		this.servicioExamenFisico=data.servicioExamenFisico;
  	 }


  	 onNoClick()
	{
		this.dialogRef.close();
	}

	editarExamenFisico()
	{
		this.examenFisico.fechaExamen=new Date(this.examenFisico.fechaExamen).toISOString().slice(0, 19).replace('T', ' ');
		this.servicioExamenFisico.editExamenFisico(this.examenFisico, this.examenFisico.id).subscribe( data => {
			this.dialogRef.close();

		});
	}


  ngOnInit() {
  }

}
