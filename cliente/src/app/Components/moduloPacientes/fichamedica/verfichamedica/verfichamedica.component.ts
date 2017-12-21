import { Component, OnInit, Inject,AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Persona } from '../../../../Models/Persona.model';
import { PersonaService } from '../../../../Services/persona/persona.service';

import { Genero } from '../../../../Models/Genero.model';
import { GeneroService } from '../../../../Services/genero/genero.service';

import { EstadoCivil } from '../../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';

import { Region } from '../../../../Models/Region.model';
import { RegionService } from '../../../../Services/region/region.service';

import { Provincia } from '../../../../Models/Provincia.model';
import { ProvinciaService } from '../../../../Services/provincia/provincia.service';

import { Comuna } from '../../../../Models/Comuna.model';
import { ComunaService } from '../../../../Services/comuna/comuna.service';

import { TipoSangre } from '../../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../../Services/tiposangre/tiposangre.service';

import { PrevisionActual } from '../../../../Models/PrevisionActual.model';
import { PrevisionactualService } from '../../../../Services/previsionactual/previsionactual.service';

import { Prevision } from '../../../../Models/Prevision.model';
import { PrevisionService } from '../../../../Services/prevision/prevision.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EventosService } from '../../../../Services/eventos/eventos.service'

export interface Element extends Persona{
}

@Component({
  selector: 'app-verfichamedica',
  templateUrl: './verfichamedica.component.html',
  styleUrls: ['./verfichamedica.component.css']
})
export class VerFichaMedicaComponent {
  public persona: any;
  public pacienteTest:any;
  //variables básicas

	public idPersona:number=4;

  //será array ya que es la única manera de usarlo con datasource
  public personaPaciente:Persona[];

  public paciente:Paciente;
  public totalPacientes:Paciente[];

  public tipoSangrePaciente: TipoSangre;

  public regionPaciente:Region;
  public provinciaPaciente:Provincia;
  public comunaPaciente:Comuna;
  public generoPaciente:Genero;
  public estadoCivilPaciente: EstadoCivil;
  public totalPrevisionActual:PrevisionActual[];
  public previsionPaciente: Prevision;


  //historial previsiones
  public historialPrevisionesPacientes: PrevisionActual[];

  //booleano que indica si existen registros en el historial de previsiones
  public existePrevision:boolean;

  //booleanos para indicar si existen registros del fono trabajo y casa

  public existeFonoTrabajo:boolean;
  public fonoTrabajoPaciente:string;

  public existeFonoCasa:boolean;
  public fonoCasaPaciente:string;

  //booleano para indicar si es paciente (será momentáneo, ya que este usuario siempre es paciente)
  //determinará si aparece o no la cuarta tabla de la ficha
  public esPaciente:boolean;



    //booleanos para indicar si existen registrso de peso y estatura en la ficha
    /*public existeEstatura:boolean;
    public estaturaPaciente:string;

    public existePeso:boolean;
    public pesoPaciente:string;*/



  //elemetos de la tabla (ficha)
  displayedColumns1= ['Nombres', 'Apellidos', 'RUT','TipoSangre'];
  displayedColumns2=['Genero','EstadoCivil','FonoCasa','FonoTrabajo','Movil'];
  displayedColumns3=['Comuna','Provincia','Region','Prevision'];
  displayedColumns4=['Peso','Estatura','TipoSangre'];

  personaTabla1;
  //datos básicos del paciente para la primera tabla
  public datosPacienteT1:any=[{}];
  personaTabla2;
  //datos básicos del paciente para la segunda tabla
  public datosPacienteT2:any=[{}];
  personaTabla3;
  //Datos geográficos para la tercera tabla
  public ubicacionPaciente:any=[{}];
  personaTabla4;
  //datos básicos del paciente para la cuarta tabla
  public datosPacienteT4:any=[{}];

  //elementos de la tabla alergias
  columnasAlergia=['id','NombreComun','NombreCientifico'];
  alergiaTabla;

