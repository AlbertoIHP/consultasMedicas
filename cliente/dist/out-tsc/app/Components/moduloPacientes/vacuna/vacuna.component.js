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
//Componente para verificación de roles
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var vacuna_service_1 = require("../../../Services/vacuna/vacuna.service");
var vacunaspaciente_service_1 = require("../../../Services/vacunaspaciente/vacunaspaciente.service");
//Componentes hijos
var agregar_vacuna_component_1 = require("./agregar-vacuna/agregar-vacuna.component");
var editar_vacuna_component_1 = require("./editar-vacuna/editar-vacuna.component");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
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
var VacunaComponent = /** @class */ (function () {
    function VacunaComponent(
        //Se declaran los servicios y componentes a utilizar
        servicioVacuna, servicioVacunasPaciente, dialog, servicioEvento) {
        this.servicioVacuna = servicioVacuna;
        this.servicioVacunasPaciente = servicioVacunasPaciente;
        this.dialog = dialog;
        this.servicioEvento = servicioEvento;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre'];
        // Se inicializan los atributos
        this.totalVacunas = [];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        // Se obtienen los registros de vacunas a la base de datos
        this.actualizarVacunas();
    }
    VacunaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Se inicializa el datasource
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Vacuna');
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
        // Se obtiene el evento emitido desde agregar
        this.servicioEvento.actualizar.subscribe(function (data) { _this.actualizar = data; });
    };
    VacunaComponent.prototype.isAllSelected = function () {
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
    VacunaComponent.prototype.masterToggle = function () {
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
    VacunaComponent.prototype.actualizarVacunas = function () {
        var _this = this;
        // Se obtienen todas las vacunas desde la API
        this.servicioVacuna.getVacunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalVacunas = todo;
            //DATATABLE
            //Se asignan los datos obtenidos al datasource
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalVacunas);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Vacuna');
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
    VacunaComponent.prototype.eliminarVacuna = function (vacuna) {
        var _this = this;
        //Si se elimina una vacuna, se deben eliminar primero las que han sido asignadas a un paciente
        this.servicioVacunasPaciente.getVacunasPaciente().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            //Se obtienen todas las vacunas que han sido asignadas a pacientes
            var totalVacunasPaciente = todo;
            //Se busca la vacuna en particular que se está eliminando y se elimina del paciente
            for (var i = 0; i < totalVacunasPaciente.length; i++) {
                if (totalVacunasPaciente[i].Vacuna_id === vacuna.id) {
                    _this.servicioVacunasPaciente.deleteVacunaPaciente(totalVacunasPaciente[i].id).subscribe(function (data) {
                    });
                }
            }
            //Se eliminala alergía de forma definitiva   
            _this.servicioVacuna.deleteVacuna(vacuna.id).subscribe(function (data) {
                _this.actualizarVacunas();
            });
        });
    };
    // Se envía la alergia a modificar desde el frontend
    VacunaComponent.prototype.edicionVacuna = function (vacuna) {
        var _this = this;
        //Se abre un dialogo para editar la vacuna, se abre un componente hijo
        var dialogRef = this.dialog.open(editar_vacuna_component_1.EditarVacunaComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                vacuna: vacuna,
                servicioVacuna: this.servicioVacuna
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
            if (!_this.actualizar) {
                _this.actualizarVacunas();
            }
        });
    };
    VacunaComponent.prototype.agregacionVacuna = function () {
        var _this = this;
        // Se abre un nuevo dialogo para agregar una vacuna, se abre un componente hijo
        var dialogRef = this.dialog.open(agregar_vacuna_component_1.AgregarVacunaComponent, {
            // Se asignan los parámetros
            width: '700px',
            data: {
                servicioVacuna: this.servicioVacuna
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
            if (_this.actualizar) {
                _this.actualizarVacunas();
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VacunaComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], VacunaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VacunaComponent.prototype, "filter", void 0);
    VacunaComponent = __decorate([
        core_1.Component({
            selector: 'app-vacuna',
            templateUrl: './vacuna.component.html',
            styleUrls: ['./vacuna.component.css']
        }),
        __metadata("design:paramtypes", [vacuna_service_1.VacunaService,
            vacunaspaciente_service_1.VacunasPacienteService,
            material_2.MatDialog,
            eventos_service_1.EventosService])
    ], VacunaComponent);
    return VacunaComponent;
}());
exports.VacunaComponent = VacunaComponent;
//# sourceMappingURL=vacuna.component.js.map