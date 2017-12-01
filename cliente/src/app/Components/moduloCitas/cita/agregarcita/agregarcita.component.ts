import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  OnInit
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { EspecialidadService } from '../../../../Services/especialidad/especialidad.service'
import { PersonaService } from '../../../../Services/persona/persona.service'

@Component({
  selector: 'app-agregarcita',
  templateUrl: './agregarcita.component.html',
  styleUrls: ['./agregarcita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    .cal-day-selected,
    .cal-day-selected:hover {
      background-color: #19334d !important;
    }
  `
  ],
  encapsulation: ViewEncapsulation.None

})
export class AgregarcitaComponent {

  viewDate: Date = new Date()
  selectedDay: CalendarMonthViewDay
  events: CalendarEvent[] = []
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  zeroFormGroup: FormGroup
  private cita: any
  private estados: any
  private pacientes: any
  private medicos: any
  private boxs: any
  private servicioCitas: any
  private especialidades: any
  private personas: any
  private text = "hola"

  private fechaSeleccionada = true



  private mostrarMedicos: any
  private mostrarBoxs: any
  private especialidadSeleccionada: any

  constructor(
    public dialogRef: MatDialogRef<AgregarcitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private servicioEspecialidad: EspecialidadService,
    private servicioPersona: PersonaService

    )
  {
    this.mostrarBoxs = []
    this.mostrarMedicos = []
    this.especialidades = []
    this.cita = data.cita
    this.estados = data.estados
    this.pacientes = data.pacientes
    this.medicos = data.medicos
    this.boxs = data.boxs
    this.servicioCitas = data.servicioCitas

    this.servicioEspecialidad.getEspecialidads().subscribe( data => {
      this.especialidades = this.normalizeData(data)
    })

    this.servicioPersona.getPersonas().subscribe( data => {
      let totalPersonas = this.normalizeData(data)

      for( let j = 0 ; j < this.medicos.length ; j ++ )
      {
        let currentPersona = totalPersonas.filter( persona => persona.id === parseInt(this.medicos[j].Persona_id))

        this.medicos[j].nombre = '('+currentPersona[0].rut+') '+currentPersona[0].nombre1+' '+currentPersona[0].apellido1
        console.log(this.medicos[j])

      }

    })
  }

  normalizeData(todo : any)
  {
    return todo.data
  }

  filtrarMedicos(especialidad)
  {

    this.especialidadSeleccionada = especialidad
    console.log("filtrando")

    let medicosEspecialidad = this.medicos.filter( medico => parseInt( medico.Especialidad_id ) === this.especialidadSeleccionada.id )
    this.mostrarMedicos = medicosEspecialidad


    let boxsEspecialidad = this.boxs.filter( box => parseInt( box.TipoBox_id ) === this.especialidadSeleccionada.id )
    this.mostrarBoxs = boxsEspecialidad

  }


  ngOnInit()
  {
        this.zeroFormGroup = this._formBuilder.group({
          zeroCtrl: ['', Validators.required]
        });

        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
  }

  onNoClick(): void
  {
   this.dialogRef.close();
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

      this.cita.fecha = dia+' '+this.selectedDay.date.toString().split(' ')[2]+'/'+this.selectedDay.date.toString().split(' ')[1]+'/'+this.selectedDay.date.toString().split(' ')[3]

    }
    else
    {
      alert("Ha seleccionado una fecha pasada")
    }



  }



  visualizarCita(box)
  {
    console.log(box)
    this.cita.BoxConsulta_id = box.id
    this.cita.EstadoCita_id = 1
    console.log(this.cita)
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
