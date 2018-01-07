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
var enfermedades_cronicas_paciente_service_1 = require("../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service");
var enfermedad_cronica_service_1 = require("../../../Services/enfermedadcronica/enfermedad-cronica.service");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
var persona_service_1 = require("../../../Services/persona/persona.service");
var editar_enfermedades_cronicas_paciente_component_1 = require("./editar-enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente.component");
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
var EnfermedadesCronicasPacienteComponent = /** @class */ (function () {
    function EnfermedadesCronicasPacienteComponent(servicioEnfermedadesCronicasPaciente, servicioEnfermedadCronica, servicioPaciente, servicioPersona, dialog) {
        this.servicioEnfermedadesCronicasPaciente = servicioEnfermedadesCronicasPaciente;
        this.servicioEnfermedadCronica = servicioEnfermedadCronica;
        this.servicioPaciente = servicioPaciente;
        this.servicioPersona = servicioPersona;
        this.dialog = dialog;
        this.displayedColumns = ['Rut Paciente', 'Nombre', 'Enfermedades Cronicas'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalEnfermedadesCronicas = [];
        this.totalEnfermedadesCronicasPaciente = [];
        this.totalPacientes = [];
        this.totalPersonas = [];
        this.arrayEnfermedadesCronicasPaciente = [];
        this.actualizarAtributos();
    }
    EnfermedadesCronicasPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'EnfermedadesCronicasPaciente');
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
    EnfermedadesCronicasPacienteComponent.prototype.isAllSelected = function () {
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
    EnfermedadesCronicasPacienteComponent.prototype.masterToggle = function () {
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
    EnfermedadesCronicasPacienteComponent.prototype.obtenerArrayDeteccion = function (idPaciente, array, total) {
        for (var i = 0; i < total.length; i++) {
            if (total[i].Paciente_id === idPaciente) {
                if (total[i].fechaDeteccion != null) {
                    total[i].fechaTemp = new Date(total[i].fechaDeteccion);
                    total[i].esVerdadero = true;
                }
                else if (total[i].fechaDeteccion == null) {
                    total[i].fechaTemp = null;
                    total[i].esVerdadero = false;
                }
                array.push(total[i]);
            }
        }
    };
    EnfermedadesCronicasPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEnfermedadesCronicas = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioPersona.getPersonas().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalPersonas = todo;
                    _this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(function (data) {
                        var todo = data;
                        todo = todo.data;
                        _this.totalEnfermedadesCronicasPaciente = todo;
                        _this.reemplazarIdPorString();
                        //DATATABLE
                        _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalPacientes);
                        _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'EnfermedadesCronicasPaciente');
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
    EnfermedadesCronicasPacienteComponent.prototype.reemplazarIdPorString = function () {
        var _this = this;
        var _loop_1 = function (i) {
            for (var j = 0; j < this_1.totalEnfermedadesCronicasPaciente.length; j++) {
                if (this_1.totalPacientes[i].id === this_1.totalEnfermedadesCronicasPaciente[j].Paciente_id) {
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
    EnfermedadesCronicasPacienteComponent.prototype.edicionEnfermedadesCronicasPaciente = function (paciente) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(paciente));
        //this.pasarStringId(a);
        this.obtenerArrayDeteccion(a.id, this.arrayEnfermedadesCronicasPaciente, this.totalEnfermedadesCronicasPaciente);
        var dialogRef = this.dialog.open(editar_enfermedades_cronicas_paciente_component_1.EditarEnfermedadesCronicasPacienteComponent, {
            width: '1000px',
            height: '700px',
            data: {
                paciente: a,
                enfermedadesCronicas: this.totalEnfermedadesCronicas,
                arrayEnfermedadesCronicasPaciente: this.arrayEnfermedadesCronicasPaciente,
                servicioEnfermedadCronica: this.servicioEnfermedadCronica,
                servicioEnfermedadesCronicasPaciente: this.servicioEnfermedadesCronicasPaciente
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarAtributos();
            _this.arrayEnfermedadesCronicasPaciente = [];
        });
    };
    //función para mostrar la ficha médica del paciente correspondiente
    EnfermedadesCronicasPacienteComponent.prototype.desplegarFichaPaciente = function (paciente) {
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
    ], EnfermedadesCronicasPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], EnfermedadesCronicasPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EnfermedadesCronicasPacienteComponent.prototype, "filter", void 0);
    EnfermedadesCronicasPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-enfermedades-cronicas-paciente',
            templateUrl: './enfermedades-cronicas-paciente.component.html',
            styleUrls: ['./enfermedades-cronicas-paciente.component.css']
        }),
        __metadata("design:paramtypes", [enfermedades_cronicas_paciente_service_1.EnfermedadesCronicasPacienteService,
            enfermedad_cronica_service_1.EnfermedadCronicaService, paciente_service_1.PacienteService,
            persona_service_1.PersonaService, material_2.MatDialog])
    ], EnfermedadesCronicasPacienteComponent);
    return EnfermedadesCronicasPacienteComponent;
}());
exports.EnfermedadesCronicasPacienteComponent = EnfermedadesCronicasPacienteComponent;
//# sourceMappingURL=enfermedades-cronicas-paciente.component.js.map