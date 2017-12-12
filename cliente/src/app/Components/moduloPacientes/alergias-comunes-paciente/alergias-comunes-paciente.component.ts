import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';
import { VerFichaMedicaComponent } from '../fichamedica/verfichamedica/verfichamedica.component'

import { AlergiasComunesPaciente } from '../../../Models/AlergiasComunesPaciente.model';
import { AlergiasComunesPacienteService } from '../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';

import { Alergia } from '../../../Models/Alergia.model';
import { AlergiaService } from '../../../Services/alergia/alergia.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';


import { AgregarAlergiasComunesPacienteComponent } from './agregar-alergias-comunes-paciente/agregar-alergias-comunes-paciente.component';
import { EditarAlergiasComunesPacienteComponent } from './editar-alergias-comunes-paciente/editar-alergias-comunes-paciente.component';

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
  selector: 'app-alergias-comunes-paciente',
  templateUrl: './alergias-comunes-paciente.component.html',
  styleUrls: ['./alergias-comunes-paciente.component.css']
})
export class AlergiasComunesPacienteComponent {

	public totalAlergiasComunes: Alergia[];
	public totalPacientes: Paciente[];
	public totalAlergiasComunesPaciente: AlergiasComunesPaciente[];
	public totalPersonas: Persona[];
	public usuarioActual;
  	displayedColumns = ['Acciones', 'Rut Paciente', 'Alergia Comun','Fecha Deteccion'];

  	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;


	ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'AlergiasComunesPaciente');
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


  constructor(public servicioAlergiasComunesPaciente: AlergiasComunesPacienteService,
  	public servicioAlergiaComun: AlergiaService, public servicioPaciente: PacienteService,
  	 public servicioPersona: PersonaService, public dialog:MatDialog) {

      this.usuarioActual=new UsuarioActual();
      this.totalAlergiasComunes = [];
      this.totalAlergiasComunesPaciente = [];
      this.totalPacientes=[];
      this.totalPersonas=[];
      this.actualizarAtributos();
      this.actualizarAlergiasComunesPaciente();



      }


    actualizarAlergiasComunesPaciente ()
  {
    this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunesPaciente = todo;
      
      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalAlergiasComunesPaciente);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'AlergiasComunesPaciente');
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
    this.servicioAlergiaComun.getAlergias().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunes = todo;

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


  eliminarAlergiasComunesPaciente (alergiasComunesPaciente)
  {
    this.servicioAlergiasComunesPaciente.deleteAlergiasComunesPaciente(alergiasComunesPaciente.id).subscribe( data => {
      this.actualizarAtributos();
      this.actualizarAlergiasComunesPaciente();
    });
  }


  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalAlergiasComunesPaciente.length ; i ++)
    {

      for(let j = 0 ; j < this.totalAlergiasComunes.length ; j++)
      {
        console.log("ec")
        console.log(this.totalAlergiasComunesPaciente[i].Alergia_id)
        console.log("id")
        console.log(this.totalAlergiasComunes[j].id)
        if( parseInt(this.totalAlergiasComunesPaciente[i].Alergia_id) === this.totalAlergiasComunes[j].id)
        {
          this.totalAlergiasComunesPaciente[i].Alergia_id = this.totalAlergiasComunes[j].nombre;
          console.log(this.totalAlergiasComunesPaciente[i].Alergia_id);
          break;
        }
      }

      for(let j = 0 ; j < this.totalPacientes.length ; j++)
      {
        if( parseInt(this.totalAlergiasComunesPaciente[i].Paciente_id) === this.totalPacientes[j].id)
        {
          let currentPersona = this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[j].Persona_id));
          this.totalAlergiasComunesPaciente[i].Paciente_id = currentPersona[0].rut;
          break;
        }
      }

    }
  }

  pasarStringId(alergiasComunesPaciente)
  {
    for ( let i = 0 ; i < this.totalAlergiasComunes.length ; i ++)
    {
    if(alergiasComunesPaciente.Alergia_id === this.totalAlergiasComunes[i].nombre)
    {
      alergiasComunesPaciente.Alergia_id = this.totalAlergiasComunes[i].id;
    }
    }

    for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
    let currentPersona = this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));

    if(alergiasComunesPaciente.Paciente_id === currentPersona[0].rut)
    {
      alergiasComunesPaciente.Paciente_id = this.totalPacientes[i].id;
    }
    }

  }



  edicionAlergiasComunesPaciente (alergiasComunesPaciente)
  {

    var a = JSON.parse( JSON.stringify(alergiasComunesPaciente) );

    this.pasarStringId(a);

    let dialogRef = this.dialog.open(EditarAlergiasComunesPacienteComponent, {
      width: '800px',
      height: '500px',
      data:
      {
       alergiasComunesPaciente: a,
       alergiasComunes: this.totalAlergiasComunes,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioAlergiaComun: this.servicioAlergiaComun,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioAlergiasComunesPaciente: this.servicioAlergiasComunesPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarAtributos();
      this.actualizarAlergiasComunesPaciente();
      
    });
  }

  agregacionAlergiasComunesPaciente()
  {
    let dialogRef = this.dialog.open(AgregarAlergiasComunesPacienteComponent, {
      width: '800px',
      height: '500px',
      data: {
        alergiasComunes: this.totalAlergiasComunes,
        pacientes: this.totalPacientes,
        personas: this.totalPersonas,
        servicioAlergiasComunesPaciente: this.servicioAlergiasComunesPaciente,
        servicioAlergiaComun: this.servicioAlergiaComun,
        servicioPaciente: this.servicioPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actualizarAtributos();
      this.actualizarAlergiasComunesPaciente();
    });
  }


  //función para mostrar la ficha médica del paciente correspondiente
 desplegarFichaPaciente(alergiasPaciente)
  {

   var a = JSON.parse( JSON.stringify(alergiasPaciente) );
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