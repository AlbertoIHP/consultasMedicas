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
var material_1 = require("@angular/material");
var HabitosPaciente_model_1 = require("../../../../Models/HabitosPaciente.model");
var AgregarHabitosPacienteComponent = /** @class */ (function () {
    function AgregarHabitosPacienteComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.options = {
            minYear: 1970,
            maxYear: 2030,
            displayFormat: 'YYYY[-]MM[-]DD',
            barTitleFormat: 'MMMM YYYY',
            firstCalendarDay: 0,
        };
        this.nuevoHabitosPaciente = new HabitosPaciente_model_1.HabitosPaciente();
        this.totalHabitos = data.habitos;
        this.totalPacientes = data.pacientes;
        this.totalPersonas = data.personas;
        this.totalPersonasTemp = [];
        this.servicioHabitosPaciente = data.servicioHabitosPaciente;
        this.servicioHabito = data.servicioHabito;
        this.servicioPaciente = data.servicioPaciente;
    }
    AgregarHabitosPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioHabito.getHabitos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalHabitos = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.reemplazarIdPorString();
            });
        });
    };
    AgregarHabitosPacienteComponent.prototype.reemplazarIdPorString = function () {
        var arrayTemp = [];
        for (var i = 0; i < this.totalPersonas.length; i++) {
            for (var j = 0; j < this.totalPacientes.length; j++) {
                if (this.totalPacientes[j].Persona_id === this.totalPersonas[i].id) {
                    this.totalPersonas[i].Paciente_id = this.totalPacientes[j].id;
                    arrayTemp.push(this.totalPersonas[i]);
                }
                //let currentPersona = this.totalPersonas.filter( persona => persona.id === this.totalPacientes[j].Persona_id);
            }
        }
        this.totalPersonasTemp = arrayTemp;
    };
    AgregarHabitosPacienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarHabitosPacienteComponent.prototype.agregarHabitosPaciente = function () {
        var _this = this;
        this.nuevoHabitosPaciente.fechaInicio = new Date(this.nuevoHabitosPaciente.fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
        this.servicioHabitosPaciente.registerHabitosPaciente(this.nuevoHabitosPaciente).subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    AgregarHabitosPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-habitos-paciente',
            templateUrl: './agregar-habitos-paciente.component.html',
            styleUrls: ['./agregar-habitos-paciente.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarHabitosPacienteComponent);
    return AgregarHabitosPacienteComponent;
}());
exports.AgregarHabitosPacienteComponent = AgregarHabitosPacienteComponent;
//# sourceMappingURL=agregar-habitos-paciente.component.js.map