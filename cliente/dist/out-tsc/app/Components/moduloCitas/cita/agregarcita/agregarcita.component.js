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
var forms_1 = require("@angular/forms");
var especialidad_service_1 = require("../../../../Services/especialidad/especialidad.service");
var persona_service_1 = require("../../../../Services/persona/persona.service");
var disponibilidad_service_1 = require("../../../../Services/disponibilidad/disponibilidad.service");
var AgregarcitaComponent = /** @class */ (function () {
    function AgregarcitaComponent(dialogRef, data, _formBuilder, servicioEspecialidad, servicioPersona, servicioDisponibilidad) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this._formBuilder = _formBuilder;
        this.servicioEspecialidad = servicioEspecialidad;
        this.servicioPersona = servicioPersona;
        this.servicioDisponibilidad = servicioDisponibilidad;
        this.viewDate = new Date();
        this.events = [];
        this.text = "hola";
        this.fechaSeleccionada = true;
        //pagina de paginator
        this.p = 1;
        this.todoListo = true;
        this.seSeleccionoMedico = true;
        this.mostrarBoxs = [];
        this.mostrarMedicos = [];
        this.especialidades = [];
        this.disponibilidades = [];
        this.cita = data.cita;
        if (!(this.cita.BoxConsulta_id != 0)) {
            this.cita.BoxConsulta_id = 0;
        }
        if (!(this.cita.hora != '')) {
            this.cita.hora = '';
        }
        this.estados = data.estados;
        this.pacientes = data.pacientes;
        this.medicos = data.medicos;
        this.boxs = data.boxs;
        this.servicioCitas = data.servicioCitas;
        this.horasDia = ['8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
        this.horasMedicos = [];
        this.servicioCitas.getCitas().subscribe(function (data) {
            _this.citas = _this.normalizeData(data);
        });
        this.servicioDisponibilidad.getDisponibilidads().subscribe(function (data) {
            _this.disponibilidades = _this.normalizeData(data);
        });
        this.servicioEspecialidad.getEspecialidads().subscribe(function (data) {
            _this.especialidades = _this.normalizeData(data);
        });
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var totalPersonas = _this.normalizeData(data);
            var _loop_1 = function (j) {
                var currentPersona = totalPersonas.filter(function (persona) { return persona.id === parseInt(_this.medicos[j].Persona_id); });
                var currentEspecialidad = _this.especialidades.filter(function (especialidad) { return especialidad.id === parseInt(_this.medicos[j].Especialidad_id); });
                _this.medicos[j].nombres = currentPersona[0].nombre1 + ' ' + currentPersona[0].nombre2;
                _this.medicos[j].apellidos = currentPersona[0].apellido1 + ' ' + currentPersona[0].apellido2;
                _this.medicos[j].rut = currentPersona[0].rut;
                _this.medicos[j].especialidad = currentEspecialidad[0].nombre;
                _this.obtenerDisponibilidad(_this.medicos[j]);
                console.log(_this.medicos[j]);
            };
            for (var j = 0; j < _this.medicos.length; j++) {
                _loop_1(j);
            }
            var _loop_2 = function (j) {
                var currentPersona = totalPersonas.filter(function (persona) { return persona.id === parseInt(_this.pacientes[j].Persona_id); });
                _this.pacientes[j].nombre = '(' + currentPersona[0].rut + ') ' + currentPersona[0].nombre1 + ' ' + currentPersona[0].apellido1;
            };
            for (var j = 0; j < _this.pacientes.length; j++) {
                _loop_2(j);
            }
        });
    }
    AgregarcitaComponent.prototype.estaTodoListo = function () {
        if (this.cita.BoxConsulta_id != 0 && this.cita.hora != '') {
            this.todoListo = false;
        }
        else {
            this.todoListo = true;
        }
    };
    AgregarcitaComponent.prototype.horaSeleccionada = function (disponibilidad, medico) {
        this.cita.Disponibilidad_id = disponibilidad.id;
        this.cita.Medico_id = medico.id;
        this.seSeleccionoMedico = false;
        this.horasMedicos = [];
        console.log(this.cita);
        console.log(disponibilidad);
        var inicio = parseInt(disponibilidad.horaInicio.split(':')[0]);
        var inicio2 = disponibilidad.horaInicio.split(':')[1];
        var fin = parseInt(disponibilidad.horaFin.split(':')[0]);
        var fin2 = disponibilidad.horaFin.split(':')[1];
        for (var i = inicio; i <= fin; i++) {
            if (inicio2 === '00' && fin2 === '00') {
                this.horasMedicos.push(i.toString() + ':00');
                if (i != fin) {
                    this.horasMedicos.push(i.toString() + ':30');
                }
            }
            else if (inicio2 === '30' && fin2 === '30') {
                this.horasMedicos.push(i.toString() + ':30');
                if ((i + 1) < fin) {
                    this.horasMedicos.push(i.toString() + ':00');
                }
            }
            else if (inicio2 === '00' && fin2 === '30') {
                this.horasMedicos.push(i.toString() + ':00');
                this.horasMedicos.push(i.toString() + ':30');
            }
            else if (inicio2 === '30' && fin2 === '00') {
                if ((i + 1) < fin) {
                    this.horasMedicos.push(i.toString() + ':30');
                    this.horasMedicos.push(i.toString() + ':00');
                }
            }
        }
    };
    AgregarcitaComponent.prototype.normalizeData = function (todo) {
        return todo.data;
    };
    AgregarcitaComponent.prototype.filtrarMedicos = function (especialidad) {
        var _this = this;
        this.especialidadSeleccionada = especialidad;
        this.wardmeds = this.medicos;
        this.warBoxs = this.boxs;
        this.mostrarBoxs = this.warBoxs.filter(function (box) { return parseInt(box.TipoBox_id) === _this.especialidadSeleccionada.id; });
        console.log(this.mostrarBoxs);
        this.mostrarMedicos = this.wardmeds.filter(function (medico) { return parseInt(medico.Especialidad_id) === _this.especialidadSeleccionada.id; });
    };
    AgregarcitaComponent.prototype.ngOnInit = function () {
        this.zeroFormGroup = this._formBuilder.group({
            zeroCtrl: ['', forms_1.Validators.required]
        });
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', forms_1.Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', forms_1.Validators.required]
        });
    };
    AgregarcitaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarcitaComponent.prototype.dayClicked = function (day) {
        if (this.selectedDay) {
            delete this.selectedDay.cssClass;
        }
        this.selectedDay = day;
        if (this.selectedDay.isFuture) {
            this.fechaSeleccionada = false;
            day.cssClass = 'cal-day-selected';
            var dia = this.selectedDay.date.toString().split(' ')[0];
            if (dia === 'Sun') {
                dia = 'Domingo';
            }
            else if (dia === 'Mon') {
                dia = 'Lunes';
            }
            else if (dia === 'Tue') {
                dia = 'Martes';
            }
            else if (dia === 'Wed') {
                dia = 'Miercoles';
            }
            else if (dia === 'Thu') {
                dia = 'Jueves';
            }
            else if (dia === 'Fri') {
                dia = 'Viernes';
            }
            else if (dia === 'Sat') {
                dia = 'Sabado';
            }
            this.diaSeleccionado = dia;
            console.log(JSON.stringify(this.mostrarMedicos));
            this.cita.fecha = dia + ' ' + this.selectedDay.date.toString().split(' ')[2] + '/' + this.selectedDay.date.toString().split(' ')[1] + '/' + this.selectedDay.date.toString().split(' ')[3];
        }
        else {
            alert("Ha seleccionado una fecha pasada");
        }
    };
    AgregarcitaComponent.prototype.agendarCita = function () {
        this.cita.EstadoCita_id = 1;
        console.log(this.cita);
        this.servicioCitas.registerCita(this.cita).subscribe(function (data) {
            console.log(data);
        });
    };
    AgregarcitaComponent.prototype.mostrarTodos = function (medico) {
        medico.mostrarTodasFechas = !medico.mostrarTodasFechas;
    };
    AgregarcitaComponent.prototype.obtenerDisponibilidad = function (medico) {
        var _this = this;
        this.servicioDisponibilidad.getDisponibilidads().subscribe(function (data) {
            var a = JSON.parse(JSON.stringify(medico));
            var disponibilidadMedico = _this.normalizeData(data);
            console.log(disponibilidadMedico);
            medico.disponibilidad = disponibilidadMedico.filter(function (dis) { return parseInt(dis.Medico_id) === a.id; });
            medico.mostrarTodasFechas = false;
        });
    };
    AgregarcitaComponent.prototype.beforeMonthViewRender = function (_a) {
        var _this = this;
        var body = _a.body;
        body.forEach(function (day) {
            if (_this.selectedDay && day.date.getTime() === _this.selectedDay.date.getTime()) {
                day.cssClass = 'cal-day-selected';
                _this.selectedDay = day;
            }
        });
    };
    AgregarcitaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarcita',
            templateUrl: './agregarcita.component.html',
            styleUrls: ['./agregarcita.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, forms_1.FormBuilder,
            especialidad_service_1.EspecialidadService,
            persona_service_1.PersonaService,
            disponibilidad_service_1.DisponibilidadService])
    ], AgregarcitaComponent);
    return AgregarcitaComponent;
}());
exports.AgregarcitaComponent = AgregarcitaComponent;
//# sourceMappingURL=agregarcita.component.js.map