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
var alergias_comunes_paciente_service_1 = require("../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service");
var alergia_service_1 = require("../../../../Services/alergia/alergia.service");
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
var VerAlergiasComunesPacienteComponent = /** @class */ (function () {
    function VerAlergiasComunesPacienteComponent(servicioAlergiasComunesPaciente, servicioAlergiaComun, dialog) {
        this.servicioAlergiasComunesPaciente = servicioAlergiasComunesPaciente;
        this.servicioAlergiaComun = servicioAlergiaComun;
        this.dialog = dialog;
        this.displayedColumns = ['Alergias', 'Estado', 'Fecha deteccion'];
        this.selection = new collections_1.SelectionModel(true, []);
    }
    VerAlergiasComunesPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalAlergiasComunes = [];
        this.totalAlergiasComunesPaciente = [];
        this.arrayAlergiasComunesPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'VerAlergiasComunesPaciente');
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
    VerAlergiasComunesPacienteComponent.prototype.isAllSelected = function () {
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
    VerAlergiasComunesPacienteComponent.prototype.masterToggle = function () {
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
    VerAlergiasComunesPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioAlergiaComun.getAlergias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalAlergiasComunes = todo;
            _this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalAlergiasComunesPaciente = todo;
                _this.reemplazarIdPorString();
                //DATATABLE
                _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayAlergiasComunesPaciente);
                _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'VerAlergiasComunesPaciente');
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
    VerAlergiasComunesPacienteComponent.prototype.reemplazarIdPorString = function () {
        this.obtenerAlergiasComunesPaciente(this.paciente.id);
        for (var i = 0; i < this.totalAlergiasComunes.length; i++) {
            for (var j = 0; j < this.arrayAlergiasComunesPaciente.length; j++) {
                if (this.totalAlergiasComunes[i].id === this.arrayAlergiasComunesPaciente[j].Alergia_id) {
                    this.arrayAlergiasComunesPaciente[j].nombreAlergia = this.totalAlergiasComunes[i].nombre;
                    break;
                }
            }
        }
    };
    //función para setear el array con los registros del paciente correspondiente
    VerAlergiasComunesPacienteComponent.prototype.obtenerAlergiasComunesPaciente = function (idPaciente) {
        for (var i = 0; i < this.totalAlergiasComunesPaciente.length; i++) {
            if (this.totalAlergiasComunesPaciente[i].Paciente_id == idPaciente) {
                this.arrayAlergiasComunesPaciente.push(this.totalAlergiasComunesPaciente[i]);
            }
            if (this.totalAlergiasComunesPaciente[i].fechaDeteccion != null) {
                this.totalAlergiasComunesPaciente[i].esVerdadero = true;
            }
            else if (this.totalAlergiasComunesPaciente[i].fechaDeteccion == null) {
                this.totalAlergiasComunesPaciente[i].esVerdadero = false;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VerAlergiasComunesPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VerAlergiasComunesPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VerAlergiasComunesPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VerAlergiasComunesPacienteComponent.prototype, "filter", void 0);
    VerAlergiasComunesPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-alergias-comunes-paciente',
            templateUrl: './ver-alergias-comunes-paciente.component.html',
            styleUrls: ['./ver-alergias-comunes-paciente.component.css']
        }),
        __metadata("design:paramtypes", [alergias_comunes_paciente_service_1.AlergiasComunesPacienteService,
            alergia_service_1.AlergiaService, material_2.MatDialog])
    ], VerAlergiasComunesPacienteComponent);
    return VerAlergiasComunesPacienteComponent;
}());
exports.VerAlergiasComunesPacienteComponent = VerAlergiasComunesPacienteComponent;
//# sourceMappingURL=ver-alergias-comunes-paciente.component.js.map