import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';

import { TipoSangre } from '../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../Services/tiposangre/tiposangre.service';

//Componentes hijos
import { AgregartipoComponent } from './agregartipo/agregartipo.component';
import { EditartipoComponent } from './editartipo/editartipo.component';

import { Router } from '@angular/router';

//Componente para verificación de roles
import {UsuarioActual} from '../../Globals/usuarioactual.component';

import { EventosService } from '../../../Services/eventos/eventos.service';


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
  selector: 'app-tiposangre',
  templateUrl: './tiposangre.component.html',
  styleUrls: ['./tiposangre.component.css']
})
export class TiposangreComponent implements OnInit {

  //Se declaran los atributos a usar
  public totalTS: TipoSangre[];
  public usuarioActual;
  displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'TS');
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
    public servicioTS: TipoSangreService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService

    ){
    // Se inicializan los atributos
    this.usuarioActual=new UsuarioActual();
    this.totalTS = [];

    // Se obtienen los registros de tipos de sangre a la base de datos
    this.actualizarTSs();
  }

  actualizarTSs ()
  {
    // Se obtienen todas las vacunas desde la API
    this.servicioTS.getTipoSangres().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalTS = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalTS);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'TS');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


    });
  }

  eliminarTS (ts)
  {
    this.servicioTS.deleteTipoSangre(ts.id).subscribe( data => {
      console.log(data);
      this.actualizarTSs();
    });

  }


  // Se envía el tipo sangre a modificar desde el frontend
  edicionTS (ts)
  {
    //Se abre un dialogo para editar el tipo sangre, se abre un componente hijo
    let dialogRef = this.dialog.open(EditartipoComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
      width: '700px',
      data:
      {
       ts: ts,
       servicioTS: this.servicioTS
      }
    });

   //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
      if (!this.actualizar) { this.actualizarTSs();}
    });
  }

  agregacionTS()
  {
    // Se abre un nuevo dialogo para agregar un tipo sangre, se abre un componente hijo
    let dialogRef = this.dialog.open(AgregartipoComponent, {
      // Se asignan los parámetros
      width: '700px',
      data:
      {
       ts: new TipoSangre(),
       servicioTS: this.servicioTS
      }
    });

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarTSs();}
    });
  }



}
