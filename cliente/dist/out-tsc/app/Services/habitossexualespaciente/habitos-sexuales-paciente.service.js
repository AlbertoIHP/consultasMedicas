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
var HabitosSexualesPacienteService = /** @class */ (function () {
    function HabitosSexualesPacienteService(http, authenticationService) {
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
    HabitosSexualesPacienteService.prototype.getHabitosSexualesPacientes = function () {
        return this.http.get(this.base + 'habitosSexualesPacientes', this.options).map(function (res) { return res.json(); });
    };
    //POST
    HabitosSexualesPacienteService.prototype.registerHabitosSexualesPaciente = function (habitoSexualPaciente) {
        return this.http.post(this.base + 'habitosSexualesPacientes', JSON.stringify(habitoSexualPaciente), this.options).map(function (res) { return res.json(); });
    };
    //GET
    HabitosSexualesPacienteService.prototype.getHabitosSexualesPaciente = function (id) {
        return this.http.get(this.base + 'habitosSexualesPacientes/' + id, this.options).map(function (res) { return res.json(); });
    };
    //PUT
    HabitosSexualesPacienteService.prototype.editHabitosSexualesPaciente = function (habitoSexualPaciente, id) {
        return this.http.put(this.base + 'habitosSexualesPacientes/' + id, JSON.stringify(habitoSexualPaciente), this.options).map(function (res) { return res.json(); });
    };
    //DELETE
    HabitosSexualesPacienteService.prototype.deleteHabitosSexualesPaciente = function (id) {
        return this.http.delete(this.base + 'habitosSexualesPacientes/' + id, this.options).map(function (res) { return res.json(); });
    };
    HabitosSexualesPacienteService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], HabitosSexualesPacienteService);
    return HabitosSexualesPacienteService;
}());
exports.HabitosSexualesPacienteService = HabitosSexualesPacienteService;
//# sourceMappingURL=habitos-sexuales-paciente.service.js.map