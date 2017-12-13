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
	public totalPacientes: Paciente[];
	public totalEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente[];
	public totalPersonas: Persona[];
	public usuarioActual;
  	displayedColumns = ['Acciones', 'Rut Paciente', 'Enfermedad Cronica','Fecha Deteccion'];

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
      this.actualizarAtributos();
      this.actualizarEnfermedadesCronicasPaciente();



      }


    actualizarEnfermedadesCronicasPaciente ()
  {
    this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEnfermedadesCronicasPaciente = todo;
      
      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalEnfermedadesCronicasPaciente);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'EnfermedadesCronicasPaciente');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


    });
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
    for(let i = 0 ; i < this.totalEnfermedadesCronicasPaciente.length ; i ++)
    {

      for(let j = 0 ; j < this.totalEnfermedadesCronicas.length ; j++)
      {
        console.log("ec")
        console.log(this.totalEnfermedadesCronicasPaciente[i].EnfermedadCronica_id)
        console.log("id")
        console.log(this.totalEnfermedadesCronicas[j].id)
        if( parseInt(this.totalEnfermedadesCronicasPaciente[i].EnfermedadCronica_id) === this.totalEnfermedadesCronicas[j].id)
        {
          this.totalEnfermedadesCronicasPaciente[i].EnfermedadCronica_id = this.totalEnfermedadesCronicas[j].nombre;
          console.log(this.totalEnfermedadesCronicasPaciente[i].EnfermedadCronica_id);
          break;
        }
      }

      for(let j = 0 ; j < this.totalPacientes.length ; j++)
      {
        if( parseInt(this.totalEnfermedadesCronicasPaciente[i].Paciente_id) === this.totalPacientes[j].id)
        {
          let currentPersona = this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[j].Persona_id));
          this.totalEnfermedadesCronicasPaciente[i].Paciente_id = currentPersona[0].rut;
          break;
        }
      }

    }
  }

  pasarStringId(enfermedadesCronicasPaciente)
  {
    for ( let i = 0 ; i < this.totalEnfermedadesCronicas.length ; i ++)
    {
    if(enfermedadesCronicasPaciente.EnfermedadCronica_id === this.totalEnfermedadesCronicas[i].nombre)
    {
      enfermedadesCronicasPaciente.EnfermedadCronica_id = this.totalEnfermedadesCronicas[i].id;
    }
    }

    for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
    let currentPersona = this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));

    if(enfermedadesCronicasPaciente.Paciente_id === currentPersona[0].rut)
    {
      enfermedadesCronicasPaciente.Paciente_id = this.totalPacientes[i].id;
    }
    }

  }



  edicionEnfermedadesCronicasPaciente (enfermedadesCronicasPaciente)
  {

    var a = JSON.parse( JSON.stringify(enfermedadesCronicasPaciente) );

    this.pasarStringId(a);

    let dialogRef = this.dialog.open(EditarEnfermedadesCronicasPacienteComponent, {
      width: '800px',
      height: '500px',
      data:
      {
       enfermedadesCronicasPaciente: a,
       enfermedadesCronicas: this.totalEnfermedadesCronicas,
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
      
    });
  }

  agregacionEnfermedadesCronicasPaciente()
  {
    let dialogRef = this.dialog.open(AgregarEnfermedadesCronicasPacienteComponent, {
      width: '800px',
      height: '500px',
      data: {
        enfermedadesCronicas: this.totalEnfermedadesCronicas,
        pacientes: this.totalPacientes,
        personas: this.totalPersonas,
        servicioEnfermedadesCronicasPaciente: this.servicioEnfermedadesCronicasPaciente,
        servicioEnfermedadCronica: this.servicioEnfermedadCronica,
        servicioPaciente: this.servicioPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actualizarAtributos();
      this.actualizarEnfermedadesCronicasPaciente();
    });
  }


  //función para mostrar la ficha médica del paciente correspondiente
 desplegarFichaPaciente(enfermedadesPaciente)
  {

   var a = JSON.parse( JSON.stringify(enfermedadesPaciente) );
   var b;
  this.pasarStringId(a);

  this.servicioPaciente.getPaciente(a.Paciente_id).subscribe(data =>{
    var todo: any = data;
    todo = todo.data;
    b=todo;

    this.servicioPersona.getPersona(parseInt(b.Persona_id)).subscribe(data => {

      var persona: any = data;
      persona = persona.data;

      console.log(persona);

       let dialogRef = this.dialog.open(VerFichaMedicaComponent, {
          width: '1000px',
          height:'500px',
          data: { persona: persona }
        });

    });
  });

  }



}
