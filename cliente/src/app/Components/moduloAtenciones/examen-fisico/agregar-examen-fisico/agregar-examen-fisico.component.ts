import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ExamenFisico } from '../../../../Models/ExamenFisico.model';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-agregar-examen-fisico',
  templateUrl: './agregar-examen-fisico.component.html',
  styleUrls: ['./agregar-examen-fisico.component.css']
})
export class AgregarExamenFisicoComponent implements OnInit {
	public nuevoExamenFisico: ExamenFisico;
	public servicioExamenFisico: any; 
	options: DatepickerOptions = {
	minYear: 1970,
	maxYear: 2030,
	displayFormat: 'YYYY[-]MM[-]DD',
	barTitleFormat: 'MMMM YYYY',
	firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
	
	};


constructor(
  		public dialogRef: MatDialogRef<AgregarExamenFisicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) { 

  		this.nuevoExamenFisico=new ExamenFisico();
  		this.servicioExamenFisico=data.servicioExamenFisico;

  }

  ngOnInit() {
  }

  onNoClick()
	{
		this.dialogRef.close();
	}

	agregarExamenFisico()
	{	
		this.nuevoExamenFisico.fechaExamen=new Date(this.nuevoExamenFisico.fechaExamen).toISOString().slice(0, 19).replace('T', ' ');
		this.servicioExamenFisico.registerExamenFisico(this.nuevoExamenFisico).subscribe(data => {
			this.dialogRef.close();
		});
	}

}
