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
var prevision_service_1 = require("../../../../Services/prevision/prevision.service");
var EditarprevisionComponent = /** @class */ (function () {
    function EditarprevisionComponent(dialogRef, data, servicioPrevision) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioPrevision = servicioPrevision;
        this.prevision = data.prevision;
    }
    EditarprevisionComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarprevisionComponent.prototype.editarPrevision = function () {
        var _this = this;
        this.servicioPrevision.editPrevision(this.prevision, this.prevision.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    EditarprevisionComponent.prototype.isapreSeleccionado = function (respuesta) {
        this.prevision.isapre = respuesta;
        console.log(this.prevision);
    };
    EditarprevisionComponent = __decorate([
        core_1.Component({
            selector: 'app-editarprevision',
            templateUrl: './editarprevision.component.html',
            styleUrls: ['./editarprevision.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, prevision_service_1.PrevisionService])
    ], EditarprevisionComponent);
    return EditarprevisionComponent;
}());
exports.EditarprevisionComponent = EditarprevisionComponent;
//# sourceMappingURL=editarprevision.component.js.map