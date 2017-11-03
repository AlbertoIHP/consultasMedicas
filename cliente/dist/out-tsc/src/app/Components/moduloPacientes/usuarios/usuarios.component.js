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
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
var Usuario_model_1 = require("../../../Models/Usuario.model");
var user_service_1 = require("../../../Services/user/user.service");
var persona_service_1 = require("../../../Services/persona/persona.service");
var role_service_1 = require("../../../Services/role/role.service");
var agregarusuario_component_1 = require("./agregarusuario/agregarusuario.component");
var editarusuario_component_1 = require("./editarusuario/editarusuario.component");
var verpersona_component_1 = require("../personas/verpersona/verpersona.component");
var material_1 = require("@angular/material");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var material_2 = require("@angular/material");
var datasource_component_1 = require("../../Globals/datasource.component");
var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(servicioUsuario, servicioRole, servicioPersona, dialog, servicioEventos) {
        var _this = this;
        this.servicioUsuario = servicioUsuario;
        this.servicioRole = servicioRole;
        this.servicioPersona = servicioPersona;
        this.dialog = dialog;
        this.servicioEventos = servicioEventos;
        this.displayedColumns = ['Acciones', 'Email', 'Role', 'Persona'];
        this.buscarPorNombre = false;
        this.totalRoles = [];
        this.totalPersonas = [];
        this.totalUsuarios = [];
        this.actualizarRoles();
        this.actualizarPersonas();
        this.actualizarUsuarios();
        this.servicioEventos.seActivo.subscribe(function () {
            _this.actualizarUsuarios();
        });
    }
    UsuariosComponent.prototype.actualizarRoles = function () {
        var _this = this;
        this.totalRoles = [];
        this.servicioRole.getRoles().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRoles = todo;
        });
    };
    UsuariosComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.totalPersonas = [];
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
        });
    };
    UsuariosComponent.prototype.actualizarUsuarios = function () {
        var _this = this;
        this.totalUsuarios = [];
        this.servicioUsuario.getUsers().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalUsuarios = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalUsuarios);
            _this.sourceDatatable = new datasource_component_1.dataTable(_this.bdEstructura, _this.paginator);
            _this.sourcePorNombre = new datasource_component_1.buscadorPorNombre(_this.bdEstructura, "Usuario");
            Observable_1.Observable.fromEvent(_this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(function () {
                if (!_this.sourcePorNombre) {
                    return;
                }
                _this.sourcePorNombre.filter = _this.filter.nativeElement.value;
            });
        });
    };
    UsuariosComponent.prototype.eliminarUsuario = function (usuario) {
        var _this = this;
        this.servicioUsuario.deleteUser(usuario.id).subscribe(function (data) {
            _this.actualizarUsuarios();
        });
    };
    UsuariosComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalUsuarios.length; i++) {
            for (var j = 0; j < this.totalRoles.length; j++) {
                if (parseInt(this.totalUsuarios[i].Role_id) === this.totalRoles[j].id) {
                    this.totalUsuarios[i].Role_id = this.totalRoles[j].nombre;
                    break;
                }
            }
        }
    };
    UsuariosComponent.prototype.pasarStringId = function (usuario) {
        for (var i = 0; i < this.totalRoles.length; i++) {
            if (usuario.Role_id === this.totalRoles[i].nombre) {
                usuario.Role_id = this.totalRoles[i].id;
            }
        }
    };
    UsuariosComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    UsuariosComponent.prototype.edicionUsuario = function (usuario) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(usuario));
        this.pasarStringId(a);
        console.log(a);
        var dialogRef = this.dialog.open(editarusuario_component_1.EditarusuarioComponent, {
            width: '1000px',
            data: {
                usuario: a,
                personas: this.totalPersonas,
                roles: this.totalRoles,
                servicioUsuario: this.servicioUsuario,
                servicioRole: this.servicioRole
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarUsuarios();
        });
    };
    UsuariosComponent.prototype.agregacionUsuario = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarusuario_component_1.AgregarusuarioComponent, {
            width: '1000px',
            data: {
                usuario: new Usuario_model_1.Usuario(),
                usuarios: this.totalUsuarios,
                personas: this.totalPersonas,
                roles: this.totalRoles,
                servicioUsuario: this.servicioUsuario,
                servicioPersona: this.servicioPersona,
                servicioRole: this.servicioRole
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarUsuarios();
        });
    };
    UsuariosComponent.prototype.desplegarPersona = function (usuario) {
        var _this = this;
        this.servicioPersona.getPersona(parseInt(usuario.Persona_id)).subscribe(function (data) {
            var persona = data;
            persona = persona.data;
            console.log(persona);
            var dialogRef = _this.dialog.open(verpersona_component_1.VerpersonaComponent, {
                width: '1000px',
                data: { persona: persona }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                _this.actualizarUsuarios();
            });
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], UsuariosComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], UsuariosComponent.prototype, "filter", void 0);
    UsuariosComponent = __decorate([
        core_1.Component({
            selector: 'app-usuarios',
            templateUrl: './usuarios.component.html',
            styleUrls: ['./usuarios.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            role_service_1.RoleService,
            persona_service_1.PersonaService,
            material_2.MatDialog,
            eventos_service_1.EventosService])
    ], UsuariosComponent);
    return UsuariosComponent;
}());
exports.UsuariosComponent = UsuariosComponent;
//# sourceMappingURL=usuarios.component.js.map