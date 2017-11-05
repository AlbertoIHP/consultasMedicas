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
var role_service_1 = require("../../../../Services/role/role.service");
var Role_model_1 = require("../../../../Models/Role.model");
var AgregarrolesComponent = /** @class */ (function () {
    function AgregarrolesComponent(dialogRef, data, servicioRole) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioRole = servicioRole;
        this.isWrite = false;
        this.isRead = false;
        this.isEdit = false;
        this.isDelete = false;
        this.nuevoRole = new Role_model_1.Role();
    }
    AgregarrolesComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarrolesComponent.prototype.agregarRole = function () {
        var _this = this;
        if (this.isEdit) {
            this.nuevoRole.edit = 1;
        }
        if (this.isWrite) {
            this.nuevoRole.write = 1;
        }
        if (this.isRead) {
            this.nuevoRole.view = 1;
        }
        if (this.isDelete) {
            this.nuevoRole.erase = 1;
        }
        console.log(this.nuevoRole);
        this.servicioRole.registerRole(this.nuevoRole).subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    AgregarrolesComponent.prototype.cambiarEscritura = function () {
        this.isWrite = !this.isWrite;
        console.log(this.isWrite);
    };
    AgregarrolesComponent.prototype.cambiarLectura = function () {
        this.isEdit = !this.isEdit;
    };
    AgregarrolesComponent.prototype.cambiarEdicion = function () {
        this.isRead = !this.isRead;
    };
    AgregarrolesComponent.prototype.cambiarBorrado = function () {
        this.isDelete = !this.isDelete;
    };
    AgregarrolesComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarroles',
            templateUrl: './agregarroles.component.html',
            styleUrls: ['./agregarroles.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, role_service_1.RoleService])
    ], AgregarrolesComponent);
    return AgregarrolesComponent;
}());
exports.AgregarrolesComponent = AgregarrolesComponent;
//# sourceMappingURL=agregarroles.component.js.map