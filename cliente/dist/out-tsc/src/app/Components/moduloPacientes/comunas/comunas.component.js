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
var comuna_service_1 = require("../../../Services/comuna/comuna.service");
var provincia_service_1 = require("../../../Services/provincia/provincia.service");
var agregarcomuna_component_1 = require("./agregarcomuna/agregarcomuna.component");
var editarcomuna_component_1 = require("./editarcomuna/editarcomuna.component");
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
var ComunasComponent = /** @class */ (function () {
    function ComunasComponent(servicioProvincia, servicioComuna, dialog) {
        this.servicioProvincia = servicioProvincia;
        this.servicioComuna = servicioComuna;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre', 'Provincia'];
        this.buscarPorNombre = false;
        this.totalProvincias = [];
        this.totalComunas = [];
        this.actualizarProvincias();
        this.actualizarComunas();
    }
    ComunasComponent.prototype.actualizarProvincias = function () {
        var _this = this;
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
        });
    };
    ComunasComponent.prototype.actualizarComunas = function () {
        var _this = this;
        this.servicioComuna.getComunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalComunas = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalComunas);
            _this.sourceDatatable = new datasource_component_1.dataTable(_this.bdEstructura, _this.paginator);
            _this.sourcePorNombre = new datasource_component_1.buscadorPorNombre(_this.bdEstructura, 'Comuna');
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
    ComunasComponent.prototype.eliminarComuna = function (comuna) {
        var _this = this;
        this.servicioComuna.deleteComuna(comuna.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarComunas();
        });
    };
    ComunasComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalComunas.length; i++) {
            for (var j = 0; j < this.totalProvincias.length; j++) {
                if (parseInt(this.totalComunas[i].Provincia_id) === this.totalProvincias[j].id) {
                    this.totalComunas[i].Provincia_id = this.totalProvincias[j].nombre;
                    break;
                }
            }
        }
    };
    ComunasComponent.prototype.pasarStringId = function (comuna) {
        for (var i = 0; i < this.totalProvincias.length; i++) {
            if (comuna.Provincia_id === this.totalProvincias[i].nombre) {
                comuna.Provincia_id = this.totalProvincias[i].id;
            }
        }
    };
    ComunasComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    ComunasComponent.prototype.edicionComuna = function (comuna) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(comuna));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(editarcomuna_component_1.EditarcomunaComponent, {
            width: '1000px',
            data: {
                comuna: a,
                provincias: this.totalProvincias,
                servicioProvincia: this.servicioProvincia,
                servicioComuna: this.servicioComuna
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarProvincias();
            _this.actualizarComunas();
        });
    };
    ComunasComponent.prototype.agregacionComuna = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarcomuna_component_1.AgregarcomunaComponent, {
            width: '1000px',
            data: {
                provincias: this.totalProvincias,
                servicioProvincia: this.servicioProvincia
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarProvincias();
            _this.actualizarComunas();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ComunasComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], ComunasComponent.prototype, "filter", void 0);
    ComunasComponent = __decorate([
        core_1.Component({
            selector: 'app-comunas',
            templateUrl: './comunas.component.html',
            styleUrls: ['./comunas.component.css']
        }),
        __metadata("design:paramtypes", [provincia_service_1.ProvinciaService, comuna_service_1.ComunaService, material_2.MatDialog])
    ], ComunasComponent);
    return ComunasComponent;
}());
exports.ComunasComponent = ComunasComponent;
//# sourceMappingURL=comunas.component.js.map