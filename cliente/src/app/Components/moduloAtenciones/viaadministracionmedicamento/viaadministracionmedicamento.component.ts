import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { ViaAdministracionMedicamento } from '../../../Models/ViaAdministracionMedicamento.model';
import { ViaAdministracionMedicamentoService } from '../../../Services/viaAdministracionMedicamento/via-administracion-medicamento.service';

import { AgregarViaAdministracionMedicamentoComponent } from './agregar-via-administracion-medicamento/agregar-via-administracion-medicamento.component';
import { EditarViaAdministracionMedicamentoComponent } from './editar-via-administracion-medicamento/editar-via-administracion-medicamento.component';

//DATATABLE
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExampleDatabase, ExampleDataSource } from '../../Globals/datasource.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
@Component({
  selector: 'app-viaadministracionmedicamento',
  templateUrl: './viaadministracionmedicamento.component.html',
  styleUrls: ['./viaadministracionmedicamento.component.css']
})
export class ViaadministracionmedicamentoComponent implements OnInit {

	public totalViaAdminMed:ViaAdministracionMedicamento[];
	//public usuarioActual;

	//DATATABLE
	exampleDatabase;
	selection = new SelectionModel<string>(true, []);
	dataSource: ExampleDataSource | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	displayedColumns = ['Acciones', 'Descripcion'];

	ngOnInit()
	  {
	    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'ViaAdminMed');
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

  constructor(public servicioViaAdminMed:ViaAdministracionMedicamentoService, public dialog: MatDialog) {
  	this.totalViaAdminMed=[];
  	//this.usuarioActual= new UsuarioActual();
  	this.actualizarViaAdminMed();

  }

  actualizarViaAdminMed ()
	{
		this.servicioViaAdminMed.getViaAdministracionMedicamentos().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalViaAdminMed = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalViaAdminMed);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'ViaAdminMed');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

	eliminarViaAdminMed (viaAdminMed)
	{
		this.servicioViaAdminMed.deleteViaAdministracionMedicamento(viaAdminMed.id).subscribe( data => {
				this.actualizarViaAdminMed();
			});
	}



	edicionViaAdminMed (viaAdminMed)
	{

		let dialogRef = this.dialog.open(EditarViaAdministracionMedicamentoComponent , {
			width: '700px',
			data:
			{
			 viaAdminMed: viaAdminMed
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarViaAdminMed();
		});
	}

	agregacionViaAdminMed()
	{
		let dialogRef = this.dialog.open(AgregarViaAdministracionMedicamentoComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarViaAdminMed();
		});
	}

 

}
