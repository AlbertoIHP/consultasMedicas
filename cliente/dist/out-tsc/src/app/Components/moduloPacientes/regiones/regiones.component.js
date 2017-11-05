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
var region_service_1 = require("../../../Services/region/region.service");
var agregarregiones_component_1 = require("./agregarregiones/agregarregiones.component");
var editarregiones_component_1 = require("./editarregiones/editarregiones.component");
var material_1 = require("@angular/material");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var material_2 = require("@angular/material");
var datasource_component_1 = require("../../Globals/datasource.component");
var RegionesComponent = /** @class */ (function () {
    function RegionesComponent(servicioRegion, dialog) {
        this.servicioRegion = servicioRegion;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.buscarPorNombre = false;
        this.totalRegiones = [];
        this.actualizarRegiones();
    }
    RegionesComponent.prototype.actualizarRegiones = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalRegiones);
            _this.sourceDatatable = new datasource_component_1.dataTable(_this.bdEstructura, _this.paginator);
            _this.sourcePorNombre = new datasource_component_1.buscadorPorNombre(_this.bdEstructura, 'Region');
            Observable_1.Observable.fromEvent(_this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(function () {
                if (!_this.sourcePorNombre) {
                    return;
                }
                _this.sourcePorNombre.filter = _this.filter.nativeElement.value;
            });
        });
    };
    RegionesComponent.prototype.eliminarRegion = function (region) {
        var _this = this;
        this.servicioRegion.deleteRegion(region.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarRegiones();
        });
    };
    RegionesComponent.prototype.edicionRegion = function (region) {
        var _this = this;
        var dialogRef = this.dialog.open(editarregiones_component_1.EditarregionesComponent, {
            width: '1000px',
            data: {
                region: region
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarRegiones();
        });
    };
    RegionesComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    RegionesComponent.prototype.agregacionRegion = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarregiones_component_1.AgregarregionesComponent, {
            width: '1000px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarRegiones();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], RegionesComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], RegionesComponent.prototype, "filter", void 0);
    RegionesComponent = __decorate([
        core_1.Component({
            selector: 'app-regiones',
            templateUrl: './regiones.component.html',
            styleUrls: ['./regiones.component.css']
        }),
        __metadata("design:paramtypes", [region_service_1.RegionService, material_2.MatDialog])
    ], RegionesComponent);
    return RegionesComponent;
}());
exports.RegionesComponent = RegionesComponent;
//# sourceMappingURL=regiones.component.js.map