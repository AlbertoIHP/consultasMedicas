import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';
import { Persona } from '../../../../Models/Persona.model';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';


@Component({
  selector: 'app-editar-alergias-comunes-paciente',
  templateUrl: './editar-alergias-comunes-paciente.component.html',
  styleUrls: ['./editar-alergias-comunes-paciente.component.css']
})
export class EditarAlergiasComunesPacienteComponent implements OnInit {
	public paciente:any;
  public arrayAlergiasComunesPaciente: any;

	public totalPacientes: any;
	public totalAlergiasComunes: any;
	public totalPersonas: any;
  public totalPersonasTemp:any;

  public servicioPaciente: any;
  public servicioAlergiaComun: any;
  public servicioPersona: any;
  public servicioAlergiasComunesPaciente:any;

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
    this.servicioAlergiaComun.getAlergias().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunes = todo;

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

    for(let i=0;i<this.totalAlergiasComunes.length;i++){
      for(let j=0;j<this.arrayAlergiasComunesPaciente.length;j++){
        if(this.totalAlergiasComunes[i].id==this.arrayAlergiasComunesPaciente[j].Alergia_id){
          this.arrayAlergiasComunesPaciente[j].nombreAlergia=this.totalAlergiasComunes[i].nombre;
        }
      }
    }
      this.totalPersonasTemp=arrayTemp;

    
  }

  constructor(
  	public dialogRef: MatDialogRef<EditarAlergiasComunesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {
      this.paciente = data.paciente;
      
      this.arrayAlergiasComunesPaciente = data.arrayAlergiasComunesPaciente;

  		this.totalPacientes=data.pacientes;
  		this.totalAlergiasComunes=data.alergiasComunes;
  		this.totalPersonas=data.personas;
      	this.totalPersonasTemp=[];

  		this.servicioPaciente=data.servicioPaciente;
  		this.servicioAlergiaComun=data.servicioAlergiaComun;
  		this.servicioPersona=data.servicioPersona;
      	this.servicioAlergiasComunesPaciente=data.servicioAlergiasComunesPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

  obtenerFecha(alergiaPaciente){
    if(alergiaPaciente.esVerdadero){
      alergiaPaciente.fechaDeteccion=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(alergiaPaciente.esVerdadero==false){
      alergiaPaciente.fechaDeteccion=null;
    }

  }
  editarAlergiasComunesPaciente()
  {

    for(let i=0;i<this.arrayAlergiasComunesPaciente.length;i++){

      if(this.arrayAlergiasComunesPaciente[i].fechaDeteccion!=null){
      this.arrayAlergiasComunesPaciente[i].fechaDeteccion=new Date(this.arrayAlergiasComunesPaciente[i].fechaDeteccion).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioAlergiasComunesPaciente.editAlergiasComunesPaciente(this.arrayAlergiasComunesPaciente[i], this.arrayAlergiasComunesPaciente[i].id).subscribe( data => {
        console.log(data);
        this.dialogRef.close();

      });

    }
  }

}
