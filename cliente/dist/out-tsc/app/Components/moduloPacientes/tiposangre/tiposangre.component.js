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
var TiposangreComponent = /** @class */ (function () {
    function TiposangreComponent(servicioTS, dialog, router) {
        this.servicioTS = servicioTS;
        this.dialog = dialog;
        this.router = router;
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
        this.selection = new collections_1.SelectionModel(true, []);
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalTS = [];
        this.actualizarTSs();
    }
    TiposangreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'TS');
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
    TiposangreComponent.prototype.isAllSelected = function () {
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
    TiposangreComponent.prototype.masterToggle = function () {
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
    TiposangreComponent.prototype.actualizarTSs = function () {
        var _this = this;
        this.servicioTS.getTipoSangres().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalTS = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalTS);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'TS');
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
            width: '700px',
            data: {
                ts: ts,
                servicioTS: this.servicioTS
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarTSs();
        });
    };
    TiposangreComponent.prototype.agregacionTS = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregartipo_component_1.AgregartipoComponent, {
            width: '700px',
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
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], TiposangreComponent.prototype, "sort", void 0);
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
        __metadata("design:paramtypes", [tiposangre_service_1.TipoSangreService,
            material_2.MatDialog,
            router_1.Router])
    ], TiposangreComponent);
    return TiposangreComponent;
}());
exports.TiposangreComponent = TiposangreComponent;
//# sourceMappingURL=tiposangre.component.js.map