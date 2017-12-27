import { Component, Inject, OnInit,Input , ViewChild, ElementRef} from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

import { HabitosPacienteService } from '../../../../Services/habitospaciente/habitos-paciente.service';
import { HabitoService } from '../../../../Services/habito/habito.service';
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
  selector: 'app-set-habitos-paciente',
  templateUrl: './set-habitos-paciente.component.html',
  styleUrls: ['./set-habitos-paciente.component.css'],
  providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class SetHabitosPacienteComponent implements OnInit {

  
   @Input() paciente: any;

  public arrayHabitosPaciente: any;

  public totalPacientes: any;
  public totalHabitos: any;
  public totalHabitosPaciente:any;


  displayedColumns = ['Habito','Estado','Fecha inicio'];

    //DATATABLE
    exampleDatabase;
    selection = new SelectionModel<string>(true, []);
    dataSource: ExampleDataSource | null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

   ngOnInit()
  {

     this.arrayHabitosPaciente = [];

     this.totalPacientes=[];
     this.totalHabitos=[];
     this.totalHabitosPaciente=[];

     this.actualizarAtributos();

       this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetHabitosPaciente');
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

             //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayHabitosPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetHabitosPaciente');
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
    public servicioPaciente:PacienteService,
    public dateAdapter: DateAdapter<any> 
  
    ) 
  {
      
      dateAdapter.setLocale('es-MX');

     }

  
  obtenerFecha(habitoPaciente){
    if(habitoPaciente.esVerdadero){

      habitoPaciente.fechaTemp=new Date();

    }else if(habitoPaciente.esVerdadero==false){

      habitoPaciente.fechaInicio=null;
    }

    this.editarHabitosPaciente();


  }
  editarHabitosPaciente()
  {

    for(let i=0;i<this.arrayHabitosPaciente.length;i++){

      if(this.arrayHabitosPaciente[i].esVerdadero){

        this.arrayHabitosPaciente[i].fechaInicio=new Date(this.arrayHabitosPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
     
      }else{
        this.arrayHabitosPaciente[i].fechaInicio=null;
      }
      this.servicioHabitosPaciente.editHabitosPaciente(this.arrayHabitosPaciente[i], this.arrayHabitosPaciente[i].id).subscribe( data => {

      });

    }
  }

}
