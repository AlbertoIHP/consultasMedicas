
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';


import { Prevision } from '../../../../Models/Prevision.model';
import { PrevisionService } from '../../../../Services/prevision/prevision.service';


import { AgregarprevisionComponent } from './agregarprevision/agregarprevision.component';
import { EditarprevisionComponent } from './editarprevision/editarprevision.component';

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


export interface UserData extends Prevision{}


@Component({
	selector: 'app-previsiones',
	templateUrl: './previsiones.component.html',
	styleUrls: ['./previsiones.component.css']
})
export class PrevisionesComponent{
	public totalPrevisiones: Prevision[];


  //DATATABLE
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  public sourceDatatable: dataTable | null;
  public sourcePorNombre: buscadorPorNombre | null;
  public bdEstructura;
  public buscarPorNombre: boolean;
  displayedColumns = ['Acciones', 'Nombre', 'Descripcion', 'Isapre'];

	constructor (public servicioPrevisiones: PrevisionService, public dialog: MatDialog)
	{
    this.buscarPorNombre = false;
    this.totalPrevisiones = [];
		this.actualizarPrevisiones();
	}

	actualizarPrevisiones ()
	{
		this.servicioPrevisiones.getPrevisions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPrevisiones = todo;
      this.pasarIdString();


      //DATATABLE
      this.bdEstructura = new ExampleDatabase(this.totalPrevisiones );
      this.sourceDatatable = new dataTable(this.bdEstructura, this.paginator);
      this.sourcePorNombre = new buscadorPorNombre(this.bdEstructura);
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.sourcePorNombre) { return; }
            this.sourcePorNombre.filter = this.filter.nativeElement.value;
          });
		});
	}

	eliminarPrevision (prevision)
	{
		this.servicioPrevisiones.deletePrevision(prevision.id).subscribe( data => {
			console.log(data);
			this.actualizarPrevisiones();
		});
	}

  pasarIdString()
  {
    for ( let i = 0 ; i < this.totalPrevisiones.length ; i ++)
    {
      if(this.totalPrevisiones[i].isapre === "1")
      {
        this.totalPrevisiones[i].isapre = "ISAPRE";
      }
      else
      {
        this.totalPrevisiones[i].isapre = "NO ISAPRE";
      }
    }
  }

  pasarStringId(prevision)
  {
    if (prevision.isapre === "ISAPRE")
    {
      prevision.isapre = "1";
    }
    else
    {
      prevision.isapre = "0";
    }
  }

  cambiarBusqueda()
  {
    this.buscarPorNombre = !this.buscarPorNombre;
  }

  edicionPrevision (prevision)
  {

    var a = JSON.parse( JSON.stringify(prevision));
    this.pasarStringId(a);

    let dialogRef = this.dialog.open(EditarprevisionComponent, {
      width: '1000px',
      data:
      {
       prevision: a
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarPrevisiones();
    });
  }

  agregacionPrevision()
  {
    let dialogRef = this.dialog.open(AgregarprevisionComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarPrevisiones();
    });
  }

}



export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor(ec)
  {
    // Fill up the database with 100 users.
    for (let i = 0; i < ec.length; i++) { this.addUser(ec[i]); }
  }

  /** Adds a new user to the database. */
  addUser(ec) {
    const copiedData = this.data.slice();
    copiedData.push(ec);
    this.dataChange.next(copiedData);
  }



}


export class dataTable extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {

    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {

      const data = this._exampleDatabase.data.slice();
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;


      return data.splice(startIndex, this._paginator.pageSize);

    });
  }

  disconnect() {}
}



export class buscadorPorNombre extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: UserData) => {
        let searchStr = (item.nombre ).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {}
}

