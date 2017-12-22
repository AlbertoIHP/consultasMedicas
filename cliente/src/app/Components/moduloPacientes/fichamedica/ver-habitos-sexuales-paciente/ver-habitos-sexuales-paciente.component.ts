import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';
import { HabitosSexualesPacienteService } from '../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';

import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

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
  selector: 'app-ver-habitos-sexuales-paciente',
  templateUrl: './ver-habitos-sexuales-paciente.component.html',
  styleUrls: ['./ver-habitos-sexuales-paciente.component.css']
})
export class VerHabitosSexualesPacienteComponent implements OnInit {

 @Input() paciente:any;

  public totalHabitosSexuales: HabitoSexual[];
  public totalHabitosSexualesPaciente:any[];
  
  //Arreglo con todos los registros que contengan al paciente parametrizado y sus hábitos
  public arrayHabitosSexualesPaciente: any[];

    displayedColumns = ['Habito sexual','Estado','Fecha inicio'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {


      this.totalHabitosSexuales = [];
      this.totalHabitosSexualesPaciente = [];
      this.arrayHabitosSexualesPaciente = [];

     this.actualizarAtributos();

     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'VerHabitosSexualesPaciente');
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


  constructor(public servicioHabitosSexualesPaciente: HabitosSexualesPacienteService,
    public servicioHabitoSexual:HabitoSexualService,  public dialog:MatDialog) {

      }

  actualizarAtributos ()
  {
    this.servicioHabitoSexual.getHabitoSexuales().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitosSexuales = todo;

         this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalHabitosSexualesPaciente = todo;

                  this.reemplazarIdPorString();
        
                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayHabitosSexualesPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'VerHabitosSexualesPaciente');
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
    this.obtenerHabitosSexualesPaciente(this.paciente.id);

    for(let i=0;i<this.totalHabitosSexuales.length;i++){
      for(let j=0;j<this.arrayHabitosSexualesPaciente.length;j++){
        if(this.totalHabitosSexuales[i].id===this.arrayHabitosSexualesPaciente[j].HabitoSexual_id){
          this.arrayHabitosSexualesPaciente[j].nombreHabitoSexual=this.totalHabitosSexuales[i].nombre;
          break;

        }
      }
    }
  }

 //función para setear el array con los registros del paciente correspondiente
  obtenerHabitosSexualesPaciente(idPaciente){
    for(let i=0;i<this.totalHabitosSexualesPaciente.length;i++){

      if(this.totalHabitosSexualesPaciente[i].Paciente_id==idPaciente){

        this.arrayHabitosSexualesPaciente.push(this.totalHabitosSexualesPaciente[i]);

      }

      if(this.totalHabitosSexualesPaciente[i].fechaInicio != null){

        this.totalHabitosSexualesPaciente[i].esVerdadero=true;

      }else if(this.totalHabitosSexualesPaciente[i].fechaInicio==null){

        this.totalHabitosSexualesPaciente[i].esVerdadero=false;
      }
    }


  }

}
