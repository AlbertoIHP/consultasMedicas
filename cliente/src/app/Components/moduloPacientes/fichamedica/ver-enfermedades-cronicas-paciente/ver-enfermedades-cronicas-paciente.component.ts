import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import { EnfermedadesCronicasPaciente } from '../../../../Models/EnfermedadesCronicasPaciente.model';
import { EnfermedadesCronicasPacienteService } from '../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';

import { EnfermedadCronica } from '../../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

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
  selector: 'app-ver-enfermedades-cronicas-paciente',
  templateUrl: './ver-enfermedades-cronicas-paciente.component.html',
  styleUrls: ['./ver-enfermedades-cronicas-paciente.component.css']
})
export class VerEnfermedadesCronicasPacienteComponent implements OnInit {
@Input() pacienteTest:any;

  public totalEnfermedadesCronicas: EnfermedadCronica[];
  public totalEnfermedadesCronicasPaciente:any[];
  
  //Arreglo con todos los registros que contengan al paciente parametrizado y sus hábitos
  public arrayEnfermedadesCronicasPaciente: any[];

    displayedColumns = ['Enfermedad','Estado','Fecha deteccion'];

    //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {


      this.totalEnfermedadesCronicas = [];
      this.totalEnfermedadesCronicasPaciente = [];
      this.arrayEnfermedadesCronicasPaciente = [];

     this.actualizarAtributos();

     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'VerEnfermedadesCronicasPaciente');
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


  constructor(public servicioEnfermedadesCronicasPaciente: EnfermedadesCronicasPacienteService,
    public servicioEnfermedadCronica:EnfermedadCronicaService,  public dialog:MatDialog) {

      }

  actualizarAtributos ()
  {
    this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicas = todo;

         this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalEnfermedadesCronicasPaciente = todo;

                  this.reemplazarIdPorString();
        
                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayEnfermedadesCronicasPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'VerEnfermedadesCronicasPaciente');
                  Observable.fromEvent(this.filter.nativeElement, 'keyup')
                      .debounceTime(150)
                      .distinctUntilChanged()
                      .subscribe(() => {
                        if (!this.dataSource) { return; }
                        this.dataSource.filter = this.filter.nativeElement.value;
                      })
           });
    });
  }

   reemplazarIdPorString()
  {
    this.obtenerEnfermedadesCronicasPaciente(this.pacienteTest.id);

    for(let i=0;i<this.totalEnfermedadesCronicas.length;i++){
      for(let j=0;j<this.arrayEnfermedadesCronicasPaciente.length;j++){
        if(this.totalEnfermedadesCronicas[i].id===this.arrayEnfermedadesCronicasPaciente[j].EnfermedadCronica_id){
          this.arrayEnfermedadesCronicasPaciente[j].nombreEnfermedad=this.totalEnfermedadesCronicas[i].nombre;
          break;

        }
      }
    }
  }

 //función para setear el array con los registros del paciente correspondiente
  obtenerEnfermedadesCronicasPaciente(idPaciente){
    for(let i=0;i<this.totalEnfermedadesCronicasPaciente.length;i++){

      if(this.totalEnfermedadesCronicasPaciente[i].Paciente_id==idPaciente){

        this.arrayEnfermedadesCronicasPaciente.push(this.totalEnfermedadesCronicasPaciente[i]);

      }

      if(this.totalEnfermedadesCronicasPaciente[i].fechaDeteccion != null){

        this.totalEnfermedadesCronicasPaciente[i].esVerdadero=true;

      }else if(this.totalEnfermedadesCronicasPaciente[i].fechaDeteccion==null){

        this.totalEnfermedadesCronicasPaciente[i].esVerdadero=false;
      }
    }


  }
}
