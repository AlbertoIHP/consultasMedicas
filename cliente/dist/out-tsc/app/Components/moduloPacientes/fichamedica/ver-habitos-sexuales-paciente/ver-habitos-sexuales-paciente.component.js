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
var habitos_sexuales_paciente_service_1 = require("../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service");
var habito_sexual_service_1 = require("../../../../Services/habitosexual/habito-sexual.service");
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
var VerHabitosSexualesPacienteComponent = /** @class */ (function () {
    function VerHabitosSexualesPacienteComponent(servicioHabitosSexualesPaciente, servicioHabitoSexual, dialog) {
        this.servicioHabitosSexualesPaciente = servicioHabitosSexualesPaciente;
        this.servicioHabitoSexual = servicioHabitoSexual;
        this.dialog = dialog;
        this.displayedColumns = ['Habito sexual', 'Estado', 'Fecha inicio'];
        this.selection = new collections_1.SelectionModel(true, []);
    }
    VerHabitosSexualesPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalHabitosSexuales = [];
        this.totalHabitosSexualesPaciente = [];
        this.arrayHabitosSexualesPaciente = [];
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'VerHabitosSexualesPaciente');
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
    VerHabitosSexualesPacienteComponent.prototype.isAllSelected = function () {
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
    VerHabitosSexualesPacienteComponent.prototype.masterToggle = function () {
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
    VerHabitosSexualesPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioHabitoSexual.getHabitoSexuales().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalHabitosSexuales = todo;
            _this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalHabitosSexualesPaciente = todo;
                _this.reemplazarIdPorString();
                //DATATABLE
                _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayHabitosSexualesPaciente);
                _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'VerHabitosSexualesPaciente');
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
    VerHabitosSexualesPacienteComponent.prototype.reemplazarIdPorString = function () {
        this.obtenerHabitosSexualesPaciente(this.paciente.id);
        for (var i = 0; i < this.totalHabitosSexuales.length; i++) {
            for (var j = 0; j < this.arrayHabitosSexualesPaciente.length; j++) {
                if (this.totalHabitosSexuales[i].id === this.arrayHabitosSexualesPaciente[j].HabitoSexual_id) {
                    this.arrayHabitosSexualesPaciente[j].nombreHabitoSexual = this.totalHabitosSexuales[i].nombre;
                    break;
                }
            }
        }
    };
    //función para setear el array con los registros del paciente correspondiente
    VerHabitosSexualesPacienteComponent.prototype.obtenerHabitosSexualesPaciente = function (idPaciente) {
        for (var i = 0; i < this.totalHabitosSexualesPaciente.length; i++) {
            if (this.totalHabitosSexualesPaciente[i].Paciente_id == idPaciente) {
                this.arrayHabitosSexualesPaciente.push(this.totalHabitosSexualesPaciente[i]);
            }
            if (this.totalHabitosSexualesPaciente[i].fechaInicio != null) {
                this.totalHabitosSexualesPaciente[i].esVerdadero = true;
            }
            else if (this.totalHabitosSexualesPaciente[i].fechaInicio == null) {
                this.totalHabitosSexualesPaciente[i].esVerdadero = false;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VerHabitosSexualesPacienteComponent.prototype, "paciente", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VerHabitosSexualesPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VerHabitosSexualesPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VerHabitosSexualesPacienteComponent.prototype, "filter", void 0);
    VerHabitosSexualesPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-habitos-sexuales-paciente',
            templateUrl: './ver-habitos-sexuales-paciente.component.html',
            styleUrls: ['./ver-habitos-sexuales-paciente.component.css']
        }),
        __metadata("design:paramtypes", [habitos_sexuales_paciente_service_1.HabitosSexualesPacienteService,
            habito_sexual_service_1.HabitoSexualService, material_2.MatDialog])
    ], VerHabitosSexualesPacienteComponent);
    return VerHabitosSexualesPacienteComponent;
}());
exports.VerHabitosSexualesPacienteComponent = VerHabitosSexualesPacienteComponent;
//# sourceMappingURL=ver-habitos-sexuales-paciente.component.js.map