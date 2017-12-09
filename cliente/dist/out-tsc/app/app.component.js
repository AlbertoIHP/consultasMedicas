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
var platform_browser_1 = require("@angular/platform-browser");
var material_1 = require("@angular/material");
var eventos_service_1 = require("./Services/eventos/eventos.service");
var usuarioactual_component_1 = require("./Components/Globals/usuarioactual.component");
var ng2_device_detector_1 = require("ng2-device-detector");
var AppComponent = /** @class */ (function () {
    function AppComponent(deviceService, eventosService, router, iconRegistry, sanitizer) {
        var _this = this;
        this.deviceService = deviceService;
        this.eventosService = eventosService;
        this.router = router;
        this.iconRegistry = iconRegistry;
        this.isLogeado = false;
        this.isMobile = false;
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        //iconos de toolbar
        this.iconRegistry
            .addSvgIcon('icono-logout', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/exit.svg'));
        this.iconRegistry
            .addSvgIcon('icono-editar-perfil', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/tools.svg'));
        this.iconRegistry
            .addSvgIcon('icono-error', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/warning.svg'));
        this.epicFunction();
        if (this.deviceInfo.device === 'android' || this.deviceInfo.device === 'iphone' || this.deviceInfo.device === 'ipad') {
            //alert("Esto es un mobile")
            this.isMobile = true;
        }
        if (localStorage.getItem('currentUser')) {
            this.isLogeado = true;
        }
        this.eventosService.isSingIn.subscribe(function (data) {
            _this.isLogeado = true;
            _this.usuarioActual.permisos = JSON.parse(localStorage.getItem('permisos'));
        });
    }
    AppComponent.prototype.goPacMobile = function () {
        this.router.navigate(['mobile/mp']);
    };
    AppComponent.prototype.goCitMobile = function () {
        this.router.navigate(['mobile/mc']);
    };
    AppComponent.prototype.goAteMobile = function () {
        this.router.navigate(['mobile/ma']);
    };
    AppComponent.prototype.epicFunction = function () {
        console.log('hello `Home` component');
        this.deviceInfo = this.deviceService.getDeviceInfo();
        console.log(this.deviceInfo);
    };
    AppComponent.prototype.irMP = function () {
        this.router.navigate(['moduloPacientes']);
    };
    AppComponent.prototype.irMC = function () {
        this.router.navigate(['moduloCitas']);
    };
    AppComponent.prototype.irMA = function () {
    };
    AppComponent.prototype.cerrarSesion = function () {
        this.isLogeado = false;
        localStorage.clear();
        this.router.navigate(['/']);
    };
    AppComponent.prototype.changeMenu = function (menu1, menu2) {
        menu1.close();
        menu2.close();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [ng2_device_detector_1.Ng2DeviceService, eventos_service_1.EventosService, router_1.Router, material_1.MatIconRegistry, platform_browser_1.DomSanitizer])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map