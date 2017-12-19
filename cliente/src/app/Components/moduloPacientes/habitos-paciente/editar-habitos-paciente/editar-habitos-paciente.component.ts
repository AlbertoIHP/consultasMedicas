import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { HabitosPaciente } from '../../../../Models/HabitosPaciente.model';
import { Persona } from '../../../../Models/Persona.model';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-editar-habitos-paciente',
  templateUrl: './editar-habitos-paciente.component.html',
  styleUrls: ['./editar-habitos-paciente.component.css']
})
export class EditarHabitosPacienteComponent implements OnInit {
  public paciente:any;
  public arrayHabitosPaciente:any;

	public totalPacientes: any;
	public totalHabitos: any;
	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioHabito: any;
    public servicioPersona: any;
    public servicioHabitosPaciente:any;

     options: DatepickerOptions = {
      minYear: 1970,
      maxYear: new Date().getFullYear() + 1 ,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
      locale: esLocale

   };


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

    for(let i=0;i<this.totalHabitos.length;i++){
      for(let j=0;j<this.arrayHabitosPaciente.length;j++){
        if(this.totalHabitos[i].id==this.arrayHabitosPaciente[j].Habito_id){
          this.arrayHabitosPaciente[j].nombreHabito=this.totalHabitos[i].nombre;
        }
      }
    }
      this.totalPersonasTemp=arrayTemp;

    
  }

   constructor(
  	public dialogRef: MatDialogRef<EditarHabitosPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      
        this.paciente=data.paciente;
        this.arrayHabitosPaciente=data.arrayHabitosPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalHabitos=data.habitos;
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


  obtenerFecha(habitoPaciente){
    if(habitoPaciente.esVerdadero){
      habitoPaciente.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(habitoPaciente.esVerdadero==false){
      habitoPaciente.fechaInicio=null;
    }

  }

  editarHabitosPaciente()
  {

    for(let i=0;i<this.arrayHabitosPaciente.length;i++){

      if(this.arrayHabitosPaciente[i].fechaInicio!=null){
      this.arrayHabitosPaciente[i].fechaInicio=new Date(this.arrayHabitosPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioHabitosPaciente.editHabitosPaciente(this.arrayHabitosPaciente[i], this.arrayHabitosPaciente[i].id).subscribe( data => {
        console.log(data);
        this.dialogRef.close();

      });

    }

  }
}