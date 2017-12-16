import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AlergiasMedicamentosPaciente } from '../../../../Models/AlergiasMedicamentosPaciente.model';
import { Persona } from '../../../../Models/Persona.model';
import { DatepickerOptions } from 'ng2-datepicker';


@Component({
  selector: 'app-editar-alergias-paciente',
  templateUrl: './editar-alergias-paciente.component.html',
  styleUrls: ['./editar-alergias-paciente.component.css']
})
export class EditarAlergiasPacienteComponent implements OnInit {

  	public paciente:any;

    public arrayAlergiasMedicamentosPaciente:any;

	public totalPacientes: any;
	public totalMedicamentos: any;
	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioMedicamento: any;
    public servicioPersona: any;
    public servicioAlergiasMedicamentosPaciente:any;

    options: DatepickerOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  
   };


      ngOnInit()
  {
    this.servicioMedicamento.getMedicamentos().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalMedicamentos = todo;

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

    for(let i=0;i<this.totalMedicamentos.length;i++){
      for(let j=0;j<this.arrayAlergiasMedicamentosPaciente.length;j++){
        if(this.totalMedicamentos[i].id==this.arrayAlergiasMedicamentosPaciente[j].Medicamento_id){
          this.arrayAlergiasMedicamentosPaciente[j].nombreMedicamento=this.totalMedicamentos[i].nombrecomun+" / "+this.totalMedicamentos[i].nombrecientifico;
        }
      }
    }

      this.totalPersonasTemp=arrayTemp;
  }

  constructor(
  	public dialogRef: MatDialogRef<EditarAlergiasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
        this.paciente=data.paciente;

        this.arrayAlergiasMedicamentosPaciente=data.arrayAlergiasMedicamentosPaciente;

      	this.totalPacientes=data.pacientes;
      	this.totalMedicamentos=data.medicamentos;
      	this.totalPersonas=data.personas;
      	this.totalPersonasTemp=[];
      	this.servicioPaciente=data.servicioPaciente;
      	this.servicioMedicamento=data.servicioMedicamento;
      	this.servicioPersona=data.servicioPersona;
        this.servicioAlergiasMedicamentosPaciente=data.servicioAlergiasMedicamentosPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }


  obtenerFecha(medicamentosPaciente){
    if(medicamentosPaciente.esVerdadero){
      medicamentosPaciente.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(medicamentosPaciente.esVerdadero==false){
      medicamentosPaciente.fechaInicio=null;
    }

  }

  editarAlergiasMedicamentosPaciente()
  {

    for(let i=0;i<this.arrayAlergiasMedicamentosPaciente.length;i++){

      if(this.arrayAlergiasMedicamentosPaciente[i].fechaInicio!=null){
      this.arrayAlergiasMedicamentosPaciente[i].fechaInicio=new Date(this.arrayAlergiasMedicamentosPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioAlergiasMedicamentosPaciente.editAlergiasMedicamentosPaciente(this.arrayAlergiasMedicamentosPaciente[i], this.arrayAlergiasMedicamentosPaciente[i].id).subscribe( data => {
        console.log(data);
        this.dialogRef.close();

      });

    }

  }

}
