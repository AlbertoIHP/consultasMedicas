import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';

//DATATABLES
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ExampleDatabase, dataTable, buscadorPorNombre } from '../../Globals/datasource.component';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { TipoSangre } from '../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../Services/tiposangre/tiposangre.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { VerpersonaComponent } from '../../admin/adminpacientes/usuarios/verpersona/verpersona.component';

import { AgregarpacienteComponent } from './agregarpaciente/agregarpaciente.component';
import { EditarpacienteComponent } from './editarpaciente/editarpaciente.component';
@Component({
  selector: 'app-secretarypacientes',
  templateUrl: './secretarypacientes.component.html',
  styleUrls: ['./secretarypacientes.component.css']
})
export class SecretarypacientesComponent implements OnInit {
  public totalPersonas: Persona[];
  public totalPacientes: Paciente[];
  public totalTS: TipoSangre[];

  //DATATABLE
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  public sourceDatatable: dataTable | null;
  public sourcePorNombre: buscadorPorNombre | null;
  public bdEstructura;
  public buscarPorNombre: boolean;
  displayedColumns = ['Acciones','Persona', 'Tipo Sangre'];

  constructor(
    public servicioPersona: PersonaService,
    public servicioTS: TipoSangreService,
    public servicioPaciente: PacienteService,
    public dialog: MatDialog
    )
  {
    this.buscarPorNombre = false;
    this.totalTS = [];
    this.totalPacientes = [];
    this.totalPersonas = [];
    this.actualizarPersonas();
    this.actualizarTSs();
    this.actualizarPacientes();

  }

  ngOnInit() {
  }


  actualizarPersonas()
  {
    this.totalPersonas = [];
    this.servicioPersona.getPersonas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalPersonas = todo;
    });

  }


  actualizarTSs ()
  {
    this.totalTS = [];
    this.servicioTS.getTipoSangres().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalTS = todo;
    });
  }


  actualizarPacientes()
  {
    this.totalPacientes = [];
    this.servicioPaciente.getPacientes().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalPacientes = todo;
      this.reemplazarIdPorString();

    //DATATABLE
      this.bdEstructura = new ExampleDatabase(this.totalPacientes );
      this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
      this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, "Paciente");
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
        if (!this.sourcePorNombre) { return; }
        this.sourcePorNombre.filter = this.filter.nativeElement.value;
        });

    });
  }



  cambiarBusqueda()
  {
  this.buscarPorNombre = !this.buscarPorNombre;
  }



  eliminarPaciente (paciente)
  {
    this.servicioPaciente.deletePaciente(paciente.id).subscribe( data => {
      this.actualizarPacientes();
    });
  }




  edicionPaciente (paciente)
  {
  var a = JSON.parse(JSON.stringify(paciente));

  this.pasarStringId(a);

  console.log(a);
  let dialogRef = this.dialog.open(EditarpacienteComponent, {
    width: '1000px',
    data:
    {
     paciente: a,
     personas: this.totalPersonas,
     tipoSangres:this.totalTS,
     servicioPaciente: this.servicioPaciente,
     servicioPersona: this.servicioPersona,
     servicioTS: this.servicioTS

    }
  });

  dialogRef.afterClosed().subscribe(result => {

    this.actualizarPacientes();
  });
  }

  agregacionPaciente()
  {

    let dialogRef = this.dialog.open(AgregarpacienteComponent, {
      width: '1000px',
    data: {
       paciente: new Paciente(),
       personas: this.totalPersonas,
       tipoSangres:this.totalTS,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioTS: this.servicioTS
       }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarPacientes();
    });
  }

  desplegarPersona(paciente)
  {
  this.servicioPersona.getPersona(parseInt(paciente.Persona_id)).subscribe(data => {

    var persona: any = data;
    persona = persona.data;

    console.log(persona);

    let dialogRef = this.dialog.open(VerpersonaComponent, {
    width: '1000px',
    data: { persona: persona }
    });

    dialogRef.afterClosed().subscribe(result => {

    this.actualizarPacientes();
    });

  });


  }



  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalPacientes.length ; i ++)
    {

      for(let j = 0 ; j < this.totalTS.length ; j++)
      {
        if( parseInt(this.totalPacientes[i].TipoSangre_id) === this.totalTS[j].id)
        {
          this.totalPacientes[i].TipoSangre_id = this.totalTS[j].nombre;
          break;
        }
      }

    }
  }


  pasarStringId(paciente)
  {
    for ( let i = 0 ; i < this.totalTS.length ; i ++)
    {
      if(paciente.TipoSangre_id === this.totalTS[i].nombre)
      {
        paciente.TipoSangre_id = this.totalTS[i].id;
      }
    }
  }

}
