import { Component, Inject, OnInit,Input , ViewChild, ElementRef} from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

import { UsoMedicamentoService } from '../../../../Services/usomedicamento/uso-medicamento.service';
import { MedicamentoService } from '../../../../Services/medicamento/medicamento.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { LOCALE_ID } from '@angular/core';
import { DateAdapter } from '@angular/material';

//DATATABLE
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExampleDatabase, ExampleDataSource } from '../../../Globals/datasource.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-set-uso-medicamentos-paciente',
  templateUrl: './set-uso-medicamentos-paciente.component.html',
  styleUrls: ['./set-uso-medicamentos-paciente.component.css'],
   providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class SetUsoMedicamentosPacienteComponent implements OnInit {

   @Input() paciente: any;

  public arrayUsoMedicamentosPaciente: any;

  public totalPacientes: any;
  public totalMedicamentos: any;
  public totalUsoMedicamentosPaciente:any;

   displayedColumns = ['Medicamento','Estado','Fecha inicio'];

    //DATATABLE
    exampleDatabase;
    selection = new SelectionModel<string>(true, []);
    dataSource: ExampleDataSource | null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

   ngOnInit()
  {

     this.arrayUsoMedicamentosPaciente = [];

     this.totalPacientes=[];
     this.totalMedicamentos=[];
     this.totalUsoMedicamentosPaciente=[];

     this.actualizarAtributos();


     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetUsoMedicamentosPaciente');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });


    this.exampleDatabase = [];
   
    
  }
   isAllSelected(): boolean
  {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.exampleDatabase.data.length;
    }
  }

  masterToggle()
  {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filter.nativeElement.value) {
      this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
    } else {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
    }
  }


  actualizarAtributos(){
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

             //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayUsoMedicamentosPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetUsoMedicamentosPaciente');
                  Observable.fromEvent(this.filter.nativeElement, 'keyup')
                      .debounceTime(150)
                      .distinctUntilChanged()
                      .subscribe(() => {
                        if (!this.dataSource) { return; }
                        this.dataSource.filter = this.filter.nativeElement.value;
                      });
        });
        

      });
    });
  }

 obtenerArrayInicio(idPaciente,array,total){
    for(let i=0;i<total.length;i++){

      if(total[i].Paciente_id===idPaciente){

        if(total[i].fechaInicio != null){
          total[i].fechaTemp = new Date(total[i].fechaInicio);
          total[i].esVerdadero=true;

        }else if(total[i].fechaInicio==null){
          total[i].fechaTemp=null;
          total[i].esVerdadero=false;
        }

        array.push(total[i]);
      }

      
    }

  }

  reemplazarIdPorString()
  {

    for(let i=0;i<this.totalMedicamentos.length;i++){
      for(let j=0;j<this.arrayUsoMedicamentosPaciente.length;j++){
        if(this.totalMedicamentos[i].id==this.arrayUsoMedicamentosPaciente[j].Medicamento_id){
          this.arrayUsoMedicamentosPaciente[j].nombreMedicamento=this.totalMedicamentos[i].nombrecomun+" / "+this.totalMedicamentos[i].nombrecientifico;
        }
      }
    }
    
  }

  constructor
  (

    public servicioMedicamento:MedicamentoService,
    public servicioUsoMedicamento:UsoMedicamentoService,
    public servicioPaciente:PacienteService,
    public dateAdapter: DateAdapter<any>
  
    ) 
  {
      
      dateAdapter.setLocale('es-MX');

     }

  
  obtenerFecha(medicamento){
    if(medicamento.esVerdadero){

      medicamento.fechaTemp=new Date();

    }else if(medicamento.esVerdadero==false){

      medicamento.fechaInicio=null;
    }

    this.editarUsoMedicamentosPaciente();


  }
  editarUsoMedicamentosPaciente()
  {

    for(let i=0;i<this.arrayUsoMedicamentosPaciente.length;i++){

      if(this.arrayUsoMedicamentosPaciente[i].esVerdadero){

        this.arrayUsoMedicamentosPaciente[i].fechaInicio=new Date(this.arrayUsoMedicamentosPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
     
      }else{
        this.arrayUsoMedicamentosPaciente[i].fechaInicio=null;
      }
      this.servicioUsoMedicamento.editUsoMedicamento(this.arrayUsoMedicamentosPaciente[i], this.arrayUsoMedicamentosPaciente[i].id).subscribe( data => {

      });

    }
  }

}
