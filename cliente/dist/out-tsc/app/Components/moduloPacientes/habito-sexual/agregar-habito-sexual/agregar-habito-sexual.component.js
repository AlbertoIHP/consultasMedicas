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
var HabitoSexual_model_1 = require("../../../../Models/HabitoSexual.model");
var habito_sexual_service_1 = require("../../../../Services/habitosexual/habito-sexual.service");
var habitos_sexuales_paciente_service_1 = require("../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service");
var HabitosSexualesPaciente_model_1 = require("../../../../Models/HabitosSexualesPaciente.model");
var paciente_service_1 = require("../../../../Services/paciente/paciente.service");
var forms_1 = require("@angular/forms");
var AgregarHabitoSexualComponent = /** @class */ (function () {
    function AgregarHabitoSexualComponent(dialogRef, data, servicioHabitoSexual, servicioHabitosSexualesPaciente, servicioPacientes) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioHabitoSexual = servicioHabitoSexual;
        this.servicioHabitosSexualesPaciente = servicioHabitosSexualesPaciente;
        this.servicioPacientes = servicioPacientes;
        this.totalPacientes = [];
        this.nuevoHabitosSexualesPaciente = new HabitosSexualesPaciente_model_1.HabitosSexualesPaciente();
        this.nuevoHabitoSexual = new HabitoSexual_model_1.HabitoSexual();
        this.totalHabitosSexuales = [];
    }
    AgregarHabitoSexualComponent.prototype.ngOnInit = function () {
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    AgregarHabitoSexualComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarHabitoSexualComponent.prototype.agregarHabitoSexual = function () {
        var _this = this;
        this.servicioHabitoSexual.registerHabitoSexual(this.nuevoHabitoSexual).subscribe(function (data) {
            _this.servicioPacientes.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                _this.servicioHabitoSexual.getHabitoSexuales().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.totalHabitosSexuales = todo;
                    var currentHabitoSexual = _this.totalHabitosSexuales.filter(function (habitoSexual) { return habitoSexual.nombre === _this.nuevoHabitoSexual.nombre; });
                    // Agregar nuevo habito sexual a cada paciente
                    for (var i = 0; i < _this.totalPacientes.length; i++) {
                        _this.nuevoHabitosSexualesPaciente.Paciente_id = _this.totalPacientes[i].id;
                        _this.nuevoHabitosSexualesPaciente.HabitoSexual_id = currentHabitoSexual[0].id;
                        _this.servicioHabitosSexualesPaciente.registerHabitosSexualesPaciente(_this.nuevoHabitosSexualesPaciente).subscribe(function (data) {
                        });
                    }
                });
                console.log(data);
                _this.dialogRef.close();
            });
        });
    };
    AgregarHabitoSexualComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-habito-sexual',
            templateUrl: './agregar-habito-sexual.component.html',
            styleUrls: ['./agregar-habito-sexual.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, habito_sexual_service_1.HabitoSexualService,
            habitos_sexuales_paciente_service_1.HabitosSexualesPacienteService,
            paciente_service_1.PacienteService])
    ], AgregarHabitoSexualComponent);
    return AgregarHabitoSexualComponent;
}());
exports.AgregarHabitoSexualComponent = AgregarHabitoSexualComponent;
//# sourceMappingURL=agregar-habito-sexual.component.js.map