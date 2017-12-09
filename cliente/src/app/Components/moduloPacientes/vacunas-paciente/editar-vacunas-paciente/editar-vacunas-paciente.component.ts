import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';
@Component({
  selector: 'app-editar-vacunas-paciente',
  templateUrl: './editar-vacunas-paciente.component.html',
  styleUrls: ['./editar-vacunas-paciente.component.css']
})
export class EditarVacunasPacienteComponent implements OnInit {
	public totalPacientes: any;
	public totalVacunas: any;
	public totalPersonas: any;

    public servicioPacientes: any;
    public servicioVacunas: any;
    public servicioPersonas: any;


  constructor(
  	public dialogRef: MatDialogRef<EditarVacunasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.totalPacientes=data.pacientes;
  		this.totalVacunas=data.vacunas;
  		this.totalPersonas=data.personas;
  		this.servicioPacientes=data.servicioPaciente;
  		this.servicioVacunas=data.servicioVacuna;
  		this.servicioPersonas=data.servicioPersona;

  	 }


  	

  ngOnInit() {
  }

}
