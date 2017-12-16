import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';
import { VerFichaMedicaComponent } from '../../moduloPacientes/fichamedica/verfichamedica/verfichamedica.component';

import { AlergiasMedicamentosPaciente } from '../../../Models/AlergiasMedicamentosPaciente.model';
import { AlergiasMedicamentosPacienteService } from '../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service';

import { Medicamento } from '../../../Models/Medicamento.model';
import { MedicamentoService } from '../../../Services/medicamento/medicamento.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';


import { AgregarAlergiasPacienteComponent } from './agregar-alergias-paciente/agregar-alergias-paciente.component';
import { EditarAlergiasPacienteComponent } from './editar-alergias-paciente/editar-alergias-paciente.component';

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
  selector: 'app-alergiaspaciente',
  templateUrl: './alergiaspaciente.component.html',
  styleUrls: ['./alergiaspaciente.component.css']
})
export class AlergiaspacienteComponent {
	public totalMedicamentos: Medicamento[];
	public totalPacientes: any;
	public totalAlergiasMedicamentosPaciente: AlergiasMedicamentosPaciente[];

	//arreglo con todos los registros que contengan al paciente parametrizado y sus alergias a medicamentos
	public arrayAlergiasMedicamentosPaciente: AlergiasMedicamentosPaciente[];

	public totalPersonas: Persona[];
	public usuarioActual;
  	displayedColumns = ['Acciones', 'Rut Paciente','Nombre','Medicamento'];

  	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

 	ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'AlergiasMedicamentosPaciente');
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


  constructor(public servicioAlergiasMedicamentosPaciente: AlergiasMedicamentosPacienteService,
  	public servicioMedicamento: MedicamentoService, public servicioPaciente: PacienteService,
  	 public servicioPersona: PersonaService, public dialog:MatDialog) {

      this.usuarioActual=new UsuarioActual();
      this.totalMedicamentos = [];
      this.totalAlergiasMedicamentosPaciente = [];

      this.arrayAlergiasMedicamentosPaciente =[];

      this.totalPacientes=[];
      this.totalPersonas=[];
      this.actualizarAtributos();
      this.actualizarAlergiasMedicamentosPaciente();



      }


    actualizarAlergiasMedicamentosPaciente ()
  {
    this.servicioAlergiasMedicamentosPaciente.getAlergiasMedicamentosPacientes().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasMedicamentosPaciente = todo;
      
      this.servicioPaciente.getPacientes().subscribe(data=>{
         var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'AlergiasMedicamentosPaciente');
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
  obtenerAlergiasMedicamentosPaciente(idPaciente){
    for(let i=0;i<this.totalAlergiasMedicamentosPaciente.length;i++){

      if(this.totalAlergiasMedicamentosPaciente[i].Paciente_id==idPaciente){

        this.arrayAlergiasMedicamentosPaciente.push(this.totalAlergiasMedicamentosPaciente[i]);
      }

      if(this.totalAlergiasMedicamentosPaciente[i].fechaInicio != null){

        this.totalAlergiasMedicamentosPaciente[i].esVerdadero=true;

      }else if(this.totalAlergiasMedicamentosPaciente[i].fechaInicio==null){

        this.totalAlergiasMedicamentosPaciente[i].esVerdadero=false;
      }
    }

  }


  actualizarAtributos ()
  {
    this.servicioMedicamento.getMedicamentos().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalMedicamentos = todo;

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

  reemplazarIdPorString()
  {
    for(let i=0;i<this.totalPacientes.length;i++){
      for(let j=0;j<this.totalAlergiasMedicamentosPaciente.length;j++){
        if(this.totalPacientes[i].id===this.totalAlergiasMedicamentosPaciente[j].Paciente_id){
         let currentPersona= this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));
          this.totalPacientes[i].rut=currentPersona[0].rut;
          this.totalPacientes[i].nombre=currentPersona[0].nombre1+" "+currentPersona[0].nombre2+" "+currentPersona[0].apellido1+" "+currentPersona[0].apellido2;
          break;
        }
      }
    }
  }

  edicionAlergiasMedicamentosPaciente (paciente)
  {

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerAlergiasMedicamentosPaciente(a.id);

    let dialogRef = this.dialog.open(EditarAlergiasPacienteComponent, {
      width: '800px',
      height: '500px',
      data:
      {
       paciente: a,
       medicamentos: this.totalMedicamentos,
       arrayAlergiasMedicamentosPaciente: this.arrayAlergiasMedicamentosPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioMedicamento: this.servicioMedicamento,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioAlergiasMedicamentosPaciente: this.servicioAlergiasMedicamentosPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarAtributos();
      this.actualizarAlergiasMedicamentosPaciente();
      this.arrayAlergiasMedicamentosPaciente = [];
      
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
