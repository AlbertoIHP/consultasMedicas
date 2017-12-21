import {Component, ElementRef, ViewChild, Inject } from '@angular/core';
import {UsuarioActual} from '../../Globals/usuarioactual.component';

import { AlergiasComunesPaciente } from '../../../Models/AlergiasComunesPaciente.model';
import { AlergiasComunesPacienteService } from '../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';
import { EditarAlergiasComunesPacienteComponent } from '../../moduloPacientes/alergias-comunes-paciente/editar-alergias-comunes-paciente/editar-alergias-comunes-paciente.component';

import { EditarEnfermedadesCronicasPacienteComponent } from '../../moduloPacientes/enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente.component';
import { EditarHabitosPacienteComponent } from '../../moduloPacientes/habitos-paciente/editar-habitos-paciente/editar-habitos-paciente.component';
import { EditarHabitosSexualesPacienteComponent } from '../../moduloPacientes/habitos-sexuales-paciente/editar-habitos-sexuales-paciente/editar-habitos-sexuales-paciente.component';
import { EditarUsoMedicamentoComponent } from '../../moduloPacientes/uso-medicamento/editar-uso-medicamento/editar-uso-medicamento.component';
import { EditarVacunasPacienteComponent } from '../../moduloPacientes/vacunas-paciente/editar-vacunas-paciente/editar-vacunas-paciente.component';
import { EditarAlergiasPacienteComponent } from '../../moduloAtenciones/alergiasmedicamentospaciente/editar-alergias-paciente/editar-alergias-paciente.component';


import { Alergia } from '../../../Models/Alergia.model';
import { AlergiaService } from '../../../Services/alergia/alergia.service';

import { Paciente } from '../../../Models/Paciente.model';
import { PacienteService } from '../../../Services/paciente/paciente.service';

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
import { PrevisionService } from '../../../Services/prevision/prevision.service';

import { EnfermedadesCronicasPacienteService } from '../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';
import { EnfermedadesCronicasPaciente } from '../../../Models/EnfermedadesCronicasPaciente.model';
import { EnfermedadCronica } from '../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { HabitosPacienteService } from '../../../Services/habitospaciente/habitos-paciente.service';
import { HabitosPaciente } from '../../../Models/HabitosPaciente.model';
import { Habito } from '../../../Models/Habito.model';
import { HabitoService } from '../../../Services/habito/habito.service';

import { HabitosSexualesPacienteService } from '../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';
import { HabitosSexualesPaciente } from '../../../Models/HabitosSexualesPaciente.model';
import { HabitoSexual } from '../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../Services/habitosexual/habito-sexual.service';


import { UsoMedicamentoService } from '../../../Services/usomedicamento/uso-medicamento.service';
import { UsoMedicamento } from '../../../Models/UsoMedicamento.model';
import { Medicamento } from '../../../Models/Medicamento.model';
import { MedicamentoService } from '../../../Services/medicamento/medicamento.service';

import { VacunasPacienteService } from '../../../Services/vacunaspaciente/vacunaspaciente.service';
import { VacunasPaciente } from '../../../Models/VacunasPaciente.model';
import { Vacuna } from '../../../Models/Vacuna.model';
import { VacunaService } from '../../../Services/vacuna/vacuna.service';

import { AlergiasMedicamentosPacienteService } from '../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service';
import { AlergiasMedicamentosPaciente } from '../../../Models/AlergiasMedicamentosPaciente.model';


//DATATABLE
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-ficha-atencion',
  templateUrl: './ficha-atencion.component.html',
  styleUrls: ['./ficha-atencion.component.css']
})
export class FichaAtencionComponent {

	public totalAlergiasComunes: Alergia[];
	public totalPacientes: any;
	public totalAlergiasComunesPaciente: AlergiasComunesPaciente[];
	public totalPersonas: Persona[];
	public usuarioActual;
  	public arrayAlergiasComunesPaciente: AlergiasComunesPaciente[];

  	public totalEnfermedadesCronicas: EnfermedadCronica[];
	public totalEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente[];
	public arrayEnfermedadesCronicasPaciente: EnfermedadesCronicasPaciente[];

	public totalHabitos: Habito[];
  	public totalHabitosPaciente: HabitosPaciente[];
  	public arrayHabitosPaciente: HabitosPaciente[];

    public totalHabitosSexuales: HabitoSexual[];
    public totalHabitosSexualesPaciente: HabitosSexualesPaciente[];
    public arrayHabitosSexualesPaciente: HabitosSexualesPaciente[];

    public totalMedicamentos: Medicamento[];
    public totalUsoMedicamentos: UsoMedicamento[];
    public arrayUsoMedicamentos: UsoMedicamento[];

	public totalVacunas: Vacuna[];
 	public totalVacunasPaciente: VacunasPaciente[];
 	public arrayVacunasPaciente: VacunasPaciente[];