  constructor(

    public servicioPersona: PersonaService,
    public servicioRegion: RegionService,
    public servicioProvincia: ProvinciaService,
    public servicioComuna: ComunaService,
    public servicioGenero: GeneroService,
    public servicioEstadoCivil: EstadocivilService,
    public servicioTipoSangre: TipoSangreService,
    public servicioPrevisionActual: PrevisionactualService,
    public servicioPrevision: PrevisionService,
    public servicioPaciente:PacienteService,
    public dialogRef: MatDialogRef<VerFichaMedicaComponent>,
    public servicioEventos:EventosService,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) {
    
    this.pacienteTest=data.paciente;
    this.personaPaciente=[];

    this.paciente=new Paciente();
    this.totalPacientes=[];

    this.tipoSangrePaciente=new TipoSangre();

    this.regionPaciente = new Region();
    this.provinciaPaciente= new Provincia();
    this.comunaPaciente = new Comuna();
    this.generoPaciente = new Genero();
    this.estadoCivilPaciente= new EstadoCivil();
    this.totalPrevisionActual= [];
    this.previsionPaciente= new Prevision();

    this.historialPrevisionesPacientes=[];

    this.existePrevision=false;
    this.existeFonoCasa=false;
    this.existeFonoTrabajo=false;
    this.esPaciente=false;

    this.obtenerPersonaPaciente(this.idPersona);
    this.obtenerListaPacientes(this.idPersona);

    this.persona = data.persona;
    this.idPersona=this.persona.id;
    this.obtenerPersonaPaciente(this.idPersona);
    this.obtenerListaPacientes(this.idPersona);
    

  	 }


//-------Datos Paciente
/*
  setPacienteTest(){
    this.mensaje="hola";
     this.servicioEventos.activarFicha(this.mensaje);
  }

  ngAfterViewInit() {
    this.setPacienteTest();
  }*/


  obtenerListaPacientes(id){
    this.servicioPaciente.getPacientes().subscribe((data)=>{
      var todo: any = data;
      todo = todo.data;
      this.totalPacientes=todo;
      this.obtenerPaciente(id);
    });

  }

  obtenerPaciente(id){
    for(let i=0;i<this.totalPacientes.length;i++){
      if(this.totalPacientes[i].Persona_id==id){
        this.esPaciente=true;

        this.paciente=this.totalPacientes[i];

        console.log("PACIENTE");
        console.log(this.paciente);

  			this.obtenerTipoSangre(this.paciente.TipoSangre_id);
        this.reconocerActivado();
        //this.obtenerAlergias(this.paciente.id);
        break;
      }else{
        this.esPaciente=false;
      }
    }
  }

  obtenerTipoSangre(id){
    this.servicioTipoSangre.getTipoSangre(id).subscribe((data)=>{
      var todo: any = data;
      todo = todo.data;
      this.tipoSangrePaciente=todo;

      console.log("SANGRE");
      console.log(this.tipoSangrePaciente);

      //asignación del tipo de sangre para la tabla 4
      this.datosPacienteT1[0].tipoSangre=this.tipoSangrePaciente.nombre;
  	});

  }

