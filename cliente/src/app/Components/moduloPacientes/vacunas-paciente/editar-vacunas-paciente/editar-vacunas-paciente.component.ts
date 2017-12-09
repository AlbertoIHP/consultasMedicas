import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';
@Component({
  selector: 'app-editar-vacunas-paciente',
  templateUrl: './editar-vacunas-paciente.component.html',
  styleUrls: ['./editar-vacunas-paciente.component.css']
})
export class EditarVacunasPacienteComponent implements OnInit {
    public vacunasPaciente:VacunasPaciente;

	  public totalPacientes: any;
	  public totalVacunas: any;
	  public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioVacuna: any;
    public servicioPersona: any;
    public servicioVacunasPaciente:any;

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
        this.reemplazarIdPorString();
      });
    });
  }


  reemplazarIdPorString()
  {
      var arrayTemp=[];
      for (let i =0; i < this.totalPersonas.length; i++) {
       
        for(let j = 0 ; j < this.totalPacientes.length ; j++)

        {
          if(this.totalPacientes[j].Persona_id===this.totalPersonas[i].id){
            //se puede agregar un nuevo elemento (paciente_id) ya que es del ipo any
            //esto permitirá acceder de inmediado al paciente, sin necesidad de otro método
            this.totalPersonas[i].Paciente_id=this.totalPacientes[j].id;
            arrayTemp.push(this.totalPersonas[i]);
          }
          //let currentPersona = this.totalPersonas.filter( persona => persona.id === this.totalPacientes[j].Persona_id);
          
        }
    }
      this.totalPersonasTemp=arrayTemp;

    
  }
/*
   pasarStringId()
  {
   
    
    let currentPaciente = this.totalPacientes.filter( paciente => paciente.Persona_id === this.vacunasPaciente.Paciente_id);
    console.log(currentPaciente);
    this.vacunasPaciente.Paciente_id=currentPaciente[0].id;

  }

*/
  constructor(
  	public dialogRef: MatDialogRef<EditarVacunasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      this.vacunasPaciente=data.vacunasPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalVacunas=data.vacunas;
  		this.totalPersonas=data.personas;
      this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioVacuna=data.servicioVacuna;
  		this.servicioPersona=data.servicioPersona;
      this.servicioVacunasPaciente=data.servicioVacunasPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

  editarVacunasPaciente()
  {
    //this.pasarStringId();
    this.servicioVacunasPaciente.editVacunaPaciente(this.vacunasPaciente, this.vacunasPaciente.id).subscribe( data => {
      console.log(data);
      this.dialogRef.close();

    });
  }
  	

 

}
