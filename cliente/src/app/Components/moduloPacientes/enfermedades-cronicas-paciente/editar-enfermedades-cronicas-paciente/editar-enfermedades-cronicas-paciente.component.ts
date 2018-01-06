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
  selector: 'app-editar-enfermedades-cronicas-paciente',
  templateUrl: './editar-enfermedades-cronicas-paciente.component.html',
  styleUrls: ['./editar-enfermedades-cronicas-paciente.component.css'],
    providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class EditarEnfermedadesCronicasPacienteComponent implements OnInit {

  public paciente:any;
  public arrayEnfermedadesCronicasPaciente: any;

	public totalEnfermedadesCronicas: any;

  public servicioEnfermedadCronica: any;
  public servicioEnfermedadesCronicasPaciente:any;

  displayedColumns = ['Enfermedad','Estado','Fecha deteccion'];

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

  actualizarAtributos(){
    this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicas = todo;

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

  constructor(
  	public dialogRef: MatDialogRef<EditarEnfermedadesCronicasPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
   public dateAdapter: DateAdapter<any>
  	) {

      dateAdapter.setLocale('es-MX');

      this.paciente = data.paciente;
      this.arrayEnfermedadesCronicasPaciente = data.arrayEnfermedadesCronicasPaciente;

  		this.totalEnfermedadesCronicas=data.enfermedadesCronicas;

  		this.servicioEnfermedadCronica=data.servicioEnfermedadCronica;
      this.servicioEnfermedadesCronicasPaciente=data.servicioEnfermedadesCronicasPaciente;

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

  obtenerFecha(enfermedadPaciente){
    if(enfermedadPaciente.esVerdadero){

      enfermedadPaciente.fechaTemp=new Date();

    }else if(enfermedadPaciente.esVerdadero==false){

      enfermedadPaciente.fechaDeteccion=null;

    }



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
        this.onNoClick();

      });

    }

  }
  	
}
