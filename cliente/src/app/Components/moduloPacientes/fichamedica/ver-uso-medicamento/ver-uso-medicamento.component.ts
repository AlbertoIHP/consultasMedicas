import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import { UsoMedicamento } from '../../../../Models/UsoMedicamento.model';
import { UsoMedicamentoService } from '../../../../Services/usomedicamento/uso-medicamento.service';

import { Medicamento } from '../../../../Models/Medicamento.model';
import { MedicamentoService } from '../../../../Services/medicamento/medicamento.service';

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
  selector: 'app-ver-uso-medicamento',
  templateUrl: './ver-uso-medicamento.component.html',
  styleUrls: ['./ver-uso-medicamento.component.css']
})
export class VerUsoMedicamentoComponent implements OnInit {

  
 @Input() paciente:any;

  public totalMedicamentos: Medicamento[];
  public totalUsoMedicamentos:any[];
  
  //Arreglo con todos los registros que contengan al paciente parametrizado y sus hábitos
  public arrayUsoMedicamentos: any[];

    displayedColumns = ['Medicamento','Estado','Fecha inicio'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {


      this.totalMedicamentos = [];
      this.totalUsoMedicamentos= [];
      this.arrayUsoMedicamentos = [];

     this.actualizarAtributos();

     this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'VerUsoMedicamentosPaciente');
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


  constructor(public servicioUsoMedicamentos:UsoMedicamentoService,
    public servicioMedicamento:MedicamentoService,  public dialog:MatDialog) {

      }

  actualizarAtributos ()
  {
    this.servicioMedicamento.getMedicamentos().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalMedicamentos = todo;

         this.servicioUsoMedicamentos.getUsoMedicamentos().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalUsoMedicamentos = todo;

                  this.reemplazarIdPorString();
        
                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayUsoMedicamentos);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'VerUsoMedicamentosPaciente');
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
    this.obtenerUsoMedicamentosPaciente(this.paciente.id);

    for(let i=0;i<this.totalMedicamentos.length;i++){
      for(let j=0;j<this.arrayUsoMedicamentos.length;j++){
        if(this.totalMedicamentos[i].id===this.arrayUsoMedicamentos[j].Medicamento_id){
          this.arrayUsoMedicamentos[j].nombreMedicamento=this.totalMedicamentos[i].nombrecomun;
          break;

        }
      }
    }
  }

 //función para setear el array con los registros del paciente correspondiente
  obtenerUsoMedicamentosPaciente(idPaciente){
    for(let i=0;i<this.totalUsoMedicamentos.length;i++){

      if(this.totalUsoMedicamentos[i].Paciente_id==idPaciente){

        this.arrayUsoMedicamentos.push(this.totalUsoMedicamentos[i]);

      }

      if(this.totalUsoMedicamentos[i].fechaInicio != null){

        this.totalUsoMedicamentos[i].esVerdadero=true;

      }else if(this.totalUsoMedicamentos[i].fechaInicio==null){

        this.totalUsoMedicamentos[i].esVerdadero=false;
      }
    }


  }

}
