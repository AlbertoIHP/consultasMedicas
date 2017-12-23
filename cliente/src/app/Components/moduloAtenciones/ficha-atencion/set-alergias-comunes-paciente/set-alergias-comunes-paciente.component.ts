import { Component, Inject, OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

import { AlergiasComunesPacienteService } from '../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-set-alergias-comunes-paciente',
  templateUrl: './set-alergias-comunes-paciente.component.html',
  styleUrls: ['./set-alergias-comunes-paciente.component.css']
})
export class SetAlergiasComunesPacienteComponent implements OnInit {

  @Input() paciente: any;

  public arrayAlergiasComunesPaciente: any;

  public totalPacientes: any;
  public totalAlergiasComunes: any;
  public totalAlergiasComunesPaciente:any;


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

     this.arrayAlergiasComunesPaciente = [];

     this.totalPacientes=[];
     this.totalAlergiasComunes=[];
     this.totalAlergiasComunesPaciente=[];

   
    this.servicioAlergiaComun.getAlergias().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunes = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalAlergiasComunesPaciente = todo;

            this.obtenerArrayDeteccion(this.paciente.id,this.arrayAlergiasComunesPaciente,this.totalAlergiasComunesPaciente);
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

    for(let i=0;i<this.totalAlergiasComunes.length;i++){
      for(let j=0;j<this.arrayAlergiasComunesPaciente.length;j++){
        if(this.totalAlergiasComunes[i].id==this.arrayAlergiasComunesPaciente[j].Alergia_id){
          this.arrayAlergiasComunesPaciente[j].nombreAlergia=this.totalAlergiasComunes[i].nombre;
        }
      }
    }
    
  }

  constructor
  (

    public servicioAlergiaComun:AlergiaService,
    public servicioAlergiasComunesPaciente:AlergiasComunesPacienteService,
    public servicioPaciente:PacienteService
  
    ) 
  {
      
      

     }

  
  obtenerFecha(alergiaPaciente){
    if(alergiaPaciente.esVerdadero){
      alergiaPaciente.fechaDeteccion=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(alergiaPaciente.esVerdadero==false){
      alergiaPaciente.fechaDeteccion=null;
    }

    this.editarAlergiasComunesPaciente();


  }
  editarAlergiasComunesPaciente()
  {

    for(let i=0;i<this.arrayAlergiasComunesPaciente.length;i++){

      if(this.arrayAlergiasComunesPaciente[i].fechaDeteccion!=null){
      this.arrayAlergiasComunesPaciente[i].fechaDeteccion=new Date(this.arrayAlergiasComunesPaciente[i].fechaDeteccion).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioAlergiasComunesPaciente.editAlergiasComunesPaciente(this.arrayAlergiasComunesPaciente[i], this.arrayAlergiasComunesPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }

}
