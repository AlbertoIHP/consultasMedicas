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
var habitos_paciente_service_1 = require("../../../../Services/habitospaciente/habitos-paciente.service");
var habito_service_1 = require("../../../../Services/habito/habito.service");
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
var SetHabitosPacienteComponent = /** @class */ (function () {
    function SetHabitosPacienteComponent(servicioHabito, servicioHabitosPaciente, servicioPaciente, dateAdapter) {
        this.servicioHabito = servicioHabito;
        this.servicioHabitosPaciente = servicioHabitosPaciente;
        this.servicioPaciente = servicioPaciente;
        this.dateAdapter = dateAdapter;
        this.displayedColumns = ['Habito', 'Estado', 'Fecha inicio'];
        this.selection = new collections_1.SelectionModel(true, []);
        dateAdapter.setLocale('es-MX');
    }
    SetHabitosPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.arrayHabitosPaciente = [];
        this.totalPacientes = [];
        this.totalHabitos = [];
        this.totalHabitosPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'SetHabitosPaciente');
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
    SetHabitosPacienteComponent.prototype.isAllSelected = function () {
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
    SetHabitosPacienteComponent.prototype.masterToggle = function () {
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
    SetHabitosPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioHabito.getHabitos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalHabitos = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioHabitosPaciente.getHabitosPacientes().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalHabitosPaciente = todo;
                    _this.obtenerArrayInicio(_this.paciente.id, _this.arrayHabitosPaciente, _this.totalHabitosPaciente);
                    _this.reemplazarIdPorString();
                    //DATATABLE
                    _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayHabitosPaciente);
                    _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'SetHabitosPaciente');
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
    SetHabitosPacienteComponent.prototype.obtenerArrayInicio = function (idPaciente, array, total) {
        for (var i = 0; i < total.length; i++) {
            if (total[i].Paciente_id === idPaciente) {
                if (total[i].fechaInicio != null) {
                    total[i].fechaTemp = new Date(total[i].fechaInicio);
                    total[i].esVerdadero = true;
                }
                else if (total[i].fechaInicio == null) {
                    total[i].fechaTemp = null;
                    total[i].esVerdadero = false;
                }
                array.push(total[i]);
            }
        }
    };
    SetHabitosPacienteComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalHabitos.length; i++) {
            for (var j = 0; j < this.arrayHabitosPaciente.length; j++) {
                if (this.totalHabitos[i].id == this.arrayHabitosPaciente[j].Habito_id) {
                    this.arrayHabitosPaciente[j].nombreHabito = this.totalHabitos[i].nombre;
                }
            }
        }
    };
    SetHabitosPacienteComponent.prototype.obtenerFecha = function (habitoPaciente) {
        if (habitoPaciente.esVerdadero) {
            habitoPaciente.fechaTemp = new Date();
        }
        else if (habitoPaciente.esVerdadero == false) {
            habitoPaciente.fechaInicio = null;
        }
        this.editarHabitosPaciente();
    };
    SetHabitosPacienteComponent.prototype.editarHabitosPaciente = function () {
        for (var i = 0; i < this.arrayHabitosPaciente.length; i++) {
            if (this.arrayHabitosPaciente[i].esVerdadero) {
                this.arrayHabitosPaciente[i].fechaInicio = new Date(this.arrayHabitosPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
            }
            else {
                this.arrayHabitosPaciente[i].fechaInicio = null;
            }
            this.servicioHabitosPaciente.editHabitosPaciente(this.arrayHabitosPaciente[i], this.arrayHabitosPaciente[i].id).subscribe(function (data) {
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SetHabitosPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], SetHabitosPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], SetHabitosPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], SetHabitosPacienteComponent.prototype, "filter", void 0);
    SetHabitosPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-set-habitos-paciente',
            templateUrl: './set-habitos-paciente.component.html',
            styleUrls: ['./set-habitos-paciente.component.css'],
            providers: [
                { provide: core_2.LOCALE_ID,
                    useValue: 'es-MX' },
            ],
        }),
        __metadata("design:paramtypes", [habito_service_1.HabitoService,
            habitos_paciente_service_1.HabitosPacienteService,
            paciente_service_1.PacienteService,
            material_1.DateAdapter])
    ], SetHabitosPacienteComponent);
    return SetHabitosPacienteComponent;
}());
exports.SetHabitosPacienteComponent = SetHabitosPacienteComponent;
//# sourceMappingURL=set-habitos-paciente.component.js.map