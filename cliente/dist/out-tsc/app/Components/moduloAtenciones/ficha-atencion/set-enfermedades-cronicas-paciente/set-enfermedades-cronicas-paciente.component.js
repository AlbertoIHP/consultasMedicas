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
var SetEnfermedadesCronicasPacienteComponent = /** @class */ (function () {
    function SetEnfermedadesCronicasPacienteComponent(servicioEnfermedadCronica, servicioEnfermedadesCronicasPaciente, servicioPaciente, dateAdapter) {
        this.servicioEnfermedadCronica = servicioEnfermedadCronica;
        this.servicioEnfermedadesCronicasPaciente = servicioEnfermedadesCronicasPaciente;
        this.servicioPaciente = servicioPaciente;
        this.dateAdapter = dateAdapter;
        this.displayedColumns = ['Medicamento', 'Estado', 'Fecha deteccion'];
        this.selection = new collections_1.SelectionModel(true, []);
        dateAdapter.setLocale('es-MX');
    }
    SetEnfermedadesCronicasPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.arrayEnfermedadesCronicasPaciente = [];
        this.totalPacientes = [];
        this.totalEnfermedadesCronicas = [];
        this.totalEnfermedadesCronicasPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'SetEnfermedadesCronicasPaciente');
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
    SetEnfermedadesCronicasPacienteComponent.prototype.isAllSelected = function () {
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
    SetEnfermedadesCronicasPacienteComponent.prototype.masterToggle = function () {
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
    SetEnfermedadesCronicasPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEnfermedadesCronicas = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalEnfermedadesCronicasPaciente = todo;
                    _this.obtenerArrayDeteccion(_this.paciente.id, _this.arrayEnfermedadesCronicasPaciente, _this.totalEnfermedadesCronicasPaciente);
                    _this.reemplazarIdPorString();
                    //DATATABLE
                    _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayEnfermedadesCronicasPaciente);
                    _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'SetEnfermedadesCronicasPaciente');
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
    SetEnfermedadesCronicasPacienteComponent.prototype.obtenerArrayDeteccion = function (idPaciente, array, total) {
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
    SetEnfermedadesCronicasPacienteComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalEnfermedadesCronicas.length; i++) {
            for (var j = 0; j < this.arrayEnfermedadesCronicasPaciente.length; j++) {
                if (this.totalEnfermedadesCronicas[i].id == this.arrayEnfermedadesCronicasPaciente[j].EnfermedadCronica_id) {
                    this.arrayEnfermedadesCronicasPaciente[j].nombreEnfermedad = this.totalEnfermedadesCronicas[i].nombre;
                }
            }
        }
    };
    SetEnfermedadesCronicasPacienteComponent.prototype.obtenerFecha = function (enfermedadPaciente) {
        if (enfermedadPaciente.esVerdadero) {
            enfermedadPaciente.fechaTemp = new Date();
        }
        else if (enfermedadPaciente.esVerdadero == false) {
            enfermedadPaciente.fechaDeteccion = null;
        }
        this.editarEnfermedadesCronicasPaciente();
    };
    SetEnfermedadesCronicasPacienteComponent.prototype.editarEnfermedadesCronicasPaciente = function () {
        for (var i = 0; i < this.arrayEnfermedadesCronicasPaciente.length; i++) {
            if (this.arrayEnfermedadesCronicasPaciente[i].esVerdadero) {
                this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion = new Date(this.arrayEnfermedadesCronicasPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
            }
            else {
                this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion = null;
            }
            this.servicioEnfermedadesCronicasPaciente.editEnfermedadesCronicasPaciente(this.arrayEnfermedadesCronicasPaciente[i], this.arrayEnfermedadesCronicasPaciente[i].id).subscribe(function (data) {
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SetEnfermedadesCronicasPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], SetEnfermedadesCronicasPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], SetEnfermedadesCronicasPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], SetEnfermedadesCronicasPacienteComponent.prototype, "filter", void 0);
    SetEnfermedadesCronicasPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-set-enfermedades-cronicas-paciente',
            templateUrl: './set-enfermedades-cronicas-paciente.component.html',
            styleUrls: ['./set-enfermedades-cronicas-paciente.component.css'],
            providers: [
                { provide: core_2.LOCALE_ID,
                    useValue: 'es-MX' },
            ],
        }),
        __metadata("design:paramtypes", [enfermedad_cronica_service_1.EnfermedadCronicaService,
            enfermedades_cronicas_paciente_service_1.EnfermedadesCronicasPacienteService,
            paciente_service_1.PacienteService,
            material_1.DateAdapter])
    ], SetEnfermedadesCronicasPacienteComponent);
    return SetEnfermedadesCronicasPacienteComponent;
}());
exports.SetEnfermedadesCronicasPacienteComponent = SetEnfermedadesCronicasPacienteComponent;
//# sourceMappingURL=set-enfermedades-cronicas-paciente.component.js.map