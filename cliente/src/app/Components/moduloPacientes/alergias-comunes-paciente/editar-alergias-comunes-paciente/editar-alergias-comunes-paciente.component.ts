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
  selector: 'app-editar-alergias-comunes-paciente',
  templateUrl: './editar-alergias-comunes-paciente.component.html',
  styleUrls: ['./editar-alergias-comunes-paciente.component.css'],
   providers: [
   
    {provide: LOCALE_ID,
    useValue: 'es-MX'},

  ],
})
export class EditarAlergiasComunesPacienteComponent implements OnInit {
	public paciente:any;
  public arrayAlergiasComunesPaciente: any;

	public totalAlergiasComunes: any;

  public servicioAlergiaComun: any;
  public servicioAlergiasComunesPaciente:any;

  displayedColumns = ['Alergias','Estado','Fecha deteccion'];

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

        this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'SetAlergiasComunesPaciente');
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

    this.servicioAlergiaComun.getAlergias().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunes = todo;

     
        this.reemplazarIdPorString();

          //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.arrayAlergiasComunesPaciente);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'SetAlergiasComunesPaciente');
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
     

    for(let i=0;i<this.totalAlergiasComunes.length;i++){
      for(let j=0;j<this.arrayAlergiasComunesPaciente.length;j++){
        if(this.totalAlergiasComunes[i].id==this.arrayAlergiasComunesPaciente[j].Alergia_id){
          this.arrayAlergiasComunesPaciente[j].nombreAlergia=this.totalAlergiasComunes[i].nombre;
        }
      }
    }

    
  }

  constructor(
  	public dialogRef: MatDialogRef<EditarAlergiasComunesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
  public dateAdapter: DateAdapter<any> 
  	) {

      dateAdapter.setLocale('es-MX'); 
      
      this.paciente = data.paciente;
      
      this.arrayAlergiasComunesPaciente = data.arrayAlergiasComunesPaciente;

  		
  		this.totalAlergiasComunes=data.alergiasComunes;
  	
  		this.servicioAlergiaComun=data.servicioAlergiaComun;
      this.servicioAlergiasComunesPaciente=data.servicioAlergiasComunesPaciente;

      

  	 }

  onNoClick()
    {
      this.dialogRef.close();
    }

   obtenerFecha(alergiaPaciente){
    if(alergiaPaciente.esVerdadero){
      alergiaPaciente.fechaTemp=new Date();
    }else if(alergiaPaciente.esVerdadero==false){
      alergiaPaciente.fechaDeteccion=null;
    }



  }
  editarAlergiasComunesPaciente()
  {

    for(let i=0;i<this.arrayAlergiasComunesPaciente.length;i++){

      if(this.arrayAlergiasComunesPaciente[i].esVerdadero){
      this.arrayAlergiasComunesPaciente[i].fechaDeteccion=new Date(this.arrayAlergiasComunesPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
      }else{
        this.arrayAlergiasComunesPaciente[i].fechaDeteccion=null;
      }
      this.servicioAlergiasComunesPaciente.editAlergiasComunesPaciente(this.arrayAlergiasComunesPaciente[i], this.arrayAlergiasComunesPaciente[i].id).subscribe( data => {
          this.onNoClick();

      });

    }
  }

}
