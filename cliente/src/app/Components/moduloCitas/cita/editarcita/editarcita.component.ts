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
import { AgregarcitaComponent } from '../agregarcita/agregarcita.component'

@Component({
  selector: 'app-editarcita',
  templateUrl: './editarcita.component.html',
  styleUrls: ['./editarcita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EditarcitaComponent extends AgregarcitaComponent implements OnInit {

  constructor(
    dialogRef: MatDialogRef<EditarcitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    _formBuilder: FormBuilder,
    servicioEspecialidad: EspecialidadService,
    servicioPersona: PersonaService,
    servicioDisponibilidad: DisponibilidadService
    )
  {
    super(dialogRef, data, _formBuilder, servicioEspecialidad, servicioPersona, servicioDisponibilidad)
  }

  ngOnInit() {
  }

  editarCita()
  {
    this.servicioCitas.editCita(this.cita, this.cita.id).subscribe( data => {
      console.log(data)
    })
  }

}
