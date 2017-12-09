import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';

@Component({
  selector: 'app-agregar-vacunas-paciente',
  templateUrl: './agregar-vacunas-paciente.component.html',
  styleUrls: ['./agregar-vacunas-paciente.component.css']
})
export class AgregarVacunasPacienteComponent implements OnInit {
	public nuevaVacunasPaciente: VacunasPaciente;
	public totalVacunas: any;
  	public totalPacientes: any;

  	public servicioVacuna: any;
  	public servicioVacunasPaciente: any;
  	public servicioPaciente: any;

  	ngOnInit()
  {
    this.servicioVacuna.getVacunas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalVacunas = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
      	  var todo: any = data;
	      todo = todo.data;
	      this.totalPacientes = todo;
      });
    });
  }

  constructor(
  	public dialogRef: MatDialogRef<AgregarVacunasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.nuevaVacunasPaciente = new VacunasPaciente();
		  this.totalVacunas = data.vacunas;
    	this.totalPacientes = data.pacientes;
    	this.servicioVacunasPaciente = data.servicioVacunasPaciente;
    	this.servicioVacuna = data.servicioVacuna;
    	this.servicioPaciente = data.servicioPaciente;
  	 }


  	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarVacunasPaciente()
	{
		this.servicioVacunasPaciente.registerVacunaPaciente(this.nuevaVacunasPaciente).subscribe(data => {
			this.dialogRef.close();
		});
	}

  

}
