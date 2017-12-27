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
import { DisponibilidadService } from '../../../../Services/disponibilidad/disponibilidad.service'
//paginator
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-agregarcita',
  templateUrl: './agregarcita.component.html',
  styleUrls: ['./agregarcita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})
export class AgregarcitaComponent {

  protected viewDate: Date = new Date()
  protected selectedDay: CalendarMonthViewDay
  protected events: CalendarEvent[] = []
  protected firstFormGroup: FormGroup
  protected secondFormGroup: FormGroup
  protected zeroFormGroup: FormGroup
  protected cita: any
  protected estados: any
  protected pacientes: any
  protected medicos: any
  protected boxs: any
  protected servicioCitas: any
  protected especialidades: any
  protected personas: any
  protected text = "hola"

  protected fechaSeleccionada = true

  protected horasDia

  protected mostrarMedicos: any
  protected mostrarBoxs: any
  protected especialidadSeleccionada: any
  protected disponibilidades: any

  protected citas: any
  protected diaSeleccionado: any
  protected horasMedicos: any
  protected wardmeds: any
  //pagina de paginator
  protected p:number=1;
  protected todoListo = true
  protected warBoxs: any
  protected seSeleccionoMedico = true

  estaTodoListo()
  {
    if( this.cita.BoxConsulta_id != 0 && this.cita.hora != '' )
    {
      this.todoListo = false
    }
    else
    {
      this.todoListo = true
    }
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarcitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected _formBuilder: FormBuilder,
    protected servicioEspecialidad: EspecialidadService,
    protected servicioPersona: PersonaService,
    protected servicioDisponibilidad: DisponibilidadService

    )
  {
    this.mostrarBoxs = []
    this.mostrarMedicos = []
    this.especialidades = []
    this.disponibilidades = []
    this.cita = data.cita

    if( !(this.cita.BoxConsulta_id != 0) )
    {
      this.cita.BoxConsulta_id = 0
    }

      if( !(this.cita.hora  != '') )
    {
      this.cita.hora = ''
    }  
    
    

    this.estados = data.estados
    this.pacientes = data.pacientes
    this.medicos = data.medicos
    this.boxs = data.boxs
    this.servicioCitas = data.servicioCitas


    this.horasDia = [ '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00' ]
    this.horasMedicos = []

    this.servicioCitas.getCitas().subscribe( data => {
      this.citas = this.normalizeData( data )
    })

    this.servicioDisponibilidad.getDisponibilidads().subscribe( data => {
      this.disponibilidades = this.normalizeData(data)

    })

    this.servicioEspecialidad.getEspecialidads().subscribe( data => {
      this.especialidades = this.normalizeData(data)
    })

    this.servicioPersona.getPersonas().subscribe( data => {
      let totalPersonas = this.normalizeData(data)

      for( let j = 0 ; j < this.medicos.length ; j ++ )
      {
        let currentPersona = totalPersonas.filter( persona => persona.id === parseInt(this.medicos[j].Persona_id))
        let currentEspecialidad = this.especialidades.filter( especialidad => especialidad.id === parseInt(this.medicos[j].Especialidad_id))

        this.medicos[j].nombres = currentPersona[0].nombre1+' '+currentPersona[0].nombre2
        this.medicos[j].apellidos = currentPersona[0].apellido1+' '+currentPersona[0].apellido2
        this.medicos[j].rut = currentPersona[0].rut
        this.medicos[j].especialidad = currentEspecialidad[0].nombre
        this.obtenerDisponibilidad(this.medicos[j]);
        console.log(this.medicos[j])

      }

      for( let j = 0 ; j < this.pacientes.length ; j ++ )
      {
        let currentPersona = totalPersonas.filter( persona => persona.id === parseInt(this.pacientes[j].Persona_id))

        this.pacientes[j].nombre = '('+currentPersona[0].rut+') '+currentPersona[0].nombre1+' '+currentPersona[0].apellido1


      }

    })
  }

  

  horaSeleccionada( disponibilidad, medico )
  {
    this.cita.Disponibilidad_id = disponibilidad.id
    this.cita.Medico_id = medico.id
    this.seSeleccionoMedico = false
    this.horasMedicos = []


    console.log(this.cita)
    console.log(disponibilidad)

    let inicio = parseInt(disponibilidad.horaInicio.split(':')[0])
    let inicio2 = disponibilidad.horaInicio.split(':')[1]

    let fin = parseInt( disponibilidad.horaFin.split(':')[0] )
    let fin2 = disponibilidad.horaFin.split(':')[1] 

    for( let i = inicio ; i <= fin ; i++)
    {

      if( inicio2 === '00' && fin2 === '00')
      {
        this.horasMedicos.push(i.toString()+':00')       
        if( i != fin )
        {
          this.horasMedicos.push(i.toString()+':30') 
        }

      }
      else if( inicio2 === '30' && fin2 === '30')
      {
        this.horasMedicos.push(i.toString()+':30')
        if( (i+1) < fin )
        {
          this.horasMedicos.push(i.toString()+':00')
        }

      }
      else if ( inicio2 === '00' && fin2 === '30')
      {
        this.horasMedicos.push(i.toString()+':00')
        this.horasMedicos.push(i.toString()+':30')
      }
      else if( inicio2 === '30' && fin2 === '00')
      {
         if( (i+1) < fin )
         {
           this.horasMedicos.push(i.toString()+':30')
           this.horasMedicos.push(i.toString()+':00')        
         }

      }












    }


  }



  normalizeData(todo : any)
  {
    return todo.data
  }



  filtrarMedicos(especialidad)
  {

    this.especialidadSeleccionada = especialidad

    this.wardmeds = this.medicos
    this.warBoxs = this.boxs

    this.mostrarBoxs = this.warBoxs.filter( box => parseInt( box.TipoBox_id ) === this.especialidadSeleccionada.id )

    console.log(this.mostrarBoxs)


    this.mostrarMedicos = this.wardmeds.filter( medico => parseInt( medico.Especialidad_id ) === this.especialidadSeleccionada.id )



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

      this.diaSeleccionado = dia



      console.log(JSON.stringify(this.mostrarMedicos))






      this.cita.fecha = dia+' '+this.selectedDay.date.toString().split(' ')[2]+'/'+this.selectedDay.date.toString().split(' ')[1]+'/'+this.selectedDay.date.toString().split(' ')[3]

    }
    else
    {
      alert("Ha seleccionado una fecha pasada")
    }

  }


  agendarCita()
  {
    this.cita.EstadoCita_id = 1
    console.log(this.cita)
    this.servicioCitas.registerCita(this.cita).subscribe( data => {
      console.log(data)
    })
  }



  mostrarTodos(medico)
  {
    medico.mostrarTodasFechas = !medico.mostrarTodasFechas
  }

  
  obtenerDisponibilidad(medico)
  {
    this.servicioDisponibilidad.getDisponibilidads().subscribe( data => {

      var a = JSON.parse(JSON.stringify(medico));

      let disponibilidadMedico = this.normalizeData(data)

      console.log(disponibilidadMedico)

      medico.disponibilidad = disponibilidadMedico.filter( dis => parseInt(dis.Medico_id) === a.id)
      medico.mostrarTodasFechas = false


    })
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
