import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, OnInit  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Feriado } from '../../../../Models/Feriado.model';
import { FeriadoService } from '../../../../Services/feriado/feriado.service';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-editarferiado',
  templateUrl: './editarferiado.component.html',
  styleUrls: ['./editarferiado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EditarferiadoComponent implements OnInit {

	editarForm: FormGroup;
	public feriado: Feriado;
	viewDate: Date = new Date()
    selectedDay: CalendarMonthViewDay
    events: CalendarEvent[] = []
    protected fechaSeleccionada = false

    ngOnInit(){

      this.editarForm = new FormGroup({
            descripcion: new FormControl(this.feriado.descripcion, [Validators.required]),
           
        });
    }


	constructor(
		public dialogRef: MatDialogRef<EditarferiadoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioFeriado: FeriadoService
		)
	{
		this.feriado = data.feriado;

		let dia = this.feriado.dia.split(' ')[0];
		console.log(dia);

		if( dia === 'Domingo')
	      {
	        dia = 'Sun'
	      }
	      else if( dia === 'Lunes' )
	      {
	        dia = 'Mon'
	      }
	      else if( dia === 'Martes')
	      {
	        dia = 'Tue'
	      }
	      else if( dia === 'Miercoles' )
	      {
	        dia = 'Wed'
	      }
	      else if( dia === 'Jueves')
	      {
	        dia = 'Thu'
	      }
	      else if( dia === 'Viernes')
	      {
	        dia = 'Fri'
	      }
	      else if( dia === 'Sabado' )
	      {
	        dia = 'Sat'
	      }
	    
	    //this.selectedDay = dia + ' ' + this.feriado.dia.split('/')[1] + ' ' + this.feriado.dia.split('/')[0].split(' ')[1] + ' ' + this.feriado.dia.split('/')[2];
		
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarFeriado()
	{
		this.servicioFeriado.editFeriado(this.feriado, this.feriado.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

	dayClicked(day: CalendarMonthViewDay): void
	  {
	    if (this.selectedDay)
	    {
	      delete this.selectedDay.cssClass;
	    }

	    this.selectedDay = day

	    if( this.selectedDay.isFuture )
	    {
	      this.fechaSeleccionada = false
	      day.cssClass = 'cal-day-selected'

	      let dia = this.selectedDay.date.toString().split(' ')[0]


	      if( dia === 'Sun')
	      {
	        dia = 'Domingo'
	      }
	      else if( dia === 'Mon' )
	      {
	        dia = 'Lunes'
	      }
	      else if( dia === 'Tue')
	      {
	        dia = 'Martes'
	      }
	      else if( dia === 'Wed' )
	      {
	        dia = 'Miercoles'
	      }
	      else if( dia === 'Thu')
	      {
	        dia = 'Jueves'
	      }
	      else if( dia === 'Fri')
	      {
	        dia = 'Viernes'
	      }
	      else if( dia === 'Sat' )
	      {
	        dia = 'Sabado'
	      }

	      this.feriado.dia = dia+' '+this.selectedDay.date.toString().split(' ')[2]+'/'+this.selectedDay.date.toString().split(' ')[1]+'/'+this.selectedDay.date.toString().split(' ')[3]

	    }
	    else
	    {
	      alert("Ha seleccionado una fecha pasada")
	    }

	  }

	beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void
	  {
	    body.forEach(day => {

	      if ( this.selectedDay && day.date.getTime() === this.selectedDay.date.getTime() )
	      {
	        day.cssClass = 'cal-day-selected';
	        this.selectedDay = day;
	      }

	    });
	  }
}
