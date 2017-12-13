import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EnfermedadesCronicasPaciente } from '../../../../Models/EnfermedadesCronicasPaciente.model';

import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-editar-enfermedades-cronicas-paciente',
  templateUrl: './editar-enfermedades-cronicas-paciente.component.html',
  styleUrls: ['./editar-enfermedades-cronicas-paciente.component.css']
})
export class EditarEnfermedadesCronicasPacienteComponent implements OnInit {

  	public enfermedadesCronicasPaciente:EnfermedadesCronicasPaciente;

	public totalPacientes: any;
	public totalEnfermedadesCronicas: any;
	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioEnfermedadCronica: any;
    public servicioPersona: any;
    public servicioEnfermedadesCronciasPaciente:any;

    options: DatepickerOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  
   };

    ngOnInit()
  {
    this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicas = todo;

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
  	public dialogRef: MatDialogRef<EditarEnfermedadesCronicasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      	this.enfermedadesCronicasPaciente=data.enfermedadesCronicasPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalEnfermedadesCronicas=data.enfermedadesCronicas;
  		this.totalPersonas=data.personas;
      	this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioEnfermedadCronica=data.servicioEnfermedadCronica;
  		this.servicioPersona=data.servicioPersona;
      	this.servicioEnfermedadesCronciasPaciente=data.servicioEnfermedadesCronicasPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

  editarEnfermedadesCronicasPaciente()
  {

    this.enfermedadesCronicasPaciente.fechaDeteccion=new Date(this.enfermedadesCronicasPaciente.fechaDeteccion).toISOString().slice(0, 19).replace('T', ' ');


    this.servicioEnfermedadesCronciasPaciente.editEnfermedadesCronicasPaciente(this.enfermedadesCronicasPaciente, this.enfermedadesCronicasPaciente.id).subscribe( data => {
      console.log(data);
      this.dialogRef.close();

    });
  }
  	
}