   reconocerActivado (){
     var persona=new Persona();
     persona=this.personaPaciente[0];
     console.log("ESTADO");
     console.log(persona.estado);
      persona.estado === 0 ? this.paciente.activado = 0 : this.paciente.activado = 1;
          
  }


//Funciones para alergias (servicios futuros)
/*
obtenerAlergias(id){
  this.servicioAlergiasPacientes.getAlergiasPacientes().subscribe((data)=>{
    var todo: any = data;
      todo = todo.data;
      this.totalAlergias=todo;
      this.obtenerAlergiasPaciente(id);
  });

}

obtenerMedicamento(id){
  this.servicioMedicamentos.getMedicamento(id).subscribe((data)=>{
    var todo: any = data;
      todo = todo.data
      this.medicamentosPaciente.push(todo);
  });
}

obtenerAlergiasPaciente(id){
  for(let i=0;this.totalAlergias.length;i++){
    if(this.totalAlergias[i].Paciente_id==id){
      this.totalAlergiasPaciente.push(this.totalALergias[i]);
    }
  }
//se guardan los medicamentos a los que es alérgico

for(let i=0;i<this.totalAlergiasPaciente.length;i++){
  this.obtenerMedicamento(this.totalAlergiasPaciente[i].Medicamento_id);
}
  //data source para la tabla alergias
  this.alergiaTabla=new ExampleDataSource(this.medicamentosPaciente);
}
*/

//Funciones para obtener el peso y estatura actuales (servicios futuros)
/*
obtenerAtenciones(id){
  this.servicioAtencion.getAtenciones().subscribe((data)=>{
    var todo: any = data;
      todo = todo.data;
      this.totalAtenciones=todo;
      this.obtenerAtencionPaciente(id);
  });

}

obtenerAtencionPaciente(id){
  for(let i=0;i<this.totalAtenciones.length;i++){
    if(this.totalAtenciones[i].Paciente_id==id){
      this.totalAtencionesPaciente.push(this.totalAtenciones[i]);
    }
  }


  if(this.totalAtencionesPaciente.length>0){
    this.existeAtenciones=true;

    this.ordenarAtenciones(this.totalAtencionesPaciente);

    this.pesoPaciente=this.totalAtencionesPaciente[0].peso;
    this.estaturaPaciente=this.totalAtenciones[0].estatura;
  }else{
    this.existeAtenciones=false;
  }
}

//funciones para orderar las atenciones por fecha de cita
obtenerCita(id,cita){
  this.servicioCita.getCita(id).subscribe((id)=>{
    var todo: any = data;
      todo = todo.data;
      cita=todo;

  });
}

ordenarAtenciones(atenciones){
   atenciones.sort((a:Atencion,b:Atencion)=>{
    var citaA=null;
    this.obtenerCita(a.Cita_id,citaA);

    var citaB=null;
    this.obtenerCita(b.Cita_id,citaB);

     var fechaA=new Date(citaA.fecha);
     var fechaB= new Date(citaB.fecha);

     return fechaA.getTime() < fechaB.getTime();
   });

 }
*/

//-------Datos Persona

//se obtiene la persona a traves de su id
  obtenerPersonaPaciente(id){
    this.servicioPersona.getPersona(id).subscribe((data)=>{
      var todo: any = data;
      todo = todo.data;
      this.personaPaciente.push(todo);
      console.log("PERSONA");
      console.log(this.personaPaciente);

        //se obtiene teléfono casa (puede no estar registrado)
        this.fonoCasaPaciente=this.personaPaciente[0].fono_casa;
        if(this.fonoCasaPaciente=="none" || this.fonoCasaPaciente==""){
          this.existeFonoCasa=false;
        }else{
          this.existeFonoCasa=true;
        }

        //se obtiene teléfono trabajo (puene no estar registrado)
        this.fonoTrabajoPaciente=this.personaPaciente[0].fono_trabajo;
        if(this.fonoTrabajoPaciente=="none" || this.fonoTrabajoPaciente==""){
          this.existeFonoTrabajo=false;
        }else{
          this.existeFonoTrabajo=true;
        }

      //asignación teléfonos
      this.datosPacienteT2[0].fonoCasa=this.fonoCasaPaciente;
      this.datosPacienteT2[0].fonoTrabajo=this.fonoTrabajoPaciente;
      this.datosPacienteT2[0].movil=this.personaPaciente[0].movil;

      //asignacion nombre-apellidos
      this.datosPacienteT1[0].nombres=this.personaPaciente[0].nombre1+" "+this.personaPaciente[0].nombre2;
      this.datosPacienteT1[0].apellidos=this.personaPaciente[0].apellido1+" "+this.personaPaciente[0].apellido2;
      this.datosPacienteT1[0].rut=this.personaPaciente[0].rut;
      //se obtienen los datos asociados a la ubicación del paciente
      this.obtenerComunaPaciente(this.personaPaciente[0].Comuna_id);
      //se obtiene el género del paciente
      this.obtenerGeneroPaciente(this.personaPaciente[0].Genero_id);
      //se obtiene el estado civil del paciente
      this.obtenerEstadoCivilPaciente(this.personaPaciente[0].EstadoCivil_id);
        //obtener prevision
      this.obtenerPrevisionActual(this.personaPaciente[0].id);

      this.personaTabla1=new ExampleDataSource(this.datosPacienteT1);
      this.personaTabla2=new ExampleDataSource(this.datosPacienteT2);
      this.personaTabla3=new ExampleDataSource(this.ubicacionPaciente);
      this.personaTabla4=new ExampleDataSource(this.datosPacienteT4);


    });
  }

