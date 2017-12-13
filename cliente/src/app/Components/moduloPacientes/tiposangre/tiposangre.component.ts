import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';

import { TipoSangre } from '../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../Services/tiposangre/tiposangre.service';

import { AgregartipoComponent } from './agregartipo/agregartipo.component';
import { EditartipoComponent } from './editartipo/editartipo.component';

import { Router } from '@angular/router';
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
  selector: 'app-tiposangre',
  templateUrl: './tiposangre.component.html',
  styleUrls: ['./tiposangre.component.css']
})
export class TiposangreComponent implements OnInit {

  public totalTS: TipoSangre[];
  public usuarioActual;
  displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'TS');
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


  constructor(
    public servicioTS: TipoSangreService,
    public dialog: MatDialog,
    public router: Router)
  {
    
    this.usuarioActual=new UsuarioActual();
    this.totalTS = [];
    this.actualizarTSs();
  }

  actualizarTSs ()
  {
    this.servicioTS.getTipoSangres().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalTS = todo;

      //DATATABLE
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



  edicionTS (ts)
  {

    let dialogRef = this.dialog.open(EditartipoComponent, {
      width: '700px',
      data:
      {
       ts: ts,
       servicioTS: this.servicioTS
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarTSs();
    });
  }

  agregacionTS()
  {
    let dialogRef = this.dialog.open(AgregartipoComponent, {
      width: '700px',
      data:
      {
       ts: new TipoSangre(),
       servicioTS: this.servicioTS
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarTSs();
    });
  }



}
