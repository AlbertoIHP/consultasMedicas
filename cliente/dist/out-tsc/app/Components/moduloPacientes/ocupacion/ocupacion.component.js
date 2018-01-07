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
var ocupacion_service_1 = require("../../../Services/ocupacion/ocupacion.service");
var agregar_ocupacion_component_1 = require("./agregar-ocupacion/agregar-ocupacion.component");
var editar_ocupacion_component_1 = require("./editar-ocupacion/editar-ocupacion.component");
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
var OcupacionComponent = /** @class */ (function () {
    function OcupacionComponent(servicioOcupacion, dialog) {
        this.servicioOcupacion = servicioOcupacion;
        this.dialog = dialog;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalOcupaciones = [];
        this.actualizarOcupaciones();
    }
    OcupacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Ocupacion');
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
    OcupacionComponent.prototype.isAllSelected = function () {
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
    OcupacionComponent.prototype.masterToggle = function () {
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
    OcupacionComponent.prototype.actualizarOcupaciones = function () {
        var _this = this;
        this.servicioOcupacion.getOcupacions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalOcupaciones = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalOcupaciones);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Ocupacion');
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
    OcupacionComponent.prototype.eliminarOcupacion = function (ocupacion) {
        var _this = this;
        this.servicioOcupacion.deleteOcupacion(ocupacion.id).subscribe(function (data) {
            _this.actualizarOcupaciones();
        });
    };
    OcupacionComponent.prototype.edicionOcupacion = function (ocupacion) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_ocupacion_component_1.EditarOcupacionComponent, {
            width: '700px',
            data: {
                ocupacion: ocupacion,
                servicioOcupacion: this.servicioOcupacion
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarOcupaciones();
        });
    };
    OcupacionComponent.prototype.agregacionOcupacion = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_ocupacion_component_1.AgregarOcupacionComponent, {
            width: '700px',
            data: {
                servicioOcupacion: this.servicioOcupacion
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarOcupaciones();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], OcupacionComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], OcupacionComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], OcupacionComponent.prototype, "filter", void 0);
    OcupacionComponent = __decorate([
        core_1.Component({
            selector: 'app-ocupacion',
            templateUrl: './ocupacion.component.html',
            styleUrls: ['./ocupacion.component.css']
        }),
        __metadata("design:paramtypes", [ocupacion_service_1.OcupacionService, material_2.MatDialog])
    ], OcupacionComponent);
    return OcupacionComponent;
}());
exports.OcupacionComponent = OcupacionComponent;
//# sourceMappingURL=ocupacion.component.js.map