import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, OnInit  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Feriado } from '../../../../Models/Feriado.model';
import { FeriadoService } from '../../../../Services/feriado/feriado.service';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-agregarferiado',
  templateUrl: './agregarferiado.component.html',
  styleUrls: ['./agregarferiado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AgregarferiadoComponent implements OnInit {
	agregarForm: FormGroup;
	public nuevoFeriado: Feriado;

	viewDate: Date = new Date()
	selectedDay: CalendarMonthViewDay
	events: CalendarEvent[] = []

    protected fechaSeleccionada = true

    ngOnInit(){

      this.agregarForm = new FormGroup({
            descripcion: new FormControl('', [Validators.required]),
           
        });
    }


	constructor(
		public dialogRef: MatDialogRef<AgregarferiadoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioFeriado: FeriadoService
		)
	{
		this.nuevoFeriado = new Feriado();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarFeriado()
	{
		this.servicioFeriado.registerFeriado(this.nuevoFeriado).subscribe(data => {
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

	      this.nuevoFeriado.dia = dia+' '+this.selectedDay.date.toString().split(' ')[2]+'/'+this.selectedDay.date.toString().split(' ')[1]+'/'+this.selectedDay.date.toString().split(' ')[3]

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
