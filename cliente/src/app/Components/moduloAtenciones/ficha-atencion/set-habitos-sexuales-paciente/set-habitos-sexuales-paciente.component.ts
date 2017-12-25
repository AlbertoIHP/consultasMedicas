import { Component, Inject, OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

import { HabitosSexualesPacienteService } from '../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';
@Component({
  selector: 'app-set-habitos-sexuales-paciente',
  templateUrl: './set-habitos-sexuales-paciente.component.html',
  styleUrls: ['./set-habitos-sexuales-paciente.component.css']
})
export class SetHabitosSexualesPacienteComponent implements OnInit {

   @Input() paciente: any;

  public arrayHabitosSexualesPaciente: any;

  public totalPacientes: any;
  public totalHabitosSexuales: any;
  public totalHabitosSexualesPaciente:any;


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

     this.arrayHabitosSexualesPaciente = [];

     this.totalPacientes=[];
     this.totalHabitosSexuales=[];
     this.totalHabitosSexualesPaciente=[];

   
    this.servicioHabitoSexual.getHabitoSexuales().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitosSexuales = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalHabitosSexualesPaciente = todo;

            this.obtenerArrayInicio(this.paciente.id,this.arrayHabitosSexualesPaciente,this.totalHabitosSexualesPaciente);
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

    for(let i=0;i<this.totalHabitosSexuales.length;i++){
      for(let j=0;j<this.arrayHabitosSexualesPaciente.length;j++){
        if(this.totalHabitosSexuales[i].id==this.arrayHabitosSexualesPaciente[j].HabitoSexual_id){
          this.arrayHabitosSexualesPaciente[j].nombreHabitoSexual=this.totalHabitosSexuales[i].nombre;
        }
      }
    }
    
  }

  constructor
  (

    public servicioHabitoSexual:HabitoSexualService,
    public servicioHabitosSexualesPaciente:HabitosSexualesPacienteService,
    public servicioPaciente:PacienteService
  
    ) 
  {
      
      

     }

  
  obtenerFecha(habitoSexualPaciente){
    if(habitoSexualPaciente.esVerdadero){
      habitoSexualPaciente.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(habitoSexualPaciente.esVerdadero==false){
      habitoSexualPaciente.fechaInicio=null;
    }

    this.editarHabitosSexualesPaciente();


  }
  editarHabitosSexualesPaciente()
  {

    for(let i=0;i<this.arrayHabitosSexualesPaciente.length;i++){

      if(this.arrayHabitosSexualesPaciente[i].fechaInicio!=null){
      this.arrayHabitosSexualesPaciente[i].fechaInicio=new Date(this.arrayHabitosSexualesPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioHabitosSexualesPaciente.editHabitosSexualesPaciente(this.arrayHabitosSexualesPaciente[i], this.arrayHabitosSexualesPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }


}
