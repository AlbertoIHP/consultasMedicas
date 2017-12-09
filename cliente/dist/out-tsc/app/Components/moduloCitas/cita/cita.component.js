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
var medico_service_1 = require("../../../Services/medico/medico.service");
var paciente_service_1 = require("../../../Services/paciente/paciente.service");
var box_consulta_service_1 = require("../../../Services/boxconsulta/box-consulta.service");
var estado_cita_service_1 = require("../../../Services/estadocita/estado-cita.service");
var Cita_model_1 = require("../../../Models/Cita.model");
var cita_service_1 = require("../../../Services/cita/cita.service");
var persona_service_1 = require("../../../Services/persona/persona.service");
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var agregarcita_component_1 = require("./agregarcita/agregarcita.component");
var editarcita_component_1 = require("./editarcita/editarcita.component");
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
var CitaComponent = /** @class */ (function () {
    function CitaComponent(servicioPersona, servicioCita, servicioBox, servicioEstado, servicioPaciente, servicioMedico, dialog) {
        this.servicioPersona = servicioPersona;
        this.servicioCita = servicioCita;
        this.servicioBox = servicioBox;
        this.servicioEstado = servicioEstado;
        this.servicioPaciente = servicioPaciente;
        this.servicioMedico = servicioMedico;
        this.dialog = dialog;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['Acciones', 'Fecha', 'Hora', 'Estado', 'Box', 'Paciente', 'Medico'];
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalCitas = [];
        this.totalEstados = [];
        this.totalMedicos = [];
        this.totalPacientes = [];
        this.totalBoxs = [];
        this.totalPersonas = [];
        this.actualizarBoxs();
    }
    CitaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Citas');
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
    CitaComponent.prototype.isAllSelected = function () {
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
    CitaComponent.prototype.masterToggle = function () {
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
    CitaComponent.prototype.actualizarBoxs = function () {
        var _this = this;
        this.servicioBox.getBoxConsultas().subscribe(function (data) {
            _this.totalBoxs = _this.normalizeData(data);
            _this.actualizarPacientes();
        });
    };
    CitaComponent.prototype.actualizarPacientes = function () {
        var _this = this;
        this.servicioPaciente.getPacientes().subscribe(function (data) {
            _this.totalPacientes = _this.normalizeData(data);
            _this.actualizarMedicos();
        });
    };
    CitaComponent.prototype.actualizarMedicos = function () {
        var _this = this;
        this.servicioMedico.getMedicos().subscribe(function (data) {
            _this.totalMedicos = _this.normalizeData(data);
            _this.actualizarEstados();
        });
    };
    CitaComponent.prototype.actualizarEstados = function () {
        var _this = this;
        this.servicioEstado.getEstadoCitas().subscribe(function (data) {
            _this.totalEstados = _this.normalizeData(data);
            _this.actualizarCitas();
        });
    };
    CitaComponent.prototype.actualizarCitas = function () {
        var _this = this;
        this.servicioCita.getCitas().subscribe(function (data) {
            _this.totalCitas = _this.normalizeData(data);
            console.log(_this.totalCitas);
            _this.idToString();
        });
    };
    CitaComponent.prototype.idToString = function () {
        var _this = this;
        var _loop_1 = function (cita) {
            var currentEstado = this_1.totalEstados.filter(function (estado) { return estado.id === parseInt(_this.totalCitas[cita].EstadoCita_id); });
            var currentBox = this_1.totalBoxs.filter(function (box) { return box.id === parseInt(_this.totalCitas[cita].BoxConsulta_id); });
            var currentPaciente = this_1.totalPacientes.filter(function (paciente) { return paciente.id === parseInt(_this.totalCitas[cita].Paciente_id); });
            var currentMedico = this_1.totalMedicos.filter(function (doc) { return doc.id === parseInt(_this.totalCitas[cita].Medico_id); });
            this_1.totalCitas[cita].EstadoCita_id = currentEstado[0].nombre.toString();
            this_1.totalCitas[cita].BoxConsulta_id = currentBox[0].ubicacion.toString();
            this_1.servicioPersona.getPersona(currentPaciente[0].id).subscribe(function (data) {
                _this.totalCitas[cita].Paciente_id = _this.normalizeData(data).rut.toString();
                console.log(_this.normalizeData(data));
                _this.servicioPersona.getPersona(currentMedico[0].id).subscribe(function (data) {
                    _this.totalCitas[cita].Medico_id = _this.normalizeData(data).rut.toString();
                });
            });
        };
        var this_1 = this;
        for (var cita = 0; cita < this.totalCitas.length; cita++) {
            _loop_1(cita);
        }
        //DATATABLE
        this.exampleDatabase = new datasource_component_1.ExampleDatabase(this.totalCitas);
        this.dataSource = new datasource_component_1.ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Citas');
        Observable_1.Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filter.nativeElement.value;
        });
    };
    CitaComponent.prototype.normalizeData = function (todo) {
        return todo.data;
    };
    CitaComponent.prototype.eliminarCita = function (cita) {
        var _this = this;
        this.servicioCita.deleteCita(cita.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarBoxs();
        });
    };
    CitaComponent.prototype.abrirModal = function (funcion, cita) {
        var _this = this;
        var currentCita;
        if (!(currentCita = cita)) {
            currentCita = new Cita_model_1.Cita();
        }
        var modal;
        if (funcion === 'agregar') {
            modal = agregarcita_component_1.AgregarcitaComponent;
        }
        else {
            modal = editarcita_component_1.EditarcitaComponent;
        }
        var dialogRef = this.dialog.open(modal, {
            width: '1000px',
            data: {
                cita: currentCita,
                estados: this.totalEstados,
                pacientes: this.totalPacientes,
                medicos: this.totalMedicos,
                boxs: this.totalBoxs,
                servicioCitas: this.servicioCita
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarBoxs();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], CitaComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], CitaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], CitaComponent.prototype, "filter", void 0);
    CitaComponent = __decorate([
        core_1.Component({
            selector: 'app-cita',
            styleUrls: ['cita.component.css'],
            templateUrl: 'cita.component.html'
        }),
        __metadata("design:paramtypes", [persona_service_1.PersonaService,
            cita_service_1.CitaService,
            box_consulta_service_1.BoxConsultaService,
            estado_cita_service_1.EstadoCitaService,
            paciente_service_1.PacienteService,
            medico_service_1.MedicoService,
            material_2.MatDialog])
    ], CitaComponent);
    return CitaComponent;
}());
exports.CitaComponent = CitaComponent;
//# sourceMappingURL=cita.component.js.map