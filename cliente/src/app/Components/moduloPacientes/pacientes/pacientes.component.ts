import { Component, ElementRef, ViewChild, Inject, OnInit, Input } from '@angular/core';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { TipoSangre } from '../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../Services/tiposangre/tiposangre.service';

import { GrupoEtnico } from '../../../Models/GrupoEtnico.model';
import { GrupoEtnicoService } from '../../../Services/grupoetnico/grupo-etnico.service';

import { Ocupacion } from '../../../Models/Ocupacion.model';
import { OcupacionService } from '../../../Services/ocupacion/ocupacion.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

import { Role } from '../../../Models/Role.model';

import { VerpersonaComponent } from '../personas/verpersona/verpersona.component';

import { AgregarpacienteComponent } from './agregarpaciente/agregarpaciente.component';
import { EditarpacienteComponent } from './editarpaciente/editarpaciente.component';


import { VerFichaMedicaComponent } from '../fichamedica/verfichamedica/verfichamedica.component'
import { EventosService } from '../../../Services/eventos/eventos.service';

import {UsuarioActual} from '../../Globals/usuarioactual.component';
import { Router } from '@angular/router';
import { FichaAtencionComponent } from '../../moduloAtenciones/ficha-atencion/ficha-atencion.component'


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
	selector: 'app-pacientes',
	templateUrl: './pacientes.component.html',
	styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
	public totalPersonas: Persona[];
  public personasDisponibles: Persona[];
	public totalPacientes: any;
	public totalTS: TipoSangre[];
  public totalGruposEtnicos: GrupoEtnico[];
  public totalOcupaciones: Ocupacion[];
	public usuarioActual;

	displayedColumns = ['Acciones', 'Rut', 'Nombre', 'Tipo Sangre', 'Grupo Etnico', 'Ocupacion'];

  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {
    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Paciente');
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









	constructor(
		public servicioPersona: PersonaService,
		public servicioTS: TipoSangreService,
		public servicioPaciente: PacienteService,
		public dialog: MatDialog,
    public servicioEventos: EventosService,
    public router: Router,
    public servicioGrupoEtnico: GrupoEtnicoService,
    public servicioOcupacion: OcupacionService
    )
  {
    
		this.usuarioActual=new UsuarioActual();
		this.totalTS = [];
    this.totalGruposEtnicos=[];
    this.totalOcupaciones=[];
		this.totalPacientes = [];
		this.totalPersonas = [];
    this.personasDisponibles = [];
    //this.actualizarTotales();
		this.actualizarPersonas();
		
    this.servicioEventos.seActivo.subscribe(() => {
      this.actualizarPersonas();
    });

	}


/*
	actualizarPersonas()
	{
		this.totalPersonas = [];
		this.servicioPersona.getPersonas().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
      this.actualizarPacientes();

		});

	}
*/


actualizarPersonas()
{
  this.totalPersonas = [];
  this.servicioPersona.getPersonas().subscribe( data => {
    var todo: any = data;
    todo = todo.data;
    this.totalPersonas = todo;

    this.totalTS = [];
    this.servicioTS.getTipoSangres().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalTS = todo;

      this.totalGruposEtnicos=[];
      this.servicioGrupoEtnico.getGrupoEtnicos().subscribe( data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalGruposEtnicos = todo;

        this.totalOcupaciones=[]
        this.servicioOcupacion.getOcupacions().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalOcupaciones = todo;
          this.actualizarPacientes();
        });
      });

    });


  });


}


	actualizarTotales ()
	{

		this.totalTS = [];
		this.servicioTS.getTipoSangres().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalTS = todo;

      this.totalGruposEtnicos=[];
      this.servicioGrupoEtnico.getGrupoEtnicos().subscribe( data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalGruposEtnicos = todo;

        this.totalOcupaciones=[]
        this.servicioOcupacion.getOcupacions().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalOcupaciones = todo;
        });
      });
		});
	}


	actualizarPacientes()
	{
		this.totalPacientes = [];
		this.servicioPaciente.getPacientes().subscribe( data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPacientes = todo;

      //Asignar rut busca el rut de cad apacietne buscando en su persona
      this.asignarRut();

      //Lo mismo que arriba solo que con activado
      this.reconocerActivado();

			this.reemplazarIdPorString();

      this.personasDisponibles = this.totalPersonas;

      this.filtrarPacientesRegistrados();
      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalPacientes);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Paciente');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })


      




		});
	}


  reconocerActivado ()
  {
     for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
      for( let j = 0 ; j < this.totalPersonas.length ; j ++)
      {
        if( parseInt(this.totalPacientes[i].Persona_id) === this.totalPersonas[j].id )
        {

          this.totalPersonas[j].estado === 0 ? this.totalPacientes[i].activado = 0 : this.totalPacientes[i].activado = 1;
          console.log(this.totalPacientes)
          break;
        }
      }
    }
  }


  asignarRut()
  {
    for ( let i = 0 ; i < this.totalPacientes.length ; i ++)
    {
      for( let j = 0 ; j < this.totalPersonas.length ; j ++)
      {
        if( parseInt(this.totalPacientes[i].Persona_id) === this.totalPersonas[j].id)
        {
          console.log(this.totalPersonas[j].rut)
          this.totalPacientes[i].rut = this.totalPersonas[j].rut;
          console.log(this.totalPacientes[i]);
          break;
        }
      }
    }
  }



	eliminarPaciente (paciente)
	{
		this.servicioPaciente.deletePaciente(paciente.id).subscribe( data => {
			this.actualizarPersonas();
		});
	}




	edicionPaciente (paciente)
	{
	var a = JSON.parse(JSON.stringify(paciente));

	this.pasarStringId(a);

	console.log(a);
	let dialogRef = this.dialog.open(EditarpacienteComponent, {
		width: '700px',
		data:
		{
     pacientes: this.totalPacientes,
		 paciente: a,
		 personas: this.totalPersonas,
		 tipoSangres:this.totalTS,
     gruposEtnicos:this.totalGruposEtnicos,
     ocupaciones: this.totalOcupaciones,
		 servicioPaciente: this.servicioPaciente,
		 servicioPersona: this.servicioPersona,
		 servicioTS: this.servicioTS

		}
	});

	dialogRef.afterClosed().subscribe(result => {

		this.actualizarPersonas();
	});
	}

	agregacionPaciente()
	{

		let dialogRef = this.dialog.open(AgregarpacienteComponent, {
			width: '700px',
		data: {
			 paciente: new Paciente(),
			 personas: this.totalPersonas,
       personasDisponibles: this.personasDisponibles,
			 tipoSangres:this.totalTS,
       gruposEtnicos:this.totalGruposEtnicos,
       ocupaciones: this.totalOcupaciones,
			 servicioPaciente: this.servicioPaciente,
			 servicioPersona: this.servicioPersona,
			 servicioTS: this.servicioTS
			 }
		});

		dialogRef.afterClosed().subscribe(result => {

			this.actualizarPersonas();
		});
	}

	desplegarPersona(paciente)
	{
	this.servicioPersona.getPersona(parseInt(paciente.Persona_id)).subscribe(data => {

		var persona: any = data;
		persona = persona.data;

		console.log(persona);

		let dialogRef = this.dialog.open(VerpersonaComponent, {
		width: '700px',
		data: { persona: persona }
		});

		dialogRef.afterClosed().subscribe(result => {

		//this.actualizarPersonas();
		});

	});


	}



	reemplazarIdPorString()
	{
    //this.totalPacientes.filter( ts => ts.id === this.totalPacientes[j].TipoSangre_id);
		for(let i = 0 ; i < this.totalPacientes.length ; i ++)
		{

			for(let j = 0 ; j < this.totalTS.length ; j++)
			{
				if( parseInt(this.totalPacientes[i].TipoSangre_id) === this.totalTS[j].id)
				{
					this.totalPacientes[i].TipoSangre_id = this.totalTS[j].nombre;
					break;
				}
			}

      for(let j = 0 ; j < this.totalGruposEtnicos.length ; j++)
      {
        if( parseInt(this.totalPacientes[i].GrupoEtnico_id) === this.totalGruposEtnicos[j].id)
        {
          this.totalPacientes[i].GrupoEtnico_id = this.totalGruposEtnicos[j].nombre;
          break;
        }
      }

      for(let j = 0 ; j < this.totalOcupaciones.length ; j++)
      {
        if( parseInt(this.totalPacientes[i].Ocupacion_id) ===this.totalOcupaciones[j].id)
        {
          this.totalPacientes[i].Ocupacion_id = this.totalOcupaciones[j].nombre;
          break;
        }
      }

      for(let j = 0; j < this.totalPersonas.length; j++) {
        if( parseInt(this.totalPacientes[i].Persona_id) === this.totalPersonas[j].id ) {
          this.totalPacientes[i].nombre = this.totalPersonas[j].nombre1 + " " + this.totalPersonas[j].nombre2 + " "
          + " " + this.totalPersonas[j].apellido1 + " " +this.totalPersonas[j].apellido2;
          break;
        }
      }

		}
	}


	pasarStringId(paciente)
	{
		for ( let i = 0 ; i < this.totalTS.length ; i ++)
		{
			if(paciente.TipoSangre_id === this.totalTS[i].nombre)
			{
				paciente.TipoSangre_id = this.totalTS[i].id;
			}
		}

    for ( let i = 0 ; i < this.totalGruposEtnicos.length ; i ++)
    {
      if(paciente.GrupoEtnico_id === this.totalGruposEtnicos[i].nombre)
      {
        paciente.GrupoEtnico_id = this.totalGruposEtnicos[i].id;
      }
    }

    for ( let i = 0 ; i < this.totalOcupaciones.length ; i ++)
    {
      if(paciente.Ocupacion_id === this.totalOcupaciones[i].nombre)
      {
        paciente.Ocupacion_id = this.totalOcupaciones[i].id;
      }
    }
	}

  desactivarPaciente(paciente)
  {
    this.servicioPersona.getPersona(paciente.Persona_id).subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      todo.estado = 0;
      this.servicioPersona.editPersona(todo, todo.id).subscribe(data => {
        console.log(data);
        this.actualizarPersonas();

        //El servicio con este metodo emite un evento que cualqueir componetne que este suscrito a dicho evento reaccionara
        console.log("Yo hice un cambio (SoyPaciente)")
       this.servicioEventos.hiceUnCambio();

      })
    });

  }

 activarPaciente(paciente)
 {
    this.servicioPersona.getPersona(paciente.Persona_id).subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      todo.estado = 1;
      this.servicioPersona.editPersona(todo, todo.id).subscribe(data => {
        console.log(data);
        this.actualizarPersonas();
        this.servicioEventos.hiceUnCambio();
      })
    });
 }

//función para mostrar la ficha médica del paciente correspondiente
 desplegarFichaPaciente(paciente)
  {

   var a = JSON.parse(JSON.stringify(paciente));

  this.pasarStringId(a);

   let dialogRef = this.dialog.open(VerFichaMedicaComponent, {
    width: '1000px',
    height:'700px',
    data: { 
     
      paciente: a 
    }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
//funcion temporal para desplegar una ficha editable
  desplegarFichaAtencionPaciente(paciente)
  {

   var a = JSON.parse( JSON.stringify(paciente) );
   this.pasarStringId(a);

       let dialogRef = this.dialog.open(FichaAtencionComponent, {
          width: '1000px',
          height:'700px',
          data: { paciente: a }
        });

 

  }

  filtrarPacientesRegistrados()
  {
    for ( let i = 0 ; i < this.totalPacientes.length ; i ++ )
    {
      for ( let j = 0 ; j < this.personasDisponibles.length ; j ++ )
      {
        if (parseInt(this.totalPacientes[i].Persona_id) === this.personasDisponibles[j].id)
        {
          this.personasDisponibles.splice(j, 1);
        }
      }
    }
  }

}
