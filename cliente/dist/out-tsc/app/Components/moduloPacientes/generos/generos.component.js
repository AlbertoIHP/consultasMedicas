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
var genero_service_1 = require("../../../Services/genero/genero.service");
var agregargenero_component_1 = require("./agregargenero/agregargenero.component");
var editargenero_component_1 = require("./editargenero/editargenero.component");
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
var GenerosComponent = /** @class */ (function () {
    function GenerosComponent(servicioGenero, dialog, router) {
        this.servicioGenero = servicioGenero;
        this.dialog = dialog;
        this.router = router;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalGeneros = [];
        this.actualizarGeneros();
    }
    GenerosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Genero');
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
    GenerosComponent.prototype.isAllSelected = function () {
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
    GenerosComponent.prototype.masterToggle = function () {
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
    GenerosComponent.prototype.actualizarGeneros = function () {
        var _this = this;
        this.servicioGenero.getGeneros().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalGeneros = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalGeneros);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Genero');
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
    GenerosComponent.prototype.eliminarGenero = function (genero) {
        var _this = this;
        this.servicioGenero.deleteGenero(genero.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarGeneros();
        });
    };
    GenerosComponent.prototype.edicionGenero = function (genero) {
        var _this = this;
        var dialogRef = this.dialog.open(editargenero_component_1.EditargeneroComponent, {
            width: '700px',
            data: {
                genero: genero
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarGeneros();
        });
    };
    GenerosComponent.prototype.agregacionGenero = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregargenero_component_1.AgregargeneroComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarGeneros();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], GenerosComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], GenerosComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], GenerosComponent.prototype, "filter", void 0);
    GenerosComponent = __decorate([
        core_1.Component({
            selector: 'app-generos',
            templateUrl: './generos.component.html',
            styleUrls: ['./generos.component.css']
        }),
        __metadata("design:paramtypes", [genero_service_1.GeneroService,
            material_2.MatDialog,
            router_1.Router])
    ], GenerosComponent);
    return GenerosComponent;
}());
exports.GenerosComponent = GenerosComponent;
//# sourceMappingURL=generos.component.js.map