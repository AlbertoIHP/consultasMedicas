import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { Router } from '@angular/router';

import { VacunasPaciente } from '../../../Models/VacunasPaciente.model';
import { VacunasPacienteService } from '../../../Services/vacunaspaciente/vacunaspaciente.service';

import { Vacuna } from '../../../Models/Vacuna.model';
import { VacunaService } from '../../../Services/vacuna/vacuna.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';


import { AgregarVacunasPacienteComponent } from './agregar-vacunas-paciente/agregar-vacunas-paciente.component';
import { EditarVacunasPacienteComponent } from './editar-vacunas-paciente/editar-vacunas-paciente.component';

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
  selector: 'app-vacunas-paciente',
  templateUrl: './vacunas-paciente.component.html',
  styleUrls: ['./vacunas-paciente.component.css']
})
export class VacunasPacienteComponent {
	public totalVacunas: Vacuna[];
	public totalPacientes: Paciente[];
  public totalVacunasPaciente: VacunasPaciente[];
	public usuarioActual;
  displayedColumns = ['Acciones', 'Paciente', 'Vacuna','Fecha Vacunación'];


	//DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'VacunasPaciente');
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

  
  constructor(public servicioVacunasPaciente: VacunasPacienteService,public servicioVacuna: VacunaService,
     public servicioPaciente: PacienteService, public dialog:MatDialog) {

      this.usuarioActual=new UsuarioActual();
      this.totalVacunas = [];
      this.totalVacunasPaciente = [];
      this.totalPacientes=[];
      this.actualizarVacunasPaciente();



      }

actualizarVacunasPaciente ()
  {
    this.servicioVacunasPaciente.getVacunasPaciente().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalVacunasPaciente = todo;
      this.reemplazarIdPorString();

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalVacunasPaciente);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'VacunasPaciente');
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
    this.servicioVacuna.getVacunas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalVacunas = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalPacientes = todo;
      });
    });
  }


  eliminarVacunasPaciente (vacunasPaciente)
  {
    this.servicioVacunasPaciente.deleteVacunaPaciente(vacunasPaciente.id).subscribe( data => {
      this.actualizarVacunasPaciente();
    });
  }


  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalVacunasPaciente.length ; i ++)
    {

      for(let j = 0 ; j < this.totalVacunas.length ; j++)
      {
        if( parseInt(this.totalVacunasPaciente[i].Vacuna_id) === this.totalVacunas[j].id)
        {
          this.totalVacunasPaciente[i].Vacuna_id = this.totalVacunas[j].nombre;
          break;
        }
      }

      for(let j = 0 ; j < this.totalPacientes.length ; j++)
      {
        if( parseInt(this.totalVacunasPaciente[i].Paciente_id) === this.totalPacientes[j].id)
        {
          this.totalVacunasPaciente[i].Paciente_id = this.totalPacientes[j].GrupoEtnico_id;
          break;
        }
      }

    }
  }

  pasarStringId(vacunasPaciente)
  {
    for ( let i = 0 ; i < this.totalVacunas.length ; i ++)
    {
    if(vacunasPaciente.Vacuna_id === this.totalVacunas[i].nombre)
    {
      vacunasPaciente.Vacuna_id = this.totalVacunas[i].id;
    }
    }

    for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
    if(vacunasPaciente.Paciente_id === this.totalPacientes[i].rut)
    {
      vacunasPaciente.Paciente_id = this.totalPacientes[i].id;
    }
    }

  }



  edicionVacunasPaciente (vacunasPaciente)
  {

    var a = JSON.parse( JSON.stringify(vacunasPaciente) );

    this.pasarStringId(a);

    let dialogRef = this.dialog.open(EditarVacunasPacienteComponent, {
      width: '700px',
      data:
      {
       vacunasPaciente: vacunasPaciente,
       vacunas: this.totalVacunas,
       pacientes: this.totalPacientes,
       servicioVacunas: this.servicioVacuna,
       servicioPacientes: this.servicioPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarAtributos();
      this.actualizarVacunasPaciente();
      
    });
  }

  agregacionVacunasPaciente()
  {
    let dialogRef = this.dialog.open(AgregarVacunasPacienteComponent, {
      width: '700px',
      data: {
        vacunas: this.totalVacunas,
        pacientes: this.totalPacientes,
        servicioVacunasPaciente: this.servicioVacunasPaciente,
        servicioVacuna: this.servicioVacuna,
        servicioPaciente: this.servicioPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actualizarAtributos();
      this.actualizarVacunasPaciente();
    });
  }


}
