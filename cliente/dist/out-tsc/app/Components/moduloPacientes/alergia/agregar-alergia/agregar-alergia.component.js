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
var Alergia_model_1 = require("../../../../Models/Alergia.model");
var alergia_service_1 = require("../../../../Services/alergia/alergia.service");
var alergias_comunes_paciente_service_1 = require("../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service");
var AlergiasComunesPaciente_model_1 = require("../../../../Models/AlergiasComunesPaciente.model");
var paciente_service_1 = require("../../../../Services/paciente/paciente.service");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var AgregarAlergiaComponent = /** @class */ (function () {
    function AgregarAlergiaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioAlergia, servicioAlergiasComunesPaciente, servicioPacientes, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioAlergia = servicioAlergia;
        this.servicioAlergiasComunesPaciente = servicioAlergiasComunesPaciente;
        this.servicioPacientes = servicioPacientes;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.nuevaAlergia = new Alergia_model_1.Alergia();
        this.totalPacientes = [];
        this.nuevaAlergiasComunesPaciente = new AlergiasComunesPaciente_model_1.AlergiasComunesPaciente();
        this.totalAlergiasComunes = [];
    }
    AgregarAlergiaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
        //Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    AgregarAlergiaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarAlergiaComponent.prototype.agregarAlergia = function () {
        var _this = this;
        // Se registra  la nueva alergia con los datos obtenidos
        this.servicioAlergia.registerAlergia(this.nuevaAlergia).subscribe(function (data) {
            // Se obtienen los pacientes
            _this.servicioPacientes.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                // Se obtienen todas las alergias
                _this.servicioAlergia.getAlergias().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalAlergiasComunes = todo;
                    //Se obtiene la alergia que se acaba de agregar
                    var currentAlergia = _this.totalAlergiasComunes.filter(function (alergia) { return alergia.nombre === _this.nuevaAlergia.nombre; });
                    // Agregar nueva alergia a cada paciente
                    for (var i = 0; i < _this.totalPacientes.length; i++) {
                        _this.nuevaAlergiasComunesPaciente.Paciente_id = _this.totalPacientes[i].id;
                        _this.nuevaAlergiasComunesPaciente.Alergia_id = currentAlergia[0].id;
                        _this.servicioAlergiasComunesPaciente.registerAlergiasComunesPaciente(_this.nuevaAlergiasComunesPaciente).subscribe(function (data) { });
                    }
                });
                //Se emite un evento para actualizar los datos
                _this.servicioEvento.actualizacion(true);
                // Se cierra el diálogo
                _this.dialogRef.close();
            });
        });
    };
    AgregarAlergiaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-alergia',
            templateUrl: './agregar-alergia.component.html',
            styleUrls: ['./agregar-alergia.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, alergia_service_1.AlergiaService,
            alergias_comunes_paciente_service_1.AlergiasComunesPacienteService,
            paciente_service_1.PacienteService,
            eventos_service_1.EventosService])
    ], AgregarAlergiaComponent);
    return AgregarAlergiaComponent;
}());
exports.AgregarAlergiaComponent = AgregarAlergiaComponent;
//# sourceMappingURL=agregar-alergia.component.js.map