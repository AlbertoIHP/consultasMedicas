import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';
import { Persona } from '../../../../Models/Persona.model';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-editar-vacunas-paciente',
  templateUrl: './editar-vacunas-paciente.component.html',
  styleUrls: ['./editar-vacunas-paciente.component.css']
})
export class EditarVacunasPacienteComponent implements OnInit {
    public paciente:any;

    public arrayVacunasPaciente:any;

	  public totalPacientes: any;
	  public totalVacunas: any;
	  public totalPersonas: any;
    public totalPersonasTemp:any;

    public servicioPaciente: any;
    public servicioVacuna: any;
    public servicioPersona: any;
    public servicioVacunasPaciente:any;

    options: DatepickerOptions = {
      minYear: 1970,
      maxYear: new Date().getFullYear() + 1 ,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday,
      locale: esLocale
  
   };

    ngOnInit()
  {
    this.servicioVacuna.getVacunas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalVacunas = todo;

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

    for(let i=0;i<this.totalVacunas.length;i++){
      for(let j=0;j<this.arrayVacunasPaciente.length;j++){
        if(this.totalVacunas[i].id==this.arrayVacunasPaciente[j].Vacuna_id){
          this.arrayVacunasPaciente[j].nombreVacuna=this.totalVacunas[i].nombre;
        }
      }
    }
      this.totalPersonasTemp=arrayTemp;

    
  }

  constructor(
  	public dialogRef: MatDialogRef<EditarVacunasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      this.paciente=data.paciente;
      this.arrayVacunasPaciente=data.arrayVacunasPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalVacunas=data.vacunas;
  		this.totalPersonas=data.personas;
      this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioVacuna=data.servicioVacuna;
  		this.servicioPersona=data.servicioPersona;
      this.servicioVacunasPaciente=data.servicioVacunasPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }


  obtenerFecha(vacunaPaciente){
    if(vacunaPaciente.esVerdadero){
      vacunaPaciente.fechaVacunacion=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(vacunaPaciente.esVerdadero==false){
      vacunaPaciente.fechaVacunacion=null;
    }

  }

  editarVacunasPaciente()
  {

    for(let i=0;i<this.arrayVacunasPaciente.length;i++){

      if(this.arrayVacunasPaciente[i].fechaVacunacion!=null){
      this.arrayVacunasPaciente[i].fechaVacunacion=new Date(this.arrayVacunasPaciente[i].fechaVacunacion).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioVacunasPaciente.editVacunaPaciente(this.arrayVacunasPaciente[i], this.arrayVacunasPaciente[i].id).subscribe( data => {
        console.log(data);
        this.dialogRef.close();

      });

    }

  }
}

