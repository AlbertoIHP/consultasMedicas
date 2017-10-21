import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { Role } from '../../../../Models/Role.model';
import { RoleService } from '../../../../Services/role/role.service';

import { AgregarrolesComponent } from './agregarroles/agregarroles.component';
import { EditarrolesComponent } from './editarroles/editarroles.component';

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


export interface UserData extends Role{}



@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.css']
})
export class RolesComponent  {
public totalRoles: Role[];

  //DATATABLE
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  public sourceDatatable: dataTable | null;
  public sourcePorNombre: buscadorPorNombre | null;
  public bdEstructura;
  public buscarPorNombre: boolean;
  displayedColumns = ['Acciones', 'Nombre'];


	constructor (public servicioRole: RoleService, public dialog: MatDialog)
	{
    this.buscarPorNombre = false;
    this.totalRoles = [];
		this.actualizarRoles();
	}



	actualizarRoles ()
	{
		this.servicioRole.getRoles().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRoles = todo;

      //DATATABLE
      this.bdEstructura = new ExampleDatabase(this.totalRoles );
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

	eliminarRole (role)
	{
		this.servicioRole.deleteRole(role.id).subscribe( data => {
			console.log(data);
			this.actualizarRoles();
		});
	}

  cambiarBusqueda()
  {
    this.buscarPorNombre = !this.buscarPorNombre;
  }

  edicionRole (role)
  {

    let dialogRef = this.dialog.open(EditarrolesComponent, {
      width: '1000px',
      data:
      {
       role: role
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarRoles();
    });
  }

  agregacionRole()
  {
    let dialogRef = this.dialog.open(AgregarrolesComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {

      this.actualizarRoles();
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

