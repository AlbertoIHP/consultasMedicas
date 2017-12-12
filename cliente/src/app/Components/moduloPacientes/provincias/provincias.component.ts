import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { AgregarprovinciaComponent } from './agregarprovincia/agregarprovincia.component';
import { EditarprovinciaComponent } from './editarprovincia/editarprovincia.component';

import {UsuarioActual} from '../../Globals/usuarioactual.component';

import { Router } from '@angular/router';


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
	selector: 'app-provincias',
	templateUrl: './provincias.component.html',
	styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent {
public totalRegiones: Region[];
	public totalProvincias: Provincia[];
	public usuarioActual;
	displayedColumns = ['Acciones', 'Nombre', 'Region'];



  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Provincia');
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







	constructor (
    public servicioRegion: RegionService,
    public servicioProvincia: ProvinciaService,
    public dialog: MatDialog,
    public router: Router)
  {
    
		this.usuarioActual=new UsuarioActual();
		this.totalRegiones = [];
		this.totalProvincias = [];
		this.actualizarRegiones();
		this.actualizarProvincias();
	}


	actualizarRegiones ()
	{
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;
		});
	}



	actualizarProvincias ()
	{
		this.servicioProvincia.getProvincias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalProvincias = todo;
			this.reemplazarIdPorString();

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalProvincias);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Provincia');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}




	eliminarProvincia (provincia)
	{
		this.servicioProvincia.deleteProvincia(provincia.id).subscribe( data => {
			console.log(data);
			this.actualizarProvincias();
		});
	}




	reemplazarIdPorString()
	{
		for(let i = 0 ; i < this.totalProvincias.length ; i ++)
		{

			for(let j = 0 ; j < this.totalRegiones.length ; j++)
			{
				if( parseInt(this.totalProvincias[i].Region_id) === this.totalRegiones[j].id)
				{
					this.totalProvincias[i].Region_id = this.totalRegiones[j].nombre;
					break;
				}
			}

		}
	}


	pasarStringId(provincia)
	{
		for ( let i = 0 ; i < this.totalRegiones.length ; i ++)
		{
		if(provincia.Region_id === this.totalRegiones[i].nombre)
		{
			provincia.Region_id = this.totalRegiones[i].id;
		}
		}

	}


	edicionProvincia (provincia)
	{

	 var a = JSON.parse( JSON.stringify(provincia) );

	this.pasarStringId(a);

		let dialogRef = this.dialog.open(EditarprovinciaComponent, {
			width: '700px',
			data:
			{
			 provincia: a,
			 regiones: this.totalRegiones,
       servicioRegion: this.servicioRegion
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarProvincias();
		});
	}

	agregacionProvincia()
	{
		let dialogRef = this.dialog.open(AgregarprovinciaComponent, {
			width: '700px',
			data : {
        regiones: this.totalRegiones,
        servicioRegion: this.servicioRegion,
        servicioProvincia: this.servicioProvincia }
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarProvincias();
		});
	}



}

