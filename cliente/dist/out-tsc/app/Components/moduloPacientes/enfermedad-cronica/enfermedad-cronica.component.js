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
var enfermedad_cronica_service_1 = require("../../../Services/enfermedadcronica/enfermedad-cronica.service");
var enfermedades_cronicas_paciente_service_1 = require("../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
// Componentes hijos
var agregar_enfermedad_cronica_component_1 = require("./agregar-enfermedad-cronica/agregar-enfermedad-cronica.component");
var editar_enfermedad_cronica_component_1 = require("./editar-enfermedad-cronica/editar-enfermedad-cronica.component");
// Componente para verificación de roles
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
var EnfermedadCronicaComponent = /** @class */ (function () {
    function EnfermedadCronicaComponent(servicioEnfermedadCronica, servicioEnfermedadesCronicasPaciente, dialog, router, servicioEvento) {
        this.servicioEnfermedadCronica = servicioEnfermedadCronica;
        this.servicioEnfermedadesCronicasPaciente = servicioEnfermedadesCronicasPaciente;
        this.dialog = dialog;
        this.router = router;
        this.servicioEvento = servicioEvento;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Nombre'];
        // Se inicializan los atributos
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalEnfermedadCronicas = [];
        // Se obtienen los registros de aenfermedades crónicas a la base de datos
        this.actualizarEnfermedadCronicas();
    }
    EnfermedadCronicaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Se inicializa el datasource
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'EnfermedadCronica');
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
    EnfermedadCronicaComponent.prototype.isAllSelected = function () {
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
    EnfermedadCronicaComponent.prototype.masterToggle = function () {
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
    EnfermedadCronicaComponent.prototype.actualizarEnfermedadCronicas = function () {
        var _this = this;
        // Se obtienen todas las enfermedades crónicas desde la API
        this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEnfermedadCronicas = todo;
            //DATATABLE
            //Se asignan los datos obtenidos al datasource
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalEnfermedadCronicas);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'EnfermedadCronica');
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
    // Se obtiene la enfermedad crónica desde la fila
    EnfermedadCronicaComponent.prototype.eliminarEnfermedadCronica = function (enfermedadcronica) {
        var _this = this;
        // Antes de eliminarla, se deben eliminar las que están ligadas con los pacientes
        this.servicioEnfermedadesCronicasPaciente.getEnfermedadesCronicasPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            // Se obtienen todos los pacientes
            var totalEnfermedadesCronicasPaciente = todo;
            // Se realiza la busqueda entre los pacientes que tengan esta enfermedad
            for (var i = 0; i < totalEnfermedadesCronicasPaciente.length; i++) {
                if (totalEnfermedadesCronicasPaciente[i].EnfermedadCronica_id === enfermedadcronica.id) {
                    // Si existe se elimina
                    _this.servicioEnfermedadesCronicasPaciente.deleteEnfermedadesCronicasPaciente(totalEnfermedadesCronicasPaciente[i].id).subscribe(function (data) {
                    });
                }
            }
            //Se elimina definitivamente la enfermedad
            _this.servicioEnfermedadCronica.deleteEnfermedadCronica(enfermedadcronica.id).subscribe(function (data) {
                // Se actualiza la tabla
                _this.actualizarEnfermedadCronicas();
            });
        });
    };
    // Se envía la enfermedad a modificar desde el frontend
    EnfermedadCronicaComponent.prototype.edicionEnfermedadCronica = function (enfermedadcronica) {
        var _this = this;
        //Se abre un dialogo para editar la enfermedad, se abre un componente hijo
        var dialogRef = this.dialog.open(editar_enfermedad_cronica_component_1.EditarEnfermedadCronicaComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                enfermedadcronica: enfermedadcronica
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
            if (!_this.actualizar) {
                _this.actualizarEnfermedadCronicas();
            }
        });
    };
    EnfermedadCronicaComponent.prototype.agregacionEnfermedadCronica = function () {
        var _this = this;
        // Se abre un nuevo dialogo para agregar una enfermedad, se abre un componente hijo
        var dialogRef = this.dialog.open(agregar_enfermedad_cronica_component_1.AgregarEnfermedadCronicaComponent, {
            // Se asignan los parámetros
            width: '700px'
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
            if (_this.actualizar) {
                _this.actualizarEnfermedadCronicas();
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], EnfermedadCronicaComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], EnfermedadCronicaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EnfermedadCronicaComponent.prototype, "filter", void 0);
    EnfermedadCronicaComponent = __decorate([
        core_1.Component({
            selector: 'app-enfermedad-cronica',
            templateUrl: './enfermedad-cronica.component.html',
            styleUrls: ['./enfermedad-cronica.component.css']
        }),
        __metadata("design:paramtypes", [enfermedad_cronica_service_1.EnfermedadCronicaService,
            enfermedades_cronicas_paciente_service_1.EnfermedadesCronicasPacienteService,
            material_1.MatDialog,
            router_1.Router,
            eventos_service_1.EventosService])
    ], EnfermedadCronicaComponent);
    return EnfermedadCronicaComponent;
}());
exports.EnfermedadCronicaComponent = EnfermedadCronicaComponent;
//# sourceMappingURL=enfermedad-cronica.component.js.map