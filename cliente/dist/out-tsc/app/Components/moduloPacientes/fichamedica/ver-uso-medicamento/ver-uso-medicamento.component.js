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
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var datasource_component_1 = require("../../../Globals/datasource.component");
var material_2 = require("@angular/material");
var VerUsoMedicamentoComponent = /** @class */ (function () {
    function VerUsoMedicamentoComponent(servicioUsoMedicamentos, servicioMedicamento, dialog) {
        this.servicioUsoMedicamentos = servicioUsoMedicamentos;
        this.servicioMedicamento = servicioMedicamento;
        this.dialog = dialog;
        this.displayedColumns = ['Medicamento', 'Estado', 'Fecha inicio'];
        this.selection = new collections_1.SelectionModel(true, []);
    }
    VerUsoMedicamentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalMedicamentos = [];
        this.totalUsoMedicamentos = [];
        this.arrayUsoMedicamentos = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'VerUsoMedicamentosPaciente');
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
    VerUsoMedicamentoComponent.prototype.isAllSelected = function () {
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
    VerUsoMedicamentoComponent.prototype.masterToggle = function () {
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
    VerUsoMedicamentoComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicamentos = todo;
            _this.servicioUsoMedicamentos.getUsoMedicamentos().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalUsoMedicamentos = todo;
                _this.reemplazarIdPorString();
                //DATATABLE
                _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayUsoMedicamentos);
                _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'VerUsoMedicamentosPaciente');
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
    };
    VerUsoMedicamentoComponent.prototype.reemplazarIdPorString = function () {
        this.obtenerUsoMedicamentosPaciente(this.paciente.id);
        for (var i = 0; i < this.totalMedicamentos.length; i++) {
            for (var j = 0; j < this.arrayUsoMedicamentos.length; j++) {
                if (this.totalMedicamentos[i].id === this.arrayUsoMedicamentos[j].Medicamento_id) {
                    this.arrayUsoMedicamentos[j].nombreMedicamento = this.totalMedicamentos[i].nombrecomun;
                    break;
                }
            }
        }
    };
    //función para setear el array con los registros del paciente correspondiente
    VerUsoMedicamentoComponent.prototype.obtenerUsoMedicamentosPaciente = function (idPaciente) {
        for (var i = 0; i < this.totalUsoMedicamentos.length; i++) {
            if (this.totalUsoMedicamentos[i].Paciente_id == idPaciente) {
                this.arrayUsoMedicamentos.push(this.totalUsoMedicamentos[i]);
            }
            if (this.totalUsoMedicamentos[i].fechaInicio != null) {
                this.totalUsoMedicamentos[i].esVerdadero = true;
            }
            else if (this.totalUsoMedicamentos[i].fechaInicio == null) {
                this.totalUsoMedicamentos[i].esVerdadero = false;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VerUsoMedicamentoComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VerUsoMedicamentoComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VerUsoMedicamentoComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VerUsoMedicamentoComponent.prototype, "filter", void 0);
    VerUsoMedicamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-uso-medicamento',
            templateUrl: './ver-uso-medicamento.component.html',
            styleUrls: ['./ver-uso-medicamento.component.css']
        }),
        __metadata("design:paramtypes", [uso_medicamento_service_1.UsoMedicamentoService,
            medicamento_service_1.MedicamentoService, material_2.MatDialog])
    ], VerUsoMedicamentoComponent);
    return VerUsoMedicamentoComponent;
}());
exports.VerUsoMedicamentoComponent = VerUsoMedicamentoComponent;
//# sourceMappingURL=ver-uso-medicamento.component.js.map