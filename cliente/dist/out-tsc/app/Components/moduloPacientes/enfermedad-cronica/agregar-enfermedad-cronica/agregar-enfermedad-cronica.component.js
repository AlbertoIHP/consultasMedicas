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
var EnfermedadCronica_model_1 = require("../../../../Models/EnfermedadCronica.model");
var enfermedad_cronica_service_1 = require("../../../../Services/enfermedadcronica/enfermedad-cronica.service");
var EnfermedadesCronicasPaciente_model_1 = require("../../../../Models/EnfermedadesCronicasPaciente.model");
var enfermedades_cronicas_paciente_service_1 = require("../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service");
var paciente_service_1 = require("../../../../Services/paciente/paciente.service");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var AgregarEnfermedadCronicaComponent = /** @class */ (function () {
    function AgregarEnfermedadCronicaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioEnfermedadCronica, servicioEnfermedadesCronicasPaciente, servicioPacientes, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEnfermedadCronica = servicioEnfermedadCronica;
        this.servicioEnfermedadesCronicasPaciente = servicioEnfermedadesCronicasPaciente;
        this.servicioPacientes = servicioPacientes;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.nuevaEnfermedadCronica = new EnfermedadCronica_model_1.EnfermedadCronica();
        this.totalPacientes = [];
        this.nuevaEnfermedadesCronicasPaciente = new EnfermedadesCronicasPaciente_model_1.EnfermedadesCronicasPaciente();
        this.totalEnfermedadesCronicas = [];
    }
    AgregarEnfermedadCronicaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
        //Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Se cierra el diálogo
    AgregarEnfermedadCronicaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarEnfermedadCronicaComponent.prototype.agregarEnfermedadCronica = function () {
        var _this = this;
        // Se registra  la nueva enfermedad con los datos obtenidos
        this.servicioEnfermedadCronica.registerEnfermedadCronica(this.nuevaEnfermedadCronica).subscribe(function (data) {
            // Se obtienen los pacientes	
            _this.servicioPacientes.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                // Se obtienen todas las enfermedades
                _this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalEnfermedadesCronicas = todo;
                    //Se obtiene la enfermedad que se acaba de agregar
                    var currentEnfermedadCronica = _this.totalEnfermedadesCronicas.filter(function (enfermedadcronica) { return enfermedadcronica.nombre === _this.nuevaEnfermedadCronica.nombre; });
                    // Agregar nueva enfermedad crónica a cada paciente
                    for (var i = 0; i < _this.totalPacientes.length; i++) {
                        _this.nuevaEnfermedadesCronicasPaciente.Paciente_id = _this.totalPacientes[i].id;
                        _this.nuevaEnfermedadesCronicasPaciente.EnfermedadCronica_id = currentEnfermedadCronica[0].id;
                        _this.servicioEnfermedadesCronicasPaciente.registerEnfermedadesCronicasPaciente(_this.nuevaEnfermedadesCronicasPaciente).subscribe(function (data) { });
                    }
                });
                //Se emite un evento para actualizar los datos
                _this.servicioEvento.actualizacion(true);
                // Se cierra el diálogo
                _this.dialogRef.close();
            });
        });
    };
    AgregarEnfermedadCronicaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-enfermedad-cronica',
            templateUrl: './agregar-enfermedad-cronica.component.html',
            styleUrls: ['./agregar-enfermedad-cronica.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, enfermedad_cronica_service_1.EnfermedadCronicaService,
            enfermedades_cronicas_paciente_service_1.EnfermedadesCronicasPacienteService,
            paciente_service_1.PacienteService,
            eventos_service_1.EventosService])
    ], AgregarEnfermedadCronicaComponent);
    return AgregarEnfermedadCronicaComponent;
}());
exports.AgregarEnfermedadCronicaComponent = AgregarEnfermedadCronicaComponent;
//# sourceMappingURL=agregar-enfermedad-cronica.component.js.map