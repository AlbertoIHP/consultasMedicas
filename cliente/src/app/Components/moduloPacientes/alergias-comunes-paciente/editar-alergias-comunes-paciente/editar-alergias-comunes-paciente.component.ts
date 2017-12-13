import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';

import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-editar-alergias-comunes-paciente',
  templateUrl: './editar-alergias-comunes-paciente.component.html',
  styleUrls: ['./editar-alergias-comunes-paciente.component.css']
})
export class EditarAlergiasComunesPacienteComponent implements OnInit {
	public alergiasComunesPaciente:AlergiasComunesPaciente;

	public totalPacientes: any;
	public totalAlergiasComunes: any;
	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioAlergiaComun: any;
    public servicioPersona: any;
    public servicioAlergiasComunesPaciente:any;

    options: DatepickerOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  
   };

   ngOnInit()
  {
    this.servicioAlergiaComun.getAlergias().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunes = todo;

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
  	public dialogRef: MatDialogRef<EditarAlergiasComunesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      this.alergiasComunesPaciente=data.alergiasComunesPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalAlergiasComunes=data.alergiasComunes;
  		this.totalPersonas=data.personas;
      	this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioAlergiaComun=data.servicioAlergiaComun;
  		this.servicioPersona=data.servicioPersona;
      	this.servicioAlergiasComunesPaciente=data.servicioAlergiasComunesPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

  editarAlergiasComunesPaciente()
  {

    this.alergiasComunesPaciente.fechaDeteccion=new Date(this.alergiasComunesPaciente.fechaDeteccion).toISOString().slice(0, 19).replace('T', ' ');


    this.servicioAlergiasComunesPaciente.editAlergiasComunesPaciente(this.alergiasComunesPaciente, this.alergiasComunesPaciente.id).subscribe( data => {
      console.log(data);
      this.dialogRef.close();

    });
  }

}
