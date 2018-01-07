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
var vacunaspaciente_service_1 = require("../../../../Services/vacunaspaciente/vacunaspaciente.service");
var vacuna_service_1 = require("../../../../Services/vacuna/vacuna.service");
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
var SetVacunasPacienteComponent = /** @class */ (function () {
    function SetVacunasPacienteComponent(servicioVacuna, servicioVacunasPaciente, servicioPaciente, dateAdapter) {
        this.servicioVacuna = servicioVacuna;
        this.servicioVacunasPaciente = servicioVacunasPaciente;
        this.servicioPaciente = servicioPaciente;
        this.dateAdapter = dateAdapter;
        this.displayedColumns = ['Vacuna', 'Estado', 'Fecha vacunacion'];
        this.selection = new collections_1.SelectionModel(true, []);
        dateAdapter.setLocale('es-MX');
    }
    SetVacunasPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.arrayVacunasPaciente = [];
        this.totalPacientes = [];
        this.totalVacunas = [];
        this.totalVacunasPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'SetVacunasPaciente');
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
    SetVacunasPacienteComponent.prototype.isAllSelected = function () {
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
    SetVacunasPacienteComponent.prototype.masterToggle = function () {
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
    SetVacunasPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioVacuna.getVacunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalVacunas = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioVacunasPaciente.getVacunasPaciente().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalVacunasPaciente = todo;
                    _this.obtenerVacunasPaciente(_this.paciente.id);
                    _this.reemplazarIdPorString();
                    //DATATABLE
                    _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayVacunasPaciente);
                    _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'SetVacunasPaciente');
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
    SetVacunasPacienteComponent.prototype.obtenerVacunasPaciente = function (idPaciente) {
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
    SetVacunasPacienteComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalVacunas.length; i++) {
            for (var j = 0; j < this.arrayVacunasPaciente.length; j++) {
                if (this.totalVacunas[i].id == this.arrayVacunasPaciente[j].Vacuna_id) {
                    this.arrayVacunasPaciente[j].nombreVacuna = this.totalVacunas[i].nombre;
                }
            }
        }
    };
    SetVacunasPacienteComponent.prototype.obtenerFecha = function (vacuna) {
        if (vacuna.esVerdadero) {
            vacuna.fechaTemp = new Date();
        }
        else if (vacuna.esVerdadero == false) {
            vacuna.fechaVacunacion = null;
        }
        this.editarVacunasPaciente();
    };
    SetVacunasPacienteComponent.prototype.editarVacunasPaciente = function () {
        for (var i = 0; i < this.arrayVacunasPaciente.length; i++) {
            if (this.arrayVacunasPaciente[i].esVerdadero) {
                this.arrayVacunasPaciente[i].fechaVacunacion = new Date(this.arrayVacunasPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
            }
            else {
                this.arrayVacunasPaciente[i].fechaVacunacion = null;
            }
            this.servicioVacunasPaciente.editVacunaPaciente(this.arrayVacunasPaciente[i], this.arrayVacunasPaciente[i].id).subscribe(function (data) {
                console.log(data);
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SetVacunasPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], SetVacunasPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], SetVacunasPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], SetVacunasPacienteComponent.prototype, "filter", void 0);
    SetVacunasPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-set-vacunas-paciente',
            templateUrl: './set-vacunas-paciente.component.html',
            styleUrls: ['./set-vacunas-paciente.component.css'],
            providers: [
                { provide: core_2.LOCALE_ID,
                    useValue: 'es-MX' },
            ],
        }),
        __metadata("design:paramtypes", [vacuna_service_1.VacunaService,
            vacunaspaciente_service_1.VacunasPacienteService,
            paciente_service_1.PacienteService,
            material_1.DateAdapter])
    ], SetVacunasPacienteComponent);
    return SetVacunasPacienteComponent;
}());
exports.SetVacunasPacienteComponent = SetVacunasPacienteComponent;
//# sourceMappingURL=set-vacunas-paciente.component.js.map