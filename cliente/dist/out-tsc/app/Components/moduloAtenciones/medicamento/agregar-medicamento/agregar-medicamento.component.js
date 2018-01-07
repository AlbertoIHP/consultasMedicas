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
var Medicamento_model_1 = require("../../../../Models/Medicamento.model");
var UsoMedicamento_model_1 = require("../../../../Models/UsoMedicamento.model");
var uso_medicamento_service_1 = require("../../../../Services/usomedicamento/uso-medicamento.service");
var AlergiasMedicamentosPaciente_model_1 = require("../../../../Models/AlergiasMedicamentosPaciente.model");
var alergias_medicamentos_paciente_service_1 = require("../../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service");
var paciente_service_1 = require("../../../../Services/paciente/paciente.service");
var forms_1 = require("@angular/forms");
var AgregarMedicamentoComponent = /** @class */ (function () {
    function AgregarMedicamentoComponent(dialogRef, data, servicioUsoMedicamento, servicioAlergiasMedicamentosPaciente, servicioPacientes) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioUsoMedicamento = servicioUsoMedicamento;
        this.servicioAlergiasMedicamentosPaciente = servicioAlergiasMedicamentosPaciente;
        this.servicioPacientes = servicioPacientes;
        this.nuevoMedicamento = new Medicamento_model_1.Medicamento();
        this.servicioMedicamento = data.servicioMedicamento;
        this.totalPacientes = [];
        this.nuevaAlergiasMedicamentosPaciente = new AlergiasMedicamentosPaciente_model_1.AlergiasMedicamentosPaciente();
        this.nuevoUsoMedicamento = new UsoMedicamento_model_1.UsoMedicamento();
        this.totalMedicamentos = [];
    }
    AgregarMedicamentoComponent.prototype.ngOnInit = function () {
        this.agregarForm = new forms_1.FormGroup({
            nombreComun: new forms_1.FormControl('', [forms_1.Validators.required]),
            nombreCientifico: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    AgregarMedicamentoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarMedicamentoComponent.prototype.agregarMedicamento = function () {
        var _this = this;
        this.servicioMedicamento.registerMedicamento(this.nuevoMedicamento).subscribe(function (data) {
            _this.servicioPacientes.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalMedicamentos = todo;
                    var currentMedicamento = _this.totalMedicamentos.filter(function (medicamento) { return medicamento.nombrecomun === _this.nuevoMedicamento.nombrecomun; });
                    // Agregar nueva vacuna a cada paciente
                    for (var i = 0; i < _this.totalPacientes.length; i++) {
                        _this.nuevaAlergiasMedicamentosPaciente.Paciente_id = _this.totalPacientes[i].id;
                        _this.nuevoUsoMedicamento.Paciente_id = _this.totalPacientes[i].id;
                        _this.nuevaAlergiasMedicamentosPaciente.Medicamento_id = currentMedicamento[0].id;
                        _this.nuevoUsoMedicamento.Medicamento_id = currentMedicamento[0].id;
                        _this.servicioAlergiasMedicamentosPaciente.registerAlergiasMedicamentosPaciente(_this.nuevaAlergiasMedicamentosPaciente).subscribe(function (data) {
                            _this.servicioUsoMedicamento.registerUsoMedicamento(_this.nuevoUsoMedicamento).subscribe(function (data) {
                            });
                        });
                    }
                });
                console.log(data);
                _this.dialogRef.close();
            });
        });
    };
    AgregarMedicamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-medicamento',
            templateUrl: './agregar-medicamento.component.html',
            styleUrls: ['./agregar-medicamento.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, uso_medicamento_service_1.UsoMedicamentoService,
            alergias_medicamentos_paciente_service_1.AlergiasMedicamentosPacienteService,
            paciente_service_1.PacienteService])
    ], AgregarMedicamentoComponent);
    return AgregarMedicamentoComponent;
}());
exports.AgregarMedicamentoComponent = AgregarMedicamentoComponent;
//# sourceMappingURL=agregar-medicamento.component.js.map