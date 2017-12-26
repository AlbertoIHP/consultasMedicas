import { Component, Inject, OnInit,Input , ViewChild, ElementRef} from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

import { VacunasPacienteService } from '../../../../Services/vacunaspaciente/vacunaspaciente.service';
import { VacunaService } from '../../../../Services/vacuna/vacuna.service';
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
  selector: 'app-set-vacunas-paciente',
  templateUrl: './set-vacunas-paciente.component.html',
  styleUrls: ['./set-vacunas-paciente.component.css'],
   providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class SetVacunasPacienteComponent implements OnInit {

  
   @Input() paciente: any;

  public arrayVacunasPaciente: any;

  public totalPacientes: any;
  public totalVacunas: any;
  public totalVacunasPaciente:any;


   displayedColumns = ['Vacuna','Estado','Fecha vacunacion'];

    //DATATABLE
    exampleDatabase;
    selection = new SelectionModel<string>(true, []);
    dataSource: ExampleDataSource | null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

   ngOnInit()
  {

     this.arrayVacunasPaciente = [];

     this.totalPacientes=[];
     this.totalVacunas=[];
     this.totalVacunasPaciente=[];

     this.actualizarAtributos();


     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetVacunasPaciente');
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


             //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayVacunasPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetVacunasPaciente');
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

  obtenerVacunasPaciente(idPaciente){
    for(let i=0;i<this.totalVacunasPaciente.length;i++){

      if(this.totalVacunasPaciente[i].Paciente_id===idPaciente){

        if(this.totalVacunasPaciente[i].fechaVacunacion != null){

          this.totalVacunasPaciente[i].fechaTemp = new Date(this.totalVacunasPaciente[i].fechaVacunacion);
          this.totalVacunasPaciente[i].esVerdadero=true;

        }else if(this.totalVacunasPaciente[i].fechaVacunacion==null){
          this.totalVacunasPaciente[i].fechaTemp=null;
          this.totalVacunasPaciente[i].esVerdadero=false;
        }

        this.arrayVacunasPaciente.push(this.totalVacunasPaciente[i]);
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
    public servicioPaciente:PacienteService,
    public dateAdapter: DateAdapter<any>
  
    ) 
  {
      
      dateAdapter.setLocale('es-MX');

     }

  
  obtenerFecha(vacuna){
    if(vacuna.esVerdadero){

      vacuna.fechaTemp=new Date();

    }else if(vacuna.esVerdadero==false){

      vacuna.fechaVacunacion=null;
    }

    this.editarVacunasPaciente();


  }
  editarVacunasPaciente()
  {

    for(let i=0;i<this.arrayVacunasPaciente.length;i++){

      if(this.arrayVacunasPaciente[i].esVerdadero){

        this.arrayVacunasPaciente[i].fechaVacunacion=new Date(this.arrayVacunasPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
      
      }else{
        this.arrayVacunasPaciente[i].fechaVacunacion=null;
      }
      this.servicioVacunasPaciente.editVacunaPaciente(this.arrayVacunasPaciente[i], this.arrayVacunasPaciente[i].id).subscribe( data => {
        console.log(data);

      });

    }
  }


}
