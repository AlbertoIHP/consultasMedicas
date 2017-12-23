import { Component, Inject, OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

import { EnfermedadesCronicasPacienteService } from '../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-set-enfermedades-cronicas-paciente',
  templateUrl: './set-enfermedades-cronicas-paciente.component.html',
  styleUrls: ['./set-enfermedades-cronicas-paciente.component.css']
})
export class SetEnfermedadesCronicasPacienteComponent implements OnInit {

   @Input() paciente: any;

  public arrayEnfermedadesCronicasPaciente: any;

  public totalPacientes: any;
  public totalEnfermedadesCronicas: any;
  public totalEnfermedadesCronicasPaciente:any;


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

     this.arrayEnfermedadesCronicasPaciente = [];

     this.totalPacientes=[];
     this.totalEnfermedadesCronicas=[];
     this.totalEnfermedadesCronicasPaciente=[];

   
    this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicas = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalEnfermedadesCronicasPaciente = todo;

            this.obtenerArrayDeteccion(this.paciente.id,this.arrayEnfermedadesCronicasPaciente,this.totalEnfermedadesCronicasPaciente);
            this.reemplazarIdPorString();
        });
        

      });
    });
  }

 obtenerArrayDeteccion(idPaciente,array,total){
    for(let i=0;i<total.length;i++){

      if(total[i].Paciente_id===idPaciente){

        array.push(total[i]);
      }

      if(total[i].fechaDeteccion != null){

        total[i].esVerdadero=true;

      }else if(total[i].fechaDeteccion==null){

        total[i].esVerdadero=false;
      }
    }

  }

  reemplazarIdPorString()
  {

    for(let i=0;i<this.totalEnfermedadesCronicas.length;i++){
      for(let j=0;j<this.arrayEnfermedadesCronicasPaciente.length;j++){
        if(this.totalEnfermedadesCronicas[i].id==this.arrayEnfermedadesCronicasPaciente[j].EnfermedadCronica_id){
          this.arrayEnfermedadesCronicasPaciente[j].nombreEnfermedad=this.totalEnfermedadesCronicas[i].nombre;
        }
      }
    }
    
  }

  constructor
  (

    public servicioEnfermedadCronica:EnfermedadCronicaService,
    public servicioEnfermedadesCronicasPaciente:EnfermedadesCronicasPacienteService,
    public servicioPaciente:PacienteService
  
    ) 
  {
      
      

     }

  
  obtenerFecha(enfermedadPaciente){
    if(enfermedadPaciente.esVerdadero){
      enfermedadPaciente.fechaDeteccion=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(enfermedadPaciente.esVerdadero==false){
      enfermedadPaciente.fechaDeteccion=null;
    }

    this.editarEnfermedadesCronicasPaciente();


  }
  editarEnfermedadesCronicasPaciente()
  {

    for(let i=0;i<this.arrayEnfermedadesCronicasPaciente.length;i++){

      if(this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion!=null){
      this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion=new Date(this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioEnfermedadesCronicasPaciente.editEnfermedadesCronicasPaciente(this.arrayEnfermedadesCronicasPaciente[i], this.arrayEnfermedadesCronicasPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }

}
