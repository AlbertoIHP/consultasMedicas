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
var AgregarmedicoComponent = /** @class */ (function () {
    function AgregarmedicoComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.horarios = [
            { dia: 'Lunes', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0 },
            { dia: 'Martes', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0 },
            { dia: 'Miercoles', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0 },
            { dia: 'Jueves', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0 },
            { dia: 'Viernes', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0 },
            { dia: 'Sabado', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0 },
            { dia: 'Domingo', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0 },
        ];
        this.horasDia = ['8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
        this.personasDisponibles = [];
        this.medico = data.medico;
        this.totalMedicos = data.medicos;
        this.totalPersonas = data.personas;
        this.totalEspecialidades = data.especialidades;
        this.servicioMedico = data.servicioMedico;
        this.servicioPersona = data.servicioPersona;
        this.servicioEspecialidad = data.servicioEspecialidad;
        this.personasDisponibles = this.totalPersonas;
        this.servicioDisponibilidad = data.servicioDisponibilidad;
    }
    AgregarmedicoComponent.prototype.ngOnInit = function () {
        this.actualizarPersonas();
        this.actualizarEspecialidades();
        this.actualizarMedicos();
    };
    AgregarmedicoComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
            _this.personasDisponibles = _this.totalPersonas;
            _this.actualizarMedicos();
        });
    };
    AgregarmedicoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarmedicoComponent.prototype.actualizarEspecialidades = function () {
        var _this = this;
        this.servicioEspecialidad.getEspecialidads().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEspecialidades = todo;
        });
    };
    AgregarmedicoComponent.prototype.actualizarMedicos = function () {
        var _this = this;
        this.servicioMedico.getMedicos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicos = todo;
            _this.filtrarMedicosRegistrados();
        });
    };
    AgregarmedicoComponent.prototype.normalizeData = function (todo) {
        return todo.data;
    };
    AgregarmedicoComponent.prototype.agregarMedico = function () {
        var _this = this;
        this.servicioMedico.registerMedico(this.medico).subscribe(function (data) {
            _this.servicioMedico.getMedicos().subscribe(function (data) {
                var all = _this.normalizeData(data);
                var currentMedico = all.filter(function (medico) { return parseInt(medico.Persona_id) === parseInt(_this.medico.Persona_id); });
                for (var i = 0; i < _this.horarios.length; i++) {
                    _this.horarios[i].Medico_id = currentMedico[0].id;
                    _this.servicioDisponibilidad.registerDisponibilidad(_this.horarios[i]).subscribe(function (data) {
                        console.log("Hola");
                    });
                }
                console.log(_this.horarios);
                console.log(currentMedico[0]);
                _this.onNoClick();
            });
        }, 
        //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
        function (err) {
            if (err === 'Used') {
                alert("Esta persona ya tiene asignado un médico");
            }
        });
    };
    AgregarmedicoComponent.prototype.filtrarMedicosRegistrados = function () {
        for (var i = 0; i < this.totalMedicos.length; i++) {
            for (var j = 0; j < this.personasDisponibles.length; j++) {
                if (this.totalMedicos[i].Persona_id === this.personasDisponibles[j].id) {
                    this.personasDisponibles.splice(j, 1);
                }
            }
        }
    };
    AgregarmedicoComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarmedico',
            templateUrl: './agregarmedico.component.html',
            styleUrls: ['./agregarmedico.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarmedicoComponent);
    return AgregarmedicoComponent;
}());
exports.AgregarmedicoComponent = AgregarmedicoComponent;
//# sourceMappingURL=agregarmedico.component.js.map