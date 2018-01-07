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
var enfermedades_cronicas_paciente_service_1 = require("../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service");
var enfermedad_cronica_service_1 = require("../../../../Services/enfermedadcronica/enfermedad-cronica.service");
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
var VerEnfermedadesCronicasPacienteComponent = /** @class */ (function () {
    function VerEnfermedadesCronicasPacienteComponent(servicioEnfermedadesCronicasPaciente, servicioEnfermedadCronica, dialog) {
        this.servicioEnfermedadesCronicasPaciente = servicioEnfermedadesCronicasPaciente;
        this.servicioEnfermedadCronica = servicioEnfermedadCronica;
        this.dialog = dialog;
        this.displayedColumns = ['Enfermedad', 'Estado', 'Fecha deteccion'];
        this.selection = new collections_1.SelectionModel(true, []);
    }
    VerEnfermedadesCronicasPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalEnfermedadesCronicas = [];
        this.totalEnfermedadesCronicasPaciente = [];
        this.arrayEnfermedadesCronicasPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'VerEnfermedadesCronicasPaciente');
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
    VerEnfermedadesCronicasPacienteComponent.prototype.isAllSelected = function () {
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
    VerEnfermedadesCronicasPacienteComponent.prototype.masterToggle = function () {
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
    VerEnfermedadesCronicasPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEnfermedadesCronicas = todo;
            _this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalEnfermedadesCronicasPaciente = todo;
                _this.reemplazarIdPorString();
                //DATATABLE
                _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayEnfermedadesCronicasPaciente);
                _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'VerEnfermedadesCronicasPaciente');
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
    VerEnfermedadesCronicasPacienteComponent.prototype.reemplazarIdPorString = function () {
        this.obtenerEnfermedadesCronicasPaciente(this.paciente.id);
        for (var i = 0; i < this.totalEnfermedadesCronicas.length; i++) {
            for (var j = 0; j < this.arrayEnfermedadesCronicasPaciente.length; j++) {
                if (this.totalEnfermedadesCronicas[i].id === this.arrayEnfermedadesCronicasPaciente[j].EnfermedadCronica_id) {
                    this.arrayEnfermedadesCronicasPaciente[j].nombreEnfermedad = this.totalEnfermedadesCronicas[i].nombre;
                    break;
                }
            }
        }
    };
    //función para setear el array con los registros del paciente correspondiente
    VerEnfermedadesCronicasPacienteComponent.prototype.obtenerEnfermedadesCronicasPaciente = function (idPaciente) {
        for (var i = 0; i < this.totalEnfermedadesCronicasPaciente.length; i++) {
            if (this.totalEnfermedadesCronicasPaciente[i].Paciente_id == idPaciente) {
                this.arrayEnfermedadesCronicasPaciente.push(this.totalEnfermedadesCronicasPaciente[i]);
            }
            if (this.totalEnfermedadesCronicasPaciente[i].fechaDeteccion != null) {
                this.totalEnfermedadesCronicasPaciente[i].esVerdadero = true;
            }
            else if (this.totalEnfermedadesCronicasPaciente[i].fechaDeteccion == null) {
                this.totalEnfermedadesCronicasPaciente[i].esVerdadero = false;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VerEnfermedadesCronicasPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VerEnfermedadesCronicasPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VerEnfermedadesCronicasPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VerEnfermedadesCronicasPacienteComponent.prototype, "filter", void 0);
    VerEnfermedadesCronicasPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-enfermedades-cronicas-paciente',
            templateUrl: './ver-enfermedades-cronicas-paciente.component.html',
            styleUrls: ['./ver-enfermedades-cronicas-paciente.component.css']
        }),
        __metadata("design:paramtypes", [enfermedades_cronicas_paciente_service_1.EnfermedadesCronicasPacienteService,
            enfermedad_cronica_service_1.EnfermedadCronicaService, material_2.MatDialog])
    ], VerEnfermedadesCronicasPacienteComponent);
    return VerEnfermedadesCronicasPacienteComponent;
}());
exports.VerEnfermedadesCronicasPacienteComponent = VerEnfermedadesCronicasPacienteComponent;
//# sourceMappingURL=ver-enfermedades-cronicas-paciente.component.js.map