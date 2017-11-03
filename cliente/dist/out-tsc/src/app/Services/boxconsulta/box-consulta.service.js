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
var BoxConsultaService = /** @class */ (function () {
    function BoxConsultaService(http, authenticationService) {
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
    BoxConsultaService.prototype.getBoxConsultas = function () {
        return this.http.get(this.base + 'boxConsultas', this.options).map(function (res) { return res.json(); });
    };
    //POST
    BoxConsultaService.prototype.registerBoxConsulta = function (boxConsulta) {
        return this.http.post(this.base + 'tipoSangres', JSON.stringify(tipoSangre), this.options).map(function (res) { return res.json(); });
    };
    //GET
    BoxConsultaService.prototype.getTipoSangre = function (id) {
        return this.http.get(this.base + 'tipoSangres/' + id, this.options).map(function (res) { return res.json(); });
    };
    //PUT
    BoxConsultaService.prototype.editTipoSangre = function (tipoSangre, id) {
        return this.http.put(this.base + 'tipoSangres/' + id, JSON.stringify(tipoSangre), this.options).map(function (res) { return res.json(); });
    };
    //DELETE
    BoxConsultaService.prototype.deleteTipoSangre = function (id) {
        return this.http.delete(this.base + 'tipoSangres/' + id, this.options).map(function (res) { return res.json(); });
    };
    BoxConsultaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], BoxConsultaService);
    return BoxConsultaService;
}());
exports.BoxConsultaService = BoxConsultaService;
//# sourceMappingURL=box-consulta.service.js.map