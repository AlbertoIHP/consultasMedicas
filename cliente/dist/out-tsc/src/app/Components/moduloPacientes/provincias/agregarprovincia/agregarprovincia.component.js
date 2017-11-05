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
var Provincia_model_1 = require("../../../../Models/Provincia.model");
var AgregarprovinciaComponent = /** @class */ (function () {
    function AgregarprovinciaComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.nuevaProvincia = new Provincia_model_1.Provincia();
        this.totalRegiones = data.regiones;
        this.servicioRegion = data.servicioRegion;
        this.servicioProvincia = data.servicioProvincia;
    }
    AgregarprovinciaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
    };
    AgregarprovinciaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarprovinciaComponent.prototype.agregarProvincia = function () {
        var _this = this;
        this.servicioProvincia.registerProvincia(this.nuevaProvincia).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    AgregarprovinciaComponent.prototype.regionSeleccionada = function (region) {
        this.nuevaProvincia.Region_id = region.id;
    };
    AgregarprovinciaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarprovincia',
            templateUrl: './agregarprovincia.component.html',
            styleUrls: ['./agregarprovincia.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarprovinciaComponent);
    return AgregarprovinciaComponent;
}());
exports.AgregarprovinciaComponent = AgregarprovinciaComponent;
//# sourceMappingURL=agregarprovincia.component.js.map