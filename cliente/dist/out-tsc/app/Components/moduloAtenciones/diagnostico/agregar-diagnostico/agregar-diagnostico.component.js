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
var Diagnostico_model_1 = require("../../../../Models/Diagnostico.model");
var diagnostico_service_1 = require("../../../../Services/diagnostico/diagnostico.service");
var AgregarDiagnosticoComponent = /** @class */ (function () {
    function AgregarDiagnosticoComponent(dialogRef, servicioDiagnostico) {
        this.dialogRef = dialogRef;
        this.servicioDiagnostico = servicioDiagnostico;
        this.nuevoDiagnostico = new Diagnostico_model_1.Diagnostico();
    }
    AgregarDiagnosticoComponent.prototype.agregarDiagnostico = function () {
        var _this = this;
        this.servicioDiagnostico.registerDiagnostico(this.nuevoDiagnostico).subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    AgregarDiagnosticoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarDiagnosticoComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-diagnostico',
            templateUrl: './agregar-diagnostico.component.html',
            styleUrls: ['./agregar-diagnostico.component.css']
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            diagnostico_service_1.DiagnosticoService])
    ], AgregarDiagnosticoComponent);
    return AgregarDiagnosticoComponent;
}());
exports.AgregarDiagnosticoComponent = AgregarDiagnosticoComponent;
//# sourceMappingURL=agregar-diagnostico.component.js.map