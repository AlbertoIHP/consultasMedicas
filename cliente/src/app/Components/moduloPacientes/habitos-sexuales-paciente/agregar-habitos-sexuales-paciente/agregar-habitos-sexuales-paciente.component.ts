import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';
@Component({
  selector: 'app-agregar-habitos-sexuales-paciente',
  templateUrl: './agregar-habitos-sexuales-paciente.component.html',
  styleUrls: ['./agregar-habitos-sexuales-paciente.component.css']
})
export class AgregarHabitosSexualesPacienteComponent implements OnInit {
 	public nuevoHabitosSexualesPaciente: HabitosSexualesPaciente;
	public totalHabitosSexuales: any;
  	public totalPacientes: any;
    public totalPersonas:any;

    public totalPersonasTemp: any;

  	public servicioHabitoSexual: any;
  	public servicioHabitosSexualesPaciente: any;
  	public servicioPaciente: any;

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
            this.totalPersonas[i].Paciente_id=this.totalPacientes[j].id;
            arrayTemp.push(this.totalPersonas[i]);
          }
          //let currentPersona = this.totalPersonas.filter( persona => persona.id === this.totalPacientes[j].Persona_id);
          
        }
    }
      this.totalPersonasTemp=arrayTemp;

    
  }

  constructor(
  	public dialogRef: MatDialogRef<AgregarHabitosSexualesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.nuevoHabitosSexualesPaciente = new HabitosSexualesPaciente();
		  this.totalHabitosSexuales = data.habitosSexuales;
    	this.totalPacientes = data.pacientes;
      this.totalPersonas=data.personas;

      this.totalPersonasTemp=[];

    	this.servicioHabitosSexualesPaciente = data.servicioHabitosSexualesPaciente;
    	this.servicioHabitoSexual = data.servicioHabitoSexual;
    	this.servicioPaciente = data.servicioPaciente;


  	 }

  	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarHabitosSexualesPaciente()
	{
   // this.pasarStringId();
		this.servicioHabitosSexualesPaciente.registerHabitosSexualesPaciente(this.nuevoHabitosSexualesPaciente).subscribe(data => {
			this.dialogRef.close();
		});
	}

}
