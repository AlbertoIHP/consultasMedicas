import { Component, Inject, OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

import { VacunasPacienteService } from '../../../../Services/vacunaspaciente/vacunaspaciente.service';
import { VacunaService } from '../../../../Services/vacuna/vacuna.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';
@Component({
  selector: 'app-set-vacunas-paciente',
  templateUrl: './set-vacunas-paciente.component.html',
  styleUrls: ['./set-vacunas-paciente.component.css']
})
export class SetVacunasPacienteComponent implements OnInit {

  
   @Input() paciente: any;

  public arrayVacunasPaciente: any;

  public totalPacientes: any;
  public totalVacunas: any;
  public totalVacunasPaciente:any;


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

     this.arrayVacunasPaciente = [];

     this.totalPacientes=[];
     this.totalVacunas=[];
     this.totalVacunasPaciente=[];

   
    this.servicioVacuna.getVacunas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalVacunas = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioVacunasPaciente.getVacunasPaciente().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalVacunasPaciente = todo;

            this.obtenerVacunasPaciente(this.paciente.id);
            this.reemplazarIdPorString();
        });
        

      });
    });
  }

  obtenerVacunasPaciente(idPaciente){
    for(let i=0;i<this.totalVacunasPaciente.length;i++){

      if(this.totalVacunasPaciente[i].Paciente_id===idPaciente){

        this.arrayVacunasPaciente.push(this.totalVacunasPaciente[i]);
      }

      if(this.totalVacunasPaciente[i].fechaVacunacion != null){

        this.totalVacunasPaciente[i].esVerdadero=true;

      }else if(this.totalVacunasPaciente[i].fechaVacunacion==null){

        this.totalVacunasPaciente[i].esVerdadero=false;
      }
    }

  }

  reemplazarIdPorString()
  {

    for(let i=0;i<this.totalVacunas.length;i++){
      for(let j=0;j<this.arrayVacunasPaciente.length;j++){
        if(this.totalVacunas[i].id==this.arrayVacunasPaciente[j].Vacuna_id){
          this.arrayVacunasPaciente[j].nombreVacuna=this.totalVacunas[i].nombre;
        }
      }
    }
    
  }

  constructor
  (

    public servicioVacuna:VacunaService,
    public servicioVacunasPaciente:VacunasPacienteService,
    public servicioPaciente:PacienteService
  
    ) 
  {
      
      

     }

  
  obtenerFecha(vacuna){
    if(vacuna.esVerdadero){
      vacuna.fechaVacunacion=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(vacuna.esVerdadero==false){
      vacuna.fechaVacunacion=null;
    }

    this.editarVacunasPaciente();


  }
  editarVacunasPaciente()
  {

    for(let i=0;i<this.arrayVacunasPaciente.length;i++){

      if(this.arrayVacunasPaciente[i].fechaVacunacion!=null){
      this.arrayVacunasPaciente[i].fechaVacunacion=new Date(this.arrayVacunasPaciente[i].fechaVacunacion).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioVacunasPaciente.editVacunaPaciente(this.arrayVacunasPaciente[i], this.arrayVacunasPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }


}
