//Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Modelos y servicios
import { HabitosPaciente } from '../../../Models/HabitosPaciente.model';
import { HabitosPacienteService } from '../../../Services/habitospaciente/habitos-paciente.service';

import { Habito } from '../../../Models/Habito.model';
import { HabitoService } from '../../../Services/habito/habito.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { AgregarHabitoComponent } from './agregar-habito/agregar-habito.component';
import { EditarHabitoComponent } from './editar-habito/editar-habito.component';

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
  selector: 'app-habito',
  templateUrl: './habito.component.html',
  styleUrls: ['./habito.component.css']
})
export class HabitoComponent {
	//Se declaran los atributos
  public totalHabitos: Habito[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Habito');
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
    public servicioHabitosPaciente: HabitosPacienteService,
    public servicioHabito: HabitoService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
    ) {
    // Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalHabitos = [];

    //Se obtienen los registros de hábitos de la base de datos
		this.actualizarHabitos();
	}

	actualizarHabitos() {
    //Se obtienen todos los hábitos desde la API
		this.servicioHabito.getHabitos().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalHabitos = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalHabitos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Habito');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

  //Se obtiene el hábito desde la fila
  eliminarHabito(habito) {
    //Se eliminan primero los que estén asociados con algún paciente
    this.servicioHabitosPaciente.getHabitosPacientes().subscribe(data=>{
      var todo: any = data;
      todo = todo.data;
      var totalHabitosPaciente = todo;

      //Se comparan las coincidencias y se eliminan
      for(let i=0; i<totalHabitosPaciente.length;i++){
        if(totalHabitosPaciente[i].Habito_id===habito.id){
          this.servicioHabitosPaciente.deleteHabitosPaciente(totalHabitosPaciente[i].id).subscribe(data=>{});
        }
      }

      //Se elimina usando la id
      this.servicioHabito.deleteHabito(habito.id).subscribe( data => {
        //Se actualiza la tabla
        this.actualizarHabitos();
      });
    });    
  }

  // Se envía el hábito para modificar desde el frontend
	edicionHabito(habito) {
    //Se abre un diálogo para editar el hábito, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarHabitoComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 habito: habito
			}
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarHabitos(); }
    });
	}

	agregacionHabito() {
    // Se abre un nuevo diálogo para agregar un hábito, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarHabitoComponent, {
			//Se asignan los parámetros
      width: '700px'
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarHabitos(); }
    });
	}
}