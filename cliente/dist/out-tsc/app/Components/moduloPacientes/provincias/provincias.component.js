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
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var router_1 = require("@angular/router");
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
var ProvinciasComponent = /** @class */ (function () {
    function ProvinciasComponent(servicioRegion, servicioProvincia, dialog, router) {
        this.servicioRegion = servicioRegion;
        this.servicioProvincia = servicioProvincia;
        this.dialog = dialog;
        this.router = router;
        this.displayedColumns = ['Acciones', 'Nombre', 'Region'];
        this.selection = new collections_1.SelectionModel(true, []);
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalRegiones = [];
        this.totalProvincias = [];
        this.actualizarRegiones();
        this.actualizarProvincias();
    }
    ProvinciasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Provincia');
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
    ProvinciasComponent.prototype.isAllSelected = function () {
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
    ProvinciasComponent.prototype.masterToggle = function () {
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
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalProvincias);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Provincia');
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
    ProvinciasComponent.prototype.edicionProvincia = function (provincia) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(provincia));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(editarprovincia_component_1.EditarprovinciaComponent, {
            width: '700px',
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
            width: '700px',
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
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ProvinciasComponent.prototype, "sort", void 0);
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
        __metadata("design:paramtypes", [region_service_1.RegionService,
            provincia_service_1.ProvinciaService,
            material_2.MatDialog,
            router_1.Router])
    ], ProvinciasComponent);
    return ProvinciasComponent;
}());
exports.ProvinciasComponent = ProvinciasComponent;
//# sourceMappingURL=provincias.component.js.map