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
var core_1 = require("@angular/core");
var persona_service_1 = require("../../../Services/persona/persona.service");
var tiposangre_service_1 = require("../../../Services/tiposangre/tiposangre.service");
var grupo_etnico_service_1 = require("../../../Services/grupoetnico/grupo-etnico.service");
var ocupacion_service_1 = require("../../../Services/ocupacion/ocupacion.service");
var Paciente_model_1 = require("../../../Models/Paciente.model");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
var verpersona_component_1 = require("../personas/verpersona/verpersona.component");
var agregarpaciente_component_1 = require("./agregarpaciente/agregarpaciente.component");
var editarpaciente_component_1 = require("./editarpaciente/editarpaciente.component");
var verfichamedica_component_1 = require("../fichamedica/verfichamedica/verfichamedica.component");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var router_1 = require("@angular/router");
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
var PacientesComponent = /** @class */ (function () {
    function PacientesComponent(servicioPersona, servicioTS, servicioPaciente, dialog, servicioEventos, router, servicioGrupoEtnico, servicioOcupacion) {
        var _this = this;
        this.servicioPersona = servicioPersona;
        this.servicioTS = servicioTS;
        this.servicioPaciente = servicioPaciente;
        this.dialog = dialog;
        this.servicioEventos = servicioEventos;
        this.router = router;
        this.servicioGrupoEtnico = servicioGrupoEtnico;
        this.servicioOcupacion = servicioOcupacion;
        this.displayedColumns = ['Acciones', 'Rut', 'Persona', 'Tipo Sangre', 'Grupo Etnico', 'Ocupacion'];
        this.selection = new collections_1.SelectionModel(true, []);
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalTS = [];
        this.totalGruposEtnicos = [];
        this.totalOcupaciones = [];
        this.totalPacientes = [];
        this.totalPersonas = [];
        this.actualizarPersonas();
        this.actualizarTotales();
        this.servicioEventos.seActivo.subscribe(function () {
            _this.actualizarPersonas();
        });
    }
    PacientesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Paciente');
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
    };
    PacientesComponent.prototype.isAllSelected = function () {
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
    PacientesComponent.prototype.masterToggle = function () {
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
    PacientesComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.totalPersonas = [];
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
            _this.actualizarPacientes();
        });
    };
    PacientesComponent.prototype.actualizarTotales = function () {
        var _this = this;
        this.totalTS = [];
        this.servicioTS.getTipoSangres().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalTS = todo;
            _this.servicioGrupoEtnico.getGrupoEtnicos().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalGruposEtnicos = todo;
                _this.servicioOcupacion.getOcupacions().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalOcupaciones = todo;
                });
            });
        });
    };
    PacientesComponent.prototype.actualizarPacientes = function () {
        var _this = this;
        this.totalPacientes = [];
        this.servicioPaciente.getPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPacientes = todo;
            //Asignar rut busca el rut de cad apacietne buscando en su persona
            _this.asignarRut();
            //Lo mismo que arriba solo que con activado
            _this.reconocerActivado();
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalPacientes);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Paciente');
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
    PacientesComponent.prototype.reconocerActivado = function () {
        for (var i = 0; i < this.totalPacientes.length; i++) {
            for (var j = 0; j < this.totalPersonas.length; j++) {
                if (parseInt(this.totalPacientes[i].Persona_id) === this.totalPersonas[j].id) {
                    this.totalPersonas[j].estado === 0 ? this.totalPacientes[i].activado = 0 : this.totalPacientes[i].activado = 1;
                    console.log(this.totalPacientes);
                    break;
                }
            }
        }
    };
    PacientesComponent.prototype.asignarRut = function () {
        for (var i = 0; i < this.totalPacientes.length; i++) {
            for (var j = 0; j < this.totalPersonas.length; j++) {
                if (parseInt(this.totalPacientes[i].Persona_id) === this.totalPersonas[j].id) {
                    console.log(this.totalPersonas[j].rut);
                    this.totalPacientes[i].rut = this.totalPersonas[j].rut;
                    console.log(this.totalPacientes[i]);
                    break;
                }
            }
        }
    };
    PacientesComponent.prototype.eliminarPaciente = function (paciente) {
        var _this = this;
        this.servicioPaciente.deletePaciente(paciente.id).subscribe(function (data) {
            _this.actualizarPersonas();
        });
    };
    PacientesComponent.prototype.edicionPaciente = function (paciente) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(paciente));
        this.pasarStringId(a);
        console.log(a);
        var dialogRef = this.dialog.open(editarpaciente_component_1.EditarpacienteComponent, {
            width: '700px',
            data: {
                pacientes: this.totalPacientes,
                paciente: a,
                personas: this.totalPersonas,
                tipoSangres: this.totalTS,
                servicioPaciente: this.servicioPaciente,
                servicioPersona: this.servicioPersona,
                servicioTS: this.servicioTS
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarPersonas();
        });
    };
    PacientesComponent.prototype.agregacionPaciente = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarpaciente_component_1.AgregarpacienteComponent, {
            width: '700px',
            data: {
                paciente: new Paciente_model_1.Paciente(),
                personas: this.totalPersonas,
                tipoSangres: this.totalTS,
                servicioPaciente: this.servicioPaciente,
                servicioPersona: this.servicioPersona,
                servicioTS: this.servicioTS
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarPersonas();
        });
    };
    PacientesComponent.prototype.desplegarPersona = function (paciente) {
        var _this = this;
        this.servicioPersona.getPersona(parseInt(paciente.Persona_id)).subscribe(function (data) {
            var persona = data;
            persona = persona.data;
            console.log(persona);
            var dialogRef = _this.dialog.open(verpersona_component_1.VerpersonaComponent, {
                width: '700px',
                data: { persona: persona }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                //this.actualizarPersonas();
            });
        });
    };
    PacientesComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalPacientes.length; i++) {
            for (var j = 0; j < this.totalTS.length; j++) {
                if (parseInt(this.totalPacientes[i].TipoSangre_id) === this.totalTS[j].id) {
                    this.totalPacientes[i].TipoSangre_id = this.totalTS[j].nombre;
                    break;
                }
            }
            for (var j = 0; j < this.totalGruposEtnicos.length; j++) {
                if (parseInt(this.totalPacientes[i].GrupoEtnico_id) === this.totalGruposEtnicos[j].id) {
                    this.totalPacientes[i].GrupoEtnico_id = this.totalGruposEtnicos[j].nombre;
                    break;
                }
            }
            for (var j = 0; j < this.totalOcupaciones.length; j++) {
                if (parseInt(this.totalPacientes[i].Ocupacion_id) === this.totalOcupaciones[j].id) {
                    this.totalPacientes[i].Ocupacion_id = this.totalOcupaciones[j].nombre;
                    break;
                }
            }
        }
    };
    PacientesComponent.prototype.pasarStringId = function (paciente) {
        for (var i = 0; i < this.totalTS.length; i++) {
            if (paciente.TipoSangre_id === this.totalTS[i].nombre) {
                paciente.TipoSangre_id = this.totalTS[i].id;
            }
        }
        for (var i = 0; i < this.totalGruposEtnicos.length; i++) {
            if (paciente.GrupoEtnico_id === this.totalGruposEtnicos[i].nombre) {
                paciente.GrupoEtnico_id = this.totalGruposEtnicos[i].id;
            }
        }
        for (var i = 0; i < this.totalOcupaciones.length; i++) {
            if (paciente.Ocupacion_id === this.totalOcupaciones[i].nombre) {
                paciente.Ocupacion_id = this.totalOcupaciones[i].id;
            }
        }
    };
    PacientesComponent.prototype.desactivarPaciente = function (paciente) {
        var _this = this;
        this.servicioPersona.getPersona(paciente.Persona_id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            todo.estado = 0;
            _this.servicioPersona.editPersona(todo, todo.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarPersonas();
                //El servicio con este metodo emite un evento que cualqueir componetne que este suscrito a dicho evento reaccionara
                console.log("Yo hice un cambio (SoyPaciente)");
                _this.servicioEventos.hiceUnCambio();
            });
        });
    };
    PacientesComponent.prototype.activarPaciente = function (paciente) {
        var _this = this;
        this.servicioPersona.getPersona(paciente.Persona_id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            todo.estado = 1;
            _this.servicioPersona.editPersona(todo, todo.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarPersonas();
                _this.servicioEventos.hiceUnCambio();
            });
        });
    };
    //función para mostrar la ficha médica del paciente correspondiente
    PacientesComponent.prototype.desplegarFichaPaciente = function (paciente) {
        var _this = this;
        this.servicioPersona.getPersona(parseInt(paciente.Persona_id)).subscribe(function (data) {
            var persona = data;
            persona = persona.data;
            console.log(persona);
            var dialogRef = _this.dialog.open(verfichamedica_component_1.VerFichaMedicaComponent, {
                width: '1000px',
                height: '500px',
                data: { persona: persona }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                //this.actualizarPersonas();
            });
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], PacientesComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], PacientesComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], PacientesComponent.prototype, "filter", void 0);
    PacientesComponent = __decorate([
        core_1.Component({
            selector: 'app-pacientes',
            templateUrl: './pacientes.component.html',
            styleUrls: ['./pacientes.component.css']
        }),
        __metadata("design:paramtypes", [persona_service_1.PersonaService,
            tiposangre_service_1.TipoSangreService,
            paciente_service_1.PacienteService,
            material_2.MatDialog,
            eventos_service_1.EventosService,
            router_1.Router,
            grupo_etnico_service_1.GrupoEtnicoService,
            ocupacion_service_1.OcupacionService])
    ], PacientesComponent);
    return PacientesComponent;
}());
exports.PacientesComponent = PacientesComponent;
//# sourceMappingURL=pacientes.component.js.map