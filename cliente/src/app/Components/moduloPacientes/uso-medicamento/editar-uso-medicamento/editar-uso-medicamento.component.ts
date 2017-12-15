import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UsoMedicamento } from '../../../../Models/UsoMedicamento.model';
import { Persona } from '../../../../Models/Persona.model';

import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-editar-uso-medicamento',
  templateUrl: './editar-uso-medicamento.component.html',
  styleUrls: ['./editar-uso-medicamento.component.css']
})
export class EditarUsoMedicamentoComponent implements OnInit {

    public paciente:any;

    public arrayMedicamentosPaciente:any;

  	public totalPacientes: any;
  	public totalMedicamentos: any;
  	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioMedicamento: any;
    public servicioPersona: any;
    public servicioUsoMedicamento:any;

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
      for(let j=0;j<this.arrayMedicamentosPaciente.length;j++){
        if(this.totalMedicamentos[i].id==this.arrayMedicamentosPaciente[j].Medicamento_id){
          this.arrayMedicamentosPaciente[j].nombreMedicamento=this.totalMedicamentos[i].nombrecomun;
        }
      }
    }

      this.totalPersonasTemp=arrayTemp;

    
  }


 constructor(
  	public dialogRef: MatDialogRef<EditarUsoMedicamentoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
        this.paciente=data.paciente;

        this.arrayMedicamentosPaciente=data.arrayUsoMedicamentos;

  		this.totalPacientes=data.pacientes;
  		this.totalMedicamentos=data.medicamentos;
  		this.totalPersonas=data.personas;
      	this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioMedicamento=data.servicioMedicamento;
  		this.servicioPersona=data.servicioPersona;
      	this.servicioUsoMedicamento=data.servicioUsoMedicamento;

  	 }

  	onNoClick()
    {
      this.dialogRef.close();
    }


  obtenerFecha(medicamentoPaciente){
    if(medicamentoPaciente.esVerdadero){
      medicamentoPaciente.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(medicamentoPaciente.esVerdadero==false){
      medicamentoPaciente.fechaInicio=null;
    }

  }

 editarMedicamentosPaciente()
  {

    for(let i=0;i<this.arrayMedicamentosPaciente.length;i++){

      if(this.arrayMedicamentosPaciente[i].fechaInicio!=null){
      this.arrayMedicamentosPaciente[i].fechaInicio=new Date(this.arrayMedicamentosPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioUsoMedicamento.editUsoMedicamento(this.arrayMedicamentosPaciente[i], this.arrayMedicamentosPaciente[i].id).subscribe( data => {
        console.log(data);
        this.dialogRef.close();

      });

    }

  }
}