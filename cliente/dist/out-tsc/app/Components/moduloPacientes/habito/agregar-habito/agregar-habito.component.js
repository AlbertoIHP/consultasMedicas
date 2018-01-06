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
var HabitosPaciente_model_1 = require("../../../../Models/HabitosPaciente.model");
var habitos_paciente_service_1 = require("../../../../Services/habitospaciente/habitos-paciente.service");
var Habito_model_1 = require("../../../../Models/Habito.model");
var habito_service_1 = require("../../../../Services/habito/habito.service");
var paciente_service_1 = require("../../../../Services/paciente/paciente.service");
var forms_1 = require("@angular/forms");
var AgregarHabitoComponent = /** @class */ (function () {
    function AgregarHabitoComponent(dialogRef, data, servicioHabito, servicioHabitosPaciente, servicioPacientes) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioHabito = servicioHabito;
        this.servicioHabitosPaciente = servicioHabitosPaciente;
        this.servicioPacientes = servicioPacientes;
        this.nuevoHabito = new Habito_model_1.Habito();
        this.totalPacientes = [];
        this.nuevoHabitosPaciente = new HabitosPaciente_model_1.HabitosPaciente();
        this.totalHabitos = [];
    }
    AgregarHabitoComponent.prototype.ngOnInit = function () {
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    AgregarHabitoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarHabitoComponent.prototype.agregarHabito = function () {
        var _this = this;
        this.servicioHabito.registerHabito(this.nuevoHabito).subscribe(function (data) {
            _this.servicioPacientes.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioHabito.getHabitos().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalHabitos = todo;
                    var currentHabito = _this.totalHabitos.filter(function (habito) { return habito.nombre === _this.nuevoHabito.nombre; });
                    // Agregar nuevo hábito a cada paciente
                    for (var i = 0; i < _this.totalPacientes.length; i++) {
                        _this.nuevoHabitosPaciente.Paciente_id = _this.totalPacientes[i].id;
                        _this.nuevoHabitosPaciente.Habito_id = currentHabito[0].id;
                        _this.servicioHabitosPaciente.registerHabitosPaciente(_this.nuevoHabitosPaciente).subscribe(function (data) {
                        });
                    }
                });
                console.log(data);
                _this.dialogRef.close();
            });
        });
    };
    AgregarHabitoComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-habito',
            templateUrl: './agregar-habito.component.html',
            styleUrls: ['./agregar-habito.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, habito_service_1.HabitoService,
            habitos_paciente_service_1.HabitosPacienteService,
            paciente_service_1.PacienteService])
    ], AgregarHabitoComponent);
    return AgregarHabitoComponent;
}());
exports.AgregarHabitoComponent = AgregarHabitoComponent;
//# sourceMappingURL=agregar-habito.component.js.map