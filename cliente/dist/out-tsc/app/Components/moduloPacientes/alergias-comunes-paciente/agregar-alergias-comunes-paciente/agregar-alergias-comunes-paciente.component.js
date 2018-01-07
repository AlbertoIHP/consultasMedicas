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
var AlergiasComunesPaciente_model_1 = require("../../../../Models/AlergiasComunesPaciente.model");
var forms_1 = require("@angular/forms");
var startWith_1 = require("rxjs/operators/startWith");
var map_1 = require("rxjs/operators/map");
var AgregarAlergiasComunesPacienteComponent = /** @class */ (function () {
    function AgregarAlergiasComunesPacienteComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.options = {
            minYear: 1970,
            maxYear: 2030,
            displayFormat: 'YYYY[-]MM[-]DD',
            barTitleFormat: 'MMMM YYYY',
            firstCalendarDay: 0,
        };
        this.nuevaAlergiasComunesPaciente = new AlergiasComunesPaciente_model_1.AlergiasComunesPaciente();
        this.totalAlergiasComunes = data.alergiasComunes;
        this.totalPacientes = data.pacientes;
        this.totalPersonas = data.personas;
        this.totalPersonasTemp = [];
        this.servicioAlergiasComunesPaciente = data.servicioAlergiasComunesPaciente;
        this.servicioAlergiaComun = data.servicioAlergiaComun;
        this.servicioPaciente = data.servicioPaciente;
        console.log(this.totalPersonas);
        console.log(this.totalPacientes);
    }
    AgregarAlergiasComunesPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioAlergiaComun.getAlergias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalAlergiasComunes = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.reemplazarIdPorString();
            });
        });
        this.personaCtrl = new forms_1.FormControl();
        this.filteredPersonas = this.personaCtrl.valueChanges
            .pipe(startWith_1.startWith(''), map_1.map(function (persona) { return persona ? _this.filterPersonas(persona) : _this.totalPersonasTemp.slice(); }));
    };
    AgregarAlergiasComunesPacienteComponent.prototype.filterPersonas = function (rut) {
        return this.totalPersonasTemp.filter(function (persona) {
            return persona.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0;
        });
    };
    AgregarAlergiasComunesPacienteComponent.prototype.reemplazarIdPorString = function () {
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
        console.log(this.totalPersonasTemp);
    };
    AgregarAlergiasComunesPacienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarAlergiasComunesPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-alergias-comunes-paciente',
            templateUrl: './agregar-alergias-comunes-paciente.component.html',
            styleUrls: ['./agregar-alergias-comunes-paciente.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarAlergiasComunesPacienteComponent);
    return AgregarAlergiasComunesPacienteComponent;
}());
exports.AgregarAlergiasComunesPacienteComponent = AgregarAlergiasComunesPacienteComponent;
//# sourceMappingURL=agregar-alergias-comunes-paciente.component.js.map