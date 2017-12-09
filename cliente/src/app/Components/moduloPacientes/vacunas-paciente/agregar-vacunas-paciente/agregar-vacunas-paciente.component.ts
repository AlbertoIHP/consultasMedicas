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
    public totalPersonas:any;

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
        //this.reemplazarIdPorString();
      });
    });
  }

/*
  reemplazarIdPorString()
  {
      var arrayTemp=[];
      for(let j = 0 ; j < this.totalPacientes.length ; j++)
      {

        let currentPersona = this.totalPersonas.filter( persona => persona.id === this.totalPacientes[j].Persona_id);
        arrayTemp.push(currentPersona[0]);
      }
      this.totalPacientes=arrayTemp;

    
  }

   pasarStringId(persona)
  {
   
    for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
        if(this.totalPacientes[i].Persona_id===persona.Paciente_id){
          persona.Paciente_id=this.totalPacientes[i].id;
        }
    }

  }
  */
  

  constructor(
  	public dialogRef: MatDialogRef<AgregarVacunasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.nuevaVacunasPaciente = new VacunasPaciente();
		  this.totalVacunas = data.vacunas;
    	this.totalPacientes = data.pacientes;
      this.totalPersonas=data.personas;
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
