import { Component, Inject, OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

import { AlergiasMedicamentosPacienteService } from '../../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service';
import { MedicamentoService } from '../../../../Services/medicamento/medicamento.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-set-alergias-medicamentos-paciente',
  templateUrl: './set-alergias-medicamentos-paciente.component.html',
  styleUrls: ['./set-alergias-medicamentos-paciente.component.css']
})
export class SetAlergiasMedicamentosPacienteComponent implements OnInit {

 
  @Input() paciente: any;

  public arrayAlergiasMedicamentosPaciente: any;

  public totalPacientes: any;
  public totalMedicamentos: any;
  public totalAlergiasMedicamentosPaciente:any;


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

     this.arrayAlergiasMedicamentosPaciente = [];

     this.totalPacientes=[];
     this.totalMedicamentos=[];
     this.totalAlergiasMedicamentosPaciente=[];

   
    this.servicioMedicamento.getMedicamentos().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalMedicamentos = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioAlergiasMedicamentosPaciente.getAlergiasMedicamentosPacientes().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalAlergiasMedicamentosPaciente = todo;

            this.obtenerArrayInicio(this.paciente.id,this.arrayAlergiasMedicamentosPaciente,this.totalAlergiasMedicamentosPaciente);
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

    for(let i=0;i<this.totalMedicamentos.length;i++){
      for(let j=0;j<this.arrayAlergiasMedicamentosPaciente.length;j++){
        if(this.totalMedicamentos[i].id==this.arrayAlergiasMedicamentosPaciente[j].Medicamento_id){
          this.arrayAlergiasMedicamentosPaciente[j].nombreMedicamento=this.totalMedicamentos[i].nombrecomun+" / "+this.totalMedicamentos[i].nombrecientifico;
        }
      }
    }
    
  }

  constructor
  (

    public servicioMedicamento:MedicamentoService,
    public servicioAlergiasMedicamentosPaciente:AlergiasMedicamentosPacienteService,
    public servicioPaciente:PacienteService
  
    ) 
  {
      
      

     }

  
  obtenerFecha(alergiaMedicamentoPaciente){
    if(alergiaMedicamentoPaciente.esVerdadero){
      alergiaMedicamentoPaciente.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(alergiaMedicamentoPaciente.esVerdadero==false){
      alergiaMedicamentoPaciente.fechaInicio=null;
    }

    this.editarAlergiasMedicamentosPaciente();


  }
  editarAlergiasMedicamentosPaciente()
  {

    for(let i=0;i<this.arrayAlergiasMedicamentosPaciente.length;i++){

      if(this.arrayAlergiasMedicamentosPaciente[i].fechaInicio!=null){
      this.arrayAlergiasMedicamentosPaciente[i].fechaInicio=new Date(this.arrayAlergiasMedicamentosPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioAlergiasMedicamentosPaciente.editAlergiasMedicamentosPaciente(this.arrayAlergiasMedicamentosPaciente[i], this.arrayAlergiasMedicamentosPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }

}
