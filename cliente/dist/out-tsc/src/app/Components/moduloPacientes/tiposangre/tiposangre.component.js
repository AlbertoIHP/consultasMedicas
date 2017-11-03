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
var TipoSangre_model_1 = require("../../../Models/TipoSangre.model");
var tiposangre_service_1 = require("../../../Services/tiposangre/tiposangre.service");
var agregartipo_component_1 = require("./agregartipo/agregartipo.component");
var editartipo_component_1 = require("./editartipo/editartipo.component");
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
var TiposangreComponent = /** @class */ (function () {
    function TiposangreComponent(servicioTS, dialog) {
        this.servicioTS = servicioTS;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
        this.buscarPorNombre = false;
        this.totalTS = [];
        this.actualizarTSs();
    }
    TiposangreComponent.prototype.ngOnInit = function () {
    };
    TiposangreComponent.prototype.actualizarTSs = function () {
        var _this = this;
        this.servicioTS.getTipoSangres().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalTS = todo;
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalTS);
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
    TiposangreComponent.prototype.eliminarTS = function (ts) {
        var _this = this;
        this.servicioTS.deleteTipoSangre(ts.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarTSs();
        });
    };
    TiposangreComponent.prototype.edicionTS = function (ts) {
        var _this = this;
        var dialogRef = this.dialog.open(editartipo_component_1.EditartipoComponent, {
            width: '1000px',
            data: {
                ts: ts,
                servicioTS: this.servicioTS
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarTSs();
        });
    };
    TiposangreComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    TiposangreComponent.prototype.agregacionTS = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregartipo_component_1.AgregartipoComponent, {
            width: '1000px',
            data: {
                ts: new TipoSangre_model_1.TipoSangre(),
                servicioTS: this.servicioTS
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarTSs();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], TiposangreComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], TiposangreComponent.prototype, "filter", void 0);
    TiposangreComponent = __decorate([
        core_1.Component({
            selector: 'app-tiposangre',
            templateUrl: './tiposangre.component.html',
            styleUrls: ['./tiposangre.component.css']
        }),
        __metadata("design:paramtypes", [tiposangre_service_1.TipoSangreService, material_2.MatDialog])
    ], TiposangreComponent);
    return TiposangreComponent;
}());
exports.TiposangreComponent = TiposangreComponent;
//# sourceMappingURL=tiposangre.component.js.map