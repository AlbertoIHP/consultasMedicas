import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

//Componente para verificación de roles
import {UsuarioActual} from '../../Globals/usuarioactual.component';

import { Router } from '@angular/router';

import { Vacuna } from '../../../Models/Vacuna.model';
import { VacunaService } from '../../../Services/vacuna/vacuna.service';

import { VacunasPaciente } from '../../../Models/VacunasPaciente.model';
import { VacunasPacienteService } from '../../../Services/vacunaspaciente/vacunaspaciente.service';

//Componentes hijos
import { AgregarVacunaComponent } from './agregar-vacuna/agregar-vacuna.component';
import { EditarVacunaComponent } from './editar-vacuna/editar-vacuna.component';

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
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent {

  //Se declaran los atributos a usar
  public totalVacunas: Vacuna[];
  public usuarioActual;
  public actualizar;

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
     // Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Vacuna');
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
     public servicioVacuna: VacunaService,
     public servicioVacunasPaciente: VacunasPacienteService, 
     public dialog:MatDialog,
     public servicioEvento: EventosService

   ) {
      // Se inicializan los atributos
  		this.totalVacunas=[];
  		this.usuarioActual=new UsuarioActual();

      // Se obtienen los registros de vacunas a la base de datos
  		this.actualizarVacunas();
   }

   actualizarVacunas ()
	{
    // Se obtienen todas las vacunas desde la API
		this.servicioVacuna.getVacunas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalVacunas = todo;


      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalVacunas);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Vacuna');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}


  eliminarVacuna (vacuna)
  {

   //Si se elimina una vacuna, se deben eliminar primero las que han sido asignadas a un paciente
   this.servicioVacunasPaciente.getVacunasPaciente().subscribe(data=>{
      var todo: any = data;
      todo = todo.data;

      //Se obtienen todas las vacunas que han sido asignadas a pacientes
      var totalVacunasPaciente = todo;

      //Se busca la vacuna en particular que se está eliminando y se elimina del paciente
      for(let i=0; i<totalVacunasPaciente.length;i++){
        if(totalVacunasPaciente[i].Vacuna_id===vacuna.id){
          this.servicioVacunasPaciente.deleteVacunaPaciente(totalVacunasPaciente[i].id).subscribe(data=>{

          });
        }
      }
     
     //Se eliminala alergía de forma definitiva   
     this.servicioVacuna.deleteVacuna(vacuna.id).subscribe( data => {
      this.actualizarVacunas();
    });

   });
    
  }

  // Se envía la alergia a modificar desde el frontend
	edicionVacuna (vacuna)
	{
    //Se abre un dialogo para editar la vacuna, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarVacunaComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 vacuna: vacuna,
       		 servicioVacuna: this.servicioVacuna
			}
		});

	  //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
      if (!this.actualizar) { this.actualizarVacunas();}
    });
	}

	agregacionVacuna()
	{
    // Se abre un nuevo dialogo para agregar una vacuna, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarVacunaComponent, {
      // Se asignan los parámetros
			width: '700px',
		 	data: {
		        servicioVacuna: this.servicioVacuna
      		}
		});

		//Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarVacunas();}
    });
	}


  

}
