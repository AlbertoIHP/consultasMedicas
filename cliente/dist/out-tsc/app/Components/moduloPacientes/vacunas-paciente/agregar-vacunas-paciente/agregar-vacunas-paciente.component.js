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
var VacunasPaciente_model_1 = require("../../../../Models/VacunasPaciente.model");
var AgregarVacunasPacienteComponent = /** @class */ (function () {
    /*
       pasarStringId()
      {
       
        
        let currentPaciente = this.totalPacientes.filter( paciente => paciente.Persona_id === this.nuevaVacunasPaciente.Paciente_id);
        console.log(currentPaciente);
        this.nuevaVacunasPaciente.Paciente_id=currentPaciente[0].id;
    
      }
      
      */
    function AgregarVacunasPacienteComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.options = {
            minYear: 1970,
            maxYear: 2030,
            displayFormat: 'YYYY[-]MM[-]DD',
            barTitleFormat: 'MMMM YYYY',
            firstCalendarDay: 0,
        };
        this.nuevaVacunasPaciente = new VacunasPaciente_model_1.VacunasPaciente();
        this.totalVacunas = data.vacunas;
        this.totalPacientes = data.pacientes;
        this.totalPersonas = data.personas;
        this.totalPersonasTemp = [];
        this.servicioVacunasPaciente = data.servicioVacunasPaciente;
        this.servicioVacuna = data.servicioVacuna;
        this.servicioPaciente = data.servicioPaciente;
    }
    AgregarVacunasPacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioVacuna.getVacunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalVacunas = todo;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.reemplazarIdPorString();
            });
        });
    };
    AgregarVacunasPacienteComponent.prototype.reemplazarIdPorString = function () {
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
    AgregarVacunasPacienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarVacunasPacienteComponent.prototype.agregarVacunasPaciente = function () {
        var _this = this;
        this.nuevaVacunasPaciente.fechaVacunacion = new Date(this.nuevaVacunasPaciente.fechaVacunacion).toISOString().slice(0, 19).replace('T', ' ');
        this.servicioVacunasPaciente.registerVacunaPaciente(this.nuevaVacunasPaciente).subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    AgregarVacunasPacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-vacunas-paciente',
            templateUrl: './agregar-vacunas-paciente.component.html',
            styleUrls: ['./agregar-vacunas-paciente.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarVacunasPacienteComponent);
    return AgregarVacunasPacienteComponent;
}());
exports.AgregarVacunasPacienteComponent = AgregarVacunasPacienteComponent;
//# sourceMappingURL=agregar-vacunas-paciente.component.js.map