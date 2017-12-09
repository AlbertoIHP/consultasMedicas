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
var modulo_service_1 = require("../../../../Services/modulo/modulo.service");
var permisomodulo_service_1 = require("../../../../Services/permisomodulo/permisomodulo.service");
var PermisoModulo_model_1 = require("../../../../Models/PermisoModulo.model");
var AgregarrolesComponent = /** @class */ (function () {
    function AgregarrolesComponent(dialogRef, data, servicioRole, servicioModulo, servicioPM) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioRole = servicioRole;
        this.servicioModulo = servicioModulo;
        this.servicioPM = servicioPM;
        this.totalModulos = [];
        this.totalPM = [];
        this.servicioModulo.getModulos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalModulos = todo;
            for (var j = 0; j < _this.totalModulos.length; j++) {
                var a = new PermisoModulo_model_1.PermisoModulo();
                a.Modulo_id = _this.totalModulos[j].name;
                _this.totalPM.push(a);
                console.log(a);
            }
        });
        this.nuevoRole = new Role_model_1.Role();
    }
    AgregarrolesComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarrolesComponent.prototype.agregarRole = function () {
        var _this = this;
        this.servicioRole.registerRole(this.nuevoRole).subscribe(function (data) {
            _this.servicioRole.getRoles().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                var current = todo.filter(function (role) { return role.nombre === _this.nuevoRole.nombre; });
                console.log(current[0].id);
                var _loop_1 = function (j) {
                    _this.totalPM[j].Role_id = current[0].id;
                    module = _this.totalModulos.filter(function (modulo) { return modulo.name === _this.totalPM[j].Modulo_id; });
                    _this.totalPM[j].Modulo_id = module[0].id.toString();
                    _this.totalPM[j].write === true ? _this.totalPM[j].write = 1 : _this.totalPM[j].write = 0;
                    _this.totalPM[j].erase === true ? _this.totalPM[j].erase = 1 : _this.totalPM[j].erase = 0;
                    _this.totalPM[j].update === true ? _this.totalPM[j].update = 1 : _this.totalPM[j].update = 0;
                    _this.totalPM[j].view === true ? _this.totalPM[j].view = 1 : _this.totalPM[j].view = 0;
                    console.log(_this.totalPM[j]);
                    _this.servicioPM.registerPermisoModulo(_this.totalPM[j]).subscribe(function (data) {
                        console.log(data);
                    });
                };
                var module;
                for (var j = 0; j < _this.totalPM.length; j++) {
                    _loop_1(j);
                }
            });
            _this.dialogRef.close();
        });
    };
    AgregarrolesComponent.prototype.escribir = function (permiso) {
        permiso.write = !permiso.write;
        console.log(permiso);
    };
    AgregarrolesComponent.prototype.leer = function (permiso) {
        permiso.view = !permiso.view;
        console.log(permiso);
    };
    AgregarrolesComponent.prototype.editar = function (permiso) {
        permiso.update = !permiso.update;
        console.log(permiso);
    };
    AgregarrolesComponent.prototype.borrar = function (permiso) {
        permiso.erase = !permiso.erase;
        console.log(permiso);
    };
    AgregarrolesComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarroles',
            templateUrl: './agregarroles.component.html',
            styleUrls: ['./agregarroles.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, role_service_1.RoleService,
            modulo_service_1.ModuloService,
            permisomodulo_service_1.PermisoModuloService])
    ], AgregarrolesComponent);
    return AgregarrolesComponent;
}());
exports.AgregarrolesComponent = AgregarrolesComponent;
//# sourceMappingURL=agregarroles.component.js.map