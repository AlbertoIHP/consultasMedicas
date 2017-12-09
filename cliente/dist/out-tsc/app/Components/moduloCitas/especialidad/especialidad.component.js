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
var especialidad_service_1 = require("../../../Services/especialidad/especialidad.service");
var medico_service_1 = require("../../../Services/medico/medico.service");
var agregarespecialidad_component_1 = require("./agregarespecialidad/agregarespecialidad.component");
var editarespecialidad_component_1 = require("./editarespecialidad/editarespecialidad.component");
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
var EspecialidadComponent = /** @class */ (function () {
    function EspecialidadComponent(servicioEspecialidad, servicioMedico, dialog) {
        this.servicioEspecialidad = servicioEspecialidad;
        this.servicioMedico = servicioMedico;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalEspecialidades = [];
        this.actualizarEspecialidades();
        this.actualizarMedicos();
    }
    EspecialidadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Especialidad');
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
    EspecialidadComponent.prototype.isAllSelected = function () {
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
    EspecialidadComponent.prototype.masterToggle = function () {
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
    EspecialidadComponent.prototype.actualizarEspecialidades = function () {
        var _this = this;
        this.servicioEspecialidad.getEspecialidads().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEspecialidades = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalEspecialidades);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Especialidad');
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
    EspecialidadComponent.prototype.actualizarMedicos = function () {
        var _this = this;
        //buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
        this.servicioMedico.getMedicos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicos = todo;
        });
    };
    //Función temporal que retornará true en caso de que la especialidad esté en uso
    EspecialidadComponent.prototype.verificarUsoEspecialidad = function (especialidad) {
        console.log(this.totalMedicos.length);
        for (var i = 0; i < this.totalMedicos.length; i++) {
            console.log(this.totalMedicos[i].Especialidad_id + '-' + especialidad.id);
            if (parseInt(this.totalMedicos[i].Especialidad_id) === parseInt(especialidad.id)) {
                return true;
            }
        }
        return false;
    };
    EspecialidadComponent.prototype.eliminarEspecialidad = function (especialidad) {
        var _this = this;
        console.log('click');
        if (this.verificarUsoEspecialidad(especialidad) == true) {
            this.mostrarMensaje("Esta especialidad está siendo usada por un médico.");
        }
        else {
            this.servicioEspecialidad.deleteEspecialidad(especialidad.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarEspecialidades();
            });
        }
    };
    EspecialidadComponent.prototype.edicionEspecialidad = function (especialidad) {
        var _this = this;
        var dialogRef = this.dialog.open(editarespecialidad_component_1.EditarespecialidadComponent, {
            width: '700px',
            data: {
                especialidad: especialidad
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEspecialidades();
        });
    };
    EspecialidadComponent.prototype.agregacionEspecialidad = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarespecialidad_component_1.AgregarespecialidadComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEspecialidades();
        });
    };
    EspecialidadComponent.prototype.mostrarMensaje = function (mensaje) {
        var _this = this;
        var dialogRef = this.dialog.open(mensaje_error_component_1.MensajeErrorComponent, {
            width: '400px',
            data: {
                mensajeError: mensaje
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarEspecialidades();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], EspecialidadComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], EspecialidadComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EspecialidadComponent.prototype, "filter", void 0);
    EspecialidadComponent = __decorate([
        core_1.Component({
            selector: 'app-especialidad',
            templateUrl: './especialidad.component.html',
            styleUrls: ['./especialidad.component.css']
        }),
        __metadata("design:paramtypes", [especialidad_service_1.EspecialidadService, medico_service_1.MedicoService, material_2.MatDialog])
    ], EspecialidadComponent);
    return EspecialidadComponent;
}());
exports.EspecialidadComponent = EspecialidadComponent;
//# sourceMappingURL=especialidad.component.js.map