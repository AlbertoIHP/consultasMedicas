import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { Router } from '@angular/router';

import { Medicamento } from '../../../Models/Medicamento.model';
import { MedicamentoService } from '../../../Services/medicamento/medicamento.service';

import { UsoMedicamento } from '../../../Models/UsoMedicamento.model';
import { UsoMedicamentoService } from '../../../Services/usomedicamento/uso-medicamento.service';

import { AlergiasMedicamentosPaciente } from '../../../Models/AlergiasMedicamentosPaciente.model';
import { AlergiasMedicamentosPacienteService } from '../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service';


import { AgregarMedicamentoComponent } from './agregar-medicamento/agregar-medicamento.component';
import { EditarMedicamentoComponent } from './editar-medicamento/editar-medicamento.component';

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
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent {

  public totalMedicamentos: Medicamento[];
  public usuarioActual;

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  displayedColumns = ['Acciones', 'Nombre Comun','Nombre Cientifico'];

   ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Medicamento');
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



  constructor
  (
  	public servicioMedicamento: MedicamentoService,
  	public servicioUsoMedicamento: UsoMedicamentoService,
  	public servicioAlergiasMedicamentosPaciente: AlergiasMedicamentosPacienteService,
  	public dialog:MatDialog
   ) {
  		this.totalMedicamentos=[];
  		this.usuarioActual=new UsuarioActual();
  		this.actualizarMedicamentos();
   }

    actualizarMedicamentos ()
	{
		this.servicioMedicamento.getMedicamentos().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalMedicamentos = todo;


      //DATATABLE

      this.exampleDatabase  = new ExampleDatabase(this.totalMedicamentos);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Medicamento');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })

		});
	}

//se eliminará tanto el registro de alergias medicamentos paciente como uso medicamento, antes de medicamento
  eliminarMedicamento (medicamento)
  {

   this.servicioAlergiasMedicamentosPaciente.getAlergiasMedicamentosPacientes().subscribe(data=>{
      var todo: any = data;
      todo = todo.data;
      var totalAlergiasMedicamentosPaciente = todo;

      for(let i=0; i<totalAlergiasMedicamentosPaciente.length;i++){
        if(totalAlergiasMedicamentosPaciente[i].Medicamento_id===medicamento.id){
          this.servicioAlergiasMedicamentosPaciente.deleteAlergiasMedicamentosPaciente(totalAlergiasMedicamentosPaciente[i].id).subscribe(data=>{

          });
        }
      }

     this.servicioUsoMedicamento.getUsoMedicamentos().subscribe(data=>{
     	var todo: any = data;
	    todo = todo.data;
	    var totalUsoMedicamentos = todo;


      for(let i=0; i<totalUsoMedicamentos.length;i++){
        if(totalUsoMedicamentos[i].Medicamento_id===medicamento.id){
          this.servicioUsoMedicamento.deleteUsoMedicamento(totalUsoMedicamentos[i].id).subscribe(data=>{

          });
        }
      }

      this.servicioMedicamento.deleteMedicamento(medicamento.id).subscribe( data => {
	      console.log(data);
	      this.actualizarMedicamentos();
    	});


     });

     
   });
    
  }

	edicionMedicamento (medicamento)
	{


		let dialogRef = this.dialog.open(EditarMedicamentoComponent, {
			width: '700px',
			data:
			{
			 medicamento: medicamento,
       		 servicioMedicamento: this.servicioMedicamento
			}
		});

		dialogRef.afterClosed().subscribe(result => {

       this.actualizarMedicamentos();
			
		});
	}

	agregacionMedicamento()
	{
		let dialogRef = this.dialog.open(AgregarMedicamentoComponent, {
			width: '700px',
		 	data: {
		        servicioMedicamento: this.servicioMedicamento
      		}
		});

		dialogRef.afterClosed().subscribe(result => {
        this.actualizarMedicamentos();
			
		});
	}

}
