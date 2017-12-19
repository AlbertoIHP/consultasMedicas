import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';
import { Persona } from '../../../../Models/Persona.model';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';


@Component({
  selector: 'app-editar-habitos-sexuales-paciente',
  templateUrl: './editar-habitos-sexuales-paciente.component.html',
  styleUrls: ['./editar-habitos-sexuales-paciente.component.css']
})
export class EditarHabitosSexualesPacienteComponent implements OnInit {
	  public paciente:any;

    public arrayHabitosSexualesPaciente:any;

	  public totalPacientes: any;
	  public totalHabitosSexuales: any;
	  public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioHabitoSexual: any;
    public servicioPersona: any;
    public servicioHabitosSexualesPaciente:any;

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

    for(let i=0;i<this.totalHabitosSexuales.length;i++){
      for(let j=0;j<this.arrayHabitosSexualesPaciente.length;j++){
        if(this.totalHabitosSexuales[i].id==this.arrayHabitosSexualesPaciente[j].HabitoSexual_id){
          this.arrayHabitosSexualesPaciente[j].nombreHabito=this.totalHabitosSexuales[i].nombre;
        }
      }
    }

      this.totalPersonasTemp=arrayTemp;
     
  }

  constructor(
  	public dialogRef: MatDialogRef<EditarHabitosSexualesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
        this.paciente=data.paciente;

        this.arrayHabitosSexualesPaciente=data.arrayHabitosSexualesPaciente;

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


  obtenerFecha(habsPaciente){
    if(habsPaciente.esVerdadero){
      habsPaciente.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(habsPaciente.esVerdadero==false){
      habsPaciente.fechaInicio=null;
    }

  }

  editarHabitosSexualesPaciente()
  {

    for(let i=0;i<this.arrayHabitosSexualesPaciente.length;i++){

      if(this.arrayHabitosSexualesPaciente[i].fechaInicio!=null){
      this.arrayHabitosSexualesPaciente[i].fechaInicio=new Date(this.arrayHabitosSexualesPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioHabitosSexualesPaciente.editHabitosSexualesPaciente(this.arrayHabitosSexualesPaciente[i], this.arrayHabitosSexualesPaciente[i].id).subscribe( data => {
        console.log(data);
        this.dialogRef.close();

      });

    }

  }
}
