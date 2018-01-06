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
var EditarHabitosSexualesPacienteComponent = /** @class */ (function () {
    function EditarHabitosSexualesPacienteComponent(dialogRef, data, dateAdapter) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dateAdapter = dateAdapter;
        this.displayedColumns = ['Habito sexual', 'Estado', 'Fecha inicio'];
        this.selection = new collections_1.SelectionModel(true, []);
        dateAdapter.setLocale('es-MX');
        this.paciente = data.paciente;
        this.arrayHabitosSexualesPaciente = data.arrayHabitosSexualesPaciente;
        this.totalHabitosSexuales = data.habitosSexuales;
        this.servicioHabitoSexual = data.servicioHabitoSexual;
        this.servicioHabitosSexualesPaciente = data.servicioHabitosSexualesPaciente;
    }
    EditarHabitosSexualesPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.actualizarAtributos();
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'SetHabitosSexualesPaciente');
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
    EditarHabitosSexualesPacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioHabitoSexual.getHabitoSexuales().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalHabitosSexuales = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.arrayHabitosSexualesPaciente);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'SetHabitosSexualesPaciente');
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
    EditarHabitosSexualesPacienteComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalHabitosSexuales.length; i++) {
            for (var j = 0; j < this.arrayHabitosSexualesPaciente.length; j++) {
                if (this.totalHabitosSexuales[i].id == this.arrayHabitosSexualesPaciente[j].HabitoSexual_id) {
                    this.arrayHabitosSexualesPaciente[j].nombreHabitoSexual = this.totalHabitosSexuales[i].nombre;
                }
            }
        }
    };
    EditarHabitosSexualesPacienteComponent.prototype.isAllSelected = function () {
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
    EditarHabitosSexualesPacienteComponent.prototype.masterToggle = function () {
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
    EditarHabitosSexualesPacienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarHabitosSexualesPacienteComponent.prototype.obtenerFecha = function (habitoSexualPaciente) {
        if (habitoSexualPaciente.esVerdadero) {
            habitoSexualPaciente.fechaTemp = new Date();
        }
        else if (habitoSexualPaciente.esVerdadero == false) {
            habitoSexualPaciente.fechaInicio = null;
        }
    };
    EditarHabitosSexualesPacienteComponent.prototype.editarHabitosSexualesPaciente = function () {
        var _this = this;
        for (var i = 0; i < this.arrayHabitosSexualesPaciente.length; i++) {
            if (this.arrayHabitosSexualesPaciente[i].esVerdadero) {
                this.arrayHabitosSexualesPaciente[i].fechaInicio = new Date(this.arrayHabitosSexualesPaciente[i].fechaTemp).toISOString().slice(0, 19).replace('T', ' ');
            }
            else {
                this.arrayHabitosSexualesPaciente[i].fechaInicio = null;
            }
            this.servicioHabitosSexualesPaciente.editHabitosSexualesPaciente(this.arrayHabitosSexualesPaciente[i], this.arrayHabitosSexualesPaciente[i].id).subscribe(function (data) {
                _this.onNoClick();
            });
        }
    };
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], EditarHabitosSexualesPacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], EditarHabitosSexualesPacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EditarHabitosSexualesPacienteComponent.prototype, "filter", void 0);
    EditarHabitosSexualesPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-habitos-sexuales-paciente',
            templateUrl: './editar-habitos-sexuales-paciente.component.html',
            styleUrls: ['./editar-habitos-sexuales-paciente.component.css'],
            providers: [
                { provide: core_2.LOCALE_ID,
                    useValue: 'es-MX' },
            ],
        }),
        __param(1, core_1.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_3.MatDialogRef, Object, material_1.DateAdapter])
    ], EditarHabitosSexualesPacienteComponent);
    return EditarHabitosSexualesPacienteComponent;
}());
exports.EditarHabitosSexualesPacienteComponent = EditarHabitosSexualesPacienteComponent;
//# sourceMappingURL=editar-habitos-sexuales-paciente.component.js.map