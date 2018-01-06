"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var persona_service_1 = require("../../../Services/persona/persona.service");
var Genero_model_1 = require("../../../Models/Genero.model");
var genero_service_1 = require("../../../Services/genero/genero.service");
var EstadoCivil_model_1 = require("../../../Models/EstadoCivil.model");
var estadocivil_service_1 = require("../../../Services/estadocivil/estadocivil.service");
var Region_model_1 = require("../../../Models/Region.model");
var region_service_1 = require("../../../Services/region/region.service");
var Provincia_model_1 = require("../../../Models/Provincia.model");
var provincia_service_1 = require("../../../Services/provincia/provincia.service");
var Comuna_model_1 = require("../../../Models/Comuna.model");
var comuna_service_1 = require("../../../Services/comuna/comuna.service");
var TipoSangre_model_1 = require("../../../Models/TipoSangre.model");
var tiposangre_service_1 = require("../../../Services/tiposangre/tiposangre.service");
var previsionactual_service_1 = require("../../../Services/previsionactual/previsionactual.service");
var Prevision_model_1 = require("../../../Models/Prevision.model");
var prevision_service_1 = require("../../../Services/prevision/prevision.service");
var Paciente_model_1 = require("../../../Models/Paciente.model");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var router_1 = require("@angular/router");
var FichaMedicaComponent = /** @class */ (function () {
    function FichaMedicaComponent(servicioPersona, servicioRegion, servicioProvincia, servicioComuna, servicioGenero, servicioEstadoCivil, servicioTipoSangre, servicioPrevisionActual, servicioPrevision, servicioPaciente, router) {
        this.servicioPersona = servicioPersona;
        this.servicioRegion = servicioRegion;
        this.servicioProvincia = servicioProvincia;
        this.servicioComuna = servicioComuna;
        this.servicioGenero = servicioGenero;
        this.servicioEstadoCivil = servicioEstadoCivil;
        this.servicioTipoSangre = servicioTipoSangre;
        this.servicioPrevisionActual = servicioPrevisionActual;
        this.servicioPrevision = servicioPrevision;
        this.servicioPaciente = servicioPaciente;
        this.router = router;
        //booleanos para indicar si existen registrso de peso y estatura en la ficha
        /*public existeEstatura:boolean;
        public estaturaPaciente:string;
    
        public existePeso:boolean;
        public pesoPaciente:string;*/
        //elemetos de la tabla (ficha)
        this.displayedColumns = ['Nombres', 'Apellidos', 'RUT'];
        this.displayedColumns2 = ['Genero', 'EstadoCivil', 'FonoCasa', 'FonoTrabajo', 'Movil'];
        this.displayedColumns3 = ['Comuna', 'Provincia', 'Region', 'Prevision'];
        this.displayedColumns4 = ['Peso', 'Estatura', 'TipoSangre'];
        //datos básicos del paciente para la primera tabla
        this.datosPacienteT1 = [{}];
        //datos básicos del paciente para la segunda tabla
        this.datosPacienteT2 = [{}];
        //Datos geográficos para la tercera tabla
        this.ubicacionPaciente = [{}];
        //datos básicos del paciente para la cuarta tabla
        this.datosPacienteT4 = [{}];
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.contenidoStorage = JSON.parse(localStorage.getItem('persona'));
        this.personaPaciente = [];
        this.paciente = new Paciente_model_1.Paciente();
        this.totalPacientes = [];
        this.tipoSangrePaciente = new TipoSangre_model_1.TipoSangre();
        this.regionPaciente = new Region_model_1.Region();
        this.provinciaPaciente = new Provincia_model_1.Provincia();
        this.comunaPaciente = new Comuna_model_1.Comuna();
        this.generoPaciente = new Genero_model_1.Genero();
        this.estadoCivilPaciente = new EstadoCivil_model_1.EstadoCivil();
        this.totalPrevisionActual = [];
        this.previsionPaciente = new Prevision_model_1.Prevision();
        this.historialPrevisionesPacientes = [];
        this.existePrevision = false;
        this.existeFonoCasa = false;
        this.existeFonoTrabajo = false;
        this.esPaciente = false;
        this.obtenerPersonaPaciente(parseInt(this.contenidoStorage.id));
        this.obtenerListaPacientes(parseInt(this.contenidoStorage.id));
    }
    FichaMedicaComponent.prototype.ngOnInit = function () {
    };
    //-------Datos Paciente
    FichaMedicaComponent.prototype.obtenerListaPacientes = function (id) {
        var _this = this;
        this.servicioPaciente.getPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPacientes = todo;
            _this.obtenerPaciente(id);
        });
    };
    FichaMedicaComponent.prototype.obtenerPaciente = function (id) {
        for (var i = 0; i < this.totalPacientes.length; i++) {
            if (this.totalPacientes[i].Persona_id == id) {
                this.esPaciente = true;
                this.paciente = this.totalPacientes[i];
                console.log("PACIENTE");
                console.log(this.paciente);
                this.obtenerTipoSangre(this.paciente.TipoSangre_id);
                //this.obtenerAlergias(this.paciente.id);
                break;
            }
            else {
                this.esPaciente = false;
            }
        }
    };
    FichaMedicaComponent.prototype.obtenerTipoSangre = function (id) {
        var _this = this;
        this.servicioTipoSangre.getTipoSangre(id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.tipoSangrePaciente = todo;
            console.log("SANGRE");
            console.log(_this.tipoSangrePaciente);
            //asignación del tipo de sangre para la tabla 4
            _this.datosPacienteT4[0].tipoSangre = _this.tipoSangrePaciente.nombre;
        });
    };
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
    FichaMedicaComponent.prototype.obtenerPersonaPaciente = function (id) {
        var _this = this;
        this.servicioPersona.getPersona(id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.personaPaciente.push(todo);
            console.log("PERSONA");
            console.log(_this.personaPaciente);
            //se obtiene teléfono casa (puede no estar registrado)
            _this.fonoCasaPaciente = _this.personaPaciente[0].fono_casa;
            if (_this.fonoCasaPaciente == "none" || _this.fonoCasaPaciente == "") {
                _this.existeFonoCasa = false;
            }
            else {
                _this.existeFonoCasa = true;
            }
            //se obtiene teléfono trabajo (puene no estar registrado)
            _this.fonoTrabajoPaciente = _this.personaPaciente[0].fono_trabajo;
            if (_this.fonoTrabajoPaciente == "none" || _this.fonoTrabajoPaciente == "") {
                _this.existeFonoTrabajo = false;
            }
            else {
                _this.existeFonoTrabajo = true;
            }
            //asignación teléfonos
            _this.datosPacienteT2[0].fonoCasa = _this.fonoCasaPaciente;
            _this.datosPacienteT2[0].fonoTrabajo = _this.fonoTrabajoPaciente;
            _this.datosPacienteT2[0].movil = _this.personaPaciente[0].movil;
            //asignacion nombre-apellidos
            _this.datosPacienteT1[0].nombres = _this.personaPaciente[0].nombre1 + " " + _this.personaPaciente[0].nombre2;
            _this.datosPacienteT1[0].apellidos = _this.personaPaciente[0].apellido1 + " " + _this.personaPaciente[0].apellido2;
            _this.datosPacienteT1[0].rut = _this.personaPaciente[0].rut;
            //se obtienen los datos asociados a la ubicación del paciente
            _this.obtenerComunaPaciente(_this.personaPaciente[0].Comuna_id);
            //se obtiene el género del paciente
            _this.obtenerGeneroPaciente(_this.personaPaciente[0].Genero_id);
            //se obtiene el estado civil del paciente
            _this.obtenerEstadoCivilPaciente(_this.personaPaciente[0].EstadoCivil_id);
            //obtener prevision
            _this.obtenerPrevisionActual(_this.personaPaciente[0].id);
            _this.personaTabla1 = new ExampleDataSource(_this.datosPacienteT1);
            _this.personaTabla2 = new ExampleDataSource(_this.datosPacienteT2);
            _this.personaTabla3 = new ExampleDataSource(_this.ubicacionPaciente);
            _this.personaTabla4 = new ExampleDataSource(_this.datosPacienteT4);
        });
    };
    //se obtiene la comuna del paciente
    FichaMedicaComponent.prototype.obtenerComunaPaciente = function (id) {
        var _this = this;
        this.servicioComuna.getComuna(id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.comunaPaciente = todo;
            console.log("COMUNA");
            console.log(_this.comunaPaciente);
            //se asigna el nombre de la comuna a los datos geográficos
            _this.ubicacionPaciente[0].comuna = _this.comunaPaciente.nombre;
            _this.obtenerProvinciaPaciente(_this.comunaPaciente.Provincia_id);
        });
    };
    //se obtiene la provincia del paciente
    FichaMedicaComponent.prototype.obtenerProvinciaPaciente = function (id) {
        var _this = this;
        this.servicioProvincia.getProvincia(id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.provinciaPaciente = todo;
            console.log("PROVINCIA");
            console.log(_this.provinciaPaciente);
            //se asigna el nombre de la provincia a los datos geográficos
            _this.ubicacionPaciente[0].provincia = _this.provinciaPaciente.nombre;
            _this.obtenerRegionPaciente(_this.provinciaPaciente.Region_id);
        });
    };
    //se obtiene la region a la que pertenece el paciente
    FichaMedicaComponent.prototype.obtenerRegionPaciente = function (id) {
        var _this = this;
        this.servicioRegion.getRegion(id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.regionPaciente = todo;
            console.log("REGION");
            console.log(_this.regionPaciente);
            //se asigna el nombre de la región a los datos geográficos
            _this.ubicacionPaciente[0].region = _this.regionPaciente.nombre;
        });
    };
    //se obtiene el género del paciente
    FichaMedicaComponent.prototype.obtenerGeneroPaciente = function (id) {
        var _this = this;
        this.servicioGenero.getGenero(id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.generoPaciente = todo;
            console.log("GENERO");
            console.log(_this.generoPaciente);
            //se asigna el nombre del género a los datos del paciente para la t2
            _this.datosPacienteT2[0].genero = _this.generoPaciente.nombre;
        });
    };
    //se obtiene el estado civil del paciente
    FichaMedicaComponent.prototype.obtenerEstadoCivilPaciente = function (id) {
        var _this = this;
        this.servicioEstadoCivil.getEstadoCivil(id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.estadoCivilPaciente = todo;
            console.log("ESTCIVIL");
            console.log(_this.estadoCivilPaciente);
            //se asigna el nombre del estado civil a los datos del paciente para la t2
            _this.datosPacienteT2[0].estadoCivil = _this.estadoCivilPaciente.nombre;
        });
    };
    //Se obtiene la prevision actual del paciente
    FichaMedicaComponent.prototype.obtenerPrevisionActual = function (id) {
        var _this = this;
        this.servicioPrevisionActual.getPrevisionActuals().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            //registros en previsión actual
            _this.totalPrevisionActual = todo;
            //se obtiene la previsión
            _this.obtenerPrevision(id);
        });
    };
    FichaMedicaComponent.prototype.obtenerPrevision = function (id) {
        var _this = this;
        for (var i = 0; i < this.totalPrevisionActual.length; i++) {
            if (this.totalPrevisionActual[i].Persona_id == id) {
                //se guardan los cambios de previsiones del paciente
                this.historialPrevisionesPacientes.push(this.totalPrevisionActual[i]);
            }
        }
        //si existen registros en el historial
        if (this.historialPrevisionesPacientes.length > 0) {
            this.existePrevision = true;
            //se ordena el historial
            this.ordenarHistorial(this.historialPrevisionesPacientes);
            //se obtiene el ultimo registro
            var ultimo;
            ultimo = this.historialPrevisionesPacientes[this.historialPrevisionesPacientes.length - 1];
            var fechaUltimo = new Date(ultimo.fechaActualizacion);
            //se obtiene la previsión asociada al mismo
            this.servicioPrevision.getPrevision(ultimo.Prevision_id).subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.previsionPaciente = todo;
                console.log("PREVISION");
                console.log(_this.previsionPaciente);
                //se asigna la previsión del paciente a los datos de la tabla 1
                _this.ubicacionPaciente[0].prevision = _this.previsionPaciente.nombre;
            });
        }
        else {
            this.existePrevision = false;
        }
    };
    //se ordena el historial (de previsión)
    FichaMedicaComponent.prototype.ordenarHistorial = function (historial) {
        historial.sort(function (a, b) {
            var fechaA = new Date(a.fechaActualizacion);
            var fechaB = new Date(b.fechaActualizacion);
            return fechaA.getTime() - fechaB.getTime();
        });
    };
    FichaMedicaComponent = __decorate([
        core_1.Component({
            selector: 'app-fichamedica',
            templateUrl: './fichamedica.component.html',
            styleUrls: ['./fichamedica.component.css']
        }),
        __metadata("design:paramtypes", [persona_service_1.PersonaService,
            region_service_1.RegionService,
            provincia_service_1.ProvinciaService,
            comuna_service_1.ComunaService,
            genero_service_1.GeneroService,
            estadocivil_service_1.EstadocivilService,
            tiposangre_service_1.TipoSangreService,
            previsionactual_service_1.PrevisionactualService,
            prevision_service_1.PrevisionService,
            paciente_service_1.PacienteService,
            router_1.Router])
    ], FichaMedicaComponent);
    return FichaMedicaComponent;
}());
exports.FichaMedicaComponent = FichaMedicaComponent;
/**
** Esta clase permite observar cambios en un arreglo de objetos para desplegarlos en una tabla
**
**/
var ExampleDataSource = /** @class */ (function (_super) {
    __extends(ExampleDataSource, _super);
    function ExampleDataSource(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    ExampleDataSource.prototype.connect = function () {
        return Observable_1.Observable.of(this.data);
    };
    ExampleDataSource.prototype.disconnect = function () { };
    return ExampleDataSource;
}(collections_1.DataSource));
exports.ExampleDataSource = ExampleDataSource;
//# sourceMappingURL=fichamedica.component.js.map