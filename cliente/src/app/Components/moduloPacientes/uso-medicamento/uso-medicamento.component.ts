import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { VerpersonaComponent } from '../../moduloPacientes/personas/verpersona/verpersona.component';
import { VerFichaMedicaComponent } from '../fichamedica/verfichamedica/verfichamedica.component'

import { UsoMedicamento } from '../../../Models/UsoMedicamento.model';
import { UsoMedicamentoService } from '../../../Services/usomedicamento/uso-medicamento.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { Medicamento } from '../../../Models/Medicamento.model';
import { MedicamentoService } from '../../../Services/medicamento/medicamento.service';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { AgregarUsoMedicamentoComponent } from './agregar-uso-medicamento/agregar-uso-medicamento.component';
import { EditarUsoMedicamentoComponent } from './editar-uso-medicamento/editar-uso-medicamento.component';

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
  selector: 'app-uso-medicamento',
  templateUrl: './uso-medicamento.component.html',
  styleUrls: ['./uso-medicamento.component.css']
})
export class UsoMedicamentoComponent{
	public totalMedicamentos: Medicamento[];
	public totalPacientes: any;
  	public totalUsoMedicamentos: UsoMedicamento[];
  	public totalPersonas: Persona[];
	public usuarioActual;

  //arreglo con todos los registron que contengan al paciente parametrizado y sus hábitos
  public arrayUsoMedicamentos: UsoMedicamento[];
  	displayedColumns = ['Acciones', 'Rut Paciente', 'Nombre', 'Medicamentos'];


	//DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

   ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'UsoMedicamento');
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

  constructor(public servicioUsoMedicamento: UsoMedicamentoService,
  	public servicioMedicamento: MedicamentoService,public servicioPaciente: PacienteService,
  	 public servicioPersona: PersonaService, public dialog:MatDialog) {

      this.usuarioActual=new UsuarioActual();
      this.totalMedicamentos = [];
      this.totalUsoMedicamentos = [];
      this.totalPacientes=[];
      this.totalPersonas=[];
      this.arrayUsoMedicamentos = [];
      this.actualizarAtributos();
      this.actualizarUsoMedicamentos();

  	  }

    actualizarUsoMedicamentos ()
  {
    this.servicioUsoMedicamento.getUsoMedicamentos().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalUsoMedicamentos = todo;
      
      this.servicioPaciente.getPacientes().subscribe(data=>{
         var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'UsoMedicamento');
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
  obtenerUsoMedicamentos(idPaciente){
    for(let i=0;i<this.totalUsoMedicamentos.length;i++){

      if(this.totalUsoMedicamentos[i].Paciente_id==idPaciente){

        this.arrayUsoMedicamentos.push(this.totalUsoMedicamentos[i]);
      }

      if(this.totalUsoMedicamentos[i].fechaInicio != null){

        this.totalUsoMedicamentos[i].esVerdadero=true;

      }else if(this.totalUsoMedicamentos[i].fechaInicio==null){

        this.totalUsoMedicamentos[i].esVerdadero=false;
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


  eliminarUsoMedicamento (usoMedicamento)
  {
    this.servicioUsoMedicamento.deleteUsoMedicamento(usoMedicamento.id).subscribe( data => {
      this.actualizarAtributos();
      this.actualizarUsoMedicamentos();
    });
  }

  reemplazarIdPorString()
  {
    for(let i=0;i<this.totalPacientes.length;i++){
      for(let j=0;j<this.totalUsoMedicamentos.length;j++){
        if(this.totalPacientes[i].id===this.totalUsoMedicamentos[j].Paciente_id){
         let currentPersona= this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));
          this.totalPacientes[i].rut=currentPersona[0].rut;
          this.totalPacientes[i].nombre=currentPersona[0].nombre1+" "+currentPersona[0].nombre2+" "+currentPersona[0].apellido1+" "+currentPersona[0].apellido2;
          break;
        }
      }
    }
  }


 
  edicionUsoMedicamento (paciente)
  {

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerUsoMedicamentos(a.id);

    let dialogRef = this.dialog.open(EditarUsoMedicamentoComponent, {
      width: '800px',
      height: '500px',
      data:
      {
       paciente: a,
       medicamentos: this.totalMedicamentos,
       arrayUsoMedicamentos: this.arrayUsoMedicamentos,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioMedicamento: this.servicioMedicamento,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioUsoMedicamento: this.servicioUsoMedicamento
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarAtributos();
      this.actualizarUsoMedicamentos();
      this.arrayUsoMedicamentos = [];
      
    });
  }

  agregacionUsoMedicamentos()
  {
    let dialogRef = this.dialog.open(AgregarUsoMedicamentoComponent, {
      width: '800px',
      height: '500px',
      data: {
        medicamentos: this.totalMedicamentos,
        pacientes: this.totalPacientes,
        personas: this.totalPersonas,
        servicioUsoMedicamento: this.servicioUsoMedicamento,
        servicioMedicamento: this.servicioMedicamento,
        servicioPaciente: this.servicioPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actualizarAtributos();
      this.actualizarUsoMedicamentos();
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
