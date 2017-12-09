import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UsoMedicamento } from '../../../../Models/UsoMedicamento.model';

@Component({
  selector: 'app-editar-uso-medicamento',
  templateUrl: './editar-uso-medicamento.component.html',
  styleUrls: ['./editar-uso-medicamento.component.css']
})
export class EditarUsoMedicamentoComponent implements OnInit {

	public usoMedicamento:UsoMedicamento;

	public totalPacientes: any;
	public totalMedicamentos: any;
	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioMedicamento: any;
    public servicioPersona: any;
    public servicioUsoMedicamento:any;

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
      this.totalPersonasTemp=arrayTemp;

    
  }


 constructor(
  	public dialogRef: MatDialogRef<EditarUsoMedicamentoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      	this.usoMedicamento=data.usoMedicamentos;

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

  editarUsoMedicamento()
  {
    //this.pasarStringId();
    this.servicioUsoMedicamento.editUsoMedicamento(this.usoMedicamento, this.usoMedicamento.id).subscribe( data => {
      console.log(data);
      this.dialogRef.close();

    });
  }

 

}
