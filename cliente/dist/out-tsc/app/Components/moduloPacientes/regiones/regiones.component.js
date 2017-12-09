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
var RegionesComponent = /** @class */ (function () {
    function RegionesComponent(servicioRegion, dialog, router) {
        this.servicioRegion = servicioRegion;
        this.dialog = dialog;
        this.router = router;
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.selection = new collections_1.SelectionModel(true, []);
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalRegiones = [];
        this.actualizarRegiones();
    }
    RegionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Region');
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
    RegionesComponent.prototype.isAllSelected = function () {
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
    RegionesComponent.prototype.masterToggle = function () {
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
    RegionesComponent.prototype.actualizarRegiones = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalRegiones);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Region');
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
            width: '700px',
            data: {
                region: region
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarRegiones();
        });
    };
    RegionesComponent.prototype.agregacionRegion = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarregiones_component_1.AgregarregionesComponent, {
            width: '700px'
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
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], RegionesComponent.prototype, "sort", void 0);
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
        __metadata("design:paramtypes", [region_service_1.RegionService,
            material_2.MatDialog,
            router_1.Router])
    ], RegionesComponent);
    return RegionesComponent;
}());
exports.RegionesComponent = RegionesComponent;
//# sourceMappingURL=regiones.component.js.map