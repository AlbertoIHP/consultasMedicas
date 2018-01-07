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
var VerHabitosPacienteComponent = /** @class */ (function () {
    function VerHabitosPacienteComponent(servicioHabitosPaciente, servicioHabito, dialog) {
        this.servicioHabitosPaciente = servicioHabitosPaciente;
        this.servicioHabito = servicioHabito;
        this.dialog = dialog;
        this.displayedColumns = ['Habito', 'Estado', 'Fecha inicio'];
        this.selection = new collections_1.SelectionModel(true, []);
    }
    VerHabitosPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalHabitos = [];
        this.totalHabitosPaciente = [];
        this.arrayHabitosPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'VerHabitosPaciente');
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
    VerHabitosPacienteComponent.prototype.isAllSelected = function () {
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
    VerHabitosPacienteComponent.prototype.masterToggle = function () {
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
    VerHabitosPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioHabito.getHabitos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalHabitos = todo;
            _this.servicioHabitosPaciente.getHabitosPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalHabitosPaciente = todo;
                _this.reemplazarIdPorString();
                //DATATABLE
                _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayHabitosPaciente);
                _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'VerHabitosPaciente');
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
    VerHabitosPacienteComponent.prototype.reemplazarIdPorString = function () {
        this.obtenerHabitosPaciente(this.paciente.id);
        for (var i = 0; i < this.totalHabitos.length; i++) {
            for (var j = 0; j < this.arrayHabitosPaciente.length; j++) {
                if (this.totalHabitos[i].id === this.arrayHabitosPaciente[j].Habito_id) {
                    this.arrayHabitosPaciente[j].nombreHabito = this.totalHabitos[i].nombre;
                    break;
                }
            }
        }
    };
    //función para setear el array con los registros del paciente correspondiente
    VerHabitosPacienteComponent.prototype.obtenerHabitosPaciente = function (idPaciente) {
        for (var i = 0; i < this.totalHabitosPaciente.length; i++) {
            if (this.totalHabitosPaciente[i].Paciente_id == idPaciente) {
                this.arrayHabitosPaciente.push(this.totalHabitosPaciente[i]);
            }
            if (this.totalHabitosPaciente[i].fechaInicio != null) {
                this.totalHabitosPaciente[i].esVerdadero = true;
            }
            else if (this.totalHabitosPaciente[i].fechaInicio == null) {
                this.totalHabitosPaciente[i].esVerdadero = false;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VerHabitosPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VerHabitosPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VerHabitosPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VerHabitosPacienteComponent.prototype, "filter", void 0);
    VerHabitosPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-habitos-paciente',
            templateUrl: './ver-habitos-paciente.component.html',
            styleUrls: ['./ver-habitos-paciente.component.css']
        }),
        __metadata("design:paramtypes", [habitos_paciente_service_1.HabitosPacienteService,
            habito_service_1.HabitoService, material_2.MatDialog])
    ], VerHabitosPacienteComponent);
    return VerHabitosPacienteComponent;
}());
exports.VerHabitosPacienteComponent = VerHabitosPacienteComponent;
//# sourceMappingURL=ver-habitos-paciente.component.js.map