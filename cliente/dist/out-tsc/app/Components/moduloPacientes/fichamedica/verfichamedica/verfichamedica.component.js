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
var VistaPaciente_model_1 = require("../../../../Models/VistaPaciente.model");
var vista_paciente_service_1 = require("../../../../Services/vistas/vista-paciente.service");
require("rxjs/add/observable/of");
var VerFichaMedicaComponent = /** @class */ (function () {
    function VerFichaMedicaComponent(dialogRef, data, servicioVistaPaciente) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioVistaPaciente = servicioVistaPaciente;
        this.datosPaciente = new VistaPaciente_model_1.VistaPaciente();
        this.obtenerDatosPaciente();
    }
    VerFichaMedicaComponent.prototype.obtenerDatosPaciente = function () {
        var _this = this;
        this.servicioVistaPaciente.getVistaPaciente(this.data.paciente.id).subscribe(function (data) {
            _this.arrayPaciente = data;
            _this.datosPaciente = _this.arrayPaciente.data[0];
            console.log(_this.datosPaciente);
            _this.paciente = _this.data.paciente;
        });
    };
    VerFichaMedicaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    VerFichaMedicaComponent = __decorate([
        core_1.Component({
            selector: 'app-verfichamedica',
            templateUrl: './verfichamedica.component.html',
            styleUrls: ['./verfichamedica.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, vista_paciente_service_1.VistaPacienteService])
    ], VerFichaMedicaComponent);
    return VerFichaMedicaComponent;
}());
exports.VerFichaMedicaComponent = VerFichaMedicaComponent;
//# sourceMappingURL=verfichamedica.component.js.map