 	public totalAlergiasMedicamentosPaciente: AlergiasMedicamentosPaciente[];
	public arrayAlergiasMedicamentosPaciente: AlergiasMedicamentosPaciente[];

  public totalPrevisionActual:PrevisionActual[];
  //historial previsiones
  public historialPrevisionesPacientes: PrevisionActual[];
  //booleano que indica si existen registros en el historial de previsiones
  public existePrevision:boolean;

 
   public paciente:any;
   public personaActual:any;

  constructor(

    public dialogRef: MatDialogRef<FichaAtencionComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,


   public servicioAlergiaComun:AlergiaService, 
   public servicioPaciente:PacienteService,
   public servicioPersona:PersonaService,
   public servicioAlergiasComunesPaciente: AlergiasComunesPacienteService, 
   public dialog:MatDialog,

   public servicioEnfermedadesCronicasPaciente: EnfermedadesCronicasPacienteService,
   public servicioEnfermedadCronica: EnfermedadCronicaService,

   public servicioHabitosPaciente: HabitosPacienteService,
   public servicioHabito:HabitoService,

   public servicioHabitosSexualesPaciente: HabitosSexualesPacienteService,
   public servicioHabitoSexual: HabitoSexualService,

   public servicioUsoMedicamento: UsoMedicamentoService,
   public servicioMedicamento: MedicamentoService,

   public servicioVacunasPaciente: VacunasPacienteService,
   public servicioVacuna: VacunaService,

   public servicioAlergiasMedicamentosPaciente: AlergiasMedicamentosPacienteService,

   public servicioGenero: GeneroService,
   public servicioComuna: ComunaService,
   public servicioProvincia: ProvinciaService,
   public servicioRegion: RegionService,
   public servicioTipoSangre: TipoSangreService,
   public servicioEstadoCivil: EstadocivilService,
   public servicioPrevisionActual: PrevisionactualService,
   public servicioPrevision: PrevisionService,



   ) { 

   	  this.usuarioActual=new UsuarioActual();

  	  this.paciente=data.paciente;
      this.personaActual=new Persona();

      this.totalAlergiasComunes = [];
      this.totalAlergiasComunesPaciente = [];
      this.totalPacientes=[];
      this.totalPersonas=[];
      this.arrayAlergiasComunesPaciente = [];

      this.totalEnfermedadesCronicas = [];
      this.totalEnfermedadesCronicasPaciente = [];
      this.arrayEnfermedadesCronicasPaciente = [];

      this.totalHabitos = [];
      this.totalHabitosPaciente = [];
      this.arrayHabitosPaciente =[];

      this.totalHabitosSexuales = [];
      this.totalHabitosSexualesPaciente = [];
      this.arrayHabitosSexualesPaciente =[];

      this.totalMedicamentos = [];
      this.totalUsoMedicamentos = [];
      this.arrayUsoMedicamentos = [];

      this.totalVacunas = [];
      this.totalVacunasPaciente = [];
      this.arrayVacunasPaciente = [];

      this.totalAlergiasMedicamentosPaciente = [];
      this.arrayAlergiasMedicamentosPaciente =[];

      this.existePrevision=false;

      this.actualizarAtributos();


  }

 
 actualizarAtributos ()
  {

    this.servicioPaciente.getPacientes().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalPacientes = todo;

      this.servicioPersona.getPersonas().subscribe(data=>{
           var todo: any = data;
           todo = todo.data;
           this.totalPersonas = todo;

         
            this.servicioAlergiaComun.getAlergias().subscribe(data => {
              var todo: any = data;
              todo = todo.data;
              this.totalAlergiasComunes = todo;
               
               this.reemplazarIdPorString();
               this.obtenerComunaPaciente();
               //this.obtenerGeneroPaciente();
               //this.obtenerEstadoCivilPaciente();
               //this.obtenerTipoSangre();

           });

      });
    });
  }


  reemplazarIdPorString()
  {
    for(let i=0;i<this.totalPacientes.length;i++){
      for(let j=0;j<this.totalPersonas.length;j++){
        if(this.totalPacientes[i].Persona_id===this.totalPersonas[j].id){
          this.totalPacientes[i].rut=this.totalPersonas[j].rut;
          this.totalPacientes[i].nombre=this.totalPersonas[j].nombre1+" "+this.totalPersonas[j].nombre2+" "+this.totalPersonas[j].apellido1+" "+this.totalPersonas[j].apellido2;
          this.personaActual=this.totalPersonas[j];
          break;
        }
      }
    }
  }

  edicionAlergiasComunesPaciente (paciente)
  {

   this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(data => {
        var todo: any = data;
        todo = todo.data;
        this.totalAlergiasComunesPaciente = todo;

    var a = JSON.parse( JSON.stringify(paciente) );

    this.obtenerArrayDeteccion(a.id,this.arrayAlergiasComunesPaciente,this.totalAlergiasComunesPaciente);

    let dialogRef = this.dialog.open(EditarAlergiasComunesPacienteComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       alergiasComunes: this.totalAlergiasComunes,
       arrayAlergiasComunesPaciente: this.arrayAlergiasComunesPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioAlergiaComun: this.servicioAlergiaComun,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioAlergiasComunesPaciente: this.servicioAlergiasComunesPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.arrayAlergiasComunesPaciente = [];
      
    });
  });
  }

   edicionEnfermedadesCronicasPaciente (paciente)
  {

    this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(data => {
                  var todo: any = data;
                  todo = todo.data;
                  this.totalEnfermedadesCronicasPaciente = todo;
                

    var a = JSON.parse( JSON.stringify(paciente) );

    this.obtenerArrayDeteccion(a.id,this.arrayEnfermedadesCronicasPaciente,this.totalEnfermedadesCronicasPaciente);

    let dialogRef = this.dialog.open(EditarEnfermedadesCronicasPacienteComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       enfermedadesCronicas: this.totalEnfermedadesCronicas,
       arrayEnfermedadesCronicasPaciente: this.arrayEnfermedadesCronicasPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioEnfermedadCronica: this.servicioEnfermedadCronica,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioEnfermedadesCronicasPaciente: this.servicioEnfermedadesCronicasPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrayEnfermedadesCronicasPaciente = [];
      
    });
  });
  }


 edicionHabitosPaciente (paciente)
  {

    this.servicioHabitosPaciente.getHabitosPacientes().subscribe(data => {
        var todo: any = data;
        todo = todo.data;
        this.totalHabitosPaciente = todo;
      
    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerArrayInicio(a.id,this.arrayHabitosPaciente,this.totalHabitosPaciente);

    let dialogRef = this.dialog.open(EditarHabitosPacienteComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       habitos: this.totalHabitos,
       arrayHabitosPaciente: this.arrayHabitosPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioHabito: this.servicioHabito,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioHabitosPaciente: this.servicioHabitosPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrayHabitosPaciente = [];
    });
  });
  }

   edicionHabitosSexualesPaciente (paciente)
  {


    this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(data => {
        var todo: any = data;
       todo = todo.data;
       this.totalHabitosSexualesPaciente = todo;
                  

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerArrayInicio(a.id,this.arrayHabitosSexualesPaciente,this.totalHabitosSexualesPaciente);

    let dialogRef = this.dialog.open(EditarHabitosSexualesPacienteComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       habitosSexuales: this.totalHabitosSexuales,
       arrayHabitosSexualesPaciente: this.arrayHabitosSexualesPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioHabitoSexual: this.servicioHabitoSexual,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioHabitosSexualesPaciente: this.servicioHabitosSexualesPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrayHabitosSexualesPaciente = [];
      
    });
  });
  }

  edicionUsoMedicamento (paciente)
  {

     this.servicioUsoMedicamento.getUsoMedicamentos().subscribe(data => {
        var todo: any = data;
        todo = todo.data;
        this.totalUsoMedicamentos = todo; 
    
    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerArrayInicio(a.id,this.arrayUsoMedicamentos,this.totalUsoMedicamentos);

    let dialogRef = this.dialog.open(EditarUsoMedicamentoComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       medicamentos: this.totalMedicamentos,
       arrayUsoMedicamentos: this.arrayUsoMedicamentos,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioMedicamento: this.servicioMedicamento,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioUsoMedicamento: this.servicioUsoMedicamento
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrayUsoMedicamentos = [];
      
    });
  });
  }

   edicionVacunasPaciente (paciente)
  {

    this.servicioVacunasPaciente.getVacunasPaciente().subscribe(data => {
       var todo: any = data;
       todo = todo.data;
       this.totalVacunasPaciente = todo;
                    

    var a = JSON.parse( JSON.stringify(paciente) );

    //this.pasarStringId(a);

    this.obtenerVacunasPaciente(a.id);

    let dialogRef = this.dialog.open(EditarVacunasPacienteComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       vacunas: this.totalVacunas,
       arrayVacunasPaciente: this.arrayVacunasPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioVacuna: this.servicioVacuna,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioVacunasPaciente: this.servicioVacunasPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrayVacunasPaciente = [];
      
    });
  });
  }

  edicionAlergiasMedicamentosPaciente (paciente)
  {

    this.servicioAlergiasMedicamentosPaciente.getAlergiasMedicamentosPacientes().subscribe(data => { 
           var todo: any = data;
           todo = todo.data;
           this.totalAlergiasMedicamentosPaciente = todo;
     

    var a = JSON.parse( JSON.stringify(paciente) );

    this.obtenerArrayInicio(a.id,this.arrayAlergiasMedicamentosPaciente,this.totalAlergiasMedicamentosPaciente);

    let dialogRef = this.dialog.open(EditarAlergiasPacienteComponent, {
      width: '800px',
      height: '700px',
      data:
      {
       paciente: a,
       medicamentos: this.totalMedicamentos,
       arrayAlergiasMedicamentosPaciente: this.arrayAlergiasMedicamentosPaciente,
       pacientes: this.totalPacientes,
       personas: this.totalPersonas,
       servicioMedicamento: this.servicioMedicamento,
       servicioPaciente: this.servicioPaciente,
       servicioPersona: this.servicioPersona,
       servicioAlergiasMedicamentosPaciente: this.servicioAlergiasMedicamentosPaciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrayAlergiasMedicamentosPaciente = [];
      
    });
  });
  }


  //inicio : hábitos paciente, uso meds, alergias meds

  obtenerArrayInicio(idPaciente,array,total){
    for(let i=0;i<total.length;i++){

      if(total[i].Paciente_id===idPaciente){

        array.push(total[i]);
      }

      if(total[i].fechaInicio != null){

        total[i].esVerdadero=true;

      }else if(total[i].fechaInicio==null){

        total[i].esVerdadero=false;
      }
    }

  }

 obtenerArrayDeteccion(idPaciente,array,total){
    for(let i=0;i<total.length;i++){

      if(total[i].Paciente_id===idPaciente){

        array.push(total[i]);
      }

      if(total[i].fechaDeteccion != null){

        total[i].esVerdadero=true;

      }else if(total[i].fechaDeteccion==null){

        total[i].esVerdadero=false;
      }
    }

  }

 
  obtenerVacunasPaciente(idPaciente){
    for(let i=0;i<this.totalVacunasPaciente.length;i++){

      if(this.totalVacunasPaciente[i].Paciente_id===idPaciente){

        this.arrayVacunasPaciente.push(this.totalVacunasPaciente[i]);
      }

      if(this.totalVacunasPaciente[i].fechaVacunacion != null){

        this.totalVacunasPaciente[i].esVerdadero=true;

      }else if(this.totalVacunasPaciente[i].fechaVacunacion==null){

        this.totalVacunasPaciente[i].esVerdadero=false;
      }
    }

  }

   onNoClick()
    {
      this.dialogRef.close();
    }

//funciones para obtener de los datos de la persona asociada al paciente

  //se obtiene la comuna del paciente
obtenerComunaPaciente(){
    this.servicioComuna.getComuna(this.personaActual.Comuna_id).subscribe((data)=>{
    var todo: any = data;
    todo = todo.data;
    this.paciente.comunaPaciente=todo.nombre;

    this.obtenerProvinciaPaciente(todo.Provincia_id);

    });
  }

//se obtiene la provincia del paciente
obtenerProvinciaPaciente(id){
    this.servicioProvincia.getProvincia(id).subscribe((data)=>{
      var todo: any = data;
    todo = todo.data;
    this.paciente.provinciaPaciente=todo.nombre;

    this.obtenerRegionPaciente(todo.Region_id);
    });

  }
  //se obtiene la region a la que pertenece el paciente
  obtenerRegionPaciente(id){
    this.servicioRegion.getRegion(id).subscribe((data)=>{
      var todo: any = data;
    todo = todo.data;
    this.paciente.regionPaciente=todo.nombre;

    this.obtenerGeneroPaciente();
   
    });
  }


//se obtiene el género del paciente
  obtenerGeneroPaciente(){
    this.servicioGenero.getGenero(this.personaActual.Genero_id).subscribe((data)=>{
      var todo: any = data;
    todo = todo.data;
    this.paciente.generoPaciente=todo.nombre;

    this.obtenerEstadoCivilPaciente();
   
    });
  }
//se obtiene el estado civil del paciente
  obtenerEstadoCivilPaciente(){
    this.servicioEstadoCivil.getEstadoCivil(this.personaActual.Genero_id).subscribe((data)=>{
    var todo: any = data;
    todo = todo.data;
    this.paciente.estadoCivilPaciente=todo.nombre;

    this.obtenerTipoSangre();

    });
  }
   obtenerTipoSangre(){
    this.servicioTipoSangre.getTipoSangre(this.paciente.TipoSangre_id).subscribe((data)=>{
      var todo: any = data;
      todo = todo.data;
      this.paciente.tipoSangrePaciente=todo.nombre;

      this.obtenerPrevisionActual();
     
    });

  }

  obtenerPrevisionActual(){
   this.servicioPrevisionActual.getPrevisionActuals().subscribe((data)=>{
     var todo: any = data;
     todo = todo.data;
     //registros en previsión actual
     this.totalPrevisionActual=todo;
     //se obtiene la previsión
     this.obtenerPrevision(this.personaActual.id);
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
      this.paciente.prevision=todo.nombre;

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


}
