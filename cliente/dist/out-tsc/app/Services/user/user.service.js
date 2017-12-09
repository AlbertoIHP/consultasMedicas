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
var UserService = /** @class */ (function () {
    function UserService(http, authenticationService) {
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
    UserService.prototype.getUsers = function () {
        return this.http.get(this.base + 'users', this.options).map(function (res) { return res.json(); });
    };
    //POST
    UserService.prototype.registerUser = function (usuario) {
        return this.http.post(this.base + 'users', JSON.stringify(usuario), this.options).map(function (res) { return res.json(); });
        //   .map((res: Response) =>
        //   {
        // 		if (res.ok) {
        // 			return true;
        // 		}else{
        // 			return false;
        // 		}
        //  }).catch( e => {
        // if(e.status === 405)
        // 		{
        // 		  return Observable.throw('Used');
        // 		}
        //  });
    };
    //GET
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.base + 'users/' + id, this.options).map(function (res) { return res.json(); });
    };
    //PUT
    UserService.prototype.editUser = function (usuario, id) {
        return this.http.put(this.base + 'users/' + id, JSON.stringify(usuario), this.options).map(function (res) { return res.json(); });
    };
    //DELETE
    UserService.prototype.deleteUser = function (id) {
        return this.http.delete(this.base + 'users/' + id, this.options).map(function (res) { return res.json(); });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//ESTO ES UN EJEMPLO DE VALIDACION PERO SE APLICARA MAS ADELANTE
// .map(response =>
//   {
//     if (response.ok) {
//         return true;
//     }else{
//         return false;
//     }
//   }).catch(e => {
//     console.log(e.status);
//   if (e.status === 400) {
//     return Observable.throw('Unauthorized');
//   }else if(e.status === 500){
//     return Observable.throw('UsedMail');
//   }
// });
//# sourceMappingURL=user.service.js.map