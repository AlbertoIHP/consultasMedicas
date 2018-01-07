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
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var verfichamedica_component_1 = require("../../moduloPacientes/fichamedica/verfichamedica/verfichamedica.component");
var alergias_medicamentos_paciente_service_1 = require("../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service");
var medicamento_service_1 = require("../../../Services/medicamento/medicamento.service");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
var persona_service_1 = require("../../../Services/persona/persona.service");
var editar_alergias_paciente_component_1 = require("./editar-alergias-paciente/editar-alergias-paciente.component");
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
var AlergiaspacienteComponent = /** @class */ (function () {
    function AlergiaspacienteComponent(servicioAlergiasMedicamentosPaciente, servicioMedicamento, servicioPaciente, servicioPersona, dialog) {
        this.servicioAlergiasMedicamentosPaciente = servicioAlergiasMedicamentosPaciente;
        this.servicioMedicamento = servicioMedicamento;
        this.servicioPaciente = servicioPaciente;
        this.servicioPersona = servicioPersona;
        this.dialog = dialog;
        this.displayedColumns = ['Rut Paciente', 'Nombre', 'Medicamento'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalMedicamentos = [];
        this.totalAlergiasMedicamentosPaciente = [];
        this.arrayAlergiasMedicamentosPaciente = [];
        this.totalPacientes = [];
        this.totalPersonas = [];
        this.actualizarAtributos();
    }
    AlergiaspacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'AlergiasMedicamentosPaciente');
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
    AlergiaspacienteComponent.prototype.isAllSelected = function () {
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
    AlergiaspacienteComponent.prototype.masterToggle = function () {
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
    //función para setear el array con los registros del paciente correspondiente
    AlergiaspacienteComponent.prototype.obtenerArrayInicio = function (idPaciente, array, total) {
        for (var i = 0; i < total.length; i++) {
            if (total[i].Paciente_id === idPaciente) {
                if (total[i].fechaInicio != null) {
                    total[i].fechaTemp = new Date(total[i].fechaInicio);
                    total[i].esVerdadero = true;
                }
                else if (total[i].fechaInicio == null) {
                    total[i].fechaTemp = null;
                    total[i].esVerdadero = false;
                }
                array.push(total[i]);
            }
        }
    };
    AlergiaspacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicamentos = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioPersona.getPersonas().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalPersonas = todo;
                    _this.servicioAlergiasMedicamentosPaciente.getAlergiasMedicamentosPacientes().subscribe(function (data) {
                        var todo = data;
                        todo = todo.data;
                        _this.totalAlergiasMedicamentosPaciente = todo;
                        _this.reemplazarIdPorString();
                        //DATATABLE
                        _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalPacientes);
                        _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'AlergiasMedicamentosPaciente');
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
                });
            });
        });
    };
    AlergiaspacienteComponent.prototype.reemplazarIdPorString = function () {
        var _this = this;
        var _loop_1 = function (i) {
            for (var j = 0; j < this_1.totalAlergiasMedicamentosPaciente.length; j++) {
                if (this_1.totalPacientes[i].id === this_1.totalAlergiasMedicamentosPaciente[j].Paciente_id) {
                    var currentPersona = this_1.totalPersonas.filter(function (persona) { return persona.id === parseInt(_this.totalPacientes[i].Persona_id); });
                    this_1.totalPacientes[i].rut = currentPersona[0].rut;
                    this_1.totalPacientes[i].nombre = currentPersona[0].nombre1 + " " + currentPersona[0].nombre2 + " " + currentPersona[0].apellido1 + " " + currentPersona[0].apellido2;
                    break;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.totalPacientes.length; i++) {
            _loop_1(i);
        }
    };
    AlergiaspacienteComponent.prototype.edicionAlergiasMedicamentosPaciente = function (paciente) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(paciente));
        this.obtenerArrayInicio(a.id, this.arrayAlergiasMedicamentosPaciente, this.totalAlergiasMedicamentosPaciente);
        var dialogRef = this.dialog.open(editar_alergias_paciente_component_1.EditarAlergiasPacienteComponent, {
            width: '1000px',
            height: '700px',
            data: {
                paciente: a,
                medicamentos: this.totalMedicamentos,
                arrayAlergiasMedicamentosPaciente: this.arrayAlergiasMedicamentosPaciente,
                servicioMedicamento: this.servicioMedicamento,
                servicioAlergiasMedicamentosPaciente: this.servicioAlergiasMedicamentosPaciente
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarAtributos();
            _this.arrayAlergiasMedicamentosPaciente = [];
        });
    };
    //función para mostrar la ficha médica del paciente correspondiente
    AlergiaspacienteComponent.prototype.desplegarFichaPaciente = function (paciente) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(paciente));
        var b;
        this.servicioPaciente.getPaciente(a.id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            b = todo;
            _this.servicioPersona.getPersona(parseInt(b.Persona_id)).subscribe(function (data) {
                var persona = data;
                persona = persona.data;
                console.log(persona);
                var dialogRef = _this.dialog.open(verfichamedica_component_1.VerFichaMedicaComponent, {
                    width: '1000px',
                    height: '700px',
                    data: { persona: persona }
                });
            });
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], AlergiaspacienteComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], AlergiaspacienteComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], AlergiaspacienteComponent.prototype, "filter", void 0);
    AlergiaspacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-alergiaspaciente',
            templateUrl: './alergiaspaciente.component.html',
            styleUrls: ['./alergiaspaciente.component.css']
        }),
        __metadata("design:paramtypes", [alergias_medicamentos_paciente_service_1.AlergiasMedicamentosPacienteService,
            medicamento_service_1.MedicamentoService, paciente_service_1.PacienteService,
            persona_service_1.PersonaService, material_2.MatDialog])
    ], AlergiaspacienteComponent);
    return AlergiaspacienteComponent;
}());
exports.AlergiaspacienteComponent = AlergiaspacienteComponent;
//# sourceMappingURL=alergiaspaciente.component.js.map