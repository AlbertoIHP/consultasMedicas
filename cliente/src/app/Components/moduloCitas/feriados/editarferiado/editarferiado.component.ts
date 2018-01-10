// Componentes generales
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, OnInit  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CustomDateFormatter } from '../../../Globals/custom-date-formatter';
import { CalendarEvent, CalendarMonthViewDay, CalendarDateFormatter, DAYS_OF_WEEK, CalendarAngularDateFormatter } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { Feriado } from '../../../../Models/Feriado.model';
import { FeriadoService } from '../../../../Services/feriado/feriado.service';

@Component({
  selector: 'app-editarferiado',
  templateUrl: './editarferiado.component.html',
  styleUrls: ['./editarferiado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
	  {
	  	provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
	  }
  ]
})
export class EditarferiadoComponent implements OnInit {

	//Inicialización de variable para manejar los formularios grupales
	editarForm: FormGroup;

	//Inicialización de el o los atributos que ocuparán	
	public feriado: Feriado;
	dateFormatter: CalendarDateFormatter;

	//Atributos para manejar el calendario (idioma, distribución de los días)
	viewDate: Date = new Date();
	locale: string = 'es';
	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
	weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
	selectedDay: CalendarMonthViewDay;
	events: CalendarEvent[] = [];
    protected fechaSeleccionada = true;

    ngOnInit(){
    	//Se crea el nuevo formulario grupal, dentro se agregan los atributos que se conrtrolarán    	
      	this.editarForm = new FormGroup({
      		//Los parámetros que se le dan, validan como se mostrarán al iniciar y que se use de forma correcta
            descripcion: new FormControl(this.feriado.descripcion, [Validators.required]),
        });
    }

	constructor(
		public dialogRef: MatDialogRef<EditarferiadoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioFeriado: FeriadoService
		)
	{
		// Se obtienen los datos provistos al dar click en el botón del feriado a editar
		this.feriado = data.feriado;

		/*let dia = this.feriado.dia.split(' ')[0];
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
	      }*/

	      //this.dia.date.setFullYear(parseInt(this.feriado.dia.split(' ')[0]), parseInt(this.feriado.dia.split(' ')[1], parseInt(this.feriado.dia.split(' ')[2])));
	   	  
	       this.dateFormatter.monthViewTitle({
			        date: new Date('2018-02-02'),
			        locale: 'es'
			      })

	       this.selectedDay = this.dateFormatter;
	   	//this.selectedDay = new Date(this.feriado.dia);
	   	//this.selectedDay.date = new Date(this.feriado.dia);
	      console.log(this.selectedDay)
	    //this.selectedDay = dia + ' ' + this.feriado.dia.split('/')[1] + ' ' + this.feriado.dia.split('/')[0].split(' ')[1] + ' ' + this.feriado.dia.split('/')[2];
		//console.log(this.selectedDay.date);
		//this.selectedDay.date.setFullYear(parseInt(this.feriado.dia.split(' ')[0]), parseInt(this.feriado.dia.split(' ')[1], parseInt(this.feriado.dia.split(' ')[2])));
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
	  	this.selectedDay.date = new Date(this.feriado.dia);
	  	console.log(this.selectedDay.date)
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
