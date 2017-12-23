import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Feriado } from '../../../../Models/Feriado.model';
import { FeriadoService } from '../../../../Services/feriado/feriado.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-editarferiado',
  templateUrl: './editarferiado.component.html',
  styleUrls: ['./editarferiado.component.css']
})
export class EditarferiadoComponent {

	public feriado: Feriado;

	options: DatepickerOptions = {
      minYear: 2017,
      maxYear: new Date().getFullYear() + 1 ,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
      locale: esLocale

   };

	constructor(
		public dialogRef: MatDialogRef<EditarferiadoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioFeriado: FeriadoService
		)
	{
		this.feriado = data.feriado;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarFeriado()
	{
		this.feriado.dia = new Date(this.feriado.dia).toISOString().slice(0, 10).replace('T', ' ');
		this.servicioFeriado.editFeriado(this.feriado, this.feriado.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
