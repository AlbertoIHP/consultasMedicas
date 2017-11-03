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
var AgregarusuarioComponent = /** @class */ (function () {
    function AgregarusuarioComponent(dialogRef, data, servicioEventos) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEventos = servicioEventos;
        this.tienePersona = false;
        this.personasDisponibles = this.totalPersonas;
        this.servicioPersona = data.servicioPersona;
        this.servicioUsuario = data.servicioUsuario;
        this.servicioRole = data.servicioRole;
        this.usuario = data.usuario;
        this.totalRoles = data.roles;
        this.totalPersonas = data.personas;
        this.totalUsuarios = data.usuarios;
        if (data.persona) {
            this.usuario.Persona_id = data.persona.id;
            this.persona = data.persona;
            this.tienePersona = true;
        }
    }
    AgregarusuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioRole.getRoles().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRoles = todo;
        });
        this.actualizarPersonas();
    };
    AgregarusuarioComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarusuarioComponent.prototype.roleSeleccionado = function (role) {
        console.log(this.usuario);
        this.usuario.Role_id = role.id;
    };
    AgregarusuarioComponent.prototype.personaSeleccionada = function (persona) {
        this.usuario.Persona_id = persona.id;
    };
    AgregarusuarioComponent.prototype.actualizarUsuarios = function () {
        var _this = this;
        this.servicioUsuario.getUsers().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalUsuarios = todo;
            _this.filtrarUsuariosRegistrados();
            if (_this.tienePersona) {
                _this.isPersona = false;
                for (var i = 0; i < _this.totalUsuarios.length; i++) {
                    if (parseInt(_this.totalUsuarios[i].Persona_id) === _this.persona.id) {
                        _this.usuario = _this.totalUsuarios[i];
                        _this.servicioRole.getRole(_this.usuario.Role_id).subscribe(function (data) { var todo = data; todo = todo.data; _this.rolePersona = todo.nombre; });
                        _this.isPersona = true;
                        break;
                    }
                }
            }
        });
    };
    AgregarusuarioComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
            _this.personasDisponibles = _this.totalPersonas;
            _this.actualizarUsuarios();
        });
    };
    AgregarusuarioComponent.prototype.agregarUsuario = function () {
        var _this = this;
        this.servicioUsuario.registerUser(this.usuario).subscribe(function (data) {
            _this.dialogRef.close();
            _this.servicioEventos.hiceUnCambio();
        });
        //   //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
        //   (err) => {
        //   if (err === 'Used') {
        // 	alert("Esta persona ya tiene asignado un usuario")
        //   }
        // });
    };
    AgregarusuarioComponent.prototype.filtrarUsuariosRegistrados = function () {
        for (var i = 0; i < this.totalUsuarios.length; i++) {
            for (var j = 0; j < this.personasDisponibles.length; j++) {
                if (this.totalUsuarios[i].Persona_id === this.personasDisponibles[j].id) {
                    this.personasDisponibles.splice(j, 1);
                }
            }
        }
    };
    AgregarusuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarusuario',
            templateUrl: './agregarusuario.component.html',
            styleUrls: ['./agregarusuario.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], AgregarusuarioComponent);
    return AgregarusuarioComponent;
}());
exports.AgregarusuarioComponent = AgregarusuarioComponent;
//# sourceMappingURL=agregarusuario.component.js.map