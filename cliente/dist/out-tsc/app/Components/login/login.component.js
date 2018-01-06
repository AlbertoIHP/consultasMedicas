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
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../Services/authentication/authentication.service");
var eventos_service_1 = require("../../Services/eventos/eventos.service");
var registro_component_1 = require("./registro/registro.component");
var material_1 = require("@angular/material");
var permisomodulo_service_1 = require("../../Services/permisomodulo/permisomodulo.service");
var modulo_service_1 = require("../../Services/modulo/modulo.service");
var user_service_1 = require("../../Services/user/user.service");
var role_service_1 = require("../../Services/role/role.service");
var ng2_device_detector_1 = require("ng2-device-detector");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(deviceService, dialog, eventService, router, authService, servicioUsuario, servicioRole, servicioPM, servicioModulo) {
        var _this = this;
        this.deviceService = deviceService;
        this.dialog = dialog;
        this.eventService = eventService;
        this.router = router;
        this.authService = authService;
        this.servicioUsuario = servicioUsuario;
        this.servicioRole = servicioRole;
        this.servicioPM = servicioPM;
        this.servicioModulo = servicioModulo;
        this.hide = true;
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.totalModulos = [];
        this.totalPM = [];
        this.user = '';
        this.password = '';
        this.isLoginable = true;
        this.eventService.isSingUp.subscribe(function (newUser) {
            _this.user = newUser.email;
            _this.password = newUser.password;
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (!(this.user === "" || this.password === "")) {
            this.authService.login(this.user, this.password).subscribe(function (data) {
                _this.servicioUsuario.getUsers().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    var currentUser = todo.filter(function (usuario) { return usuario.email === _this.user; });
                    _this.roleId = currentUser[0].Role_id;
                    var personaId = currentUser[0].Persona_id;
                    _this.servicioModulo.getModulos().subscribe(function (data) {
                        var todo = data;
                        todo = todo.data;
                        _this.totalModulos = todo;
                        _this.servicioPM.getPermisoModulos().subscribe(function (data) {
                            var todo = data;
                            todo = todo.data;
                            var misPM = todo.filter(function (pm) { return pm.Role_id === _this.roleId; });
                            _this.totalPM = misPM;
                            var _loop_1 = function (j) {
                                aux = _this.totalModulos.filter(function (modulo) { return modulo.id === parseInt(_this.totalPM[j].Modulo_id); });
                                _this.totalPM[j].Modulo_id = aux[0].name;
                            };
                            var aux;
                            for (var j = 0; j < _this.totalPM.length; j++) {
                                _loop_1(j);
                            }
                            var arregloPermisos = JSON.stringify(_this.totalPM);
                            localStorage.setItem('permisos', arregloPermisos);
                            var test = JSON.stringify({ "id": personaId });
                            localStorage.setItem('persona', test);
                            _this.eventService.singIn();
                            if (_this.deviceInfo.device === 'android' || _this.deviceInfo.device === 'iphone' || _this.deviceInfo.device === 'ipad') {
                                _this.router.navigate(['mobile/mp']);
                            }
                            else {
                                _this.router.navigate(['per']);
                            }
                        });
                    });
                });
            }, function (err) {
                if (err === 'Unauthorized') {
                    alert("No estas registrado");
                }
            });
        }
    };
    LoginComponent.prototype.register = function () {
        var dialogRef = this.dialog.open(registro_component_1.RegistroComponent, {
            width: '1000px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("cerrando");
        });
    };
    LoginComponent.prototype.activeLogIn = function () {
        if (this.password != '' && this.user != '') {
            this.isLoginable = false;
        }
        else {
            this.isLoginable = true;
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [ng2_device_detector_1.Ng2DeviceService,
            material_1.MatDialog,
            eventos_service_1.EventosService,
            router_1.Router,
            authentication_service_1.AuthenticationService,
            user_service_1.UserService,
            role_service_1.RoleService,
            permisomodulo_service_1.PermisoModuloService,
            modulo_service_1.ModuloService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map