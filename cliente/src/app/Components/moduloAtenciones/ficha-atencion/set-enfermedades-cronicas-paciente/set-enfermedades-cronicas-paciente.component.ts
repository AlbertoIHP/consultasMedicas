import { Component, Inject, OnInit,Input , ViewChild, ElementRef} from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

import { EnfermedadesCronicasPacienteService } from '../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';
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
  selector: 'app-set-enfermedades-cronicas-paciente',
  templateUrl: './set-enfermedades-cronicas-paciente.component.html',
  styleUrls: ['./set-enfermedades-cronicas-paciente.component.css'],
  providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class SetEnfermedadesCronicasPacienteComponent implements OnInit {

   @Input() paciente: any;

  public arrayEnfermedadesCronicasPaciente: any;

  public totalPacientes: any;
  public totalEnfermedadesCronicas: any;
  public totalEnfermedadesCronicasPaciente:any;


   displayedColumns = ['Medicamento','Estado','Fecha deteccion'];

    //DATATABLE
    exampleDatabase;
    selection = new SelectionModel<string>(true, []);
    dataSource: ExampleDataSource | null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

  

   ngOnInit()
  {

     this.arrayEnfermedadesCronicasPaciente = [];

     this.totalPacientes=[];
     this.totalEnfermedadesCronicas=[];
     this.totalEnfermedadesCronicasPaciente=[];

     this.actualizarAtributos();

     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetEnfermedadesCronicasPaciente');
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
    this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicas = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(data=>{
            var todo: any = data;
            todo = todo.data;
            this.totalEnfermedadesCronicasPaciente = todo;

            this.obtenerArrayDeteccion(this.paciente.id,this.arrayEnfermedadesCronicasPaciente,this.totalEnfermedadesCronicasPaciente);
            this.reemplazarIdPorString();

            //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayEnfermedadesCronicasPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetEnfermedadesCronicasPaciente');
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

    for(let i=0;i<this.totalEnfermedadesCronicas.length;i++){
      for(let j=0;j<this.arrayEnfermedadesCronicasPaciente.length;j++){
        if(this.totalEnfermedadesCronicas[i].id==this.arrayEnfermedadesCronicasPaciente[j].EnfermedadCronica_id){
          this.arrayEnfermedadesCronicasPaciente[j].nombreEnfermedad=this.totalEnfermedadesCronicas[i].nombre;
        }
      }
    }
    
  }

  constructor
  (

    public servicioEnfermedadCronica:EnfermedadCronicaService,
    public servicioEnfermedadesCronicasPaciente:EnfermedadesCronicasPacienteService,
    public servicioPaciente:PacienteService,
    public dateAdapter: DateAdapter<any> 
  
    ) 
  {
      
      dateAdapter.setLocale('es-MX');
      

     }

  
  obtenerFecha(enfermedadPaciente){
    if(enfermedadPaciente.esVerdadero){

      enfermedadPaciente.fechaTemp=new Date();

    }else if(enfermedadPaciente.esVerdadero==false){

      enfermedadPaciente.fechaDeteccion=null;

    }

    this.editarEnfermedadesCronicasPaciente();


  }
  editarEnfermedadesCronicasPaciente()
  {

    for(let i=0;i<this.arrayEnfermedadesCronicasPaciente.length;i++){

      if(this.arrayEnfermedadesCronicasPaciente[i].esVerdadero){

      this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion=new Date(this.arrayEnfermedadesCronicasPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
      
      }else{
         this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion=null;

      }
      this.servicioEnfermedadesCronicasPaciente.editEnfermedadesCronicasPaciente(this.arrayEnfermedadesCronicasPaciente[i], this.arrayEnfermedadesCronicasPaciente[i].id).subscribe( data => {

      });

    }
  }

}
