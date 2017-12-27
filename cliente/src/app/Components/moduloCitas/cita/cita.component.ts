import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { Medico } from '../../../Models/Medico.model';
import { MedicoService } from '../../../Services/medico/medico.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { BoxConsulta } from '../../../Models/BoxConsulta.model';
import { BoxConsultaService } from '../../../Services/boxconsulta/box-consulta.service';

import { EstadoCita } from '../../../Models/EstadoCita.model';
import { EstadoCitaService } from '../../../Services/estadocita/estado-cita.service';

import { Cita } from '../../../Models/Cita.model'
import { CitaService } from '../../../Services/cita/cita.service';

import { Persona } from '../../../Models/Persona.model'
import { PersonaService } from '../../../Services/persona/persona.service';

import { UsuarioActual } from '../../Globals/usuarioactual.component';

import { AgregarcitaComponent } from './agregarcita/agregarcita.component'
import { EditarcitaComponent } from './editarcita/editarcita.component'

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
  selector: 'app-cita',
  styleUrls: ['cita.component.css'],
  templateUrl: 'cita.component.html'

})


export class CitaComponent {
  private totalPacientes: Paciente[]
  private totalMedicos: Medico[]
  private totalEstados: EstadoCita[]
  private totalCitas: Cita[]
  private totalBoxs: BoxConsulta[]
  public usuarioActual;
  private totalPersonas: Persona[]

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  displayedColumns = ['Acciones', 'Fecha', 'Hora', 'Estado', 'Box', 'Paciente', 'Medico'];

  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Citas');
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






  constructor (
    private servicioPersona: PersonaService,
    private servicioCita: CitaService,
    private servicioBox: BoxConsultaService,
    private servicioEstado: EstadoCitaService,
    private servicioPaciente: PacienteService,
    private servicioMedico: MedicoService,
    private dialog: MatDialog)
  {
    this.usuarioActual=new UsuarioActual();
    this.totalCitas = []
    this.totalEstados = []
    this.totalMedicos = []
    this.totalPacientes = []
    this.totalBoxs = []
    this.totalPersonas = []
    this.actualizarBoxs()
  }

  actualizarBoxs()
  {
    this.servicioBox.getBoxConsultas().subscribe( data => {
      this.totalBoxs = this.normalizeData(data)
      this.actualizarPacientes()
    })
  }

  actualizarPacientes()
  {
    this.servicioPaciente.getPacientes().subscribe( data => {
      this.totalPacientes = this.normalizeData(data)
      this.actualizarMedicos()
    })
  }

  actualizarMedicos()
  {
    this.servicioMedico.getMedicos().subscribe( data => {
      this.totalMedicos = this.normalizeData(data)
      this.actualizarEstados()
    })
  }

  actualizarEstados()
  {
    this.servicioEstado.getEstadoCitas().subscribe( data => {
      this.totalEstados = this.normalizeData(data)
      this.actualizarCitas()
    })
  }

  actualizarCitas()
  {
    this.servicioCita.getCitas().subscribe( data => {
      this.totalCitas = this.normalizeData(data)

      console.log(this.totalCitas)

      this.idToString()



    })
  }

  idToString()
  {
      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalCitas);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Citas');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

  }

  normalizeData(todo: any)
  {
    return todo.data
  }

  eliminarCita(cita)
  {
    this.servicioCita.deleteCita(cita.id).subscribe( data => {
      console.log(data)
      this.actualizarBoxs()
    })
  }

  abrirModal(funcion, cita)
  {
    let currentCita
    let modal

    if( funcion === 'agregar' )
    {
      modal = AgregarcitaComponent
      currentCita = new Cita()
    }
    else
    {
      modal = EditarcitaComponent
      currentCita = cita

      console.log(currentCita)
    }



    let dialogRef = this.dialog.open(modal, {
      width: '1000px',
    data: {
        cita: currentCita,
        estados: this.totalEstados,
        pacientes: this.totalPacientes,
        medicos: this.totalMedicos,
        boxs: this.totalBoxs,
        servicioCitas: this.servicioCita
       }
    })


    dialogRef.afterClosed().subscribe(result => {
      this.actualizarBoxs();
    })

  }

}




