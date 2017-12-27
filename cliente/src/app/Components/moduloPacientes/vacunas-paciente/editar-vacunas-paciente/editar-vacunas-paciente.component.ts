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
  selector: 'app-editar-vacunas-paciente',
  templateUrl: './editar-vacunas-paciente.component.html',
  styleUrls: ['./editar-vacunas-paciente.component.css'],
  providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class EditarVacunasPacienteComponent implements OnInit {
    public paciente:any;

    public arrayVacunasPaciente:any;

	  public totalVacunas: any;

    public servicioVacuna: any;
    public servicioVacunasPaciente:any;

    displayedColumns = ['Vacuna','Estado','Fecha vacunacion'];

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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetVacunasPaciente');
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
    this.servicioVacuna.getVacunas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalVacunas = todo;

        this.reemplazarIdPorString();
         //DATATABLE
            this.exampleDatabase  = new ExampleDatabase(this.arrayVacunasPaciente);

            this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetVacunasPaciente');
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
     
    for(let i=0;i<this.totalVacunas.length;i++){
      for(let j=0;j<this.arrayVacunasPaciente.length;j++){
        if(this.totalVacunas[i].id==this.arrayVacunasPaciente[j].Vacuna_id){
          this.arrayVacunasPaciente[j].nombreVacuna=this.totalVacunas[i].nombre;
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
  	public dialogRef: MatDialogRef<EditarVacunasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
  public dateAdapter: DateAdapter<any>
  	) {
      dateAdapter.setLocale('es-MX');

      this.paciente=data.paciente;
      this.arrayVacunasPaciente=data.arrayVacunasPaciente;

  		this.totalVacunas=data.vacunas;

  		this.servicioVacuna=data.servicioVacuna;
      this.servicioVacunasPaciente=data.servicioVacunasPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }


  obtenerFecha(vacuna){
    if(vacuna.esVerdadero){

      vacuna.fechaTemp=new Date();

    }else if(vacuna.esVerdadero==false){

      vacuna.fechaVacunacion=null;
    }

  }

   editarVacunasPaciente()
  {

    for(let i=0;i<this.arrayVacunasPaciente.length;i++){

      if(this.arrayVacunasPaciente[i].esVerdadero){

        this.arrayVacunasPaciente[i].fechaVacunacion=new Date(this.arrayVacunasPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
      
      }else{
        this.arrayVacunasPaciente[i].fechaVacunacion=null;
      }
      this.servicioVacunasPaciente.editVacunaPaciente(this.arrayVacunasPaciente[i], this.arrayVacunasPaciente[i].id).subscribe( data => {
        this.onNoClick();
      });

    }
  }
}

