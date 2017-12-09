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
var eventos_service_1 = require("../../Services/eventos/eventos.service");
var router_1 = require("@angular/router");
var user_service_1 = require("../../Services/user/user.service");
var usuarioactual_component_1 = require("../Globals/usuarioactual.component");
var ng2_device_detector_1 = require("ng2-device-detector");
var Homemp = /** @class */ (function () {
    function Homemp(deviceService, eventosService, servicioUsuario, router) {
        this.deviceService = deviceService;
        this.eventosService = eventosService;
        this.servicioUsuario = servicioUsuario;
        this.router = router;
        this.isLogeado = false;
        this.deviceInfo = this.deviceService.getDeviceInfo();
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        else {
            //se obtienen los datos asociados a permisos del usuario actual
            console.log(this.deviceInfo);
            this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
            if (this.deviceInfo.device != 'android' && this.deviceInfo.device != 'iphone' && this.deviceInfo.device != 'ipad') {
                console.log("HOLA");
                this.router.navigate(['per']);
            }
        }
    }
    Homemp.prototype.ngOnInit = function () {
    };
    Homemp = __decorate([
        core_1.Component({
            selector: 'app-homemp',
            templateUrl: './homemp.component.html',
            styleUrls: ['./homemp.component.css']
        }),
        __metadata("design:paramtypes", [ng2_device_detector_1.Ng2DeviceService,
            eventos_service_1.EventosService,
            user_service_1.UserService,
            router_1.Router])
    ], Homemp);
    return Homemp;
}());
exports.Homemp = Homemp;
//# sourceMappingURL=homemp.component.js.map