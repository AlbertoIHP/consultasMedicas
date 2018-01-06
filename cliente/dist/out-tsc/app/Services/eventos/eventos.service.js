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
var EventosService = /** @class */ (function () {
    function EventosService() {
        this.seActivo = new core_1.EventEmitter();
        this.isSingIn = new core_1.EventEmitter();
        this.isSingOut = new core_1.EventEmitter();
        this.isSingUp = new core_1.EventEmitter();
        this.seActivoFicha = new core_1.EventEmitter();
        this.actualizar = new core_1.EventEmitter();
    }
    EventosService.prototype.activarFicha = function (paciente) {
        this.seActivoFicha.emit(paciente);
    };
    EventosService.prototype.hiceUnCambio = function () {
        this.seActivo.emit();
    };
    EventosService.prototype.actualizacion = function (boolean) {
        this.actualizar.emit(boolean);
    };
    EventosService.prototype.singIn = function () {
        this.isSingIn.emit();
    };
    EventosService.prototype.singOut = function () {
        this.isSingOut.emit();
    };
    EventosService.prototype.singUp = function (newUser) {
        this.isSingUp.emit(newUser);
    };
    EventosService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], EventosService);
    return EventosService;
}());
exports.EventosService = EventosService;
//# sourceMappingURL=eventos.service.js.map