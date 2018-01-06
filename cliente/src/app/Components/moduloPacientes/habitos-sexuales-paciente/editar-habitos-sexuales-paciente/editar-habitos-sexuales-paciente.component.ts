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
  selector: 'app-editar-habitos-sexuales-paciente',
  templateUrl: './editar-habitos-sexuales-paciente.component.html',
  styleUrls: ['./editar-habitos-sexuales-paciente.component.css'],
   providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class EditarHabitosSexualesPacienteComponent implements OnInit {
	  public paciente:any;

    public arrayHabitosSexualesPaciente:any;

	  public totalHabitosSexuales: any;

    public servicioHabitoSexual: any;
    public servicioHabitosSexualesPaciente:any;

    displayedColumns = ['Habito sexual','Estado','Fecha inicio'];

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
   this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetHabitosSexualesPaciente');
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
    this.servicioHabitoSexual.getHabitoSexuales().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitosSexuales = todo;

        this.reemplazarIdPorString();
        //DATATABLE
            this.exampleDatabase  = new ExampleDatabase(this.arrayHabitosSexualesPaciente);

            this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetHabitosSexualesPaciente');
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
   
    for(let i=0;i<this.totalHabitosSexuales.length;i++){
      for(let j=0;j<this.arrayHabitosSexualesPaciente.length;j++){
        if(this.totalHabitosSexuales[i].id==this.arrayHabitosSexualesPaciente[j].HabitoSexual_id){
          this.arrayHabitosSexualesPaciente[j].nombreHabitoSexual=this.totalHabitosSexuales[i].nombre;
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
  	public dialogRef: MatDialogRef<EditarHabitosSexualesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
  public dateAdapter: DateAdapter<any>
  	) {

        dateAdapter.setLocale('es-MX');

        this.paciente=data.paciente;

        this.arrayHabitosSexualesPaciente=data.arrayHabitosSexualesPaciente;

    		this.totalHabitosSexuales=data.habitosSexuales;
    		this.servicioHabitoSexual=data.servicioHabitoSexual;
        this.servicioHabitosSexualesPaciente=data.servicioHabitosSexualesPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }


   obtenerFecha(habitoSexualPaciente){
    if(habitoSexualPaciente.esVerdadero){

      habitoSexualPaciente.fechaTemp=new Date();

    }else if(habitoSexualPaciente.esVerdadero==false){

      habitoSexualPaciente.fechaInicio=null;
    }


  }

 editarHabitosSexualesPaciente()
  {

    for(let i=0;i<this.arrayHabitosSexualesPaciente.length;i++){

      if(this.arrayHabitosSexualesPaciente[i].esVerdadero){
        
        this.arrayHabitosSexualesPaciente[i].fechaInicio=new Date(this.arrayHabitosSexualesPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
      
      }else{
        this.arrayHabitosSexualesPaciente[i].fechaInicio=null;
      }
      this.servicioHabitosSexualesPaciente.editHabitosSexualesPaciente(this.arrayHabitosSexualesPaciente[i], this.arrayHabitosSexualesPaciente[i].id).subscribe( data => {
         this.onNoClick();
      });

    }
  }

}
