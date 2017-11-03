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
var PrevisionactualService = /** @class */ (function () {
    function PrevisionactualService(http, authenticationService) {
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
    PrevisionactualService.prototype.getPrevisionActuals = function () {
        return this.http.get(this.base + 'previsionActuals', this.options).map(function (res) { return res.json(); });
    };
    //POST
    PrevisionactualService.prototype.registerPrevisionActual = function (previsionActual) {
        return this.http.post(this.base + 'previsionActuals', JSON.stringify(previsionActual), this.options).map(function (res) { return res.json(); });
    };
    //GET
    PrevisionactualService.prototype.getPrevisionActual = function (id) {
        return this.http.get(this.base + 'previsionActuals/' + id, this.options).map(function (res) { return res.json(); });
    };
    //PUT
    PrevisionactualService.prototype.editPrevisionActual = function (previsionActual, id) {
        return this.http.put(this.base + 'previsionActuals/' + id, JSON.stringify(previsionActual), this.options).map(function (res) { return res.json(); });
    };
    //DELETE
    PrevisionactualService.prototype.deletePrevisionActual = function (id) {
        return this.http.delete(this.base + 'previsionActuals/' + id, this.options).map(function (res) { return res.json(); });
    };
    PrevisionactualService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], PrevisionactualService);
    return PrevisionactualService;
}());
exports.PrevisionactualService = PrevisionactualService;
//# sourceMappingURL=previsionactual.service.js.map