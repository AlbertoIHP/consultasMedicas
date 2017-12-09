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
var vacunaspaciente_service_1 = require("../../../Services/vacunaspaciente/vacunaspaciente.service");
var vacuna_service_1 = require("../../../Services/vacuna/vacuna.service");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
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
    function VacunasPacienteComponent(servicioVacunasPaciente, servicioVacuna, servicioPaciente, diaglo) {
        this.servicioVacunasPaciente = servicioVacunasPaciente;
        this.servicioVacuna = servicioVacuna;
        this.servicioPaciente = servicioPaciente;
        this.diaglo = diaglo;
        this.displayedColumns = ['Acciones', 'Nombre', 'Provincia'];
        this.selection = new collections_1.SelectionModel(true, []);
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
    VacunasPacienteComponent.prototype.actualizarVacunasPaciente = function () {
        var _this = this;
        this.servicioVacunasPaciente.getVacunasPaciente().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalVacunasPaciente = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalComunas);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Comuna');
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
            paciente_service_1.PacienteService, material_2.MatDialog])
    ], VacunasPacienteComponent);
    return VacunasPacienteComponent;
}());
exports.VacunasPacienteComponent = VacunasPacienteComponent;
//# sourceMappingURL=vacunas-paciente.component.js.map