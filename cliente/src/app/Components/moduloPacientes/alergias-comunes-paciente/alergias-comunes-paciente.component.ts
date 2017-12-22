import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';
import { VerFichaMedicaComponent } from '../fichamedica/verfichamedica/verfichamedica.component'
import { FichaAtencionComponent } from '../../moduloAtenciones/ficha-atencion/ficha-atencion.component'


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
	public totalPacientes: any;
	public totalAlergiasComunesPaciente: AlergiasComunesPaciente[];
	public totalPersonas: Persona[];
	public usuarioActual;
  
  //Arreglo con todos los registros que contengan al paciente parametrizado y sus hábitos
  public arrayAlergiasComunesPaciente: AlergiasComunesPaciente[];

  	displayedColumns = ['Acciones','Rut Paciente', 'Nombre', 'Alergias Comunes'];

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
      this.arrayAlergiasComunesPaciente = [];
      this.actualizarAtributos();



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

                this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalAlergiasComunesPaciente = todo;
        
                  this.reemplazarIdPorString();

                    //DATATABLE
                  this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

                  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'AlergiasComunesPaciente');
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
      for(let j=0;j<this.totalAlergiasComunesPaciente.length;j++){
        if(this.totalPacientes[i].id===this.totalAlergiasComunesPaciente[j].Paciente_id){
         let currentPersona= this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));
          this.totalPacientes[i].rut=currentPersona[0].rut;
          this.totalPacientes[i].nombre=currentPersona[0].nombre1+" "+currentPersona[0].nombre2+" "+currentPersona[0].apellido1+" "+currentPersona[0].apellido2;
          break;
        }
      }
    }
  }

  edicionAlergiasComunesPaciente (paciente)
  {

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerAlergiasComunesPaciente(a.id);

    let dialogRef = this.dialog.open(EditarAlergiasComunesPacienteComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       alergiasComunes: this.totalAlergiasComunes,
       arrayAlergiasComunesPaciente: this.arrayAlergiasComunesPaciente,
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
      this.arrayAlergiasComunesPaciente = [];
      
    });
  }

  //función para mostrar la ficha médica del paciente correspondiente
 desplegarFichaPaciente(paciente)
  {

   var a = JSON.parse( JSON.stringify(paciente) );


       let dialogRef = this.dialog.open(FichaAtencionComponent, {
          width: '1000px',
          height:'700px',
          data: { paciente: a }
        });

 

  }

  //función para setear el array con los registros del paciente correspondiente
  obtenerAlergiasComunesPaciente(idPaciente){
    for(let i=0;i<this.totalAlergiasComunesPaciente.length;i++){

      if(this.totalAlergiasComunesPaciente[i].Paciente_id==idPaciente){

        this.arrayAlergiasComunesPaciente.push(this.totalAlergiasComunesPaciente[i]);
      }

      if(this.totalAlergiasComunesPaciente[i].fechaDeteccion != null){

        this.totalAlergiasComunesPaciente[i].esVerdadero=true;

      }else if(this.totalAlergiasComunesPaciente[i].fechaDeteccion==null){

        this.totalAlergiasComunesPaciente[i].esVerdadero=false;
      }
    }

  }

}