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
var router_1 = require("@angular/router");
var verpersona_component_1 = require("../personas/verpersona/verpersona.component");
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var datasource_component_1 = require("../../Globals/datasource.component");
var material_2 = require("@angular/material");
var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(servicioUsuario, servicioRole, servicioPersona, dialog, servicioEventos, router) {
        var _this = this;
        this.servicioUsuario = servicioUsuario;
        this.servicioRole = servicioRole;
        this.servicioPersona = servicioPersona;
        this.dialog = dialog;
        this.servicioEventos = servicioEventos;
        this.router = router;
        this.displayedColumns = ['Acciones', 'Email', 'Role', 'Persona'];
        this.selection = new collections_1.SelectionModel(true, []);
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
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
    UsuariosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Usuario');
        Observable_1.Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filter.nativeElement.value;
        });
        this.exampleDatabase = [];
    };
    UsuariosComponent.prototype.isAllSelected = function () {
        if (!this.dataSource) {
            return false;
        }
        if (this.selection.isEmpty()) {
            return false;
        }
        if (this.filter.nativeElement.value) {
            return this.selection.selected.length == this.dataSource.renderedData.length;
        }
        else {
            return this.selection.selected.length == this.exampleDatabase.data.length;
        }
    };
    UsuariosComponent.prototype.masterToggle = function () {
        var _this = this;
        if (!this.dataSource) {
            return;
        }
        if (this.isAllSelected()) {
            this.selection.clear();
        }
        else if (this.filter.nativeElement.value) {
            this.dataSource.renderedData.forEach(function (data) { return _this.selection.select(data.id); });
        }
        else {
            this.exampleDatabase.data.forEach(function (data) { return _this.selection.select(data.id); });
        }
    };
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
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalUsuarios);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Usuario');
            Observable_1.Observable.fromEvent(_this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(function () {
                if (!_this.dataSource) {
                    return;
                }
                _this.dataSource.filter = _this.filter.nativeElement.value;
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
    UsuariosComponent.prototype.edicionUsuario = function (usuario) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(usuario));
        this.pasarStringId(a);
        console.log(a);
        var dialogRef = this.dialog.open(editarusuario_component_1.EditarusuarioComponent, {
            width: '700px',
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
            width: '700px',
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
                width: '700px',
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
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], UsuariosComponent.prototype, "sort", void 0);
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
            eventos_service_1.EventosService,
            router_1.Router])
    ], UsuariosComponent);
    return UsuariosComponent;
}());
exports.UsuariosComponent = UsuariosComponent;
//# sourceMappingURL=usuarios.component.js.map