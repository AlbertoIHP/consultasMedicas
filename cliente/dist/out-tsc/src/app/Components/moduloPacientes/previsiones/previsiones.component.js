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
var prevision_service_1 = require("../../../Services/prevision/prevision.service");
var agregarprevision_component_1 = require("./agregarprevision/agregarprevision.component");
var editarprevision_component_1 = require("./editarprevision/editarprevision.component");
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
var PrevisionesComponent = /** @class */ (function () {
    function PrevisionesComponent(servicioPrevisiones, dialog) {
        this.servicioPrevisiones = servicioPrevisiones;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion', 'Isapre'];
        this.buscarPorNombre = false;
        this.totalPrevisiones = [];
        this.actualizarPrevisiones();
    }
    PrevisionesComponent.prototype.actualizarPrevisiones = function () {
        var _this = this;
        this.servicioPrevisiones.getPrevisions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPrevisiones = todo;
            _this.pasarIdString();
            //DATATABLE
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalPrevisiones);
            _this.sourceDatatable = new datasource_component_1.dataTable(_this.bdEstructura, _this.paginator);
            _this.sourcePorNombre = new datasource_component_1.buscadorPorNombre(_this.bdEstructura, 'Prevision');
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
    PrevisionesComponent.prototype.eliminarPrevision = function (prevision) {
        var _this = this;
        this.servicioPrevisiones.deletePrevision(prevision.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarPrevisiones();
        });
    };
    PrevisionesComponent.prototype.pasarIdString = function () {
        for (var i = 0; i < this.totalPrevisiones.length; i++) {
            if (parseInt(this.totalPrevisiones[i].isapre) === 1) {
                this.totalPrevisiones[i].isapre = "ISAPRE";
            }
            else {
                this.totalPrevisiones[i].isapre = "NO ISAPRE";
            }
        }
    };
    PrevisionesComponent.prototype.pasarStringId = function (prevision) {
        if (prevision.isapre === "ISAPRE") {
            prevision.isapre = "1";
        }
        else {
            prevision.isapre = "0";
        }
    };
    PrevisionesComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    PrevisionesComponent.prototype.edicionPrevision = function (prevision) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(prevision));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(editarprevision_component_1.EditarprevisionComponent, {
            width: '1000px',
            data: {
                prevision: a
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarPrevisiones();
        });
    };
    PrevisionesComponent.prototype.agregacionPrevision = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarprevision_component_1.AgregarprevisionComponent, {
            width: '1000px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarPrevisiones();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], PrevisionesComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], PrevisionesComponent.prototype, "filter", void 0);
    PrevisionesComponent = __decorate([
        core_1.Component({
            selector: 'app-previsiones',
            templateUrl: './previsiones.component.html',
            styleUrls: ['./previsiones.component.css']
        }),
        __metadata("design:paramtypes", [prevision_service_1.PrevisionService, material_2.MatDialog])
    ], PrevisionesComponent);
    return PrevisionesComponent;
}());
exports.PrevisionesComponent = PrevisionesComponent;
//# sourceMappingURL=previsiones.component.js.map