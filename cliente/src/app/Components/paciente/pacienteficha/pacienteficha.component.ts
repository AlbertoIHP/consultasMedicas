import { Component, OnInit } from '@angular/core';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Genero } from '../../../Models/Genero.model';
import { GeneroService } from '../../../Services/genero/genero.service';

import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

import { TipoSangre } from '../../../Models/TipoSangre.model';
import { TipoSangreService } from '../../../Services/tiposangre/tiposangre.service';

import { PrevisionActual } from '../../../Models/PrevisionActual.model';
import { PrevisionactualService } from '../../../Services/previsionactual/previsionactual.service';

import { Prevision } from '../../../Models/Prevision.model';
import { PrevisionService } from '../../../Services/prevision/prevision.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-pacienteficha',
  templateUrl: './pacienteficha.component.html',
  styleUrls: ['./pacienteficha.component.css']
})
export class PacientefichaComponent implements OnInit {

	//variables basicas

	public idPersona:number=4;

	public personaPaciente:Persona;

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

  	//booleanos para indicar si existen registrso de peso y estatura en la ficha
  	/*public existeEstatura:boolean;
  	public estaturaPaciente:string;

	public existePeso:boolean;
	public pesoPaciente:string;*/


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
    public servicioPaciente:PacienteService

  	) {


  	this.personaPaciente= new Persona();

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

  	this.obtenerPersonaPaciente(this.idPersona);
  	this.obtenerListaPacientes(this.idPersona);



  	 }

  ngOnInit() {
  }

//-------Datos Paciente

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
  			this.paciente=this.totalPacientes[i];

  			console.log("PACIENTE");
  			console.log(this.paciente);

  			this.obtenerTipoSangre(this.paciente.TipoSangre_id);
  			break;
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

  	});

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

obtenerAlergiasPaciente(id){
	for(let i=0;this.totalAlergias.length;i++){
		if(this.totalAlergias[i].Paciente_id==id){
			this.totalAlergiasPaciente.push(this.totalALergias[i]);
		}
	}
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
    	this.personaPaciente=todo;
    	console.log("PERSONA");
    	console.log(this.personaPaciente);

        //se obtiene telefono casa (puede no estar registrado)
        this.fonoCasaPaciente=this.personaPaciente.fono_casa;
        if(this.fonoCasaPaciente=="none" || this.fonoCasaPaciente==""){
          this.existeFonoCasa=false;
        }else{
          this.existeFonoCasa=true;
        }

        //se obtiene telefono trabajo (puene no estar registrado)
        this.fonoTrabajoPaciente=this.personaPaciente.fono_trabajo;
        if(this.fonoTrabajoPaciente=="none" || this.fonoTrabajoPaciente==""){
          this.existeFonoTrabajo=false;
        }else{
          this.existeFonoTrabajo=true;
        }

  		//se obtienen los datos asociados a la ubicacion del paciente
  		this.obtenerComunaPaciente(this.personaPaciente.Comuna_id);
  		//se obtiene el genero del paciente
  		this.obtenerGeneroPaciente(this.personaPaciente.Genero_id);
  		//se obtiene el estado civil del paciente
  		this.obtenerEstadoCivilPaciente(this.personaPaciente.EstadoCivil_id);
        //obtener prevision
        this.obtenerPrevisionActual(this.personaPaciente.id);

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

  	});
  }

 
//se obtiene el genero del paciente
  obtenerGeneroPaciente(id){
  	this.servicioGenero.getGenero(id).subscribe((data)=>{
  		var todo: any = data;
		todo = todo.data;
		this.generoPaciente=todo;

		console.log("GENERO");
		console.log(this.generoPaciente);
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
  	});
  }


 //Se obtiene la prevision actual del paciente


 obtenerPrevisionActual(id){
   this.servicioPrevisionActual.getPrevisionActuals().subscribe((data)=>{
     var todo: any = data;
     todo = todo.data;
     //registros en prevision actual
     this.totalPrevisionActual=todo;
     //se obtiene la prevision
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

    //se obtiene la prevision asociada al mismo
    
    this.servicioPrevision.getPrevision(ultimo.Prevision_id).subscribe((data)=>{
      var todo: any=data
      todo=todo.data;
      this.previsionPaciente=todo;


      console.log("PREVISION");
      console.log(this.previsionPaciente);
    });
  }else{
    this.existePrevision=false;
  }

 }

 //se ordena el historial (de prevision)
 ordenarHistorial(historial){

   historial.sort((a:PrevisionActual,b:PrevisionActual)=>{
     var fechaA=new Date(a.fechaActualizacion);
     var fechaB= new Date(b.fechaActualizacion);
     return fechaA.getTime() - fechaB.getTime();
   });

 }

}
