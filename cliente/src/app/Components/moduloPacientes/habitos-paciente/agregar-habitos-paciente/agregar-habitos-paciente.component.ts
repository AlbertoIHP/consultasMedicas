import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HabitosPaciente } from '../../../../Models/HabitosPaciente.model';

@Component({
  selector: 'app-agregar-habitos-paciente',
  templateUrl: './agregar-habitos-paciente.component.html',
  styleUrls: ['./agregar-habitos-paciente.component.css']
})
export class AgregarHabitosPacienteComponent implements OnInit {
 	public nuevoHabitosPaciente: HabitosPaciente;
	public totalHabitos: any;
  	public totalPacientes: any;
    public totalPersonas:any;

    public totalPersonasTemp: any;

  	public servicioHabito: any;
  	public servicioHabitosPaciente: any;
  	public servicioPaciente: any;


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
            this.totalPersonas[i].Paciente_id=this.totalPacientes[j].id;
            arrayTemp.push(this.totalPersonas[i]);
          }
          //let currentPersona = this.totalPersonas.filter( persona => persona.id === this.totalPacientes[j].Persona_id);
          
        }
    }
      this.totalPersonasTemp=arrayTemp;

    
  }
  
  constructor(
  	public dialogRef: MatDialogRef<AgregarHabitosPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.nuevoHabitosPaciente = new HabitosPaciente();
		  this.totalHabitos = data.habitos;
    	this.totalPacientes = data.pacientes;
      this.totalPersonas=data.personas;

      this.totalPersonasTemp=[];

    	this.servicioHabitosPaciente = data.servicioHabitosPaciente;
    	this.servicioHabito = data.servicioHabito;
    	this.servicioPaciente = data.servicioPaciente;
  	 }


  	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarHabitosPaciente()
	{
   // this.pasarStringId();
		this.servicioHabitosPaciente.registerHabitosPaciente(this.nuevoHabitosPaciente).subscribe(data => {
			this.dialogRef.close();
		});
	}


}
