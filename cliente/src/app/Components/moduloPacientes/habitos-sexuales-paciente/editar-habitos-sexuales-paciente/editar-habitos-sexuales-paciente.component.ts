import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';
@Component({
  selector: 'app-editar-habitos-sexuales-paciente',
  templateUrl: './editar-habitos-sexuales-paciente.component.html',
  styleUrls: ['./editar-habitos-sexuales-paciente.component.css']
})
export class EditarHabitosSexualesPacienteComponent implements OnInit {
	public habitosSexualesPaciente:HabitosSexualesPaciente;

	public totalPacientes: any;
	public totalHabitosSexuales: any;
	public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioHabitoSexual: any;
    public servicioPersona: any;
    public servicioHabitosSexualesPaciente:any;

      ngOnInit()
  {
    this.servicioHabitoSexual.getHabitoSexuales().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitosSexuales = todo;

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
  	public dialogRef: MatDialogRef<EditarHabitosSexualesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      this.habitosSexualesPaciente=data.habitosSexualesPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalHabitosSexuales=data.habitosSexuales;
  		this.totalPersonas=data.personas;
      	this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioHabitoSexual=data.servicioHabitoSexual;
  		this.servicioPersona=data.servicioPersona;
      	this.servicioHabitosSexualesPaciente=data.servicioHabitosSexualesPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

  editarHabitosSexualesPaciente()
  {
    //this.pasarStringId();
    this.servicioHabitosSexualesPaciente.editHabitosSexualesPaciente(this.habitosSexualesPaciente, this.habitosSexualesPaciente.id).subscribe( data => {
      console.log(data);
      this.dialogRef.close();

    });
  }
}
