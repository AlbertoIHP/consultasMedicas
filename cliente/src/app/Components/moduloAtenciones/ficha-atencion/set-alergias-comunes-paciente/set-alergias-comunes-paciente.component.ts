import { Component, Inject, OnInit,Input , ViewChild, ElementRef} from '@angular/core';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';

import { AlergiasComunesPacienteService } from '../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

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
  selector: 'app-set-alergias-comunes-paciente',
  templateUrl: './set-alergias-comunes-paciente.component.html',
  styleUrls: ['./set-alergias-comunes-paciente.component.css'],
  providers: [
   
    {provide: LOCALE_ID,useValue: 'es-MX'},
   
  ],
})
export class SetAlergiasComunesPacienteComponent implements OnInit {

  @Input() paciente: any;

  public arrayAlergiasComunesPaciente: any;

  public totalPacientes: any;
  public totalAlergiasComunes: any;
  public totalAlergiasComunesPaciente:any;


  displayedColumns = ['Alergias','Estado','Fecha deteccion'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

   ngOnInit()
  {

     this.arrayAlergiasComunesPaciente = [];

     this.totalPacientes=[];
     this.totalAlergiasComunes=[];
     this.totalAlergiasComunesPaciente=[];

     this.actualizarAtributos();

      this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetAlergiasComunesPaciente');
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

 obtenerArrayDeteccion(idPaciente,array,total){
    for(let i=0;i<total.length;i++){


      if(total[i].Paciente_id===idPaciente){

       if(total[i].fechaDeteccion != null){
        total[i].fechaTemp = new Date(total[i].fechaDeteccion);
        total[i].esVerdadero=true;
      }else if(total[i].fechaDeteccion==null){
        total[i].fechaTemp=null;
        total[i].esVerdadero=false;
      }


        array.push(total[i]);
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

  actualizarAtributos(){


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
              
               //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayAlergiasComunesPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetAlergiasComunesPaciente');
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

  constructor
  (

    public servicioAlergiaComun:AlergiaService,
    public servicioAlergiasComunesPaciente:AlergiasComunesPacienteService,
    public servicioPaciente:PacienteService,
    public dateAdapter: DateAdapter<any>,    
    ) 
  {
       dateAdapter.setLocale('es-MX');
      

     }

  
  obtenerFecha(alergiaPaciente){
    if(alergiaPaciente.esVerdadero){
      alergiaPaciente.fechaTemp=new Date();
    }else if(alergiaPaciente.esVerdadero==false){
      alergiaPaciente.fechaDeteccion=null;
    }

    this.editarAlergiasComunesPaciente();


  }
  editarAlergiasComunesPaciente()
  {

    for(let i=0;i<this.arrayAlergiasComunesPaciente.length;i++){

      if(this.arrayAlergiasComunesPaciente[i].esVerdadero){
      this.arrayAlergiasComunesPaciente[i].fechaDeteccion=new Date(this.arrayAlergiasComunesPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
      }else{
        this.arrayAlergiasComunesPaciente[i].fechaDeteccion=null;
      }
      this.servicioAlergiasComunesPaciente.editAlergiasComunesPaciente(this.arrayAlergiasComunesPaciente[i], this.arrayAlergiasComunesPaciente[i].id).subscribe( data => {

      });

    }
  }

}
