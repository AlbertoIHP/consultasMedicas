import { Component, OnInit } from '@angular/core';

import { SecretarypacientesComponent } from '../../../secretary/secretarypacientes/secretarypacientes.component';



import { PersonaService } from '../../../../Services/persona/persona.service';


import { TipoSangreService } from '../../../../Services/tiposangre/tiposangre.service';


import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { VerfichapacienteComponent } from '../../../medic/medicpacientes/verfichapaciente/verfichapaciente.component';

import { EventosService } from '../../../../Services/eventos/eventos.service';


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
    public dialog: MatDialog,
    public servicioEventos: EventosService
    ) {
    super(servicioPersona, servicioTS, servicioPaciente, dialog);
    this.servicioEventos.seActivo.subscribe(() => {
      this.actualizarPersonas();
    });
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

        //El servicio con este metodo emite un evento que cualqueir componetne que este suscrito a dicho evento reaccionara
        console.log("Yo hice un cambio (SoyPaciente)")
       this.servicioEventos.hiceUnCambio();

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
        this.servicioEventos.hiceUnCambio();
      })
    });
 }

//función para mostrar la ficha médica del paciente correspondiente
 desplegarFichaPaciente(paciente)
  {
  this.servicioPersona.getPersona(parseInt(paciente.Persona_id)).subscribe(data => {

    var persona: any = data;
    persona = persona.data;

    console.log(persona);

    let dialogRef = this.dialog.open(VerfichapacienteComponent, {
    width: '1000px',
    height:'500px',
    data: { persona: persona }
    });

    dialogRef.afterClosed().subscribe(result => {

    this.actualizarPacientes();
    });

  });


  }


}
