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
var alergias_medicamentos_paciente_service_1 = require("../../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service");
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
var VerAlergiasMedicamentosPacienteComponent = /** @class */ (function () {
    function VerAlergiasMedicamentosPacienteComponent(servicioAlergiasMedicamentosPaciente, servicioMedicamento, dialog) {
        this.servicioAlergiasMedicamentosPaciente = servicioAlergiasMedicamentosPaciente;
        this.servicioMedicamento = servicioMedicamento;
        this.dialog = dialog;
        this.displayedColumns = ['Medicamento', 'Estado', 'Fecha inicio'];
        this.selection = new collections_1.SelectionModel(true, []);
    }
    VerAlergiasMedicamentosPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalMedicamentos = [];
        this.totalAlergiasMedicamentosPaciente = [];
        this.arrayAlergiasMedicamentosPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'VerAlergiasMedicamentosPaciente');
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
    VerAlergiasMedicamentosPacienteComponent.prototype.isAllSelected = function () {
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
    VerAlergiasMedicamentosPacienteComponent.prototype.masterToggle = function () {
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
    VerAlergiasMedicamentosPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicamentos = todo;
            _this.servicioAlergiasMedicamentosPaciente.getAlergiasMedicamentosPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalAlergiasMedicamentosPaciente = todo;
                _this.reemplazarIdPorString();
                //DATATABLE
                _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayAlergiasMedicamentosPaciente);
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
    VerAlergiasMedicamentosPacienteComponent.prototype.reemplazarIdPorString = function () {
        this.obtenerAlergiasMedicamentosPaciente(this.paciente.id);
        for (var i = 0; i < this.totalMedicamentos.length; i++) {
            for (var j = 0; j < this.arrayAlergiasMedicamentosPaciente.length; j++) {
                if (this.totalMedicamentos[i].id === this.arrayAlergiasMedicamentosPaciente[j].Medicamento_id) {
                    this.arrayAlergiasMedicamentosPaciente[j].nombreMedicamento = this.totalMedicamentos[i].nombrecomun;
                    break;
                }
            }
        }
    };
    //función para setear el array con los registros del paciente correspondiente
    VerAlergiasMedicamentosPacienteComponent.prototype.obtenerAlergiasMedicamentosPaciente = function (idPaciente) {
        for (var i = 0; i < this.totalAlergiasMedicamentosPaciente.length; i++) {
            if (this.totalAlergiasMedicamentosPaciente[i].Paciente_id == idPaciente) {
                this.arrayAlergiasMedicamentosPaciente.push(this.totalAlergiasMedicamentosPaciente[i]);
            }
            if (this.totalAlergiasMedicamentosPaciente[i].fechaInicio != null) {
                this.totalAlergiasMedicamentosPaciente[i].esVerdadero = true;
            }
            else if (this.totalAlergiasMedicamentosPaciente[i].fechaInicio == null) {
                this.totalAlergiasMedicamentosPaciente[i].esVerdadero = false;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VerAlergiasMedicamentosPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VerAlergiasMedicamentosPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VerAlergiasMedicamentosPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VerAlergiasMedicamentosPacienteComponent.prototype, "filter", void 0);
    VerAlergiasMedicamentosPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-alergias-medicamentos-paciente',
            templateUrl: './ver-alergias-medicamentos-paciente.component.html',
            styleUrls: ['./ver-alergias-medicamentos-paciente.component.css']
        }),
        __metadata("design:paramtypes", [alergias_medicamentos_paciente_service_1.AlergiasMedicamentosPacienteService,
            medicamento_service_1.MedicamentoService, material_2.MatDialog])
    ], VerAlergiasMedicamentosPacienteComponent);
    return VerAlergiasMedicamentosPacienteComponent;
}());
exports.VerAlergiasMedicamentosPacienteComponent = VerAlergiasMedicamentosPacienteComponent;
//# sourceMappingURL=ver-alergias-medicamentos-paciente.component.js.map