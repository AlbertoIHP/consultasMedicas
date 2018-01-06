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
var grupo_etnico_service_1 = require("../../../Services/grupoetnico/grupo-etnico.service");
var agregar_grupo_etnico_component_1 = require("./agregar-grupo-etnico/agregar-grupo-etnico.component");
var editar_grupo_etnico_component_1 = require("./editar-grupo-etnico/editar-grupo-etnico.component");
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
var GrupoEtnicoComponent = /** @class */ (function () {
    function GrupoEtnicoComponent(servicioGrupoEtnico, dialog, router) {
        this.servicioGrupoEtnico = servicioGrupoEtnico;
        this.dialog = dialog;
        this.router = router;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalGrupoEtnicos = [];
        this.actualizarGrupoEtnicos();
    }
    GrupoEtnicoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'GrupoEtnico');
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
    GrupoEtnicoComponent.prototype.isAllSelected = function () {
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
    GrupoEtnicoComponent.prototype.masterToggle = function () {
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
    GrupoEtnicoComponent.prototype.actualizarGrupoEtnicos = function () {
        var _this = this;
        this.servicioGrupoEtnico.getGrupoEtnicos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalGrupoEtnicos = todo;
            console.log(_this.totalGrupoEtnicos);
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalGrupoEtnicos);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'GrupoEtnico');
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
    GrupoEtnicoComponent.prototype.eliminarGrupoEtnico = function (grupoetnico) {
        var _this = this;
        this.servicioGrupoEtnico.deleteGrupoEtnico(grupoetnico.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarGrupoEtnicos();
        });
    };
    GrupoEtnicoComponent.prototype.edicionGrupoEtnico = function (grupoetnico) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_grupo_etnico_component_1.EditarGrupoEtnicoComponent, {
            width: '700px',
            data: {
                grupoetnico: grupoetnico
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarGrupoEtnicos();
        });
    };
    GrupoEtnicoComponent.prototype.agregacionGrupoEtnico = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_grupo_etnico_component_1.AgregarGrupoEtnicoComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarGrupoEtnicos();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], GrupoEtnicoComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], GrupoEtnicoComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], GrupoEtnicoComponent.prototype, "filter", void 0);
    GrupoEtnicoComponent = __decorate([
        core_1.Component({
            selector: 'app-grupo-etnico',
            templateUrl: './grupo-etnico.component.html',
            styleUrls: ['./grupo-etnico.component.css']
        }),
        __metadata("design:paramtypes", [grupo_etnico_service_1.GrupoEtnicoService,
            material_2.MatDialog,
            router_1.Router])
    ], GrupoEtnicoComponent);
    return GrupoEtnicoComponent;
}());
exports.GrupoEtnicoComponent = GrupoEtnicoComponent;
//# sourceMappingURL=grupo-etnico.component.js.map