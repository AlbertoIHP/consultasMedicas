// Componentes generales
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, OnInit  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomDateFormatter } from '../../../Globals/custom-date-formatter';
import { CalendarEvent, CalendarMonthViewDay, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { Feriado } from '../../../../Models/Feriado.model';
import { FeriadoService } from '../../../../Services/feriado/feriado.service';

@Component({
  selector: 'app-agregarferiado',
  templateUrl: './agregarferiado.component.html',
  styleUrls: ['./agregarferiado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
	  {
	  	provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
	  }
  ]
})
export class AgregarferiadoComponent implements OnInit {
	
	//Inicialización de variable para manejar los formularios grupales
	agregarForm: FormGroup;

	//Inicialización de el o los atributos que ocuparán
	public nuevoFeriado: Feriado;

	//Atributos para manejar el calendario (idioma, distribución de los días)
	viewDate: Date = new Date();
	locale: string = 'es';
	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
	weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
	selectedDay: CalendarMonthViewDay;
	events: CalendarEvent[] = [];
    protected fechaSeleccionada = true;

    ngOnInit() {
    	//Se crea el nuevo formulario grupal, dentro se agregan los atributos que se conrtrolarán
      	this.agregarForm = new FormGroup({
      		//Los parámetros que se le dan, validan como se mostrarán al iniciar y que se use de forma correcta
        	descripcion: new FormControl('', [Validators.required]),
        });
    }

	constructor(
		public dialogRef: MatDialogRef<AgregarferiadoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioFeriado: FeriadoService
		) {	
		// Se crea el nuevo Feriado con los valores por defecto del modelo
		this.nuevoFeriado = new Feriado();
	}

	onNoClick() {
		this.dialogRef.close();
	}

	//Se agrega el nuevo feriado, usando los parámetros adquiridos en el formulario
	agregarFeriado() {
		this.servicioFeriado.registerFeriado(this.nuevoFeriado).subscribe(data => {
			// Se cierra el diálogo cuando se realiza de forma exitosa el agregar
			this.dialogRef.close();
		});
	}

	dayClicked(day: CalendarMonthViewDay): void {
	    if (this.selectedDay) {
	      delete this.selectedDay.cssClass;
	    }

	    this.selectedDay = day;

	    if( this.selectedDay.isFuture ) {
	      this.fechaSeleccionada = false
	      day.cssClass = 'cal-day-selected'

	      let dia = this.selectedDay.date.toString().split(' ')[0]


	      if( dia === 'Sun') {
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

	      //this.nuevoFeriado.dia = dia+' '+this.selectedDay.date.toString().split(' ')[2]+'/'+this.selectedDay.date.toString().split(' ')[1]+'/'+this.selectedDay.date.toString().split(' ')[3]
	      this.nuevoFeriado.dia = this.selectedDay.date.getFullYear().toString() + ' ' + this.selectedDay.date.getMonth().toString() + ' ' + this.selectedDay.date.getDate().toString();
	      //this.nu
	      //this.nuevoFeriado.dia = this.selectedDay.date.toDateString();
	      //console.log(this.selectedDay.date.setFullYear())
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