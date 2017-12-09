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
var Prevision_model_1 = require("../../../../Models/Prevision.model");
var AgregarprevisionComponent = /** @class */ (function () {
    function AgregarprevisionComponent(dialogRef, data, servicioPrevision) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioPrevision = servicioPrevision;
        this.nuevaPrevision = new Prevision_model_1.Prevision();
    }
    AgregarprevisionComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarprevisionComponent.prototype.agregarPrevision = function () {
        var _this = this;
        this.servicioPrevision.registerPrevision(this.nuevaPrevision).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    AgregarprevisionComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarprevision',
            templateUrl: './agregarprevision.component.html',
            styleUrls: ['./agregarprevision.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, prevision_service_1.PrevisionService])
    ], AgregarprevisionComponent);
    return AgregarprevisionComponent;
}());
exports.AgregarprevisionComponent = AgregarprevisionComponent;
//# sourceMappingURL=agregarprevision.component.js.map