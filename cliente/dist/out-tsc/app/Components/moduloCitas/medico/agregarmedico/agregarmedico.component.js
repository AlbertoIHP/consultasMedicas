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
        this.horarios = [{ id: 0, Medico_id: 0, dia: '', horaInicio: '', horaFin: '' }];
        this.dias = [
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
            'Domingo'
        ];
        this.horasDia = [
            '8:30',
            '9:00',
            '9:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00'
        ];
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
        //this.horasInicio = this.horasDia;
        //this.horasFin = this.horasDia;
    }
    AgregarmedicoComponent.prototype.agregarHorario = function () {
        var validacion = [];
        validacion = this.verificarHoras();
        if (validacion[0]) {
            alert("Hay campos vacíos");
        }
        else if (!validacion[1]) {
            alert("La hora de inicio debe ser menor que la hora de término");
        }
        else {
            this.horarios.push({ id: 0, Medico_id: 0, dia: '', horaInicio: '', horaFin: '' });
        }
        //this.horasInicio = this.horasDia;
        //this.horasFin = this.horasDia;
    };
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
            _this.totalEspecialidades = _this.normalizeData(data);
        });
    };
    AgregarmedicoComponent.prototype.actualizarMedicos = function () {
        var _this = this;
        this.servicioMedico.getMedicos().subscribe(function (data) {
            _this.totalMedicos = _this.normalizeData(data);
            _this.filtrarMedicosRegistrados();
        });
    };
    AgregarmedicoComponent.prototype.normalizeData = function (todo) {
        return todo.data;
    };
    AgregarmedicoComponent.prototype.agregarMedico = function () {
        var _this = this;
        var duplicado = false;
        var validacion = [];
        validacion = this.verificarHoras();
        for (var m = 0; m < this.horarios.length; m++) {
            for (var n = 0; n < this.horarios.length; n++) {
                if (m != n && this.horarios[m].horaInicio === this.horarios[n].horaInicio &&
                    this.horarios[m].horaFin === this.horarios[n].horaFin &&
                    this.horarios[m].dia === this.horarios[n].dia) {
                    duplicado = true;
                }
            }
        }
        if (validacion[0]) {
            alert("Hay campos vacíos");
        }
        else if (!validacion[1]) {
            alert("La hora de inicio debe ser menor que la hora de término");
        }
        else if (duplicado) {
            alert("No pueden existir horarios duplicados");
        }
        else {
            this.servicioMedico.registerMedico(this.medico).subscribe(function (data) {
                _this.servicioMedico.getMedicos().subscribe(function (data) {
                    var all = _this.normalizeData(data);
                    var currentMedico = all.filter(function (medico) { return parseInt(medico.Persona_id) === parseInt(_this.medico.Persona_id); });
                    _this.medico = currentMedico[0];
                    console.log(_this.medico);
                    for (var _i = 0, _a = _this.horarios; _i < _a.length; _i++) {
                        var horario = _a[_i];
                        horario.Medico_id = _this.medico.id;
                        _this.servicioDisponibilidad.registerDisponibilidad(horario).subscribe(function (data) {
                            console.log(data);
                        });
                    }
                    _this.onNoClick();
                });
            }, 
            //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
            function (err) {
                if (err === 'Used') {
                    alert("Esta persona ya tiene asignado un médico");
                }
            });
        }
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
    AgregarmedicoComponent.prototype.verificarHoras = function () {
        var inicio = [];
        var fin = [];
        var dia = [];
        var correcto = true;
        var vacio = false;
        for (var i = 0; i < this.horarios.length; i++) {
            dia.push(this.horarios[i].dia);
            for (var j = 0; j < this.horasDia.length; j++) {
                if (this.horasDia[j] === this.horarios[i].horaInicio || this.horarios[i].horaInicio === '') {
                    inicio.push(j);
                }
            }
            for (var k = 0; k < this.horasDia.length; k++) {
                if (this.horasDia[k] === this.horarios[i].horaFin || this.horarios[i].horaFin === '') {
                    fin.push(k);
                }
            }
        }
        for (var l = 0; l < inicio.length; l++) {
            if (fin[l] === '' || inicio[l] === '' || dia[l] === '') {
                vacio = true;
            }
            if (fin[l] <= inicio[l]) {
                correcto = false;
                break;
            }
        }
        var validacion = [];
        validacion.push(vacio);
        validacion.push(correcto);
        console.log(validacion);
        return validacion;
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