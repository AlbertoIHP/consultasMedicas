import { Component, OnInit } from '@angular/core';

import { SecretarypacientesComponent } from '../../../secretary/secretarypacientes/secretarypacientes.component';



import { PersonaService } from '../../../../Services/persona/persona.service';


import { TipoSangreService } from '../../../../Services/tiposangre/tiposangre.service';


import { PacienteService } from '../../../../Services/paciente/paciente.service';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-pacientesadmin',
  templateUrl: './pacientesadmin.component.html',
  styleUrls: ['./pacientesadmin.component.css']
})
export class PacientesadminComponent extends SecretarypacientesComponent implements OnInit {

  constructor(
    public servicioPersona: PersonaService,
    public servicioTS: TipoSangreService,
    public servicioPaciente: PacienteService,
    public dialog: MatDialog
    ) {
    super(servicioPersona, servicioTS, servicioPaciente, dialog);
   }

  ngOnInit() {
  }


  desactivarPaciente(paciente)
  {
    this.servicioPersona.getPersona(paciente.Persona_id).subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      todo.estado = 0;
      this.servicioPersona.editPersona(todo, todo.id).subscribe(data => {
        console.log(data);
        this.actualizarPersonas();
      })
    });

  }

 activarPaciente(paciente)
 {
    this.servicioPersona.getPersona(paciente.Persona_id).subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      todo.estado = 1;
      this.servicioPersona.editPersona(todo, todo.id).subscribe(data => {
        console.log(data);
        this.actualizarPersonas();
      })
    });
 }


}
