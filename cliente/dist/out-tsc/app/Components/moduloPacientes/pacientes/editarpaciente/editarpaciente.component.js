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
var EditarpacienteComponent = /** @class */ (function () {
    function EditarpacienteComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.personasDisponibles = [];
        this.paciente = data.paciente;
        this.totalPacientes = data.pacientes;
        this.totalPersonas = data.personas;
        this.totalTS = data.tipoSangres;
        this.servicioPaciente = data.servicioPaciente;
        this.servicioPersona = data.servicioPersona;
        this.servicioTS = data.servicioTS;
        this.personasDisponibles = this.totalPersonas;
    }
    EditarpacienteComponent.prototype.ngOnInit = function () {
        this.actualizarPersonas();
        this.actualizarTS();
        this.actualizarPacientes();
    };
    EditarpacienteComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
            _this.personasDisponibles = _this.totalPersonas;
            _this.actualizarPacientes();
        });
    };
    EditarpacienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarpacienteComponent.prototype.actualizarTS = function () {
        var _this = this;
        this.servicioTS.getTipoSangres().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalTS = todo;
        });
    };
    EditarpacienteComponent.prototype.actualizarPacientes = function () {
        var _this = this;
        this.servicioPaciente.getPacientes().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPacientes = todo;
            _this.filtrarPacientesRegistrados();
        });
    };
    EditarpacienteComponent.prototype.editarPaciente = function () {
        var _this = this;
        this.servicioPaciente.editPaciente(this.paciente, this.paciente.id).subscribe(function (data) {
            _this.dialogRef.close();
        }, 
        //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
        function (err) {
            if (err === 'Used') {
                alert("Esta persona ya tiene asignado un paciente");
            }
        });
    };
    EditarpacienteComponent.prototype.filtrarPacientesRegistrados = function () {
        for (var i = 0; i < this.totalPacientes.length; i++) {
            for (var j = 0; j < this.personasDisponibles.length; j++) {
                if (this.totalPacientes[i].Persona_id === this.personasDisponibles[j].id) {
                    this.personasDisponibles.splice(j, 1);
                }
            }
        }
    };
    EditarpacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-editarpaciente',
            templateUrl: './editarpaciente.component.html',
            styleUrls: ['./editarpaciente.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], EditarpacienteComponent);
    return EditarpacienteComponent;
}());
exports.EditarpacienteComponent = EditarpacienteComponent;
//# sourceMappingURL=editarpaciente.component.js.map