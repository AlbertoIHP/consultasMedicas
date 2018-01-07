//Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Modelos y servicios
import { HabitoSexual } from '../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../Services/habitosexual/habito-sexual.service';

import { HabitosSexualesPacienteService } from '../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { AgregarHabitoSexualComponent } from './agregar-habito-sexual/agregar-habito-sexual.component';
import { EditarHabitoSexualComponent } from './editar-habito-sexual/editar-habito-sexual.component';

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
  selector: 'app-habito-sexual',
  templateUrl: './habito-sexual.component.html',
  styleUrls: ['./habito-sexual.component.css']
})
export class HabitoSexualComponent {
  //Se declaran los atributos
	public totalHabitoSexuals: HabitoSexual[];
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
    //Se inicializa el datasource
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'HabitoSexual');
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
    public servicioHabitoSexual: HabitoSexualService,
    public dialog: MatDialog,
    public router: Router,
    public servicioHabitosSexualesPaciente:HabitosSexualesPacienteService,
    public servicioEvento: EventosService
    ) {
    // Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalHabitoSexuals = [];

    //Se obtienen los registros de los hábitos sexuales de la base de datos
		this.actualizarHabitoSexuals();
	}

	actualizarHabitoSexuals() {
    //Se obtienen todos los hábitos desde la API
		this.servicioHabitoSexual.getHabitoSexuales().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalHabitoSexuals = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
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

  //Se obtiene el hábito sexual desde la fila
	eliminarHabitoSexual(habitosexual) {
    //Se eliminan primero los que estén asociados con algún paciente
    this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(data=>{
      var todo: any = data;
      todo = todo.data;
      var totalHabitosSexualesPaciente = todo;

      //Se comparan las coincidencias y se eliminan
      for(let i=0; i<totalHabitosSexualesPaciente.length;i++){
        if(totalHabitosSexualesPaciente[i].HabitoSexual_id===habitosexual.id){
          this.servicioHabitosSexualesPaciente.deleteHabitosSexualesPaciente(totalHabitosSexualesPaciente[i].id).subscribe(data=>{});
        }
      }

      //Se elimina usando el id
      this.servicioHabitoSexual.deleteHabitoSexual(habitosexual.id).subscribe( data => {
        //Se actualiza la tabla
        this.actualizarHabitoSexuals();
      });
    });
	}

  // Se envía el hábito sexual para modificar desde el frontend
	edicionHabitoSexual(habitosexual) {
    //Se abre un diálogo para editar el hábito sexual, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarHabitoSexualComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 habitosexual: habitosexual
			}
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarHabitoSexuals(); }
    });
	}

	agregacionHabitoSexual() {
    // Se abre un nuevo diálogo para agregar un hábito sexual, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarHabitoSexualComponent, {
      //Se asignan los parámetros
			width: '700px'
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarHabitoSexuals(); }
    })
	}
}