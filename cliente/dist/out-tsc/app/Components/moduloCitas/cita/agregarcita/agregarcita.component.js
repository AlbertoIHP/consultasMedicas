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
        this.mostrarBoxs = [];
        this.mostrarMedicos = [];
        this.especialidades = [];
        this.disponibilidades = [];
        this.cita = data.cita;
        this.estados = data.estados;
        this.pacientes = data.pacientes;
        this.medicos = data.medicos;
        this.boxs = data.boxs;
        this.servicioCitas = data.servicioCitas;
        this.horasDia = ['8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
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
                _this.medicos[j].nombre = '(' + currentPersona[0].rut + ') ' + currentPersona[0].nombre1 + ' ' + currentPersona[0].apellido1;
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
    AgregarcitaComponent.prototype.normalizeData = function (todo) {
        return todo.data;
    };
    AgregarcitaComponent.prototype.filtrarMedicos = function (especialidad) {
        var _this = this;
        this.especialidadSeleccionada = especialidad;
        this.mostrarMedicos = this.wardmeds.filter(function (medico) { return parseInt(medico.Especialidad_id) === _this.especialidadSeleccionada.id; });
        this.mostrarBoxs = this.boxs.filter(function (box) { return parseInt(box.TipoBox_id) === _this.especialidadSeleccionada.id; });
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
            this.cita.fecha = dia + ' ' + this.selectedDay.date.toString().split(' ')[2] + '/' + this.selectedDay.date.toString().split(' ')[1] + '/' + this.selectedDay.date.toString().split(' ')[3];
        }
        else {
            alert("Ha seleccionado una fecha pasada");
        }
    };
    AgregarcitaComponent.prototype.agendarCita = function () {
        this.servicioCitas.registerCita(this.cita).subscribe(function (data) {
            console.log(data);
        });
    };
    AgregarcitaComponent.prototype.visualizarCita = function (box) {
        console.log(box);
        this.cita.BoxConsulta_id = box.id;
        this.cita.EstadoCita_id = 1;
        console.log(this.cita);
    };
    AgregarcitaComponent.prototype.filtrarPorHora = function (hora) {
        var _this = this;
        //Transformamos el formato de hora normal a numeros (EJ 14:00 -> 14000) para poder hacer calculos
        hora = hora.split(':')[0].toString() + hora.split(':')[1].toString();
        //Obtenemos el dia de la cita, que esta programado para que al aplicar una division en la cadena de texto sea el espacio 0 el que contiene el dia en español
        var dia = this.cita.fecha.split(' ')[0];
        //Buscamos en la tabla de disponibilidad aquellos valores que cumplan con los requisitos, en este caso solo el dia seleccionado
        var currentDisponibilidad = this.disponibilidades.filter(function (dis) { return dis.dia === dia && dis.hora_inicio != 'No disponible'; });
        var auxDisponibilidad = [];
        //Como hemos filtrado ademas por aquellos que solo estan disponibles
        //Transformamos la hora de inicio y termino a valores enteros para comparar
        //Si es que la hora seleccionada por el usuario esta entre los rangos del medico
        for (var _i = 0, currentDisponibilidad_1 = currentDisponibilidad; _i < currentDisponibilidad_1.length; _i++) {
            var dis = currentDisponibilidad_1[_i];
            var horas = dis.hora_inicio.split(':')[0];
            var minutos = dis.hora_inicio.split(':')[1];
            var totalInicio = horas.toString() + minutos.toString();
            horas = dis.hora_termino.split(':')[0];
            minutos = dis.hora_termino.split(':')[1];
            var totalTermino = horas.toString() + minutos.toString();
            //Si cumple esta condicion, entonces este medico debe ser considerado, y se guarda
            //el registro completo de la disponibilidad en el cual esta la ID del medico
            if (hora >= parseInt(totalInicio) && hora <= parseInt(totalTermino)) {
                auxDisponibilidad.push(dis);
            }
        }
        // Recorremos la lista configurada anteriormente
        //Para extraer solamente la ID del medico de dicho registro
        //Que en este caso es lo que importa
        var auxMedicoId = [];
        for (var _a = 0, auxDisponibilidad_1 = auxDisponibilidad; _a < auxDisponibilidad_1.length; _a++) {
            var dis = auxDisponibilidad_1[_a];
            auxMedicoId.push(dis.Medico_id);
        }
        //Esta linea permite eliminar registros duplicados, de manera que no tengasmo la misma id repetida
        auxMedicoId = auxMedicoId.filter(function (elem, index, self) { return index === self.indexOf(elem); });
        // Ahora filtramos la lista de medicos segun las id extraidas del proceso anterior
        // Dichos medicos, seran mostrados en el SELECT por que si estan disponibles
        this.mostrarMedicos = [];
        var _loop_3 = function (id) {
            this_1.mostrarMedicos.push(this_1.medicos.filter(function (med) { return med.id === parseInt(id); })[0]);
        };
        var this_1 = this;
        for (var _b = 0, auxMedicoId_1 = auxMedicoId; _b < auxMedicoId_1.length; _b++) {
            var id = auxMedicoId_1[_b];
            _loop_3(id);
        }
        //Ahora filtraremos segun las citas agendadas y no concretadas donde podremos sobreescribir una cita
        var filtroCitas = this.citas.filter(function (cita) { return cita.fecha === _this.cita.fecha && cita.hora === _this.cita.hora; });
        console.log(filtroCitas);
        // Ocupamos nuevamente la variable para guardar las id de los medicos esta vez la reinicializamos
        auxMedicoId = [];
        for (var _c = 0, filtroCitas_1 = filtroCitas; _c < filtroCitas_1.length; _c++) {
            var dis = filtroCitas_1[_c];
            auxMedicoId.push(dis.Medico_id);
        }
        console.log(auxMedicoId);
        //Ahora fitlraremos todos los ID de los medicos encontrados arriba
        var auxMedicos = this.mostrarMedicos;
        var _loop_4 = function (med) {
            auxMedicos = auxMedicos.filter(function (medico) { return parseInt(medico.id) != parseInt(med); });
        };
        for (var _d = 0, auxMedicoId_2 = auxMedicoId; _d < auxMedicoId_2.length; _d++) {
            var med = auxMedicoId_2[_d];
            _loop_4(med);
        }
        console.log(auxMedicos);
        //Finalmente asignamos los medicos filtrados a la variable global
        this.mostrarMedicos = auxMedicos;
        this.wardmeds = this.mostrarMedicos;
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