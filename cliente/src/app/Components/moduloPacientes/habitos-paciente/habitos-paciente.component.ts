import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';
import { VerFichaMedicaComponent } from '../fichamedica/verfichamedica/verfichamedica.component'

import { HabitosPaciente } from '../../../Models/HabitosPaciente.model';
import { HabitosPacienteService } from '../../../Services/habitospaciente/habitos-paciente.service';

import { Habito } from '../../../Models/Habito.model';
import { HabitoService } from '../../../Services/habito/habito.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';


import { AgregarHabitosPacienteComponent } from './agregar-habitos-paciente/agregar-habitos-paciente.component';
import { EditarHabitosPacienteComponent } from './editar-habitos-paciente/editar-habitos-paciente.component';

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
  selector: 'app-habitos-paciente',
  templateUrl: './habitos-paciente.component.html',
  styleUrls: ['./habitos-paciente.component.css']
})
export class HabitosPacienteComponent {
	public totalHabitos: Habito[];
	public totalPacientes: any;
  	public totalHabitosPaciente: HabitosPaciente[];
  	public totalPersonas: Persona[];
	public usuarioActual;

  //arreglo con todos los registron que contengan al paciente parametrizado y sus hábitos
  public arrayHabitosPaciente: HabitosPaciente[];
  	displayedColumns = ['Acciones', 'Rut Paciente', 'Nombre' ,'Habitos'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'HabitosPaciente');
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

  constructor(public servicioHabitosPaciente: HabitosPacienteService,public servicioHabito: HabitoService,
     public servicioPaciente: PacienteService, public servicioPersona: PersonaService, public dialog:MatDialog) {

      this.usuarioActual=new UsuarioActual();
      this.totalHabitos = [];
      this.totalHabitosPaciente = [];
      this.totalPacientes=[];
      this.totalPersonas=[];
      this.arrayHabitosPaciente =[];
      this.actualizarAtributos();



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

  actualizarAtributos ()
  {
    this.servicioHabito.getHabitos().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalHabitos = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalPacientes = todo;

           this.servicioPersona.getPersonas().subscribe(data=>{
               var todo: any = data;
                todo = todo.data;
                this.totalPersonas = todo;

                this.servicioHabitosPaciente.getHabitosPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalHabitosPaciente = todo;
        
                  this.reemplazarIdPorString();

                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'HabitosPaciente');
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
      for(let j=0;j<this.totalHabitosPaciente.length;j++){
        if(this.totalPacientes[i].id===this.totalHabitosPaciente[j].Paciente_id){
         let currentPersona= this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));
          this.totalPacientes[i].rut=currentPersona[0].rut;
          this.totalPacientes[i].nombre=currentPersona[0].nombre1+" "+currentPersona[0].nombre2+" "+currentPersona[0].apellido1+" "+currentPersona[0].apellido2;
          break;
        }
      }
    }
  }

  edicionHabitosPaciente (paciente)
  {

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerHabitosPaciente(a.id);

    let dialogRef = this.dialog.open(EditarHabitosPacienteComponent, {
      width: '800px',
      height: '500px',
      data:
      {
       paciente: a,
       habitos: this.totalHabitos,
       arrayHabitosPaciente: this.arrayHabitosPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioHabito: this.servicioHabito,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioHabitosPaciente: this.servicioHabitosPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarAtributos();
      this.arrayHabitosPaciente = [];
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
