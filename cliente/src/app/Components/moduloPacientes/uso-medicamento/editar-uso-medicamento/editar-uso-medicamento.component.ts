import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';

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
  selector: 'app-editar-uso-medicamento',
  templateUrl: './editar-uso-medicamento.component.html',
  styleUrls: ['./editar-uso-medicamento.component.css'],
  providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class EditarUsoMedicamentoComponent implements OnInit {

    public paciente:any;

    public arrayMedicamentosPaciente:any;

  	public totalMedicamentos: any;

    public servicioMedicamento: any;
    public servicioUsoMedicamento:any;

    displayedColumns = ['Medicamento','Estado','Fecha inicio'];

    //DATATABLE
    exampleDatabase;
    selection = new SelectionModel<string>(true, []);
    dataSource: ExampleDataSource | null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    ngOnInit()
  {
    this.actualizarAtributos();
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetUsoMedicamentosPaciente');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });


    this.exampleDatabase = [];
  }

  actualizarAtributos(){
    this.servicioMedicamento.getMedicamentos().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalMedicamentos = todo;
        this.reemplazarIdPorString();

        //DATATABLE
            this.exampleDatabase  = new ExampleDatabase(this.arrayMedicamentosPaciente);

            this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetUsoMedicamentosPaciente');
            Observable.fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(() => {
             if (!this.dataSource) { return; }
               this.dataSource.filter = this.filter.nativeElement.value;
            });
    });

  }

   reemplazarIdPorString()
  {
    for(let i=0;i<this.totalMedicamentos.length;i++){
      for(let j=0;j<this.arrayMedicamentosPaciente.length;j++){
        if(this.totalMedicamentos[i].id==this.arrayMedicamentosPaciente[j].Medicamento_id){
          this.arrayMedicamentosPaciente[j].nombreMedicamento=this.totalMedicamentos[i].nombrecomun+" / "+this.totalMedicamentos[i].nombrecientifico;
        }
      }
    }

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

 constructor(
  	public dialogRef: MatDialogRef<EditarUsoMedicamentoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
  public dateAdapter: DateAdapter<any>
  	) {

        dateAdapter.setLocale('es-MX');

        this.paciente=data.paciente;

        this.arrayMedicamentosPaciente=data.arrayUsoMedicamentos;

  		  this.totalMedicamentos=data.medicamentos;

  		  this.servicioMedicamento=data.servicioMedicamento;
      	this.servicioUsoMedicamento=data.servicioUsoMedicamento;

  	 }

  	onNoClick()
    {
      this.dialogRef.close();
    }


  obtenerFecha(medicamento){
    if(medicamento.esVerdadero){

      medicamento.fechaTemp=new Date();

    }else if(medicamento.esVerdadero==false){

      medicamento.fechaInicio=null;
    }


  }

 editarMedicamentosPaciente()
  {

    for(let i=0;i<this.arrayMedicamentosPaciente.length;i++){

      if(this.arrayMedicamentosPaciente[i].esVerdadero){

        this.arrayMedicamentosPaciente[i].fechaInicio=new Date(this.arrayMedicamentosPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
     
      }else{
        this.arrayMedicamentosPaciente[i].fechaInicio=null;
      }
      this.servicioUsoMedicamento.editUsoMedicamento(this.arrayMedicamentosPaciente[i], this.arrayMedicamentosPaciente[i].id).subscribe( data => {
          this.onNoClick();
      });

    }
  }
}