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
var UsoMedicamento_model_1 = require("../../../../Models/UsoMedicamento.model");
var AgregarUsoMedicamentoComponent = /** @class */ (function () {
    function AgregarUsoMedicamentoComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.options = {
            minYear: 1970,
            maxYear: 2030,
            displayFormat: 'YYYY[-]MM[-]DD',
            barTitleFormat: 'MMMM YYYY',
            firstCalendarDay: 0,
        };
        this.nuevoUsoMedicamento = new UsoMedicamento_model_1.UsoMedicamento();
        this.totalMedicamentos = data.vacunas;
        this.totalPacientes = data.pacientes;
        this.totalPersonas = data.personas;
        this.totalPersonasTemp = [];
        this.servicioUsoMedicamento = data.servicioUsoMedicamento;
        this.servicioMedicamento = data.servicioMedicamento;
        this.servicioPaciente = data.servicioPaciente;
    }
    AgregarUsoMedicamentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicamentos = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.reemplazarIdPorString();
            });
        });
    };
    AgregarUsoMedicamentoComponent.prototype.reemplazarIdPorString = function () {
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
    AgregarUsoMedicamentoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarUsoMedicamentoComponent.prototype.agregarUsoMedicamentos = function () {
        var _this = this;
        this.nuevoUsoMedicamento.fechaInicio = new Date(this.nuevoUsoMedicamento.fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
        this.servicioUsoMedicamento.registerUsoMedicamento(this.nuevoUsoMedicamento).subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    AgregarUsoMedicamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-uso-medicamento',
            templateUrl: './agregar-uso-medicamento.component.html',
            styleUrls: ['./agregar-uso-medicamento.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarUsoMedicamentoComponent);
    return AgregarUsoMedicamentoComponent;
}());
exports.AgregarUsoMedicamentoComponent = AgregarUsoMedicamentoComponent;
//# sourceMappingURL=agregar-uso-medicamento.component.js.map