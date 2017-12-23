import { Component, Inject, OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

import { UsoMedicamentoService } from '../../../../Services/usomedicamento/uso-medicamento.service';
import { MedicamentoService } from '../../../../Services/medicamento/medicamento.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';
@Component({
  selector: 'app-set-uso-medicamentos-paciente',
  templateUrl: './set-uso-medicamentos-paciente.component.html',
  styleUrls: ['./set-uso-medicamentos-paciente.component.css']
})
export class SetUsoMedicamentosPacienteComponent implements OnInit {

   @Input() paciente: any;

  public arrayUsoMedicamentosPaciente: any;

  public totalPacientes: any;
  public totalMedicamentos: any;
  public totalUsoMedicamentosPaciente:any;


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

     this.arrayUsoMedicamentosPaciente = [];

     this.totalPacientes=[];
     this.totalMedicamentos=[];
     this.totalUsoMedicamentosPaciente=[];

   
    this.servicioMedicamento.getMedicamentos().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalMedicamentos = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioUsoMedicamento.getUsoMedicamentos().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalUsoMedicamentosPaciente = todo;

            this.obtenerArrayInicio(this.paciente.id,this.arrayUsoMedicamentosPaciente,this.totalUsoMedicamentosPaciente);
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
      for(let j=0;j<this.arrayUsoMedicamentosPaciente.length;j++){
        if(this.totalMedicamentos[i].id==this.arrayUsoMedicamentosPaciente[j].Medicamento_id){
          this.arrayUsoMedicamentosPaciente[j].nombre=this.totalMedicamentos[i].nombrecomun+" / "+this.totalMedicamentos[i].nombrecientifico;
        }
      }
    }
    
  }

  constructor
  (

    public servicioMedicamento:MedicamentoService,
    public servicioUsoMedicamento:UsoMedicamentoService,
    public servicioPaciente:PacienteService
  
    ) 
  {
      
      

     }

  
  obtenerFecha(medicamento){
    if(medicamento.esVerdadero){
      medicamento.fechaInicio=new Date().toISOString().slice(0, 19).replace('T', ' ');
    }else if(medicamento.esVerdadero==false){
      medicamento.fechaInicio=null;
    }

    this.editarUsoMedicamentosPaciente();


  }
  editarUsoMedicamentosPaciente()
  {

    for(let i=0;i<this.arrayUsoMedicamentosPaciente.length;i++){

      if(this.arrayUsoMedicamentosPaciente[i].fechaInicio!=null){
      this.arrayUsoMedicamentosPaciente[i].fechaInicio=new Date(this.arrayUsoMedicamentosPaciente[i].fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
      }
      this.servicioUsoMedicamento.editUsoMedicamento(this.arrayUsoMedicamentosPaciente[i], this.arrayUsoMedicamentosPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }

}
