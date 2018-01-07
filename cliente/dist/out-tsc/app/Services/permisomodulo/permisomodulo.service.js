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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var const_1 = require("../const");
//Servicios utilizados
var authentication_service_1 = require("../authentication/authentication.service");
var PermisoModuloService = /** @class */ (function () {
    function PermisoModuloService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.base = const_1.base.api;
        this.headers = new http_1.Headers({
            'Authorization': 'Bearer ' + this.authenticationService.token,
            'Content-Type': 'application/json'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    //GET
    PermisoModuloService.prototype.getPermisoModulos = function () {
        return this.http.get(this.base + 'permisoModulos', this.options).map(function (res) { return res.json(); });
    };
    //POST
    PermisoModuloService.prototype.registerPermisoModulo = function (persona) {
        return this.http.post(this.base + 'permisoModulos', JSON.stringify(persona), this.options).map(function (res) { return res.json(); });
    };
    //GET
    PermisoModuloService.prototype.getPermisoModulo = function (id) {
        return this.http.get(this.base + 'permisoModulos/' + id, this.options).map(function (res) { return res.json(); });
    };
    //PUT
    PermisoModuloService.prototype.editPermisoModulo = function (persona, id) {
        return this.http.put(this.base + 'permisoModulos/' + id, JSON.stringify(persona), this.options).map(function (res) { return res.json(); });
    };
    //DELETE
    PermisoModuloService.prototype.deletePermisoModulo = function (id) {
        return this.http.delete(this.base + 'permisoModulos/' + id, this.options).map(function (res) { return res.json(); });
    };
    PermisoModuloService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], PermisoModuloService);
    return PermisoModuloService;
}());
exports.PermisoModuloService = PermisoModuloService;
//# sourceMappingURL=permisomodulo.service.js.map