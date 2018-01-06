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
var medicamento_service_1 = require("../../../Services/medicamento/medicamento.service");
var uso_medicamento_service_1 = require("../../../Services/usomedicamento/uso-medicamento.service");
var alergias_medicamentos_paciente_service_1 = require("../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service");
var agregar_medicamento_component_1 = require("./agregar-medicamento/agregar-medicamento.component");
var editar_medicamento_component_1 = require("./editar-medicamento/editar-medicamento.component");
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
var MedicamentoComponent = /** @class */ (function () {
    function MedicamentoComponent(servicioMedicamento, servicioUsoMedicamento, servicioAlergiasMedicamentosPaciente, dialog) {
        this.servicioMedicamento = servicioMedicamento;
        this.servicioUsoMedicamento = servicioUsoMedicamento;
        this.servicioAlergiasMedicamentosPaciente = servicioAlergiasMedicamentosPaciente;
        this.dialog = dialog;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre Comun', 'Nombre Cientifico'];
        this.totalMedicamentos = [];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.actualizarMedicamentos();
    }
    MedicamentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Medicamento');
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
    MedicamentoComponent.prototype.isAllSelected = function () {
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
    MedicamentoComponent.prototype.masterToggle = function () {
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
    MedicamentoComponent.prototype.actualizarMedicamentos = function () {
        var _this = this;
        this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicamentos = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalMedicamentos);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Medicamento');
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
    //se eliminará tanto el registro de alergias medicamentos paciente como uso medicamento, antes de medicamento
    MedicamentoComponent.prototype.eliminarMedicamento = function (medicamento) {
        var _this = this;
        this.servicioAlergiasMedicamentosPaciente.getAlergiasMedicamentosPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            var totalAlergiasMedicamentosPaciente = todo;
            for (var i = 0; i < totalAlergiasMedicamentosPaciente.length; i++) {
                if (totalAlergiasMedicamentosPaciente[i].Medicamento_id === medicamento.id) {
                    _this.servicioAlergiasMedicamentosPaciente.deleteAlergiasMedicamentosPaciente(totalAlergiasMedicamentosPaciente[i].id).subscribe(function (data) {
                    });
                }
            }
            _this.servicioUsoMedicamento.getUsoMedicamentos().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                var totalUsoMedicamentos = todo;
                for (var i = 0; i < totalUsoMedicamentos.length; i++) {
                    if (totalUsoMedicamentos[i].Medicamento_id === medicamento.id) {
                        _this.servicioUsoMedicamento.deleteUsoMedicamento(totalUsoMedicamentos[i].id).subscribe(function (data) {
                        });
                    }
                }
                _this.servicioMedicamento.deleteMedicamento(medicamento.id).subscribe(function (data) {
                    console.log(data);
                    _this.actualizarMedicamentos();
                });
            });
        });
    };
    MedicamentoComponent.prototype.edicionMedicamento = function (medicamento) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_medicamento_component_1.EditarMedicamentoComponent, {
            width: '700px',
            data: {
                medicamento: medicamento,
                servicioMedicamento: this.servicioMedicamento
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarMedicamentos();
        });
    };
    MedicamentoComponent.prototype.agregacionMedicamento = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_medicamento_component_1.AgregarMedicamentoComponent, {
            width: '700px',
            data: {
                servicioMedicamento: this.servicioMedicamento
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarMedicamentos();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], MedicamentoComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], MedicamentoComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], MedicamentoComponent.prototype, "filter", void 0);
    MedicamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-medicamento',
            templateUrl: './medicamento.component.html',
            styleUrls: ['./medicamento.component.css']
        }),
        __metadata("design:paramtypes", [medicamento_service_1.MedicamentoService,
            uso_medicamento_service_1.UsoMedicamentoService,
            alergias_medicamentos_paciente_service_1.AlergiasMedicamentosPacienteService,
            material_2.MatDialog])
    ], MedicamentoComponent);
    return MedicamentoComponent;
}());
exports.MedicamentoComponent = MedicamentoComponent;
//# sourceMappingURL=medicamento.component.js.map