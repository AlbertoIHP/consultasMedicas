import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Genero } from '../../../Models/Genero.model';
import { GeneroService } from '../../../Services/genero/genero.service';

import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

import { AgregarpersonaComponent } from '../agregarpersona/agregarpersona.component';
import { EditarpersonaComponent } from '../editarpersona/editarpersona.component';
import { SecretaryprevisionComponent } from '../secretaryprevision/secretaryprevision.component';

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


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit{
  displayedColumns = [
  'Acciones',
  'Rut',
  'Nombre',
  'Telefonos',
  'Sexo',
  'Estado Civil',
  'Comuna'
  ];

  public totalPacientes: Persona[];
  public totalRegiones: Region[];
  public totalProvincias: Provincia[];
  public totalComunas: Comuna[];
  public totalGeneros: Genero[];
  public totalEstadoCiviles: EstadoCivil[];


  //DATATABLE
  public exampleDatabase;
  public dataSource: dataTable | null;
  public dataSource2: buscadorPorNombre | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  public buscarPorRut: boolean;

  ngOnInit()
  {
  console.log("ME ESTOY INICIANDO");
  }

  constructor(
    public servicioPersona: PersonaService,
    public servicioRegion: RegionService,
    public servicioProvincia: ProvinciaService,
    public servicioComuna: ComunaService,
    public servicioGenero: GeneroService,
    public servicioEstadoCivil: EstadocivilService,
    public router: Router,
    public dialog: MatDialog
    )
  {
    this.totalPacientes = [];
    this.buscarPorRut = false;

    this.actualizarRegiones();

    this.actualizarProvincias();

    this.actualizarComunas();

    this.actualizarGeneros();

    this.actualizarEstadoCiviles();

    this.actualizarPersonas();
  }

  crearPersona(): void {

    let dialogRef = this.dialog.open(AgregarpersonaComponent, {
      width: '500px',
    data:
    {
    regiones: this.totalRegiones,
    provincias: this.totalProvincias,
    comunas: this.totalComunas,
    ec: this.totalEstadoCiviles,
    generos: this.totalGeneros,
    servicioGenero: this.servicioGenero,
    servicioEC: this.servicioEstadoCivil,
    servicioComuna: this.servicioComuna,
    servicioPersona: this.servicioPersona,
    servicioProvincia: this.servicioProvincia,
    servicioRegion: this.servicioRegion
    }
    });

    dialogRef.afterClosed().subscribe(result => {
    this.actualizarGeneros();
    this.actualizarRegiones();
    this.actualizarComunas();
    this.actualizarProvincias();
    this.actualizarEstadoCiviles();
      this.actualizarPersonas();
    });
  }

  cambiarBusqueda()
  {
    this.buscarPorRut = !this.buscarPorRut;
  }


  editarPersona (persona)
  {
  var a = JSON.parse( JSON.stringify(persona) );

    this.pasarStringId(a);

  let dialogRef = this.dialog.open(EditarpersonaComponent, {
    width: '500px',
  data: {
  persona: a,
  regiones: this.totalRegiones,
  provincias: this.totalProvincias,
  comunas: this.totalComunas,
  ec: this.totalEstadoCiviles,
  generos: this.totalGeneros,
  servicioGenero: this.servicioGenero,
  servicioEC: this.servicioEstadoCivil,
  servicioComuna: this.servicioComuna,
  servicioProvincia: this.servicioProvincia,
  servicioRegion: this.servicioRegion
  }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.actualizarGeneros();
    this.actualizarRegiones();
    this.actualizarComunas();
    this.actualizarProvincias();
    this.actualizarEstadoCiviles();
    this.actualizarPersonas();
  });
  }

  previsionPersona (persona)
  {
    var a = JSON.parse(JSON.stringify(persona));
    this.pasarStringId(a);

  let dialogRef = this.dialog.open(SecretaryprevisionComponent, {
    width: '1000px',
    data:
    {
     persona: a
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    this.actualizarPersonas();
  });
  }




  pasarStringId(paciente)
  {
    for ( let i = 0 ; i < this.totalComunas.length ; i ++)
    {
    if(paciente.Comuna_id === this.totalComunas[i].nombre)
    {
      paciente.Comuna_id = this.totalComunas[i].id;
    }
    }

    for ( let i = 0 ; i < this.totalGeneros.length ; i ++)
    {
    if(paciente.Genero_id === this.totalGeneros[i].nombre)
    {
      paciente.Genero_id = this.totalGeneros[i].id;
    }
    }

    for ( let i = 0 ; i < this.totalEstadoCiviles.length ; i ++)
    {
    if(paciente.EstadoCivil_id === this.totalEstadoCiviles[i].nombre)
    {
      paciente.EstadoCivil_id = this.totalEstadoCiviles[i].id;
    }
    }
  }

  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalPacientes.length ; i ++)
    {

      for(let j = 0 ; j < this.totalGeneros.length ; j++)
      {
        if( parseInt(this.totalPacientes[i].Genero_id) === this.totalGeneros[j].id)
        {
          this.totalPacientes[i].Genero_id = this.totalGeneros[j].nombre;
          break;
        }
      }

      for(let j = 0 ; j < this.totalEstadoCiviles.length ; j++)
      {
        if( parseInt(this.totalPacientes[i].EstadoCivil_id) === this.totalEstadoCiviles[j].id)
        {
          this.totalPacientes[i].EstadoCivil_id = this.totalEstadoCiviles[j].nombre;
          break;
        }
      }


      for(let j = 0 ; j < this.totalComunas.length ; j++)
      {
        if( parseInt(this.totalPacientes[i].Comuna_id) === this.totalComunas[j].id)
        {
          this.totalPacientes[i].Comuna_id = this.totalComunas[j].nombre;
          break;
        }
      }

    }
  }

  actualizarRegiones()
  {
    this.servicioRegion.getRegions().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRegiones = todo;
    });
  }

  actualizarPersonas()
  {
    this.servicioPersona.getPersonas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalPacientes = todo;
      this.reemplazarIdPorString();
      this.exampleDatabase = new ExampleDatabase(this.totalPacientes );
      this.dataSource = new dataTable(this.exampleDatabase, this.paginator);
      this.dataSource2 = new buscadorPorNombre(this.exampleDatabase, 'Persona');

      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource2) { return; }
          this.dataSource2.filter = this.filter.nativeElement.value;
        });
    });
  }

  actualizarProvincias()
  {
    this.servicioProvincia.getProvincias().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalProvincias = todo;
    });

  }

  actualizarComunas()
  {
    this.servicioComuna.getComunas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalComunas = todo;
    });
  }

  actualizarGeneros()
  {
    this.servicioGenero.getGeneros().subscribe(data =>{
      var todo: any = data;
      todo = todo.data;
      this.totalGeneros = todo;
    });
  }

  actualizarEstadoCiviles()
  {
    this.servicioEstadoCivil.getEstadoCivils().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEstadoCiviles = todo;
    });
  }




}

