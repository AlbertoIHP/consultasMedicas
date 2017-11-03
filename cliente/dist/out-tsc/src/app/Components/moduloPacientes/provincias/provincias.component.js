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
var provincia_service_1 = require("../../../Services/provincia/provincia.service");
var region_service_1 = require("../../../Services/region/region.service");
var agregarprovincia_component_1 = require("./agregarprovincia/agregarprovincia.component");
var editarprovincia_component_1 = require("./editarprovincia/editarprovincia.component");
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
var ProvinciasComponent = /** @class */ (function () {
    function ProvinciasComponent(servicioRegion, servicioProvincia, dialog) {
        this.servicioRegion = servicioRegion;
        this.servicioProvincia = servicioProvincia;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre', 'Region'];
        this.buscarPorNombre = false;
        this.totalRegiones = [];
        this.totalProvincias = [];
        this.actualizarRegiones();
        this.actualizarProvincias();
    }
    ProvinciasComponent.prototype.actualizarRegiones = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
    };
    ProvinciasComponent.prototype.actualizarProvincias = function () {
        var _this = this;
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
            _this.reemplazarIdPorString();
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalProvincias);
            _this.sourceDatatable = new datasource_component_1.dataTable(_this.bdEstructura, _this.paginator);
            _this.sourcePorNombre = new datasource_component_1.buscadorPorNombre(_this.bdEstructura, 'Provincia');
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
    ProvinciasComponent.prototype.eliminarProvincia = function (provincia) {
        var _this = this;
        this.servicioProvincia.deleteProvincia(provincia.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarProvincias();
        });
    };
    ProvinciasComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalProvincias.length; i++) {
            for (var j = 0; j < this.totalRegiones.length; j++) {
                if (parseInt(this.totalProvincias[i].Region_id) === this.totalRegiones[j].id) {
                    this.totalProvincias[i].Region_id = this.totalRegiones[j].nombre;
                    break;
                }
            }
        }
    };
    ProvinciasComponent.prototype.pasarStringId = function (provincia) {
        for (var i = 0; i < this.totalRegiones.length; i++) {
            if (provincia.Region_id === this.totalRegiones[i].nombre) {
                provincia.Region_id = this.totalRegiones[i].id;
            }
        }
    };
    ProvinciasComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    ProvinciasComponent.prototype.edicionProvincia = function (provincia) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(provincia));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(editarprovincia_component_1.EditarprovinciaComponent, {
            width: '1000px',
            data: {
                provincia: a,
                regiones: this.totalRegiones,
                servicioRegion: this.servicioRegion
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarProvincias();
        });
    };
    ProvinciasComponent.prototype.agregacionProvincia = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarprovincia_component_1.AgregarprovinciaComponent, {
            width: '1000px',
            data: {
                regiones: this.totalRegiones,
                servicioRegion: this.servicioRegion,
                servicioProvincia: this.servicioProvincia
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarProvincias();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ProvinciasComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], ProvinciasComponent.prototype, "filter", void 0);
    ProvinciasComponent = __decorate([
        core_1.Component({
            selector: 'app-provincias',
            templateUrl: './provincias.component.html',
            styleUrls: ['./provincias.component.css']
        }),
        __metadata("design:paramtypes", [region_service_1.RegionService, provincia_service_1.ProvinciaService, material_2.MatDialog])
    ], ProvinciasComponent);
    return ProvinciasComponent;
}());
exports.ProvinciasComponent = ProvinciasComponent;
//# sourceMappingURL=provincias.component.js.map