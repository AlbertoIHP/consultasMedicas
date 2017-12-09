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
var EditarmedicoComponent = /** @class */ (function () {
    function EditarmedicoComponent(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.horasDia = ['8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
        this.personasDisponibles = [];
        this.medico = data.medico;
        console.log(this.medico);
        this.totalMedicos = data.medicos;
        this.totalPersonas = data.personas;
        this.totalEspecialidades = data.especialidades;
        this.servicioMedico = data.servicioMedico;
        this.servicioPersona = data.servicioPersona;
        this.servicioEspecialidad = data.servicioEspecialidad;
        this.personasDisponibles = this.totalPersonas;
        this.servicioDisponibilidad = data.servicioDisponibilidad;
        this.servicioDisponibilidad.getDisponibilidads().subscribe(function (data) {
            var all = _this.normalizeData(data);
            _this.horarios = all.filter(function (dis) { return parseInt(dis.Medico_id) === parseInt(_this.medico.id); });
        });
    }
    EditarmedicoComponent.prototype.ngOnInit = function () {
        this.actualizarPersonas();
        this.actualizarEspecialidades();
        this.actualizarMedicos();
    };
    EditarmedicoComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
            _this.personasDisponibles = _this.totalPersonas;
            _this.actualizarMedicos();
        });
    };
    EditarmedicoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarmedicoComponent.prototype.actualizarEspecialidades = function () {
        var _this = this;
        this.servicioEspecialidad.getEspecialidads().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEspecialidades = todo;
        });
    };
    EditarmedicoComponent.prototype.actualizarMedicos = function () {
        var _this = this;
        this.servicioMedico.getMedicos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicos = todo;
            _this.filtrarMedicosRegistrados();
        });
    };
    EditarmedicoComponent.prototype.normalizeData = function (todo) {
        return todo.data;
    };
    EditarmedicoComponent.prototype.agregarMedico = function () {
        var _this = this;
        this.servicioMedico.editMedico(this.medico, this.medico.id).subscribe(function (data) {
            for (var _i = 0, _a = _this.horarios; _i < _a.length; _i++) {
                var horario = _a[_i];
                _this.servicioDisponibilidad.editDisponibilidad(horario, horario.id).subscribe(function (data) { console.log(data); });
            }
            _this.onNoClick();
        });
    };
    EditarmedicoComponent.prototype.filtrarMedicosRegistrados = function () {
        for (var i = 0; i < this.totalMedicos.length; i++) {
            for (var j = 0; j < this.personasDisponibles.length; j++) {
                if (this.totalMedicos[i].Persona_id === this.personasDisponibles[j].id) {
                    this.personasDisponibles.splice(j, 1);
                }
            }
        }
    };
    EditarmedicoComponent = __decorate([
        core_1.Component({
            selector: 'app-editarmedico',
            templateUrl: './editarmedico.component.html',
            styleUrls: ['./editarmedico.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], EditarmedicoComponent);
    return EditarmedicoComponent;
}());
exports.EditarmedicoComponent = EditarmedicoComponent;
//# sourceMappingURL=editarmedico.component.js.map