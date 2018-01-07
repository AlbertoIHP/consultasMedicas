"use strict";
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
// Componentes generales
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var persona_service_1 = require("../../../Services/persona/persona.service");
var genero_service_1 = require("../../../Services/genero/genero.service");
var estadocivil_service_1 = require("../../../Services/estadocivil/estadocivil.service");
var region_service_1 = require("../../../Services/region/region.service");
var provincia_service_1 = require("../../../Services/provincia/provincia.service");
var comuna_service_1 = require("../../../Services/comuna/comuna.service");
// Componentes hijos
var agregarpersona_component_1 = require("./agregarpersona/agregarpersona.component");
var editarpersona_component_1 = require("./editarpersona/editarpersona.component");
var verprevision_component_1 = require("../previsiones/verprevision/verprevision.component");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
var agregarusuario_component_1 = require("../usuarios/agregarusuario/agregarusuario.component");
var Usuario_model_1 = require("../../../Models/Usuario.model");
var user_service_1 = require("../../../Services/user/user.service");
var role_service_1 = require("../../../Services/role/role.service");
// Componente para verificación de roles
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var datasource_component_1 = require("../../Globals/datasource.component");
var material_2 = require("@angular/material");
var PersonaComponent = /** @class */ (function () {
    function PersonaComponent(
        //Se declaran los servicios y componentes a utilizar    
        servicioPersona, servicioRegion, servicioProvincia, servicioComuna, servicioGenero, servicioEstadoCivil, router, dialog, servicioEventos, servicioUsuario, servicioRole, servicioEvento) {
        // Se inicializan los atributos
        this.servicioPersona = servicioPersona;
        this.servicioRegion = servicioRegion;
        this.servicioProvincia = servicioProvincia;
        this.servicioComuna = servicioComuna;
        this.servicioGenero = servicioGenero;
        this.servicioEstadoCivil = servicioEstadoCivil;
        this.router = router;
        this.dialog = dialog;
        this.servicioEventos = servicioEventos;
        this.servicioUsuario = servicioUsuario;
        this.servicioRole = servicioRole;
        this.servicioEvento = servicioEvento;
        //Se declaran los atributos a usar
        this.displayedColumns = [
            'Acciones',
            'Rut',
            'Nombre',
            'Telefonos',
            'Sexo',
            'Estado Civil',
            'Comuna',
            "Fecha Nacimiento",
            "Direccion"
        ];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalPacientes = [];
        this.totalGeneros = [];
        this.actualizarRegiones();
        this.actualizarProvincias();
        this.actualizarComunas();
        this.actualizarGeneros();
        this.actualizarEstadoCiviles();
        this.actualizarPersonas();
    }
    PersonaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Se inicializa el datasource
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Persona');
        Observable_1.Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filter.nativeElement.value;
        });
        this.exampleDatabase = [];
        // Se obtiene el evento emitido desde agregar
        this.servicioEvento.actualizar.subscribe(function (data) { _this.actualizar = data; });
    };
    PersonaComponent.prototype.isAllSelected = function () {
        if (!this.dataSource) {
            return false;
        }
        if (this.selection.isEmpty()) {
            return false;
        }
        if (this.filter.nativeElement.value) {
            return this.selection.selected.length == this.dataSource.renderedData.length;
        }
        else {
            return this.selection.selected.length == this.exampleDatabase.data.length;
        }
    };
    PersonaComponent.prototype.masterToggle = function () {
        var _this = this;
        if (!this.dataSource) {
            return;
        }
        if (this.isAllSelected()) {
            this.selection.clear();
        }
        else if (this.filter.nativeElement.value) {
            this.dataSource.renderedData.forEach(function (data) { return _this.selection.select(data.id); });
        }
        else {
            this.exampleDatabase.data.forEach(function (data) { return _this.selection.select(data.id); });
        }
    };
    PersonaComponent.prototype.crearPersona = function () {
        var _this = this;
        // Se abre un nuevo dialogo para agregar una persona, se abre un componente hijo  
        var dialogRef = this.dialog.open(agregarpersona_component_1.AgregarpersonaComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                regiones: this.totalRegiones,
                provincias: this.totalProvincias,
                comunas: this.totalComunas,
                ec: this.totalEstadoCiviles,
                generos: this.totalGeneros,
                servicioGenero: this.servicioGenero,
                servicioEC: this.servicioEstadoCivil,
                servicioComuna: this.servicioComuna,
                servicioPersona: this.servicioPersona,
                servicioProvincia: this.servicioProvincia,
                servicioRegion: this.servicioRegion
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
            if (_this.actualizar) {
                _this.actualizarGeneros();
                _this.actualizarRegiones();
                _this.actualizarComunas();
                _this.actualizarProvincias();
                _this.actualizarEstadoCiviles();
                _this.actualizarPersonas();
            }
        });
    };
    // Se obtiene la comuna a modificar desde el frontend
    PersonaComponent.prototype.editarPersona = function (persona) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(persona));
        this.pasarStringId(a);
        //Se abre un dialogo para editar la persona, se abre un componente hijo
        var dialogRef = this.dialog.open(editarpersona_component_1.EditarpersonaComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '1000px',
            height: '600px',
            data: {
                persona: a,
                regiones: this.totalRegiones,
                provincias: this.totalProvincias,
                comunas: this.totalComunas,
                ec: this.totalEstadoCiviles,
                generos: this.totalGeneros,
                servicioGenero: this.servicioGenero,
                servicioEC: this.servicioEstadoCivil,
                servicioComuna: this.servicioComuna,
                servicioProvincia: this.servicioProvincia,
                servicioRegion: this.servicioRegion
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            /*
              // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
              if (!this.actualizar) { this.actualizarComunas();}
            */
            _this.actualizarGeneros();
            _this.actualizarRegiones();
            _this.actualizarComunas();
            _this.actualizarProvincias();
            _this.actualizarEstadoCiviles();
            _this.actualizarPersonas();
        });
    };
    PersonaComponent.prototype.previsionPersona = function (persona) {
        var a = JSON.parse(JSON.stringify(persona));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(verprevision_component_1.VerPrevisionComponent, {
            width: '900px',
            data: {
                persona: a
            }
        });
    };
    PersonaComponent.prototype.pasarStringId = function (paciente) {
        for (var i = 0; i < this.totalComunas.length; i++) {
            if (paciente.Comuna_id === this.totalComunas[i].nombre) {
                paciente.Comuna_id = this.totalComunas[i].id;
            }
        }
        for (var i = 0; i < this.totalGeneros.length; i++) {
            if (paciente.Genero_id === this.totalGeneros[i].nombre) {
                paciente.Genero_id = this.totalGeneros[i].id;
            }
        }
        for (var i = 0; i < this.totalEstadoCiviles.length; i++) {
            if (paciente.EstadoCivil_id === this.totalEstadoCiviles[i].nombre) {
                paciente.EstadoCivil_id = this.totalEstadoCiviles[i].id;
            }
        }
    };
    PersonaComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalPacientes.length; i++) {
            for (var j = 0; j < this.totalGeneros.length; j++) {
                if (parseInt(this.totalPacientes[i].Genero_id) === this.totalGeneros[j].id) {
                    this.totalPacientes[i].Genero_id = this.totalGeneros[j].nombre;
                    break;
                }
            }
            for (var j = 0; j < this.totalEstadoCiviles.length; j++) {
                if (parseInt(this.totalPacientes[i].EstadoCivil_id) === this.totalEstadoCiviles[j].id) {
                    this.totalPacientes[i].EstadoCivil_id = this.totalEstadoCiviles[j].nombre;
                    break;
                }
            }
            for (var j = 0; j < this.totalComunas.length; j++) {
                if (parseInt(this.totalPacientes[i].Comuna_id) === this.totalComunas[j].id) {
                    this.totalPacientes[i].Comuna_id = this.totalComunas[j].nombre;
                    break;
                }
            }
        }
    };
    PersonaComponent.prototype.actualizarRegiones = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
    };
    PersonaComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPacientes = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalPacientes);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Persona');
            Observable_1.Observable.fromEvent(_this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(function () {
                if (!_this.dataSource) {
                    return;
                }
                _this.dataSource.filter = _this.filter.nativeElement.value;
            });
        });
    };
    PersonaComponent.prototype.actualizarProvincias = function () {
        var _this = this;
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
        });
    };
    PersonaComponent.prototype.actualizarComunas = function () {
        var _this = this;
        this.servicioComuna.getComunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalComunas = todo;
        });
    };
    PersonaComponent.prototype.actualizarGeneros = function () {
        var _this = this;
        this.servicioGenero.getGeneros().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalGeneros = todo;
        });
    };
    PersonaComponent.prototype.actualizarEstadoCiviles = function () {
        var _this = this;
        this.servicioEstadoCivil.getEstadoCivils().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEstadoCiviles = todo;
        });
    };
    /// FUNCIONALIDADES EXCLUSIVAS
    PersonaComponent.prototype.eliminarPaciente = function (paciente) {
        var _this = this;
        this.servicioPersona.deletePersona(paciente.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarPersonas();
        });
    };
    PersonaComponent.prototype.activarPaciente = function (paciente) {
        var _this = this;
        paciente.estado = 1;
        this.pasarStringId(paciente);
        this.servicioPersona.editPersona(paciente, paciente.id).subscribe(function (data) {
            _this.servicioEventos.hiceUnCambio();
        });
    };
    PersonaComponent.prototype.desactivarPaciente = function (paciente) {
        var _this = this;
        paciente.estado = 0;
        this.pasarStringId(paciente);
        this.servicioPersona.editPersona(paciente, paciente.id).subscribe(function (data) {
            _this.servicioEventos.hiceUnCambio();
        });
    };
    PersonaComponent.prototype.agregarUsuario = function (persona) {
        var a = JSON.parse(JSON.stringify(persona));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(agregarusuario_component_1.AgregarusuarioComponent, {
            width: '700px',
            data: {
                persona: a,
                servicioPersona: this.servicioPersona,
                servicioUsuario: this.servicioUsuario,
                servicioRole: this.servicioRole,
                usuario: new Usuario_model_1.Usuario()
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], PersonaComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], PersonaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], PersonaComponent.prototype, "filter", void 0);
    PersonaComponent = __decorate([
        core_1.Component({
            selector: 'app-personas',
            templateUrl: './personas.component.html',
            styleUrls: ['./personas.component.css']
        }),
        __metadata("design:paramtypes", [persona_service_1.PersonaService,
            region_service_1.RegionService,
            provincia_service_1.ProvinciaService,
            comuna_service_1.ComunaService,
            genero_service_1.GeneroService,
            estadocivil_service_1.EstadocivilService,
            router_1.Router,
            material_2.MatDialog,
            eventos_service_1.EventosService,
            user_service_1.UserService,
            role_service_1.RoleService,
            eventos_service_1.EventosService])
    ], PersonaComponent);
    return PersonaComponent;
}());
exports.PersonaComponent = PersonaComponent;
//# sourceMappingURL=personas.component.js.map