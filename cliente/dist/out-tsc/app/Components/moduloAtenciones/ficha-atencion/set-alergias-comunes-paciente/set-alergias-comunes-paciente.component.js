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
var alergias_comunes_paciente_service_1 = require("../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service");
var alergia_service_1 = require("../../../../Services/alergia/alergia.service");
var paciente_service_1 = require("../../../../Services/paciente/paciente.service");
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var datasource_component_1 = require("../../../Globals/datasource.component");
var SetAlergiasComunesPacienteComponent = /** @class */ (function () {
    function SetAlergiasComunesPacienteComponent(servicioAlergiaComun, servicioAlergiasComunesPaciente, servicioPaciente, dateAdapter) {
        this.servicioAlergiaComun = servicioAlergiaComun;
        this.servicioAlergiasComunesPaciente = servicioAlergiasComunesPaciente;
        this.servicioPaciente = servicioPaciente;
        this.dateAdapter = dateAdapter;
        this.displayedColumns = ['Alergias', 'Estado', 'Fecha deteccion'];
        this.selection = new collections_1.SelectionModel(true, []);
        dateAdapter.setLocale('es-MX');
    }
    SetAlergiasComunesPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.arrayAlergiasComunesPaciente = [];
        this.totalPacientes = [];
        this.totalAlergiasComunes = [];
        this.totalAlergiasComunesPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'SetAlergiasComunesPaciente');
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
    SetAlergiasComunesPacienteComponent.prototype.isAllSelected = function () {
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
    SetAlergiasComunesPacienteComponent.prototype.masterToggle = function () {
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
    SetAlergiasComunesPacienteComponent.prototype.obtenerArrayDeteccion = function (idPaciente, array, total) {
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
    SetAlergiasComunesPacienteComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalAlergiasComunes.length; i++) {
            for (var j = 0; j < this.arrayAlergiasComunesPaciente.length; j++) {
                if (this.totalAlergiasComunes[i].id == this.arrayAlergiasComunesPaciente[j].Alergia_id) {
                    this.arrayAlergiasComunesPaciente[j].nombreAlergia = this.totalAlergiasComunes[i].nombre;
                }
            }
        }
    };
    SetAlergiasComunesPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioAlergiaComun.getAlergias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalAlergiasComunes = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalAlergiasComunesPaciente = todo;
                    _this.obtenerArrayDeteccion(_this.paciente.id, _this.arrayAlergiasComunesPaciente, _this.totalAlergiasComunesPaciente);
                    _this.reemplazarIdPorString();
                    //DATATABLE
                    _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayAlergiasComunesPaciente);
                    _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'SetAlergiasComunesPaciente');
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
    };
    SetAlergiasComunesPacienteComponent.prototype.obtenerFecha = function (alergiaPaciente) {
        if (alergiaPaciente.esVerdadero) {
            alergiaPaciente.fechaTemp = new Date();
        }
        else if (alergiaPaciente.esVerdadero == false) {
            alergiaPaciente.fechaDeteccion = null;
        }
        this.editarAlergiasComunesPaciente();
    };
    SetAlergiasComunesPacienteComponent.prototype.editarAlergiasComunesPaciente = function () {
        for (var i = 0; i < this.arrayAlergiasComunesPaciente.length; i++) {
            if (this.arrayAlergiasComunesPaciente[i].esVerdadero) {
                this.arrayAlergiasComunesPaciente[i].fechaDeteccion = new Date(this.arrayAlergiasComunesPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
            }
            else {
                this.arrayAlergiasComunesPaciente[i].fechaDeteccion = null;
            }
            this.servicioAlergiasComunesPaciente.editAlergiasComunesPaciente(this.arrayAlergiasComunesPaciente[i], this.arrayAlergiasComunesPaciente[i].id).subscribe(function (data) {
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SetAlergiasComunesPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], SetAlergiasComunesPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], SetAlergiasComunesPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], SetAlergiasComunesPacienteComponent.prototype, "filter", void 0);
    SetAlergiasComunesPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-set-alergias-comunes-paciente',
            templateUrl: './set-alergias-comunes-paciente.component.html',
            styleUrls: ['./set-alergias-comunes-paciente.component.css'],
            providers: [
                { provide: core_2.LOCALE_ID, useValue: 'es-MX' },
            ],
        }),
        __metadata("design:paramtypes", [alergia_service_1.AlergiaService,
            alergias_comunes_paciente_service_1.AlergiasComunesPacienteService,
            paciente_service_1.PacienteService,
            material_1.DateAdapter])
    ], SetAlergiasComunesPacienteComponent);
    return SetAlergiasComunesPacienteComponent;
}());
exports.SetAlergiasComunesPacienteComponent = SetAlergiasComunesPacienteComponent;
//# sourceMappingURL=set-alergias-comunes-paciente.component.js.map