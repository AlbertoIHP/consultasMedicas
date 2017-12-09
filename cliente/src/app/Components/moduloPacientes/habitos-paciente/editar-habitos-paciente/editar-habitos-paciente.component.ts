import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { HabitosPaciente } from '../../../../Models/HabitosPaciente.model';
@Component({
  selector: 'app-editar-habitos-paciente',
  templateUrl: './editar-habitos-paciente.component.html',
  styleUrls: ['./editar-habitos-paciente.component.css']
})
export class EditarHabitosPacienteComponent implements OnInit {
	public habitosPaciente:HabitosPaciente;

	public totalPacientes: any;
	public totalHabitos: any;
	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioHabito: any;
    public servicioPersona: any;
    public servicioHabitosPaciente:any;


    ngOnInit()
  {
    this.servicioHabito.getHabitos().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitos = todo;

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

   constructor(
  	public dialogRef: MatDialogRef<EditarHabitosPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      	this.habitosPaciente=data.habitosPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalHabitos=data.vacunas;
  		this.totalPersonas=data.personas;
      	this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioHabito=data.servicioHabito;
  		this.servicioPersona=data.servicioPersona;
      	this.servicioHabitosPaciente=data.servicioHabitosPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

  editarHabitosPaciente()
  {
    //this.pasarStringId();
    this.servicioHabitosPaciente.editHabitosPaciente(this.habitosPaciente, this.habitosPaciente.id).subscribe( data => {
      console.log(data);
      this.dialogRef.close();

    });
  }
  	

  

}
