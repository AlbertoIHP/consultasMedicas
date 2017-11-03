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
var estadocivil_service_1 = require("../../../Services/estadocivil/estadocivil.service");
var editar_estado_c_component_1 = require("./editar-estado-c/editar-estado-c.component");
var agregar_estado_c_component_1 = require("./agregar-estado-c/agregar-estado-c.component");
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
var EstadocivilComponent = /** @class */ (function () {
    function EstadocivilComponent(servicioEstadoCivil, dialog) {
        this.servicioEstadoCivil = servicioEstadoCivil;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
        this.buscarPorNombre = false;
        this.totalEstadoCiviles = [];
        this.actualizarEstadoCiviles();
    }
    EstadocivilComponent.prototype.actualizarEstadoCiviles = function () {
        var _this = this;
        this.servicioEstadoCivil.getEstadoCivils().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEstadoCiviles = todo;
            //DATATABLE
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalEstadoCiviles);
            _this.sourceDatatable = new datasource_component_1.dataTable(_this.bdEstructura, _this.paginator);
            _this.sourcePorNombre = new datasource_component_1.buscadorPorNombre(_this.bdEstructura, 'EC');
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
    EstadocivilComponent.prototype.eliminarEstadoCivil = function (ec) {
        var _this = this;
        this.servicioEstadoCivil.deleteEstadoCivil(ec.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarEstadoCiviles();
        });
    };
    EstadocivilComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    EstadocivilComponent.prototype.edicionEC = function (ec) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_estado_c_component_1.EditarEstadoCComponent, {
            width: '1000px',
            data: {
                ec: ec
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEstadoCiviles();
        });
    };
    EstadocivilComponent.prototype.agregacionEC = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_estado_c_component_1.AgregarEstadoCComponent, {
            width: '1000px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEstadoCiviles();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], EstadocivilComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EstadocivilComponent.prototype, "filter", void 0);
    EstadocivilComponent = __decorate([
        core_1.Component({
            selector: 'app-estadocivil',
            templateUrl: './estadocivil.component.html',
            styleUrls: ['./estadocivil.component.css']
        }),
        __metadata("design:paramtypes", [estadocivil_service_1.EstadocivilService, material_2.MatDialog])
    ], EstadocivilComponent);
    return EstadocivilComponent;
}());
exports.EstadocivilComponent = EstadocivilComponent;
//# sourceMappingURL=estadocivil.component.js.map