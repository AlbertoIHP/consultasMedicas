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
var estado_cita_service_1 = require("../../../../Services/estadocita/estado-cita.service");
var EditarestadocitaComponent = /** @class */ (function () {
    function EditarestadocitaComponent(dialogRef, data, servicioEstadoCita) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEstadoCita = servicioEstadoCita;
        this.estadocita = data.estadocita;
    }
    EditarestadocitaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarestadocitaComponent.prototype.editarEstadoCita = function () {
        var _this = this;
        this.servicioEstadoCita.editEstadoCita(this.estadocita, this.estadocita.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    EditarestadocitaComponent = __decorate([
        core_1.Component({
            selector: 'app-editarestadocita',
            templateUrl: './editarestadocita.component.html',
            styleUrls: ['./editarestadocita.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, estado_cita_service_1.EstadoCitaService])
    ], EditarestadocitaComponent);
    return EditarestadocitaComponent;
}());
exports.EditarestadocitaComponent = EditarestadocitaComponent;
//# sourceMappingURL=editarestadocita.component.js.map