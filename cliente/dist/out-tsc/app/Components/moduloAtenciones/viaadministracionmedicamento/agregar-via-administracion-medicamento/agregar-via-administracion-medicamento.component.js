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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var ViaAdministracionMedicamento_model_1 = require("../../../../Models/ViaAdministracionMedicamento.model");
var via_administracion_medicamento_service_1 = require("../../../../Services/viaAdministracionMedicamento/via-administracion-medicamento.service");
var AgregarViaAdministracionMedicamentoComponent = /** @class */ (function () {
    function AgregarViaAdministracionMedicamentoComponent(dialogRef, servicioAdminViaMed) {
        this.dialogRef = dialogRef;
        this.servicioAdminViaMed = servicioAdminViaMed;
        this.nuevoViaAdminMed = new ViaAdministracionMedicamento_model_1.ViaAdministracionMedicamento();
    }
    AgregarViaAdministracionMedicamentoComponent.prototype.agregarViaAdminMed = function () {
        var _this = this;
        this.servicioAdminViaMed.registerViaAdministracionMedicamento(this.nuevoViaAdminMed).subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    AgregarViaAdministracionMedicamentoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarViaAdministracionMedicamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-via-administracion-medicamento',
            templateUrl: './agregar-via-administracion-medicamento.component.html',
            styleUrls: ['./agregar-via-administracion-medicamento.component.css']
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            via_administracion_medicamento_service_1.ViaAdministracionMedicamentoService])
    ], AgregarViaAdministracionMedicamentoComponent);
    return AgregarViaAdministracionMedicamentoComponent;
}());
exports.AgregarViaAdministracionMedicamentoComponent = AgregarViaAdministracionMedicamentoComponent;
//# sourceMappingURL=agregar-via-administracion-medicamento.component.js.map