  //se obtiene la comuna del paciente
obtenerComunaPaciente(id){
    this.servicioComuna.getComuna(id).subscribe((data)=>{
    var todo: any = data;
    todo = todo.data;
    this.comunaPaciente=todo;

    console.log("COMUNA");
    console.log(this.comunaPaciente);
    //se asigna el nombre de la comuna a los datos geográficos
    this.ubicacionPaciente[0].comuna=this.comunaPaciente.nombre;
    this.obtenerProvinciaPaciente(this.comunaPaciente.Provincia_id);

    });
  }
//se obtiene la provincia del paciente
obtenerProvinciaPaciente(id){
    this.servicioProvincia.getProvincia(id).subscribe((data)=>{
      var todo: any = data;
    todo = todo.data;
    this.provinciaPaciente=todo;

    console.log("PROVINCIA");
    console.log(this.provinciaPaciente);

    //se asigna el nombre de la provincia a los datos geográficos
    this.ubicacionPaciente[0].provincia=this.provinciaPaciente.nombre;

    this.obtenerRegionPaciente(this.provinciaPaciente.Region_id);
    });

  }
  //se obtiene la region a la que pertenece el paciente
  obtenerRegionPaciente(id){
    this.servicioRegion.getRegion(id).subscribe((data)=>{
      var todo: any = data;
    todo = todo.data;
    this.regionPaciente=todo;

    console.log("REGION");
    console.log(this.regionPaciente);

    //se asigna el nombre de la región a los datos geográficos
    this.ubicacionPaciente[0].region=this.regionPaciente.nombre;

    });
  }


//se obtiene el género del paciente
  obtenerGeneroPaciente(id){
    this.servicioGenero.getGenero(id).subscribe((data)=>{
      var todo: any = data;
    todo = todo.data;
    this.generoPaciente=todo;

    console.log("GENERO");
    console.log(this.generoPaciente);

    //se asigna el nombre del género a los datos del paciente para la t2
    this.datosPacienteT2[0].genero=this.generoPaciente.nombre;
    });
  }
//se obtiene el estado civil del paciente
  obtenerEstadoCivilPaciente(id){
    this.servicioEstadoCivil.getEstadoCivil(id).subscribe((data)=>{
    var todo: any = data;
    todo = todo.data;
    this.estadoCivilPaciente=todo;

    console.log("ESTCIVIL");
    console.log(this.estadoCivilPaciente);

    //se asigna el nombre del estado civil a los datos del paciente para la t2
    this.datosPacienteT2[0].estadoCivil=this.estadoCivilPaciente.nombre;
    });
  }


 //Se obtiene la prevision actual del paciente


 obtenerPrevisionActual(id){
   this.servicioPrevisionActual.getPrevisionActuals().subscribe((data)=>{
     var todo: any = data;
     todo = todo.data;
     //registros en previsión actual
     this.totalPrevisionActual=todo;
     //se obtiene la previsión
     this.obtenerPrevision(id);
   });

 }


 obtenerPrevision(id){
    for(let i=0;i<this.totalPrevisionActual.length;i++){


      if(this.totalPrevisionActual[i].Persona_id==id){
        //se guardan los cambios de previsiones del paciente
        this.historialPrevisionesPacientes.push(this.totalPrevisionActual[i]);
      }
    }
    //si existen registros en el historial
    if(this.historialPrevisionesPacientes.length>0){
      this.existePrevision=true;

    //se ordena el historial
    this.ordenarHistorial(this.historialPrevisionesPacientes);

    //se obtiene el ultimo registro
    var ultimo: any;
    ultimo=this.historialPrevisionesPacientes[this.historialPrevisionesPacientes.length-1];
    var fechaUltimo=new Date(ultimo.fechaActualizacion);

    //se obtiene la previsión asociada al mismo

    this.servicioPrevision.getPrevision(ultimo.Prevision_id).subscribe((data)=>{
      var todo: any=data
      todo=todo.data;
      this.previsionPaciente=todo;


      console.log("PREVISION");
      console.log(this.previsionPaciente);

      //se asigna la previsión del paciente a los datos de la tabla 1
      this.ubicacionPaciente[0].prevision=this.previsionPaciente.nombre;
    });
  }else{
    this.existePrevision=false;
  }

 }

 //se ordena el historial (de previsión)
 ordenarHistorial(historial){

   historial.sort((a:PrevisionActual,b:PrevisionActual)=>{
     var fechaA=new Date(a.fechaActualizacion);
     var fechaB= new Date(b.fechaActualizacion);
     return fechaA.getTime() - fechaB.getTime();
   });

 }

  onNoClick()
  {
    this.dialogRef.close();
  }


}

  /**
  ** Esta clase permite observar cambios en un arreglo de objetos para desplegarlos en una tabla
  **
  **/

export class ExampleDataSource extends DataSource<any> {
  public data;

  constructor (data)
  {
    super();
    this.data = data;

  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]>
  {
  return Observable.of(this.data);

  }

  disconnect() {}
}
