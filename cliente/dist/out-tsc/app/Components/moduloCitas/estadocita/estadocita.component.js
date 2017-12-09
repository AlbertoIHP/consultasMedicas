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
var estado_cita_service_1 = require("../../../Services/estadocita/estado-cita.service");
var cita_service_1 = require("../../../Services/cita/cita.service");
var agregarestadocita_component_1 = require("./agregarestadocita/agregarestadocita.component");
var editarestadocita_component_1 = require("./editarestadocita/editarestadocita.component");
var mensaje_error_component_1 = require("../../Globals/mensaje-error/mensaje-error.component");
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
var EstadocitaComponent = /** @class */ (function () {
    function EstadocitaComponent(servicioEstadoCita, servicioCita, dialog) {
        this.servicioEstadoCita = servicioEstadoCita;
        this.servicioCita = servicioCita;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalEstadocitas = [];
        this.actualizarEstadoCitas();
        this.actualizarCitas();
    }
    EstadocitaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'EstadoCita');
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
    EstadocitaComponent.prototype.isAllSelected = function () {
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
    EstadocitaComponent.prototype.masterToggle = function () {
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
    EstadocitaComponent.prototype.actualizarEstadoCitas = function () {
        var _this = this;
        this.servicioEstadoCita.getEstadoCitas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEstadocitas = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalEstadocitas);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'EstadoCita');
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
    EstadocitaComponent.prototype.actualizarCitas = function () {
        var _this = this;
        //buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
        this.servicioCita.getCitas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalCitas = todo;
        });
    };
    //Función temporal que retornará true en caso de que el estado cita esté en uso
    EstadocitaComponent.prototype.verificarUsoEstadoCita = function (estadocita) {
        console.log(this.totalCitas.length);
        for (var i = 0; i < this.totalCitas.length; i++) {
            console.log(this.totalCitas[i].EstadoCita_id + '-' + estadocita.id);
            if (parseInt(this.totalCitas[i].EstadoCita_id) === parseInt(estadocita.id)) {
                return true;
            }
        }
        return false;
    };
    EstadocitaComponent.prototype.eliminarEstadoCita = function (estadocita) {
        var _this = this;
        console.log('click');
        if (this.verificarUsoEstadoCita(estadocita) == true) {
            this.mostrarMensaje("Esta estado cita está siendo usada por un médico.");
        }
        else {
            this.servicioEstadoCita.deleteEstadoCita(estadocita.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarEstadoCitas();
            });
        }
    };
    EstadocitaComponent.prototype.edicionEstadoCita = function (estadocita) {
        var _this = this;
        var dialogRef = this.dialog.open(editarestadocita_component_1.EditarestadocitaComponent, {
            width: '700px',
            data: {
                estadocita: estadocita
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEstadoCitas();
        });
    };
    EstadocitaComponent.prototype.agregacionEstadoCita = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarestadocita_component_1.AgregarestadocitaComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEstadoCitas();
        });
    };
    EstadocitaComponent.prototype.mostrarMensaje = function (mensaje) {
        var _this = this;
        var dialogRef = this.dialog.open(mensaje_error_component_1.MensajeErrorComponent, {
            width: '400px',
            data: {
                mensajeError: mensaje
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEstadoCitas();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], EstadocitaComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], EstadocitaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EstadocitaComponent.prototype, "filter", void 0);
    EstadocitaComponent = __decorate([
        core_1.Component({
            selector: 'app-estadocita',
            templateUrl: './estadocita.component.html',
            styleUrls: ['./estadocita.component.css']
        }),
        __metadata("design:paramtypes", [estado_cita_service_1.EstadoCitaService, cita_service_1.CitaService, material_2.MatDialog])
    ], EstadocitaComponent);
    return EstadocitaComponent;
}());
exports.EstadocitaComponent = EstadocitaComponent;
//# sourceMappingURL=estadocita.component.js.map