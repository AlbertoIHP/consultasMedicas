import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Feriado } from '../../../../Models/Feriado.model';
import { FeriadoService } from '../../../../Services/feriado/feriado.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-agregarferiado',
  templateUrl: './agregarferiado.component.html',
  styleUrls: ['./agregarferiado.component.css']
})
export class AgregarferiadoComponent {
	public nuevoFeriado: Feriado;

	options: DatepickerOptions = {
      minYear: 2017,
      maxYear: new Date().getFullYear() + 1 ,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
      locale: esLocale

   };
	constructor(
		public dialogRef: MatDialogRef<AgregarferiadoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioFeriado: FeriadoService
		)
	{
		this.nuevoFeriado = new Feriado();
		this.nuevoFeriado.dia=new Date().toISOString().slice(0, 19).replace('T', ' ');
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarFeriado()
	{
		this.nuevoFeriado.dia = new Date(this.nuevoFeriado.dia).toISOString().slice(0, 10).replace('T', ' ');
		this.servicioFeriado.registerFeriado(this.nuevoFeriado).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}
