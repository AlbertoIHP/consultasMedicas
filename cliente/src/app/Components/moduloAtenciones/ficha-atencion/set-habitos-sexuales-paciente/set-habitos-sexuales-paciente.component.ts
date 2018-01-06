import { Component, Inject, OnInit,Input , ViewChild, ElementRef} from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

import { HabitosSexualesPacienteService } from '../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';
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
  selector: 'app-set-habitos-sexuales-paciente',
  templateUrl: './set-habitos-sexuales-paciente.component.html',
  styleUrls: ['./set-habitos-sexuales-paciente.component.css'],
  providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class SetHabitosSexualesPacienteComponent implements OnInit {

   @Input() paciente: any;

  public arrayHabitosSexualesPaciente: any;

  public totalPacientes: any;
  public totalHabitosSexuales: any;
  public totalHabitosSexualesPaciente:any;

  displayedColumns = ['Habito sexual','Estado','Fecha inicio'];

    //DATATABLE
    exampleDatabase;
    selection = new SelectionModel<string>(true, []);
    dataSource: ExampleDataSource | null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

   ngOnInit()
  {

     this.arrayHabitosSexualesPaciente = [];

     this.totalPacientes=[];
     this.totalHabitosSexuales=[];
     this.totalHabitosSexualesPaciente=[];

     this.actualizarAtributos();

       this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetHabitosSexualesPaciente');
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

            //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayHabitosSexualesPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetHabitosSexualesPaciente');
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
    public servicioPaciente:PacienteService,
    public dateAdapter: DateAdapter<any> 
  
    ) 
  {
      
      dateAdapter.setLocale('es-MX');

     }

  
 obtenerFecha(habitoSexualPaciente){
    if(habitoSexualPaciente.esVerdadero){

      habitoSexualPaciente.fechaTemp=new Date();

    }else if(habitoSexualPaciente.esVerdadero==false){

      habitoSexualPaciente.fechaInicio=null;
    }

    this.editarHabitosSexualesPaciente();


  }
  editarHabitosSexualesPaciente()
  {

    for(let i=0;i<this.arrayHabitosSexualesPaciente.length;i++){

      if(this.arrayHabitosSexualesPaciente[i].esVerdadero){
        
        this.arrayHabitosSexualesPaciente[i].fechaInicio=new Date(this.arrayHabitosSexualesPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
      
      }else{
        this.arrayHabitosSexualesPaciente[i].fechaInicio=null;
      }
      this.servicioHabitosSexualesPaciente.editHabitosSexualesPaciente(this.arrayHabitosSexualesPaciente[i], this.arrayHabitosSexualesPaciente[i].id).subscribe( data => {

      });

    }
  }


}
