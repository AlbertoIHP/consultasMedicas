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
	public totalPacientes: Paciente[];
  	public totalUsoMedicamentos: UsoMedicamento[];
  	public totalPersonas: Persona[];
	public usuarioActual;
  	displayedColumns = ['Acciones', 'Rut Paciente', 'Medicamento','Fecha Inicio'];


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
      this.actualizarAtributos();
      this.actualizarUsoMedicamentos();

  	  }

  actualizarUsoMedicamentos ()
  {
    this.servicioUsoMedicamento.getUsoMedicamentos().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalUsoMedicamentos = todo;
      
      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalUsoMedicamentos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'UsoMedicamento');
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
    for(let i = 0 ; i < this.totalUsoMedicamentos.length ; i ++)
    {

      for(let j = 0 ; j < this.totalMedicamentos.length ; j++)
      {
        if( parseInt(this.totalUsoMedicamentos[i].Medicamento_id) === this.totalMedicamentos[j].id)
        {
          this.totalUsoMedicamentos[i].Medicamento_id = this.totalMedicamentos[j].nombrecomun;
          break;
        }
      }

      for(let j = 0 ; j < this.totalPacientes.length ; j++)
      {
        if( parseInt(this.totalUsoMedicamentos[i].Paciente_id) === this.totalPacientes[j].id)
        {
          let currentPersona = this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[j].Persona_id));
          this.totalUsoMedicamentos[i].Paciente_id = currentPersona[0].rut;
          break;
        }
      }

    }
  }

  pasarStringId(usoMedicamentos)
  {
    for ( let i = 0 ; i < this.totalMedicamentos.length ; i ++)
    {
    if(usoMedicamentos.Medicamento_id === this.totalMedicamentos[i].nombrecomun)
    {
      usoMedicamentos.Medicamento_id = this.totalMedicamentos[i].id;
    }
    }

    for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
    let currentPersona = this.totalPersonas.filter( persona => persona.id === parseInt(this.totalPacientes[i].Persona_id));

    if(usoMedicamentos.Paciente_id === currentPersona[0].rut)
    {
      usoMedicamentos.Paciente_id = this.totalPacientes[i].id;
    }
    }

  }



  edicionUsoMedicamento (usoMedicamentos)
  {

    var a = JSON.parse( JSON.stringify(usoMedicamentos) );

    this.pasarStringId(a);

    let dialogRef = this.dialog.open(EditarUsoMedicamentoComponent, {
      width: '800px',
      data:
      {
       usoMedicamentos: a,
       medicamentos: this.totalMedicamentos,
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
      
    });
  }

  agregacionUsoMedicamentos()
  {
    let dialogRef = this.dialog.open(AgregarUsoMedicamentoComponent, {
      width: '800px',
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
 desplegarFichaPaciente(usoMedicamentos)
  {

   var a = JSON.parse( JSON.stringify(usoMedicamentos) );
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
