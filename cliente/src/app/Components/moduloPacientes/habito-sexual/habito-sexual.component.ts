import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';


import { HabitoSexual } from '../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../Services/habitosexual/habito-sexual.service';

import { HabitosSexualesPacienteService } from '../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';


import { AgregarHabitoSexualComponent } from './agregar-habito-sexual/agregar-habito-sexual.component';
import { EditarHabitoSexualComponent } from './editar-habito-sexual/editar-habito-sexual.component';
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
  selector: 'app-habito-sexual',
  templateUrl: './habito-sexual.component.html',
  styleUrls: ['./habito-sexual.component.css']
})
export class HabitoSexualComponent {
	public totalHabitoSexuals: HabitoSexual[];
	public buscarPorNombre: boolean;
	public usuarioActual;


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

	displayedColumns = ['Acciones', 'Nombre'];


  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'HabitoSexual');
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
    public servicioHabitoSexual: HabitoSexualService,
    public dialog: MatDialog,
    public router: Router,
    public servicioHabitosSexualesPaciente:HabitosSexualesPacienteService


    )
  {
    
		this.usuarioActual=new UsuarioActual();
		this.totalHabitoSexuals = [];
		this.actualizarHabitoSexuals();
	}

	actualizarHabitoSexuals ()
	{
		this.servicioHabitoSexual.getHabitoSexuales().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalHabitoSexuals = todo;

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalHabitoSexuals);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'HabitoSexual');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


		});
	}

	eliminarHabitoSexual (habitosexual)
	{

   this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(data=>{
      var todo: any = data;
      todo = todo.data;
      var totalHabitosSexualesPaciente = todo;

      for(let i=0; i<totalHabitosSexualesPaciente.length;i++){
        if(totalHabitosSexualesPaciente[i].HabitoSexual_id===habitosexual.id){
          this.servicioHabitosSexualesPaciente.deleteHabitosSexualesPaciente(totalHabitosSexualesPaciente[i].id).subscribe(data=>{

          });
        }
      }

     this.servicioHabitoSexual.deleteHabitoSexual(habitosexual.id).subscribe( data => {
      console.log(data);
      this.actualizarHabitoSexuals();
    });

   });
		
	}



	edicionHabitoSexual (habitosexual)
	{

		let dialogRef = this.dialog.open(EditarHabitoSexualComponent, {
			width: '700px',
			data:
			{
			 habitosexual: habitosexual
			}
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarHabitoSexuals();
		});
	}

	agregacionHabitoSexual()
	{
		let dialogRef = this.dialog.open(AgregarHabitoSexualComponent, {
			width: '700px'
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarHabitoSexuals();
		});
	}
}