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
var ng2_device_detector_1 = require("ng2-device-detector");
var LoginGuard = /** @class */ (function () {
    function LoginGuard(router, deviceService) {
        this.router = router;
        this.deviceService = deviceService;
        this.deviceInfo = this.deviceService.getDeviceInfo();
    }
    LoginGuard.prototype.canActivate = function (next, state) {
        if (localStorage.getItem('currentUser')) {
            //si esta logeado no podrá ir a la ruta de login
            if (this.deviceInfo.device === 'android' || this.deviceInfo.device === 'iphone' || this.deviceInfo.device === 'ipad') {
                this.router.navigate(['mobile/mp']);
            }
            else {
                this.router.navigate(['']);
            }
            return false;
        }
        else {
            return true;
        }
    };
    LoginGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, ng2_device_detector_1.Ng2DeviceService])
    ], LoginGuard);
    return LoginGuard;
}());
exports.LoginGuard = LoginGuard;
//# sourceMappingURL=login.guard.js.map