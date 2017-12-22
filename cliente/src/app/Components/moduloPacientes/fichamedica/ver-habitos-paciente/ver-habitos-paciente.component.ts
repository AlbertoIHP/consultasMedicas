import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import { HabitosPaciente } from '../../../../Models/HabitosPaciente.model';
import { HabitosPacienteService } from '../../../../Services/habitospaciente/habitos-paciente.service';

import { Habito } from '../../../../Models/Habito.model';
import { HabitoService } from '../../../../Services/habito/habito.service';

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
  selector: 'app-ver-habitos-paciente',
  templateUrl: './ver-habitos-paciente.component.html',
  styleUrls: ['./ver-habitos-paciente.component.css']
})
export class VerHabitosPacienteComponent implements OnInit {

 @Input() paciente:any;

  public totalHabitos: Habito[];
  public totalHabitosPaciente:any[];
  
  //Arreglo con todos los registros que contengan al paciente parametrizado y sus hábitos
  public arrayHabitosPaciente: any[];

    displayedColumns = ['Habito','Estado','Fecha inicio'];

    //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {


      this.totalHabitos = [];
      this.totalHabitosPaciente = [];
      this.arrayHabitosPaciente = [];

     this.actualizarAtributos();

     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'VerHabitosPaciente');
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


  constructor(public servicioHabitosPaciente: HabitosPacienteService,
    public servicioHabito:HabitoService,  public dialog:MatDialog) {

      }

  actualizarAtributos ()
  {
    this.servicioHabito.getHabitos().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitos = todo;

         this.servicioHabitosPaciente.getHabitosPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalHabitosPaciente = todo;

                  this.reemplazarIdPorString();
        
                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayHabitosPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'VerHabitosPaciente');
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
    this.obtenerHabitosPaciente(this.paciente.id);

    for(let i=0;i<this.totalHabitos.length;i++){
      for(let j=0;j<this.arrayHabitosPaciente.length;j++){
        if(this.totalHabitos[i].id===this.arrayHabitosPaciente[j].Habito_id){
          this.arrayHabitosPaciente[j].nombreHabito=this.totalHabitos[i].nombre;
          break;

        }
      }
    }
  }

 //función para setear el array con los registros del paciente correspondiente
  obtenerHabitosPaciente(idPaciente){
    for(let i=0;i<this.totalHabitosPaciente.length;i++){

      if(this.totalHabitosPaciente[i].Paciente_id==idPaciente){

        this.arrayHabitosPaciente.push(this.totalHabitosPaciente[i]);

      }

      if(this.totalHabitosPaciente[i].fechaInicio != null){

        this.totalHabitosPaciente[i].esVerdadero=true;

      }else if(this.totalHabitosPaciente[i].fechaInicio==null){

        this.totalHabitosPaciente[i].esVerdadero=false;
      }
    }


  }

}
