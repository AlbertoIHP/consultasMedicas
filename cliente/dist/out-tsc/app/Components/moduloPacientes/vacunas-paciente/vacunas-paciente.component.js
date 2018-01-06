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
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var verfichamedica_component_1 = require("../fichamedica/verfichamedica/verfichamedica.component");
var vacunaspaciente_service_1 = require("../../../Services/vacunaspaciente/vacunaspaciente.service");
var vacuna_service_1 = require("../../../Services/vacuna/vacuna.service");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
var persona_service_1 = require("../../../Services/persona/persona.service");
var editar_vacunas_paciente_component_1 = require("./editar-vacunas-paciente/editar-vacunas-paciente.component");
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
var VacunasPacienteComponent = /** @class */ (function () {
    function VacunasPacienteComponent(servicioVacunasPaciente, servicioVacuna, servicioPaciente, servicioPersona, dialog) {
        this.servicioVacunasPaciente = servicioVacunasPaciente;
        this.servicioVacuna = servicioVacuna;
        this.servicioPaciente = servicioPaciente;
        this.servicioPersona = servicioPersona;
        this.dialog = dialog;
        this.displayedColumns = ['Rut Paciente', 'Nombre', 'Vacunas'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalVacunas = [];
        this.totalVacunasPaciente = [];
        this.totalPacientes = [];
        this.totalPersonas = [];
        this.arrayVacunasPaciente = [];
        this.actualizarAtributos();
    }
    VacunasPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'VacunasPaciente');
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
    VacunasPacienteComponent.prototype.isAllSelected = function () {
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
    VacunasPacienteComponent.prototype.masterToggle = function () {
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
    //función para setear el array con los registros del paciente correspondiente
    VacunasPacienteComponent.prototype.obtenerVacunasPaciente = function (idPaciente) {
        for (var i = 0; i < this.totalVacunasPaciente.length; i++) {
            if (this.totalVacunasPaciente[i].Paciente_id === idPaciente) {
                if (this.totalVacunasPaciente[i].fechaVacunacion != null) {
                    this.totalVacunasPaciente[i].fechaTemp = new Date(this.totalVacunasPaciente[i].fechaVacunacion);
                    this.totalVacunasPaciente[i].esVerdadero = true;
                }
                else if (this.totalVacunasPaciente[i].fechaVacunacion == null) {
                    this.totalVacunasPaciente[i].fechaTemp = null;
                    this.totalVacunasPaciente[i].esVerdadero = false;
                }
                this.arrayVacunasPaciente.push(this.totalVacunasPaciente[i]);
            }
        }
    };
    VacunasPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioVacuna.getVacunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalVacunas = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioPersona.getPersonas().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalPersonas = todo;
                    _this.servicioVacunasPaciente.getVacunasPaciente().subscribe(function (data) {
                        var todo = data;
                        todo = todo.data;
                        _this.totalVacunasPaciente = todo;
                        _this.reemplazarIdPorString();
                        //DATATABLE
                        _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalPacientes);
                        _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'VacunasPaciente');
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
                });
            });
        });
    };
    VacunasPacienteComponent.prototype.reemplazarIdPorString = function () {
        var _this = this;
        var _loop_1 = function (i) {
            for (var j = 0; j < this_1.totalVacunasPaciente.length; j++) {
                if (this_1.totalPacientes[i].id === this_1.totalVacunasPaciente[j].Paciente_id) {
                    var currentPersona = this_1.totalPersonas.filter(function (persona) { return persona.id === parseInt(_this.totalPacientes[i].Persona_id); });
                    this_1.totalPacientes[i].rut = currentPersona[0].rut;
                    this_1.totalPacientes[i].nombre = currentPersona[0].nombre1 + " " + currentPersona[0].nombre2 + " " + currentPersona[0].apellido1 + " " + currentPersona[0].apellido2;
                    break;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.totalPacientes.length; i++) {
            _loop_1(i);
        }
    };
    VacunasPacienteComponent.prototype.edicionVacunasPaciente = function (paciente) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(paciente));
        //this.pasarStringId(a);
        this.obtenerVacunasPaciente(a.id);
        var dialogRef = this.dialog.open(editar_vacunas_paciente_component_1.EditarVacunasPacienteComponent, {
            width: '1000px',
            height: '700px',
            data: {
                paciente: a,
                vacunas: this.totalVacunas,
                arrayVacunasPaciente: this.arrayVacunasPaciente,
                servicioVacuna: this.servicioVacuna,
                servicioVacunasPaciente: this.servicioVacunasPaciente
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarAtributos();
            _this.arrayVacunasPaciente = [];
        });
    };
    //función para mostrar la ficha médica del paciente correspondiente
    VacunasPacienteComponent.prototype.desplegarFichaPaciente = function (paciente) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(paciente));
        var b;
        this.servicioPaciente.getPaciente(a.id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            b = todo;
            _this.servicioPersona.getPersona(parseInt(b.Persona_id)).subscribe(function (data) {
                var persona = data;
                persona = persona.data;
                console.log(persona);
                var dialogRef = _this.dialog.open(verfichamedica_component_1.VerFichaMedicaComponent, {
                    width: '1000px',
                    height: '700px',
                    data: { persona: persona }
                });
            });
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VacunasPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VacunasPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VacunasPacienteComponent.prototype, "filter", void 0);
    VacunasPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-vacunas-paciente',
            templateUrl: './vacunas-paciente.component.html',
            styleUrls: ['./vacunas-paciente.component.css']
        }),
        __metadata("design:paramtypes", [vacunaspaciente_service_1.VacunasPacienteService, vacuna_service_1.VacunaService,
            paciente_service_1.PacienteService, persona_service_1.PersonaService, material_2.MatDialog])
    ], VacunasPacienteComponent);
    return VacunasPacienteComponent;
}());
exports.VacunasPacienteComponent = VacunasPacienteComponent;
//# sourceMappingURL=vacunas-paciente.component.js.map