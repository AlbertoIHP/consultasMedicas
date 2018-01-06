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
var ProvinciaService = /** @class */ (function () {
    function ProvinciaService(http, authenticationService) {
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
    ProvinciaService.prototype.getProvincias = function () {
        return this.http.get(this.base + 'provincias', this.options).map(function (res) { return res.json(); });
    };
    //POST
    ProvinciaService.prototype.registerProvincia = function (provincia) {
        return this.http.post(this.base + 'provincias', JSON.stringify(provincia), this.options).map(function (res) { return res.json(); });
    };
    //GET
    ProvinciaService.prototype.getProvincia = function (id) {
        return this.http.get(this.base + 'provincias/' + id, this.options).map(function (res) { return res.json(); });
    };
    //PUT
    ProvinciaService.prototype.editProvincia = function (provincia, id) {
        return this.http.put(this.base + 'provincias/' + id, JSON.stringify(provincia), this.options).map(function (res) { return res.json(); });
    };
    //DELETE
    ProvinciaService.prototype.deleteProvincia = function (id) {
        return this.http.delete(this.base + 'provincias/' + id, this.options).map(function (res) { return res.json(); });
    };
    ProvinciaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], ProvinciaService);
    return ProvinciaService;
}());
exports.ProvinciaService = ProvinciaService;
//# sourceMappingURL=provincia.service.js.map