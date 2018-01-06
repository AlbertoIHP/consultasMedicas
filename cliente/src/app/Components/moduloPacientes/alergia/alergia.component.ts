// Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Modelos y servicios
import { Alergia } from '../../../Models/Alergia.model';
import { AlergiaService } from '../../../Services/alergia/alergia.service';

import { AlergiasComunesPaciente } from '../../../Models/AlergiasComunesPaciente.model';
import { AlergiasComunesPacienteService } from '../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { AgregarAlergiaComponent } from './agregar-alergia/agregar-alergia.component';
import { EditarAlergiaComponent } from './editar-alergia/editar-alergia.component';

//Componente para verificación de roles
import { UsuarioActual } from '../../Globals/usuarioactual.component';

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

@Component({
  selector: 'app-alergia',
  templateUrl: './alergia.component.html',
  styleUrls: ['./alergia.component.css']
})

export class AlergiaComponent {

  //Se declaran los atributos a usar
	public totalAlergias: Alergia[];
	public buscarPorNombre: boolean;
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

  ngOnInit() {
    // Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Alergia');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    this.exampleDatabase = [];

    // Se obtiene el evento emitido desde agregar
    this.servicioEvento.actualizar.subscribe((data: any) => { this.actualizar = data; });
  }

  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.exampleDatabase.data.length;
    }
  }

  masterToggle() {
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
    //Se declaran los servicios y componentes a utilizar
    public servicioAlergiasComunesPaciente: AlergiasComunesPacienteService,
    public servicioAlergia: AlergiaService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
    ) {
    
    // Se inicializan los atributos
		this.usuarioActual = new UsuarioActual();
		this.totalAlergias = [];

    // Se obtienen los registros de alergia a la base de datos
		this.actualizarAlergias();
	}

	actualizarAlergias() {
    // Se obtienen todas las alergias desde la API
		this.servicioAlergia.getAlergias().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalAlergias = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase = new ExampleDatabase(this.totalAlergias);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Alergia');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          });
		});
	}

  eliminarAlergia(alergia) {
    //Si se elimina una alergía, se deben eliminar primero las que han sido asignadas a un paciente
    this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      //Se obtienen todas las alergias que han sido asignadas a pacientes
      var totalAlergiasComunesPaciente = todo;

      //Se busca la alergia en particular que se está eliminando y se elimina del paciente
      for(let i = 0; i < totalAlergiasComunesPaciente.length; i++) {
        if(totalAlergiasComunesPaciente[i].Alergia_id === alergia.id){
          this.servicioAlergiasComunesPaciente.deleteAlergiasComunesPaciente(totalAlergiasComunesPaciente[i].id).subscribe(data=>{});
        }
      }

      //Se elimina la alergía de forma definitiva    
      this.servicioAlergia.deleteAlergia(alergia.id).subscribe(data => {
        this.actualizarAlergias();
      });
   });
  }

  // Se envía la alergia a modificar desde el frontend
	edicionAlergia(alergia) {
		//Se abre un dialogo para editar la alergia, se abre un componente hijo
    let dialogRef = this.dialog.open(EditarAlergiaComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 alergia: alergia
			}
		});

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
      if (!this.actualizar) { this.actualizarAlergias();}
    });
	}

	agregacionAlergia() {
		// Se abre un nuevo dialogo para agregar una alergia, se abre un componente hijo
    let dialogRef = this.dialog.open(AgregarAlergiaComponent, {
      // Se asignan los parámetros
			width: '700px'
		});

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarAlergias();}
    });
	}
}