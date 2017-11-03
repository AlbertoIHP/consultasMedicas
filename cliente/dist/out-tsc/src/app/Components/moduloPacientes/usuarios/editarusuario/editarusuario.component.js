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
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditarusuarioComponent = /** @class */ (function () {
    function EditarusuarioComponent(dialogRef, data, servicioEventos) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEventos = servicioEventos;
        this.usuario = data.usuario;
        this.totalRoles = data.roles;
        this.servicio = data.servicioUsuario;
        this.servicioRole = data.servicioRole;
    }
    EditarusuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioRole.getRoles().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRoles = todo;
        });
    };
    EditarusuarioComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarusuarioComponent.prototype.editarRole = function () {
        var _this = this;
        this.servicio.editUser(this.usuario, this.usuario.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
            _this.servicioEventos.hiceUnCambio();
        });
    };
    EditarusuarioComponent.prototype.roleSeleccionado = function (role) {
        console.log(this.usuario);
        this.usuario.Role_id = role.id;
    };
    EditarusuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-editarusuario',
            templateUrl: './editarusuario.component.html',
            styleUrls: ['./editarusuario.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], EditarusuarioComponent);
    return EditarusuarioComponent;
}());
exports.EditarusuarioComponent = EditarusuarioComponent;
//# sourceMappingURL=editarusuario.component.js.map