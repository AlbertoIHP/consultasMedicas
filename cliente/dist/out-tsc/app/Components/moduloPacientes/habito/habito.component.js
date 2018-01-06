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
var habitos_paciente_service_1 = require("../../../Services/habitospaciente/habitos-paciente.service");
var habito_service_1 = require("../../../Services/habito/habito.service");
var agregar_habito_component_1 = require("./agregar-habito/agregar-habito.component");
var editar_habito_component_1 = require("./editar-habito/editar-habito.component");
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
var HabitoComponent = /** @class */ (function () {
    function HabitoComponent(servicioHabitosPaciente, servicioHabito, dialog, router) {
        this.servicioHabitosPaciente = servicioHabitosPaciente;
        this.servicioHabito = servicioHabito;
        this.dialog = dialog;
        this.router = router;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalHabitos = [];
        this.actualizarHabitos();
    }
    HabitoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Habito');
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
    HabitoComponent.prototype.isAllSelected = function () {
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
    HabitoComponent.prototype.masterToggle = function () {
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
    HabitoComponent.prototype.actualizarHabitos = function () {
        var _this = this;
        this.servicioHabito.getHabitos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalHabitos = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalHabitos);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Habito');
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
    HabitoComponent.prototype.eliminarHabito = function (habito) {
        var _this = this;
        this.servicioHabitosPaciente.getHabitosPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            var totalHabitosPaciente = todo;
            for (var i = 0; i < totalHabitosPaciente.length; i++) {
                if (totalHabitosPaciente[i].Habito_id === habito.id) {
                    _this.servicioHabitosPaciente.deleteHabitosPaciente(totalHabitosPaciente[i].id).subscribe(function (data) {
                    });
                }
            }
            _this.servicioHabito.deleteHabito(habito.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarHabitos();
            });
        });
    };
    HabitoComponent.prototype.edicionHabito = function (habito) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_habito_component_1.EditarHabitoComponent, {
            width: '700px',
            data: {
                habito: habito
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarHabitos();
        });
    };
    HabitoComponent.prototype.agregacionHabito = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_habito_component_1.AgregarHabitoComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarHabitos();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], HabitoComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], HabitoComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], HabitoComponent.prototype, "filter", void 0);
    HabitoComponent = __decorate([
        core_1.Component({
            selector: 'app-habito',
            templateUrl: './habito.component.html',
            styleUrls: ['./habito.component.css']
        }),
        __metadata("design:paramtypes", [habitos_paciente_service_1.HabitosPacienteService,
            habito_service_1.HabitoService,
            material_2.MatDialog,
            router_1.Router])
    ], HabitoComponent);
    return HabitoComponent;
}());
exports.HabitoComponent = HabitoComponent;
//# sourceMappingURL=habito.component.js.map