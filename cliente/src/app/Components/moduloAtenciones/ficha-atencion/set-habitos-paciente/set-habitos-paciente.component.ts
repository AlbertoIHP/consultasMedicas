import { Component, Inject, OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

import { HabitosPacienteService } from '../../../../Services/habitospaciente/habitos-paciente.service';
import { HabitoService } from '../../../../Services/habito/habito.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-set-habitos-paciente',
  templateUrl: './set-habitos-paciente.component.html',
  styleUrls: ['./set-habitos-paciente.component.css']
})
export class SetHabitosPacienteComponent implements OnInit {

  
   @Input() paciente: any;

  public arrayHabitosPaciente: any;

  public totalPacientes: any;
  public totalHabitos: any;
  public totalHabitosPaciente:any;


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

     this.arrayHabitosPaciente = [];

     this.totalPacientes=[];
     this.totalHabitos=[];
     this.totalHabitosPaciente=[];

   
    this.servicioHabito.getHabitos().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitos = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioHabitosPaciente.getHabitosPacientes().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalHabitosPaciente = todo;

            this.obtenerArrayInicio(this.paciente.id,this.arrayHabitosPaciente,this.totalHabitosPaciente);
            this.reemplazarIdPorString();
        });
        

      });
    });
  }

 obtenerArrayInicio(idPaciente,array,total){
    for(let i=0;i<total.length;i++){

      if(total[i].Paciente_id===idPaciente){

        array.push(total[i]);
      }

      if(total[i].fechaInicio != null){

        total[i].esVerdadero=true;

      }else if(total[i].fechaInicio==null){

        total[i].esVerdadero=false;
      }
    }

  }

  reemplazarIdPorString()
  {

    for(let i=0;i<this.totalHabitos.length;i++){
      for(let j=0;j<this.arrayHabitosPaciente.length;j++){
        if(this.totalHabitos[i].id==this.arrayHabitosPaciente[j].Habito_id){
          this.arrayHabitosPaciente[j].nombreHabito=this.totalHabitos[i].nombre;
        }
      }
    }
    
  }

  constructor
  (

    public servicioHabito:HabitoService,
    public servicioHabitosPaciente:HabitosPacienteService,
    public servicioPaciente:PacienteService
  
    ) 
  {
      
      

     }

  
  obtenerFecha(habitoPaciente){
    if(habitoPaciente.esVerdadero){
      habitoPaciente.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(habitoPaciente.esVerdadero==false){
      habitoPaciente.fechaInicio=null;
    }

    this.editarHabitosPaciente();


  }
  editarHabitosPaciente()
  {

    for(let i=0;i<this.arrayHabitosPaciente.length;i++){

      if(this.arrayHabitosPaciente[i].fechaInico!=null){
      this.arrayHabitosPaciente[i].fechaInico=new Date(this.arrayHabitosPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioHabitosPaciente.editHabitosPaciente(this.arrayHabitosPaciente[i], this.arrayHabitosPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }

}
