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
// Componentes generales
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var alergia_service_1 = require("../../../Services/alergia/alergia.service");
var alergias_comunes_paciente_service_1 = require("../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
//Componentes hijos
var agregar_alergia_component_1 = require("./agregar-alergia/agregar-alergia.component");
var editar_alergia_component_1 = require("./editar-alergia/editar-alergia.component");
//Componente para verificación de roles
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var material_2 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var datasource_component_1 = require("../../Globals/datasource.component");
var AlergiaComponent = /** @class */ (function () {
    function AlergiaComponent(
        //Se declaran los servicios y componentes a utilizar
        servicioAlergiasComunesPaciente, servicioAlergia, dialog, router, servicioEvento) {
        this.servicioAlergiasComunesPaciente = servicioAlergiasComunesPaciente;
        this.servicioAlergia = servicioAlergia;
        this.dialog = dialog;
        this.router = router;
        this.servicioEvento = servicioEvento;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre'];
        // Se inicializan los atributos
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalAlergias = [];
        // Se obtienen los registros de alergia a la base de datos
        this.actualizarAlergias();
    }
    AlergiaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Se inicializa el datasource
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Alergia');
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
    AlergiaComponent.prototype.isAllSelected = function () {
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
    AlergiaComponent.prototype.masterToggle = function () {
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
    AlergiaComponent.prototype.actualizarAlergias = function () {
        var _this = this;
        // Se obtienen todas las alergias desde la API
        this.servicioAlergia.getAlergias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalAlergias = todo;
            //DATATABLE
            //Se asignan los datos obtenidos al datasource
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalAlergias);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Alergia');
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
    AlergiaComponent.prototype.eliminarAlergia = function (alergia) {
        var _this = this;
        //Si se elimina una alergía, se deben eliminar primero las que han sido asignadas a un paciente
        this.servicioAlergiasComunesPaciente.getAlergiasComunesPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            //Se obtienen todas las alergias que han sido asignadas a pacientes
            var totalAlergiasComunesPaciente = todo;
            //Se busca la alergia en particular que se está eliminando y se elimina del paciente
            for (var i = 0; i < totalAlergiasComunesPaciente.length; i++) {
                if (totalAlergiasComunesPaciente[i].Alergia_id === alergia.id) {
                    _this.servicioAlergiasComunesPaciente.deleteAlergiasComunesPaciente(totalAlergiasComunesPaciente[i].id).subscribe(function (data) { });
                }
            }
            //Se elimina la alergía de forma definitiva    
            _this.servicioAlergia.deleteAlergia(alergia.id).subscribe(function (data) {
                _this.actualizarAlergias();
            });
        });
    };
    // Se envía la alergia a modificar desde el frontend
    AlergiaComponent.prototype.edicionAlergia = function (alergia) {
        var _this = this;
        //Se abre un dialogo para editar la alergia, se abre un componente hijo
        var dialogRef = this.dialog.open(editar_alergia_component_1.EditarAlergiaComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                alergia: alergia
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
            if (!_this.actualizar) {
                _this.actualizarAlergias();
            }
        });
    };
    AlergiaComponent.prototype.agregacionAlergia = function () {
        var _this = this;
        // Se abre un nuevo dialogo para agregar una alergia, se abre un componente hijo
        var dialogRef = this.dialog.open(agregar_alergia_component_1.AgregarAlergiaComponent, {
            // Se asignan los parámetros
            width: '700px'
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
            if (_this.actualizar) {
                _this.actualizarAlergias();
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], AlergiaComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], AlergiaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], AlergiaComponent.prototype, "filter", void 0);
    AlergiaComponent = __decorate([
        core_1.Component({
            selector: 'app-alergia',
            templateUrl: './alergia.component.html',
            styleUrls: ['./alergia.component.css']
        }),
        __metadata("design:paramtypes", [alergias_comunes_paciente_service_1.AlergiasComunesPacienteService,
            alergia_service_1.AlergiaService,
            material_1.MatDialog,
            router_1.Router,
            eventos_service_1.EventosService])
    ], AlergiaComponent);
    return AlergiaComponent;
}());
exports.AlergiaComponent = AlergiaComponent;
//# sourceMappingURL=alergia.component.js.map