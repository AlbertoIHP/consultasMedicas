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
var feriado_service_1 = require("../../../Services/feriado/feriado.service");
var editarferiado_component_1 = require("./editarferiado/editarferiado.component");
var agregarferiado_component_1 = require("./agregarferiado/agregarferiado.component");
var router_1 = require("@angular/router");
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
var FeriadosComponent = /** @class */ (function () {
    function FeriadosComponent(servicioFeriado, dialog, router) {
        this.servicioFeriado = servicioFeriado;
        this.dialog = dialog;
        this.router = router;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Fecha', 'Descripcion'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalFeriados = [];
        this.actualizarFeriados();
    }
    FeriadosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Feriado');
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
    FeriadosComponent.prototype.isAllSelected = function () {
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
    FeriadosComponent.prototype.masterToggle = function () {
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
    FeriadosComponent.prototype.actualizarFeriados = function () {
        var _this = this;
        this.servicioFeriado.getFeriados().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalFeriados = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalFeriados);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Feriado');
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
    FeriadosComponent.prototype.eliminarFeriado = function (feriado) {
        var _this = this;
        this.servicioFeriado.deleteFeriado(feriado.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarFeriados();
        });
    };
    FeriadosComponent.prototype.edicionFeriado = function (feriado) {
        var _this = this;
        var dialogRef = this.dialog.open(editarferiado_component_1.EditarferiadoComponent, {
            width: '700px',
            data: {
                feriado: feriado
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarFeriados();
        });
    };
    FeriadosComponent.prototype.agregacionFeriado = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarferiado_component_1.AgregarferiadoComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarFeriados();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], FeriadosComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], FeriadosComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], FeriadosComponent.prototype, "filter", void 0);
    FeriadosComponent = __decorate([
        core_1.Component({
            selector: 'app-feriados',
            templateUrl: './feriados.component.html',
            styleUrls: ['./feriados.component.css']
        }),
        __metadata("design:paramtypes", [feriado_service_1.FeriadoService,
            material_2.MatDialog,
            router_1.Router])
    ], FeriadosComponent);
    return FeriadosComponent;
}());
exports.FeriadosComponent = FeriadosComponent;
//# sourceMappingURL=feriados.component.js.map