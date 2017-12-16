import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';
import { VerFichaMedicaComponent } from '../fichamedica/verfichamedica/verfichamedica.component'

import { EnfermedadesCronicasPaciente } from '../../../Models/EnfermedadesCronicasPaciente.model';
import { EnfermedadesCronicasPacienteService } from '../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';

import { EnfermedadCronica } from '../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';


import { AgregarEnfermedadesCronicasPacienteComponent } from './agregar-enfermedades-cronicas-paciente/agregar-enfermedades-cronicas-paciente.component';
import { EditarEnfermedadesCronicasPacienteComponent } from './editar-enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente.component';

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
  selector: 'app-enfermedades-cronicas-paciente',
  templateUrl: './enfermedades-cronicas-paciente.component.html',
  styleUrls: ['./enfermedades-cronicas-paciente.component.css']
})
export class EnfermedadesCronicasPacienteComponent {
  
	public totalEnfermedadesCronicas: EnfermedadCronica[];
	public totalPacientes: any;
	public totalEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente[];
	public totalPersonas: Persona[];
	public usuarioActual;

  //arreglo con todos los registron que contengan al paciente parametrizado y sus hábitos
  public arrayEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente[];

  	displayedColumns = ['Acciones', 'Rut Paciente', 'Nombre', 'Enfermedades Cronicas'];

  	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;


	ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'EnfermedadesCronicasPaciente');
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


  constructor(public servicioEnfermedadesCronicasPaciente: EnfermedadesCronicasPacienteService,
  	public servicioEnfermedadCronica: EnfermedadCronicaService, public servicioPaciente: PacienteService,
  	 public servicioPersona: PersonaService, public dialog:MatDialog) {

      this.usuarioActual=new UsuarioActual();
      this.totalEnfermedadesCronicas = [];
      this.totalEnfermedadesCronicasPaciente = [];
      this.totalPacientes=[];
      this.totalPersonas=[];
      this.arrayEnfermedadesCronicasPaciente = [];
      this.actualizarAtributos();
      this.actualizarEnfermedadesCronicasPaciente();

      }


    actualizarEnfermedadesCronicasPaciente ()
  {
    this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicasPaciente = todo;
      
      this.servicioPaciente.getPacientes().subscribe(data=>{
         var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'EnfermedadesCronicasPaciente');
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

  //función para setear el array con los registros del paciente correspondiente
  obtenerEnfermedadesCronicasPaciente(idPaciente){
    for(let i=0;i<this.totalEnfermedadesCronicasPaciente.length;i++){

      if(this.totalEnfermedadesCronicasPaciente[i].Paciente_id==idPaciente){

        this.arrayEnfermedadesCronicasPaciente.push(this.totalEnfermedadesCronicasPaciente[i]);
      }

      if(this.totalEnfermedadesCronicasPaciente[i].fechaDeteccion != null){

        this.totalEnfermedadesCronicasPaciente[i].esVerdadero=true;

      }else if(this.totalEnfermedadesCronicasPaciente[i].fechaDeteccion==null){

        this.totalEnfermedadesCronicasPaciente[i].esVerdadero=false;
      }
    }

  }


  actualizarAtributos ()
  {
    this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicas = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalPacientes = todo;

           this.servicioPersona.getPersonas().subscribe(data=>{
               var todo: any = data;
                todo = todo.data;
                this.totalPersonas = todo;

                this.reemplazarIdPorString();

           });

      });
    });
  }


  eliminarEnfermedadesCronicasPaciente (enfermedadesCronicasPaciente)
  {
    this.servicioEnfermedadesCronicasPaciente.deleteEnfermedadesCronicasPaciente(enfermedadesCronicasPaciente.id).subscribe( data => {
      this.actualizarAtributos();
      this.actualizarEnfermedadesCronicasPaciente();
    });
  }

  reemplazarIdPorString()
  {
    for(let i=0;i<this.totalPacientes.length;i++){
      for(let j=0;j<this.totalEnfermedadesCronicasPaciente.length;j++){
        if(this.totalPacientes[i].id===this.totalEnfermedadesCronicasPaciente[j].Paciente_id){
         let currentPersona= this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));
          this.totalPacientes[i].rut=currentPersona[0].rut;
          this.totalPacientes[i].nombre=currentPersona[0].nombre1+" "+currentPersona[0].nombre2+" "+currentPersona[0].apellido1+" "+currentPersona[0].apellido2;
          break;
        }
      }
    }
  }


  edicionEnfermedadesCronicasPaciente (paciente)
  {

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerEnfermedadesCronicasPaciente(a.id);

    let dialogRef = this.dialog.open(EditarEnfermedadesCronicasPacienteComponent, {
      width: '800px',
      height: '500px',
      data:
      {
       paciente: a,
       enfermedadesCronicas: this.totalEnfermedadesCronicas,
       arrayEnfermedadesCronicasPaciente: this.arrayEnfermedadesCronicasPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioEnfermedadCronica: this.servicioEnfermedadCronica,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioEnfermedadesCronicasPaciente: this.servicioEnfermedadesCronicasPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarAtributos();
      this.actualizarEnfermedadesCronicasPaciente();
      this.arrayEnfermedadesCronicasPaciente = [];
      
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
