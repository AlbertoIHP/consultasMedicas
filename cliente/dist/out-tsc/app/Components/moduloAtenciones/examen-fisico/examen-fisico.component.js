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
var examen_fisico_service_1 = require("../../../Services/examenfisico/examen-fisico.service");
var editar_examen_fisico_component_1 = require("./editar-examen-fisico/editar-examen-fisico.component");
var agregar_examen_fisico_component_1 = require("./agregar-examen-fisico/agregar-examen-fisico.component");
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
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
var ExamenFisicoComponent = /** @class */ (function () {
    function ExamenFisicoComponent(servicioExamenFisico, dialog) {
        this.servicioExamenFisico = servicioExamenFisico;
        this.dialog = dialog;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Fecha Examen', 'Peso', 'Estatura'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalExamenesFisicos = [];
        this.actualizarExamanesFisicos();
    }
    ExamenFisicoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'ExamenFisico');
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
    ExamenFisicoComponent.prototype.isAllSelected = function () {
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
    ExamenFisicoComponent.prototype.masterToggle = function () {
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
    ExamenFisicoComponent.prototype.actualizarExamanesFisicos = function () {
        var _this = this;
        this.servicioExamenFisico.getExamenFisicos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalExamenesFisicos = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalExamenesFisicos);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'ExamenFisico');
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
    ExamenFisicoComponent.prototype.eliminarExamenFisico = function (examenFisico) {
        var _this = this;
        this.servicioExamenFisico.deleteExamenFisico(examenFisico.id).subscribe(function (data) {
            _this.actualizarExamanesFisicos();
        });
    };
    ExamenFisicoComponent.prototype.edicionExamenFisico = function (examenFisico) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_examen_fisico_component_1.EditarExamenFisicoComponent, {
            width: '700px',
            height: '500px',
            data: {
                examenFisico: examenFisico,
                servicioExamenFisico: this.servicioExamenFisico
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarExamanesFisicos();
        });
    };
    ExamenFisicoComponent.prototype.agregacionExamenFisico = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_examen_fisico_component_1.AgregarExamenFisicoComponent, {
            width: '700px',
            height: '500px',
            data: {
                servicioExamenFisico: this.servicioExamenFisico
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarExamanesFisicos();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ExamenFisicoComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ExamenFisicoComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], ExamenFisicoComponent.prototype, "filter", void 0);
    ExamenFisicoComponent = __decorate([
        core_1.Component({
            selector: 'app-examen-fisico',
            templateUrl: './examen-fisico.component.html',
            styleUrls: ['./examen-fisico.component.css']
        }),
        __metadata("design:paramtypes", [examen_fisico_service_1.ExamenFisicoService, material_2.MatDialog])
    ], ExamenFisicoComponent);
    return ExamenFisicoComponent;
}());
exports.ExamenFisicoComponent = ExamenFisicoComponent;
//# sourceMappingURL=examen-fisico.component.js.map