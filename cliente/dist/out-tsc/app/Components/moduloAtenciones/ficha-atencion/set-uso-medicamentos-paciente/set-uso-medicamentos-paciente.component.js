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
var uso_medicamento_service_1 = require("../../../../Services/usomedicamento/uso-medicamento.service");
var medicamento_service_1 = require("../../../../Services/medicamento/medicamento.service");
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
var SetUsoMedicamentosPacienteComponent = /** @class */ (function () {
    function SetUsoMedicamentosPacienteComponent(servicioMedicamento, servicioUsoMedicamento, servicioPaciente, dateAdapter) {
        this.servicioMedicamento = servicioMedicamento;
        this.servicioUsoMedicamento = servicioUsoMedicamento;
        this.servicioPaciente = servicioPaciente;
        this.dateAdapter = dateAdapter;
        this.displayedColumns = ['Medicamento', 'Estado', 'Fecha inicio'];
        this.selection = new collections_1.SelectionModel(true, []);
        dateAdapter.setLocale('es-MX');
    }
    SetUsoMedicamentosPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.arrayUsoMedicamentosPaciente = [];
        this.totalPacientes = [];
        this.totalMedicamentos = [];
        this.totalUsoMedicamentosPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'SetUsoMedicamentosPaciente');
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
    SetUsoMedicamentosPacienteComponent.prototype.isAllSelected = function () {
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
    SetUsoMedicamentosPacienteComponent.prototype.masterToggle = function () {
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
    SetUsoMedicamentosPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicamentos = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioUsoMedicamento.getUsoMedicamentos().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalUsoMedicamentosPaciente = todo;
                    _this.obtenerArrayInicio(_this.paciente.id, _this.arrayUsoMedicamentosPaciente, _this.totalUsoMedicamentosPaciente);
                    _this.reemplazarIdPorString();
                    //DATATABLE
                    _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayUsoMedicamentosPaciente);
                    _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'SetUsoMedicamentosPaciente');
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
    SetUsoMedicamentosPacienteComponent.prototype.obtenerArrayInicio = function (idPaciente, array, total) {
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
    SetUsoMedicamentosPacienteComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalMedicamentos.length; i++) {
            for (var j = 0; j < this.arrayUsoMedicamentosPaciente.length; j++) {
                if (this.totalMedicamentos[i].id == this.arrayUsoMedicamentosPaciente[j].Medicamento_id) {
                    this.arrayUsoMedicamentosPaciente[j].nombreMedicamento = this.totalMedicamentos[i].nombrecomun + " / " + this.totalMedicamentos[i].nombrecientifico;
                }
            }
        }
    };
    SetUsoMedicamentosPacienteComponent.prototype.obtenerFecha = function (medicamento) {
        if (medicamento.esVerdadero) {
            medicamento.fechaTemp = new Date();
        }
        else if (medicamento.esVerdadero == false) {
            medicamento.fechaInicio = null;
        }
        this.editarUsoMedicamentosPaciente();
    };
    SetUsoMedicamentosPacienteComponent.prototype.editarUsoMedicamentosPaciente = function () {
        for (var i = 0; i < this.arrayUsoMedicamentosPaciente.length; i++) {
            if (this.arrayUsoMedicamentosPaciente[i].esVerdadero) {
                this.arrayUsoMedicamentosPaciente[i].fechaInicio = new Date(this.arrayUsoMedicamentosPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
            }
            else {
                this.arrayUsoMedicamentosPaciente[i].fechaInicio = null;
            }
            this.servicioUsoMedicamento.editUsoMedicamento(this.arrayUsoMedicamentosPaciente[i], this.arrayUsoMedicamentosPaciente[i].id).subscribe(function (data) {
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SetUsoMedicamentosPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], SetUsoMedicamentosPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], SetUsoMedicamentosPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], SetUsoMedicamentosPacienteComponent.prototype, "filter", void 0);
    SetUsoMedicamentosPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-set-uso-medicamentos-paciente',
            templateUrl: './set-uso-medicamentos-paciente.component.html',
            styleUrls: ['./set-uso-medicamentos-paciente.component.css'],
            providers: [
                { provide: core_2.LOCALE_ID,
                    useValue: 'es-MX' },
            ],
        }),
        __metadata("design:paramtypes", [medicamento_service_1.MedicamentoService,
            uso_medicamento_service_1.UsoMedicamentoService,
            paciente_service_1.PacienteService,
            material_1.DateAdapter])
    ], SetUsoMedicamentosPacienteComponent);
    return SetUsoMedicamentosPacienteComponent;
}());
exports.SetUsoMedicamentosPacienteComponent = SetUsoMedicamentosPacienteComponent;
//# sourceMappingURL=set-uso-medicamentos-paciente.component.js.map