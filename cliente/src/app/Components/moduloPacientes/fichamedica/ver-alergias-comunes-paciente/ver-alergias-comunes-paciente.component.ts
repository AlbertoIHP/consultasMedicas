import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';
import { AlergiasComunesPacienteService } from '../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';

import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';

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
  selector: 'app-ver-alergias-comunes-paciente',
  templateUrl: './ver-alergias-comunes-paciente.component.html',
  styleUrls: ['./ver-alergias-comunes-paciente.component.css']
})
export class VerAlergiasComunesPacienteComponent implements OnInit{

@Input() paciente:any;

public mensajePrevio:any;

  public totalAlergiasComunes: Alergia[];
  public totalAlergiasComunesPaciente:any[];
  
  //Arreglo con todos los registros que contengan al paciente parametrizado y sus hábitos
  public arrayAlergiasComunesPaciente: any[];

    displayedColumns = ['Alergias','Estado','Fecha deteccion'];

    //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {


      this.totalAlergiasComunes = [];
      this.totalAlergiasComunesPaciente = [];
      this.arrayAlergiasComunesPaciente = [];

     this.actualizarAtributos();

     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'VerAlergiasComunesPaciente');
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


  constructor(public servicioAlergiasComunesPaciente: AlergiasComunesPacienteService,
    public servicioAlergiaComun: AlergiaService,public dialog:MatDialog) {

      }

  actualizarAtributos ()
  {
    this.servicioAlergiaComun.getAlergias().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunes = todo;

         this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalAlergiasComunesPaciente = todo;

                  this.reemplazarIdPorString();
        
                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayAlergiasComunesPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'VerAlergiasComunesPaciente');
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
    this.obtenerAlergiasComunesPaciente(this.paciente.id);

    for(let i=0;i<this.totalAlergiasComunes.length;i++){
      for(let j=0;j<this.arrayAlergiasComunesPaciente.length;j++){
        if(this.totalAlergiasComunes[i].id===this.arrayAlergiasComunesPaciente[j].Alergia_id){
          this.arrayAlergiasComunesPaciente[j].nombreAlergia=this.totalAlergiasComunes[i].nombre;
          break;

        }
      }
    }
  }

 //función para setear el array con los registros del paciente correspondiente
  obtenerAlergiasComunesPaciente(idPaciente){
    for(let i=0;i<this.totalAlergiasComunesPaciente.length;i++){

      if(this.totalAlergiasComunesPaciente[i].Paciente_id==idPaciente){

        this.arrayAlergiasComunesPaciente.push(this.totalAlergiasComunesPaciente[i]);

      }

      if(this.totalAlergiasComunesPaciente[i].fechaDeteccion != null){

        this.totalAlergiasComunesPaciente[i].esVerdadero=true;

      }else if(this.totalAlergiasComunesPaciente[i].fechaDeteccion==null){

        this.totalAlergiasComunesPaciente[i].esVerdadero=false;
      }
    }


  }

  

}
