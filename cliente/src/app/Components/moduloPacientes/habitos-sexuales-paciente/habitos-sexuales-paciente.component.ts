import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';
import { VerFichaMedicaComponent } from '../fichamedica/verfichamedica/verfichamedica.component';

import { HabitosSexualesPaciente } from '../../../Models/HabitosSexualesPaciente.model';
import { HabitosSexualesPacienteService } from '../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';

import { HabitoSexual } from '../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../Services/habitosexual/habito-sexual.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';


import { AgregarHabitosSexualesPacienteComponent } from './agregar-habitos-sexuales-paciente/agregar-habitos-sexuales-paciente.component';
import { EditarHabitosSexualesPacienteComponent } from './editar-habitos-sexuales-paciente/editar-habitos-sexuales-paciente.component';

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
import { ExampleDatabase, ExampleDataSource } from '../../Globals/datasource.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-habitos-sexuales-paciente',
  templateUrl: './habitos-sexuales-paciente.component.html',
  styleUrls: ['./habitos-sexuales-paciente.component.css']
})
export class HabitosSexualesPacienteComponent {
  
	public totalHabitosSexuales: HabitoSexual[];
	public totalPacientes: any;
	public totalHabitosSexualesPaciente: HabitosSexualesPaciente[];

  //arreglo con todos los registron que contengan al paciente parametrizado y sus hábitos
  public arrayHabitosSexualesPaciente: HabitosSexualesPaciente[];

	public totalPersonas: Persona[];
	public usuarioActual;
  	displayedColumns = ['Rut Paciente','Nombre','Habitos Sexuales'];

  	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;


	ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'HabitosSexualesPaciente');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

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
  	public servicioHabitoSexual: HabitoSexualService, public servicioPaciente: PacienteService,
  	 public servicioPersona: PersonaService, public dialog:MatDialog) {

      this.usuarioActual=new UsuarioActual();
      this.totalHabitosSexuales = [];
      this.totalHabitosSexualesPaciente = [];

      this.arrayHabitosSexualesPaciente =[];

      this.totalPacientes=[];
      this.totalPersonas=[];
      this.actualizarAtributos();



      }

  //función para setear el array con los registros del paciente correspondiente
  obtenerArrayInicio(idPaciente,array,total){
    for(let i=0;i<total.length;i++){

      if(total[i].Paciente_id===idPaciente){

        if(total[i].fechaInicio != null){
          total[i].fechaTemp = new Date(total[i].fechaInicio);
          total[i].esVerdadero=true;

        }else if(total[i].fechaInicio==null){
          total[i].fechaTemp=null;
          total[i].esVerdadero=false;
        }

        array.push(total[i]);
      }

      
    }

  }

  actualizarAtributos ()
  {
    this.servicioHabitoSexual.getHabitoSexuales().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitosSexuales = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalPacientes = todo;

           this.servicioPersona.getPersonas().subscribe(data=>{
               var todo: any = data;
                todo = todo.data;
                this.totalPersonas = todo;

                this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalHabitosSexualesPaciente = todo;
        
                  this.reemplazarIdPorString();

                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'HabitosSexualesPaciente');
                  Observable.fromEvent(this.filter.nativeElement, 'keyup')
                      .debounceTime(150)
                      .distinctUntilChanged()
                      .subscribe(() => {
                        if (!this.dataSource) { return; }
                        this.dataSource.filter = this.filter.nativeElement.value;
                      })


               
                  
              });

           });

      });
    });
  }

  reemplazarIdPorString()
  {
    for(let i=0;i<this.totalPacientes.length;i++){
      for(let j=0;j<this.totalHabitosSexualesPaciente.length;j++){
        if(this.totalPacientes[i].id===this.totalHabitosSexualesPaciente[j].Paciente_id){
         let currentPersona= this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));
          this.totalPacientes[i].rut=currentPersona[0].rut;
          this.totalPacientes[i].nombre=currentPersona[0].nombre1+" "+currentPersona[0].nombre2+" "+currentPersona[0].apellido1+" "+currentPersona[0].apellido2;
          break;
        }
      }
    }
  }

  edicionHabitosSexualesPaciente (paciente)
  {

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerArrayInicio(a.id,this.arrayHabitosSexualesPaciente,this.totalHabitosSexualesPaciente);

    let dialogRef = this.dialog.open(EditarHabitosSexualesPacienteComponent, {
      width: '1000px',
      height: '700px',
      data:
      {
       paciente: a,
       habitosSexuales: this.totalHabitosSexuales,
       arrayHabitosSexualesPaciente: this.arrayHabitosSexualesPaciente,
       servicioHabitoSexual: this.servicioHabitoSexual,
       servicioHabitosSexualesPaciente: this.servicioHabitosSexualesPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarAtributos();
      this.arrayHabitosSexualesPaciente = [];
      
    });
  }


  //función para mostrar la ficha médica del paciente correspondiente
 desplegarFichaPaciente(paciente)
  {

   var a = JSON.parse( JSON.stringify(paciente) );
   var b;

  this.servicioPaciente.getPaciente(a.id).subscribe(data =>{
    var todo: any = data;
    todo = todo.data;
    b=todo;

    this.servicioPersona.getPersona(parseInt(b.Persona_id)).subscribe(data => {

      var persona: any = data;
      persona = persona.data;

      console.log(persona);

       let dialogRef = this.dialog.open(VerFichaMedicaComponent, {
          width: '1000px',
          height:'700px',
          data: { persona: persona }
        });
    });
  });

  }



}
