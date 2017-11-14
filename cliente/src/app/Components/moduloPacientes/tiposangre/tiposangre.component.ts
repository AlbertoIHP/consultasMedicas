import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';

import { TipoSangre } from '../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../Services/tiposangre/tiposangre.service';

import { AgregartipoComponent } from './agregartipo/agregartipo.component';
import { EditartipoComponent } from './editartipo/editartipo.component';

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
import { Router } from '@angular/router';
import {UsuarioActual} from '../../Globals/usuarioactual.component';

@Component({
  selector: 'app-tiposangre',
  templateUrl: './tiposangre.component.html',
  styleUrls: ['./tiposangre.component.css']
})
export class TiposangreComponent implements OnInit {

  public totalTS: TipoSangre[];
  public usuarioActual;

  //DATATABLE
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  public sourceDatatable: dataTable | null;
  public sourcePorNombre: buscadorPorNombre | null;
  public bdEstructura;

  displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
  public buscarPorNombre: boolean;



  constructor(
    public servicioTS: TipoSangreService,
    public dialog: MatDialog,
    public router: Router)
  {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['login'])
    }



    this.usuarioActual=new UsuarioActual();
    this.buscarPorNombre = false;
    this.totalTS = [];
    this.actualizarTSs();
  }

  ngOnInit() {
  }

  actualizarTSs ()
  {
    this.servicioTS.getTipoSangres().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalTS = todo;

      this.bdEstructura = new ExampleDatabase(this.totalTS );
      this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
      this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura, 'Region');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.sourcePorNombre) { return; }
            this.sourcePorNombre.filter = this.filter.nativeElement.value;
          });


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

    cambiarBusqueda()
  {
    this.buscarPorNombre = !this.buscarPorNombre;
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
