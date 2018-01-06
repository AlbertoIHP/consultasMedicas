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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var datasource_component_1 = require("../../../Globals/datasource.component");
var material_3 = require("@angular/material");
var EditarEnfermedadesCronicasPacienteComponent = /** @class */ (function () {
    function EditarEnfermedadesCronicasPacienteComponent(dialogRef, data, dateAdapter) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dateAdapter = dateAdapter;
        this.displayedColumns = ['Enfermedad', 'Estado', 'Fecha deteccion'];
        this.selection = new collections_1.SelectionModel(true, []);
        dateAdapter.setLocale('es-MX');
        this.paciente = data.paciente;
        this.arrayEnfermedadesCronicasPaciente = data.arrayEnfermedadesCronicasPaciente;
        this.totalEnfermedadesCronicas = data.enfermedadesCronicas;
        this.servicioEnfermedadCronica = data.servicioEnfermedadCronica;
        this.servicioEnfermedadesCronicasPaciente = data.servicioEnfermedadesCronicasPaciente;
    }
    EditarEnfermedadesCronicasPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'SetEnfermedadesCronicasPaciente');
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
    EditarEnfermedadesCronicasPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEnfermedadesCronicas = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayEnfermedadesCronicasPaciente);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'SetEnfermedadesCronicasPaciente');
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
    EditarEnfermedadesCronicasPacienteComponent.prototype.isAllSelected = function () {
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
    EditarEnfermedadesCronicasPacienteComponent.prototype.masterToggle = function () {
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
    EditarEnfermedadesCronicasPacienteComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalEnfermedadesCronicas.length; i++) {
            for (var j = 0; j < this.arrayEnfermedadesCronicasPaciente.length; j++) {
                if (this.totalEnfermedadesCronicas[i].id == this.arrayEnfermedadesCronicasPaciente[j].EnfermedadCronica_id) {
                    this.arrayEnfermedadesCronicasPaciente[j].nombreEnfermedad = this.totalEnfermedadesCronicas[i].nombre;
                }
            }
        }
    };
    EditarEnfermedadesCronicasPacienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarEnfermedadesCronicasPacienteComponent.prototype.obtenerFecha = function (enfermedadPaciente) {
        if (enfermedadPaciente.esVerdadero) {
            enfermedadPaciente.fechaTemp = new Date();
        }
        else if (enfermedadPaciente.esVerdadero == false) {
            enfermedadPaciente.fechaDeteccion = null;
        }
    };
    EditarEnfermedadesCronicasPacienteComponent.prototype.editarEnfermedadesCronicasPaciente = function () {
        var _this = this;
        for (var i = 0; i < this.arrayEnfermedadesCronicasPaciente.length; i++) {
            if (this.arrayEnfermedadesCronicasPaciente[i].esVerdadero) {
                this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion = new Date(this.arrayEnfermedadesCronicasPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
            }
            else {
                this.arrayEnfermedadesCronicasPaciente[i].fechaDeteccion = null;
            }
            this.servicioEnfermedadesCronicasPaciente.editEnfermedadesCronicasPaciente(this.arrayEnfermedadesCronicasPaciente[i], this.arrayEnfermedadesCronicasPaciente[i].id).subscribe(function (data) {
                _this.onNoClick();
            });
        }
    };
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], EditarEnfermedadesCronicasPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], EditarEnfermedadesCronicasPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EditarEnfermedadesCronicasPacienteComponent.prototype, "filter", void 0);
    EditarEnfermedadesCronicasPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-enfermedades-cronicas-paciente',
            templateUrl: './editar-enfermedades-cronicas-paciente.component.html',
            styleUrls: ['./editar-enfermedades-cronicas-paciente.component.css'],
            providers: [
                { provide: core_2.LOCALE_ID,
                    useValue: 'es-MX' },
            ],
        }),
        __param(1, core_1.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_3.MatDialogRef, Object, material_1.DateAdapter])
    ], EditarEnfermedadesCronicasPacienteComponent);
    return EditarEnfermedadesCronicasPacienteComponent;
}());
exports.EditarEnfermedadesCronicasPacienteComponent = EditarEnfermedadesCronicasPacienteComponent;
//# sourceMappingURL=editar-enfermedades-cronicas-paciente.component.js.map