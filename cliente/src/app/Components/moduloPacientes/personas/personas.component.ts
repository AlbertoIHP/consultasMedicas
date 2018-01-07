// Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

// Modelos y servicios
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


// Componentes hijos
import { AgregarpersonaComponent } from './agregarpersona/agregarpersona.component';
import { EditarpersonaComponent } from './editarpersona/editarpersona.component';

import { VerPrevisionComponent } from '../previsiones/verprevision/verprevision.component';

import { EventosService } from '../../../Services/eventos/eventos.service';

import { AgregarusuarioComponent } from '../usuarios/agregarusuario/agregarusuario.component';

import { Usuario } from '../../../Models/Usuario.model';
import { UserService } from '../../../Services/user/user.service';
import { RoleService } from '../../../Services/role/role.service';

// Componente para verificación de roles
import {UsuarioActual} from '../../Globals/usuarioactual.component';


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
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonaComponent implements OnInit {
  //Se declaran los atributos a usar
  displayedColumns = [
  'Acciones',
  'Rut',
  'Nombre',
  'Telefonos',
  'Sexo',
  'Estado Civil',
  'Comuna',
  "Fecha Nacimiento",
  "Direccion"
  ];

  public totalPacientes: Persona[];
  public totalRegiones: Region[];
  public totalProvincias: Provincia[];
  public totalComunas: Comuna[];
  public totalGeneros: Genero[];
  public totalEstadoCiviles: EstadoCivil[];
  public usuarioActual;
  public actualizar;


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    // Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Persona');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

    // Se obtiene el evento emitido desde agregar
    this.servicioEvento.actualizar.subscribe((data: any) => { this.actualizar = data; });
  
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


  constructor(
    //Se declaran los servicios y componentes a utilizar    
    public servicioPersona: PersonaService,
    public servicioRegion: RegionService,
    public servicioProvincia: ProvinciaService,
    public servicioComuna: ComunaService,
    public servicioGenero: GeneroService,
    public servicioEstadoCivil: EstadocivilService,
    public router: Router,
    public dialog: MatDialog,
    public servicioEventos: EventosService,
    public servicioUsuario: UserService,
    public servicioRole: RoleService,
    public servicioEvento: EventosService

    )
  {
    // Se inicializan los atributos

    this.usuarioActual=new UsuarioActual();

    this.totalPacientes = [];

    this.totalGeneros = [];

    this.actualizarRegiones();

    this.actualizarProvincias();

    this.actualizarComunas();

    this.actualizarGeneros();

    this.actualizarEstadoCiviles();

    this.actualizarPersonas();

  }

  crearPersona(): void {
    // Se abre un nuevo dialogo para agregar una persona, se abre un componente hijo  
    let dialogRef = this.dialog.open(AgregarpersonaComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
      width: '700px',
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

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
        // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
        if (this.actualizar) { 

          this.actualizarGeneros();
          this.actualizarRegiones();
          this.actualizarComunas();
          this.actualizarProvincias();
          this.actualizarEstadoCiviles();
          this.actualizarPersonas();
        }
    });
   
  }

  // Se obtiene la comuna a modificar desde el frontend
  editarPersona (persona)
  {
  var a = JSON.parse( JSON.stringify(persona) );

    this.pasarStringId(a);

  //Se abre un dialogo para editar la persona, se abre un componente hijo
  let dialogRef = this.dialog.open(EditarpersonaComponent, {
    //Los parámetros se asignan y se envían los datos necesarios
    width: '1000px',
    height: '600px',
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

  //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
        /*
          // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
          if (!this.actualizar) { this.actualizarComunas();}
        */
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

  let dialogRef = this.dialog.open(VerPrevisionComponent, {
    width: '900px',
    data:
    {
     persona: a
    }
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

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Persona');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
    })
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

 /// FUNCIONALIDADES EXCLUSIVAS


  eliminarPaciente (paciente)
  {
    this.servicioPersona.deletePersona(paciente.id).subscribe( data => {
      console.log(data);
      this.actualizarPersonas();
    });
  }



  activarPaciente (paciente)
  {
    paciente.estado = 1;
    this.pasarStringId(paciente);
    this.servicioPersona.editPersona(paciente, paciente.id).subscribe(data => {
      this.servicioEventos.hiceUnCambio();
    });
  }

  desactivarPaciente (paciente)
  {
    paciente.estado = 0;
    this.pasarStringId(paciente);
    this.servicioPersona.editPersona(paciente, paciente.id).subscribe(data => {
      this.servicioEventos.hiceUnCambio();
    });
  }


  agregarUsuario(persona)
  {
    var a: any = JSON.parse(JSON.stringify(persona));
   this.pasarStringId(a);

  let dialogRef = this.dialog.open(AgregarusuarioComponent, {
    width: '700px',
    data:
    {
     persona: a,
     servicioPersona: this.servicioPersona,
     servicioUsuario: this.servicioUsuario,
     servicioRole: this.servicioRole,
     usuario: new Usuario()


    }
  });

  }





}

