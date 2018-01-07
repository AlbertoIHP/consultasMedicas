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
// Componentes generales
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
// Modelos y servicios
var Vacuna_model_1 = require("../../../../Models/Vacuna.model");
var VacunasPaciente_model_1 = require("../../../../Models/VacunasPaciente.model");
var vacunaspaciente_service_1 = require("../../../../Services/vacunaspaciente/vacunaspaciente.service");
var paciente_service_1 = require("../../../../Services/paciente/paciente.service");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var AgregarVacunaComponent = /** @class */ (function () {
    function AgregarVacunaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioVacunasPaciente, servicioPacientes, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioVacunasPaciente = servicioVacunasPaciente;
        this.servicioPacientes = servicioPacientes;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.nuevaVacuna = new Vacuna_model_1.Vacuna();
        this.servicioVacuna = data.servicioVacuna;
        this.totalPacientes = [];
        this.nuevaVacunasPaciente = new VacunasPaciente_model_1.VacunasPaciente();
        this.totalVacunas = [];
    }
    AgregarVacunaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
        //Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    AgregarVacunaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarVacunaComponent.prototype.agregarVacuna = function () {
        var _this = this;
        // Se registra  la nueva vacuna con los datos obtenidos
        this.servicioVacuna.registerVacuna(this.nuevaVacuna).subscribe(function (data) {
            // Se obtienen los pacientes
            _this.servicioPacientes.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                // Se obtienen todas las vacunas
                _this.servicioVacuna.getVacunas().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalVacunas = todo;
                    //Se obtiene la vacuna que se acaba de agregar
                    var currentVacuna = _this.totalVacunas.filter(function (vacuna) { return vacuna.nombre === _this.nuevaVacuna.nombre; });
                    // Agregar nueva vacuna a cada paciente
                    for (var i = 0; i < _this.totalPacientes.length; i++) {
                        _this.nuevaVacunasPaciente.Paciente_id = _this.totalPacientes[i].id;
                        _this.nuevaVacunasPaciente.Vacuna_id = currentVacuna[0].id;
                        _this.servicioVacunasPaciente.registerVacunaPaciente(_this.nuevaVacunasPaciente).subscribe(function (data) {
                        });
                    }
                    //Se emite un evento para actualizar los datos
                    _this.servicioEvento.actualizacion(true);
                    // Se cierra el diálogo        
                    _this.dialogRef.close();
                });
            });
        });
    };
    AgregarVacunaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-vacuna',
            templateUrl: './agregar-vacuna.component.html',
            styleUrls: ['./agregar-vacuna.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, vacunaspaciente_service_1.VacunasPacienteService,
            paciente_service_1.PacienteService,
            eventos_service_1.EventosService])
    ], AgregarVacunaComponent);
    return AgregarVacunaComponent;
}());
exports.AgregarVacunaComponent = AgregarVacunaComponent;
//# sourceMappingURL=agregar-vacuna.component.js.map