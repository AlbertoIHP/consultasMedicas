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
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var router_1 = require("@angular/router");
var comuna_service_1 = require("../../../Services/comuna/comuna.service");
var provincia_service_1 = require("../../../Services/provincia/provincia.service");
var agregarcomuna_component_1 = require("./agregarcomuna/agregarcomuna.component");
var editarcomuna_component_1 = require("./editarcomuna/editarcomuna.component");
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
var ComunasComponent = /** @class */ (function () {
    function ComunasComponent(servicioProvincia, servicioComuna, dialog, router) {
        this.servicioProvincia = servicioProvincia;
        this.servicioComuna = servicioComuna;
        this.dialog = dialog;
        this.router = router;
        this.displayedColumns = ['Acciones', 'Nombre', 'Provincia'];
        this.selection = new collections_1.SelectionModel(true, []);
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalProvincias = [];
        this.totalComunas = [];
        this.actualizarProvincias();
        this.actualizarComunas();
    }
    ComunasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Comuna');
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
    ComunasComponent.prototype.isAllSelected = function () {
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
    ComunasComponent.prototype.masterToggle = function () {
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
    ComunasComponent.prototype.actualizarComunas = function () {
        var _this = this;
        this.servicioComuna.getComunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalComunas = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalComunas);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Comuna');
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
    ComunasComponent.prototype.actualizarProvincias = function () {
        var _this = this;
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
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
    ComunasComponent.prototype.edicionComuna = function (comuna) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(comuna));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(editarcomuna_component_1.EditarcomunaComponent, {
            width: '700px',
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
            width: '700px',
            data: {
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
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ComunasComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ComunasComponent.prototype, "sort", void 0);
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
        __metadata("design:paramtypes", [provincia_service_1.ProvinciaService,
            comuna_service_1.ComunaService,
            material_2.MatDialog,
            router_1.Router])
    ], ComunasComponent);
    return ComunasComponent;
}());
exports.ComunasComponent = ComunasComponent;
//# sourceMappingURL=comunas.component.js.map