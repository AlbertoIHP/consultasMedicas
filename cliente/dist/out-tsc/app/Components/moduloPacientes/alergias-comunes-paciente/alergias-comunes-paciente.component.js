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
var ficha_atencion_component_1 = require("../../moduloAtenciones/ficha-atencion/ficha-atencion.component");
var alergias_comunes_paciente_service_1 = require("../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service");
var alergia_service_1 = require("../../../Services/alergia/alergia.service");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
var persona_service_1 = require("../../../Services/persona/persona.service");
var editar_alergias_comunes_paciente_component_1 = require("./editar-alergias-comunes-paciente/editar-alergias-comunes-paciente.component");
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
var AlergiasComunesPacienteComponent = /** @class */ (function () {
    function AlergiasComunesPacienteComponent(servicioAlergiasComunesPaciente, servicioAlergiaComun, servicioPaciente, servicioPersona, dialog) {
        this.servicioAlergiasComunesPaciente = servicioAlergiasComunesPaciente;
        this.servicioAlergiaComun = servicioAlergiaComun;
        this.servicioPaciente = servicioPaciente;
        this.servicioPersona = servicioPersona;
        this.dialog = dialog;
        this.displayedColumns = ['Rut Paciente', 'Nombre', 'Alergias Comunes'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalAlergiasComunes = [];
        this.totalAlergiasComunesPaciente = [];
        this.totalPacientes = [];
        this.totalPersonas = [];
        this.arrayAlergiasComunesPaciente = [];
        this.actualizarAtributos();
    }
    AlergiasComunesPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'AlergiasComunesPaciente');
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
    AlergiasComunesPacienteComponent.prototype.isAllSelected = function () {
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
    AlergiasComunesPacienteComponent.prototype.masterToggle = function () {
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
    AlergiasComunesPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioAlergiaComun.getAlergias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalAlergiasComunes = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioPersona.getPersonas().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalPersonas = todo;
                    _this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(function (data) {
                        var todo = data;
                        todo = todo.data;
                        _this.totalAlergiasComunesPaciente = todo;
                        _this.reemplazarIdPorString();
                        //DATATABLE
                        _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalPacientes);
                        _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'AlergiasComunesPaciente');
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
    AlergiasComunesPacienteComponent.prototype.reemplazarIdPorString = function () {
        var _this = this;
        var _loop_1 = function (i) {
            for (var j = 0; j < this_1.totalAlergiasComunesPaciente.length; j++) {
                if (this_1.totalPacientes[i].id === this_1.totalAlergiasComunesPaciente[j].Paciente_id) {
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
    AlergiasComunesPacienteComponent.prototype.edicionAlergiasComunesPaciente = function (paciente) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(paciente));
        //this.pasarStringId(a);
        this.obtenerArrayDeteccion(a.id, this.arrayAlergiasComunesPaciente, this.totalAlergiasComunesPaciente);
        console.log(this.arrayAlergiasComunesPaciente);
        var dialogRef = this.dialog.open(editar_alergias_comunes_paciente_component_1.EditarAlergiasComunesPacienteComponent, {
            width: '1000px',
            height: '700px',
            data: {
                paciente: a,
                alergiasComunes: this.totalAlergiasComunes,
                arrayAlergiasComunesPaciente: this.arrayAlergiasComunesPaciente,
                servicioAlergiaComun: this.servicioAlergiaComun,
                servicioAlergiasComunesPaciente: this.servicioAlergiasComunesPaciente
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarAtributos();
            _this.arrayAlergiasComunesPaciente = [];
        });
    };
    //función para mostrar la ficha médica del paciente correspondiente
    AlergiasComunesPacienteComponent.prototype.desplegarFichaPaciente = function (paciente) {
        var a = JSON.parse(JSON.stringify(paciente));
        var dialogRef = this.dialog.open(ficha_atencion_component_1.FichaAtencionComponent, {
            width: '1000px',
            height: '700px',
            data: { paciente: a }
        });
    };
    //función para setear el array con los registros del paciente correspondiente
    AlergiasComunesPacienteComponent.prototype.obtenerArrayDeteccion = function (idPaciente, array, total) {
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
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], AlergiasComunesPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], AlergiasComunesPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], AlergiasComunesPacienteComponent.prototype, "filter", void 0);
    AlergiasComunesPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-alergias-comunes-paciente',
            templateUrl: './alergias-comunes-paciente.component.html',
            styleUrls: ['./alergias-comunes-paciente.component.css']
        }),
        __metadata("design:paramtypes", [alergias_comunes_paciente_service_1.AlergiasComunesPacienteService,
            alergia_service_1.AlergiaService, paciente_service_1.PacienteService,
            persona_service_1.PersonaService, material_2.MatDialog])
    ], AlergiasComunesPacienteComponent);
    return AlergiasComunesPacienteComponent;
}());
exports.AlergiasComunesPacienteComponent = AlergiasComunesPacienteComponent;
//# sourceMappingURL=alergias-comunes-paciente.component.js.map