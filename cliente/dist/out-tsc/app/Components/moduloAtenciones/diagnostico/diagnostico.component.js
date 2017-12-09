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
var diagnostico_service_1 = require("../../../Services/diagnostico/diagnostico.service");
var agregar_diagnostico_component_1 = require("./agregar-diagnostico/agregar-diagnostico.component");
var editar_diagnostico_component_1 = require("./editar-diagnostico/editar-diagnostico.component");
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
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var DiagnosticoComponent = /** @class */ (function () {
    function DiagnosticoComponent(servicioDiagnostico, dialog) {
        this.servicioDiagnostico = servicioDiagnostico;
        this.dialog = dialog;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Diagnostico'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalDiagnosticos = [];
        this.actualizarDiagnosticos();
    }
    DiagnosticoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Diagnostico');
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
    DiagnosticoComponent.prototype.isAllSelected = function () {
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
    DiagnosticoComponent.prototype.masterToggle = function () {
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
    DiagnosticoComponent.prototype.actualizarDiagnosticos = function () {
        var _this = this;
        this.servicioDiagnostico.getDiagnosticos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalDiagnosticos = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalDiagnosticos);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Diagnostico');
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
    DiagnosticoComponent.prototype.eliminarDiagnostico = function (diagnostico) {
        var _this = this;
        this.servicioDiagnostico.deleteDiagnostico(diagnostico.id).subscribe(function (data) {
            _this.actualizarDiagnosticos();
        });
    };
    DiagnosticoComponent.prototype.edicionDiagnostico = function (diagnostico) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_diagnostico_component_1.EditarDiagnosticoComponent, {
            width: '700px',
            data: {
                diagnostico: diagnostico
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarDiagnosticos();
        });
    };
    DiagnosticoComponent.prototype.agregacionDiagnostico = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_diagnostico_component_1.AgregarDiagnosticoComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarDiagnosticos();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], DiagnosticoComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], DiagnosticoComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], DiagnosticoComponent.prototype, "filter", void 0);
    DiagnosticoComponent = __decorate([
        core_1.Component({
            selector: 'app-diagnostico',
            templateUrl: './diagnostico.component.html',
            styleUrls: ['./diagnostico.component.css']
        }),
        __metadata("design:paramtypes", [diagnostico_service_1.DiagnosticoService, material_2.MatDialog])
    ], DiagnosticoComponent);
    return DiagnosticoComponent;
}());
exports.DiagnosticoComponent = DiagnosticoComponent;
//# sourceMappingURL=diagnostico.component.js.map