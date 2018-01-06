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
var ExamenFisico_model_1 = require("../../../../Models/ExamenFisico.model");
var AgregarExamenFisicoComponent = /** @class */ (function () {
    function AgregarExamenFisicoComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.options = {
            minYear: 1970,
            maxYear: 2030,
            displayFormat: 'YYYY[-]MM[-]DD',
            barTitleFormat: 'MMMM YYYY',
            firstCalendarDay: 0,
        };
        this.nuevoExamenFisico = new ExamenFisico_model_1.ExamenFisico();
        this.servicioExamenFisico = data.servicioExamenFisico;
    }
    AgregarExamenFisicoComponent.prototype.ngOnInit = function () {
    };
    AgregarExamenFisicoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarExamenFisicoComponent.prototype.agregarExamenFisico = function () {
        var _this = this;
        this.nuevoExamenFisico.fechaExamen = new Date(this.nuevoExamenFisico.fechaExamen).toISOString().slice(0, 19).replace('T', ' ');
        this.servicioExamenFisico.registerExamenFisico(this.nuevoExamenFisico).subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    AgregarExamenFisicoComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-examen-fisico',
            templateUrl: './agregar-examen-fisico.component.html',
            styleUrls: ['./agregar-examen-fisico.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarExamenFisicoComponent);
    return AgregarExamenFisicoComponent;
}());
exports.AgregarExamenFisicoComponent = AgregarExamenFisicoComponent;
//# sourceMappingURL=agregar-examen-fisico.component.js.map