//Componentes generales
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Modelos y servicios
import { GrupoEtnico } from '../../../Models/GrupoEtnico.model';
import { GrupoEtnicoService } from '../../../Services/grupoetnico/grupo-etnico.service';

import { EventosService } from '../../../Services/eventos/eventos.service';

//Componentes hijos
import { AgregarGrupoEtnicoComponent } from './agregar-grupo-etnico/agregar-grupo-etnico.component';
import { EditarGrupoEtnicoComponent } from './editar-grupo-etnico/editar-grupo-etnico.component';

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
  selector: 'app-grupo-etnico',
  templateUrl: './grupo-etnico.component.html',
  styleUrls: ['./grupo-etnico.component.css']
})
export class GrupoEtnicoComponent {
  //Se declaran los atributos
	public totalGrupoEtnicos: GrupoEtnico[];
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
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'GrupoEtnico');
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
    public servicioGrupoEtnico: GrupoEtnicoService,
    public dialog: MatDialog,
    public router: Router,
    public servicioEvento: EventosService
    ) {
    
    //Se inicializan los atributos
		this.usuarioActual=new UsuarioActual();
		this.totalGrupoEtnicos = [];

    //Se obtienen los registros de grupos étnicos de la base de datos
		this.actualizarGrupoEtnicos();
	}

	actualizarGrupoEtnicos() {
    //Se obtienen todos los grupos étnicos desde la API
		this.servicioGrupoEtnico.getGrupoEtnicos().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalGrupoEtnicos = todo;

      //DATATABLE
      //Se asignan los datos obtenidos al datasource
      this.exampleDatabase  = new ExampleDatabase(this.totalGrupoEtnicos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'GrupoEtnico');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
		});
	}

  //Se obtiene el grupo desde la fila
	eliminarGrupoEtnico(grupoetnico) {
    //Se elimina usando su id
		this.servicioGrupoEtnico.deleteGrupoEtnico(grupoetnico.id).subscribe( data => {
			//Se actualiza la tabla
      this.actualizarGrupoEtnicos();
		});
	}

  // Se envía el grupo a modificar desde el frontend
	edicionGrupoEtnico(grupoetnico) {
    //Se abre un diálogo para editar el grupo, se abre un componente hijo
		let dialogRef = this.dialog.open(EditarGrupoEtnicoComponent, {
      //Los parámetros se asignan y se envían los datos necesarios
			width: '700px',
			data:
			{
			 grupoetnico: grupoetnico
			}
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
        if (!this.actualizar) { this.actualizarGrupoEtnicos();}
    });
	}

	agregacionGrupoEtnico() {
    // Se abre un nuevo diálogo para agregar un grupo, se abre un componente hijo
		let dialogRef = this.dialog.open(AgregarGrupoEtnicoComponent, {
      //Se asignan los parámetros
			width: '700px'
		});

    //Luego de cerrar el diálogo se ejecuta lo siguiente
    dialogRef.afterClosed().subscribe(result => {
      // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
      if (this.actualizar) { this.actualizarGrupoEtnicos();}
    });
	}
}