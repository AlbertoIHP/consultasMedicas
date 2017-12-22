import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';
import { VacunasPacienteService } from '../../../../Services/vacunaspaciente/vacunaspaciente.service';

import { Vacuna } from '../../../../Models/Vacuna.model';
import { VacunaService } from '../../../../Services/vacuna/vacuna.service';

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
  selector: 'app-ver-vacunas-paciente',
  templateUrl: './ver-vacunas-paciente.component.html',
  styleUrls: ['./ver-vacunas-paciente.component.css']
})
export class VerVacunasPacienteComponent implements OnInit {

  
 @Input() paciente:any;

  public totalVacunas: Vacuna[];
  public totalVacunasPaciente:any[];
  
  //Arreglo con todos los registros que contengan al paciente parametrizado y sus hábitos
  public arrayVacunasPaciente: any[];

    displayedColumns = ['Vacuna','Estado','Fecha vacunacion'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {


      this.totalVacunas = [];
      this.totalVacunasPaciente= [];
      this.arrayVacunasPaciente = [];

     this.actualizarAtributos();

     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'VerVacunasPaciente');
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


  constructor(public servicioVacunasPaciente:VacunasPacienteService,
    public servicioVacuna:VacunaService,  public dialog:MatDialog) {

      }

  actualizarAtributos ()
  {
    this.servicioVacuna.getVacunas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalVacunas = todo;

         this.servicioVacunasPaciente.getVacunasPaciente().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalVacunasPaciente = todo;

                  this.reemplazarIdPorString();
        
                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayVacunasPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'VerVacunasPaciente');
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
    this.obtenerVacunasPaciente(this.paciente.id);

    for(let i=0;i<this.totalVacunas.length;i++){
      for(let j=0;j<this.arrayVacunasPaciente.length;j++){
        if(this.totalVacunas[i].id===this.arrayVacunasPaciente[j].Vacuna_id){
          this.arrayVacunasPaciente[j].nombreVacuna=this.totalVacunas[i].nombre;
          break;

        }
      }
    }
  }

 //función para setear el array con los registros del paciente correspondiente
  obtenerVacunasPaciente(idPaciente){
    for(let i=0;i<this.totalVacunasPaciente.length;i++){

      if(this.totalVacunasPaciente[i].Paciente_id==idPaciente){

        this.arrayVacunasPaciente.push(this.totalVacunasPaciente[i]);

      }

      if(this.totalVacunasPaciente[i].fechaVacunacion != null){

        this.totalVacunasPaciente[i].esVerdadero=true;

      }else if(this.totalVacunasPaciente[i].fechaVacunacion==null){

        this.totalVacunasPaciente[i].esVerdadero=false;
      }
    }


  }

}
