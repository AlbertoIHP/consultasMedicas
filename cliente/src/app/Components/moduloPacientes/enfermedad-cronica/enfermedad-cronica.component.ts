// Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Modelos y servicios
import { EnfermedadCronica } from '../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { EnfermedadesCronicasPaciente } from '../../../Models/EnfermedadesCronicasPaciente.model';
import { EnfermedadesCronicasPacienteService } from '../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

// Componentes hijos
import { AgregarEnfermedadCronicaComponent } from './agregar-enfermedad-cronica/agregar-enfermedad-cronica.component';
import { EditarEnfermedadCronicaComponent } from './editar-enfermedad-cronica/editar-enfermedad-cronica.component';

// Componente para verificación de roles
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
  selector: 'app-enfermedad-cronica',
  templateUrl: './enfermedad-cronica.component.html',
  styleUrls: ['./enfermedad-cronica.component.css']
})

export class EnfermedadCronicaComponent {
  // Se declaran los atributos
	public totalEnfermedadCronicas: EnfermedadCronica[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'EnfermedadCronica');
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
    public servicioEnfermedadCronica: EnfermedadCronicaService,
    public servicioEnfermedadesCronicasPaciente: EnfermedadesCronicasPacienteService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
    ) {
    // Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalEnfermedadCronicas = [];

    // Se obtienen los registros de aenfermedades crónicas a la base de datos
		this.actualizarEnfermedadCronicas();
	}

	actualizarEnfermedadCronicas () {
    // Se obtienen todas las enfermedades crónicas desde la API
		this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEnfermedadCronicas = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalEnfermedadCronicas);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'EnfermedadCronica');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

  // Se obtiene la enfermedad crónica desde la fila
  eliminarEnfermedadCronica(enfermedadcronica) {
    // Antes de eliminarla, se deben eliminar las que están ligadas con los pacientes
    this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(data=>{
      var todo: any = data;
      todo = todo.data;
      // Se obtienen todos los pacientes
      var totalEnfermedadesCronicasPaciente = todo;

      // Se realiza la busqueda entre los pacientes que tengan esta enfermedad
      for(let i=0; i<totalEnfermedadesCronicasPaciente.length;i++){
        if(totalEnfermedadesCronicasPaciente[i].EnfermedadCronica_id===enfermedadcronica.id){
          // Si existe se elimina
          this.servicioEnfermedadesCronicasPaciente.deleteEnfermedadesCronicasPaciente(totalEnfermedadesCronicasPaciente[i].id).subscribe(data=>{
          });
        }
      }

      //Se elimina definitivamente la enfermedad
      this.servicioEnfermedadCronica.deleteEnfermedadCronica(enfermedadcronica.id).subscribe( data => {
        // Se actualiza la tabla
        this.actualizarEnfermedadCronicas();
      });
    });
  }

  // Se envía la enfermedad a modificar desde el frontend
	edicionEnfermedadCronica(enfermedadcronica) {
    //Se abre un dialogo para editar la enfermedad, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarEnfermedadCronicaComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 enfermedadcronica: enfermedadcronica
			}
		});

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
          // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
            if (!this.actualizar) { this.actualizarEnfermedadCronicas();}
    });
	}

	agregacionEnfermedadCronica() {
    // Se abre un nuevo dialogo para agregar una enfermedad, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarEnfermedadCronicaComponent, {
      // Se asignan los parámetros
			width: '700px'
		});

    //Luego de cerrar el dialogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarEnfermedadCronicas();}
    });
	}
}