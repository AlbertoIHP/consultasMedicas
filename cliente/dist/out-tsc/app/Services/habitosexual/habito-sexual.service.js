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
//Servicios utilizados
var authentication_service_1 = require("../authentication/authentication.service");
var HabitoSexualService = /** @class */ (function () {
    function HabitoSexualService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.base = "http://localhost:8000/api/v1/";
        this.headers = new http_1.Headers({
            'Authorization': 'Bearer ' + this.authenticationService.token,
            'Content-Type': 'application/json'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    //GET
    HabitoSexualService.prototype.getHabitoSexuales = function () {
        return this.http.get(this.base + 'habitoSexuals', this.options).map(function (res) { return res.json(); });
    };
    //POST
    HabitoSexualService.prototype.registerHabitoSexual = function (habitoSexual) {
        return this.http.post(this.base + 'habitoSexuals', JSON.stringify(habitoSexual), this.options).map(function (res) { return res.json(); });
    };
    //GET
    HabitoSexualService.prototype.getHabitoSexual = function (id) {
        return this.http.get(this.base + 'habitoSexuals/' + id, this.options).map(function (res) { return res.json(); });
    };
    //PUT
    HabitoSexualService.prototype.editHabitoSexual = function (habitoSexual, id) {
        return this.http.put(this.base + 'habitoSexuals/' + id, JSON.stringify(habitoSexual), this.options).map(function (res) { return res.json(); });
    };
    //DELETE
    HabitoSexualService.prototype.deleteHabitoSexual = function (id) {
        return this.http.delete(this.base + 'habitoSexuals/' + id, this.options).map(function (res) { return res.json(); });
    };
    HabitoSexualService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], HabitoSexualService);
    return HabitoSexualService;
}());
exports.HabitoSexualService = HabitoSexualService;
//# sourceMappingURL=habito-sexual.service.js.map