import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EnfermedadesCronicasPaciente } from '../../../../Models/EnfermedadesCronicasPaciente.model';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-agregar-enfermedades-cronicas-paciente',
  templateUrl: './agregar-enfermedades-cronicas-paciente.component.html',
  styleUrls: ['./agregar-enfermedades-cronicas-paciente.component.css']
})
export class AgregarEnfermedadesCronicasPacienteComponent implements OnInit {
 	
 	public nuevoEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente;
	public totalEnfermedadesCronicas: any;
  	public totalPacientes: any;
    public totalPersonas:any;

    public totalPersonasTemp: any;

  	public servicioEnfermedadCronica: any;
  	public servicioEnfermedadesCronicasPaciente: any;
  	public servicioPaciente: any;

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
            this.totalPersonas[i].Paciente_id=this.totalPacientes[j].id;
            arrayTemp.push(this.totalPersonas[i]);
          }
          //let currentPersona = this.totalPersonas.filter( persona => persona.id === this.totalPacientes[j].Persona_id);
          
        }
    }
      this.totalPersonasTemp=arrayTemp;

    
  }

  constructor(
  	public dialogRef: MatDialogRef<AgregarEnfermedadesCronicasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.nuevoEnfermedadesCronicasPaciente = new EnfermedadesCronicasPaciente();
		  this.totalEnfermedadesCronicas = data.habitosSexuales;
    	this.totalPacientes = data.pacientes;
      this.totalPersonas=data.personas;

      this.totalPersonasTemp=[];

    	this.servicioEnfermedadesCronicasPaciente = data.servicioEnfermedadesCronicasPaciente;
    	this.servicioEnfermedadCronica = data.servicioEnfermedadCronica;
    	this.servicioPaciente = data.servicioPaciente;


  	 }

  	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarEnfermedadesCronicasPaciente()
	{
     this.nuevoEnfermedadesCronicasPaciente.fechaDeteccion=new Date(this.nuevoEnfermedadesCronicasPaciente.fechaDeteccion).toISOString().slice(0, 19).replace('T', ' ');
		this.servicioEnfermedadesCronicasPaciente.registerEnfermedadesCronicasPaciente(this.nuevoEnfermedadesCronicasPaciente).subscribe(data => {
			this.dialogRef.close();
		});
	}

}
