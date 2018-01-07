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
var habito_sexual_service_1 = require("../../../Services/habitosexual/habito-sexual.service");
var habitos_sexuales_paciente_service_1 = require("../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service");
var agregar_habito_sexual_component_1 = require("./agregar-habito-sexual/agregar-habito-sexual.component");
var editar_habito_sexual_component_1 = require("./editar-habito-sexual/editar-habito-sexual.component");
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
var HabitoSexualComponent = /** @class */ (function () {
    function HabitoSexualComponent(servicioHabitoSexual, dialog, router, servicioHabitosSexualesPaciente) {
        this.servicioHabitoSexual = servicioHabitoSexual;
        this.dialog = dialog;
        this.router = router;
        this.servicioHabitosSexualesPaciente = servicioHabitosSexualesPaciente;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalHabitoSexuals = [];
        this.actualizarHabitoSexuals();
    }
    HabitoSexualComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'HabitoSexual');
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
    HabitoSexualComponent.prototype.isAllSelected = function () {
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
    HabitoSexualComponent.prototype.masterToggle = function () {
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
    HabitoSexualComponent.prototype.actualizarHabitoSexuals = function () {
        var _this = this;
        this.servicioHabitoSexual.getHabitoSexuales().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalHabitoSexuals = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalHabitoSexuals);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'HabitoSexual');
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
    HabitoSexualComponent.prototype.eliminarHabitoSexual = function (habitosexual) {
        var _this = this;
        this.servicioHabitosSexualesPaciente.getHabitosSexualesPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            var totalHabitosSexualesPaciente = todo;
            for (var i = 0; i < totalHabitosSexualesPaciente.length; i++) {
                if (totalHabitosSexualesPaciente[i].HabitoSexual_id === habitosexual.id) {
                    _this.servicioHabitosSexualesPaciente.deleteHabitosSexualesPaciente(totalHabitosSexualesPaciente[i].id).subscribe(function (data) {
                    });
                }
            }
            _this.servicioHabitoSexual.deleteHabitoSexual(habitosexual.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarHabitoSexuals();
            });
        });
    };
    HabitoSexualComponent.prototype.edicionHabitoSexual = function (habitosexual) {
        var _this = this;
        var dialogRef = this.dialog.open(editar_habito_sexual_component_1.EditarHabitoSexualComponent, {
            width: '700px',
            data: {
                habitosexual: habitosexual
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarHabitoSexuals();
        });
    };
    HabitoSexualComponent.prototype.agregacionHabitoSexual = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregar_habito_sexual_component_1.AgregarHabitoSexualComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarHabitoSexuals();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], HabitoSexualComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], HabitoSexualComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], HabitoSexualComponent.prototype, "filter", void 0);
    HabitoSexualComponent = __decorate([
        core_1.Component({
            selector: 'app-habito-sexual',
            templateUrl: './habito-sexual.component.html',
            styleUrls: ['./habito-sexual.component.css']
        }),
        __metadata("design:paramtypes", [habito_sexual_service_1.HabitoSexualService,
            material_2.MatDialog,
            router_1.Router,
            habitos_sexuales_paciente_service_1.HabitosSexualesPacienteService])
    ], HabitoSexualComponent);
    return HabitoSexualComponent;
}());
exports.HabitoSexualComponent = HabitoSexualComponent;
//# sourceMappingURL=habito-sexual.component.js.map