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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var Usuario_model_1 = require("../../../Models/Usuario.model");
var user_service_1 = require("../../../Services/user/user.service");
var role_service_1 = require("../../../Services/role/role.service");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
var router_1 = require("@angular/router");
var Persona_model_1 = require("../../../Models/Persona.model");
var persona_service_1 = require("../../../Services/persona/persona.service");
var genero_service_1 = require("../../../Services/genero/genero.service");
var estadocivil_service_1 = require("../../../Services/estadocivil/estadocivil.service");
var region_service_1 = require("../../../Services/region/region.service");
var provincia_service_1 = require("../../../Services/provincia/provincia.service");
var comuna_service_1 = require("../../../Services/comuna/comuna.service");
var RegistroComponent = /** @class */ (function () {
    function RegistroComponent(dialogRef, data, _formBuilder, servicioPersona, servicioRegion, servicioProvincia, servicioComuna, servicioGenero, servicioEstadoCivil, router, servicioEventos, servicioUsuario, servicioRole) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._formBuilder = _formBuilder;
        this.servicioPersona = servicioPersona;
        this.servicioRegion = servicioRegion;
        this.servicioProvincia = servicioProvincia;
        this.servicioComuna = servicioComuna;
        this.servicioGenero = servicioGenero;
        this.servicioEstadoCivil = servicioEstadoCivil;
        this.router = router;
        this.servicioEventos = servicioEventos;
        this.servicioUsuario = servicioUsuario;
        this.servicioRole = servicioRole;
        this.isLinear = true;
        this.puedeSeguir = true;
        this.seEncontro = false;
        this.emailValido = true;
        this.nuevoUsuario = new Usuario_model_1.Usuario();
        this.nuevaPersona = new Persona_model_1.Persona();
        this.actualizarRegiones();
        this.actualizarProvincias();
        this.actualizarComunas();
        this.actualizarGeneros();
        this.actualizarEstadoCiviles();
        this.actualizarPersonas();
        this.defaultValues();
    }
    RegistroComponent.prototype.actualizarRegiones = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
    };
    RegistroComponent.prototype.actualizarProvincias = function () {
        var _this = this;
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
        });
    };
    RegistroComponent.prototype.actualizarComunas = function () {
        var _this = this;
        this.servicioComuna.getComunas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalComunas = todo;
        });
    };
    RegistroComponent.prototype.actualizarGeneros = function () {
        var _this = this;
        this.servicioGenero.getGeneros().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalGeneros = todo;
        });
    };
    RegistroComponent.prototype.actualizarEstadoCiviles = function () {
        var _this = this;
        this.servicioEstadoCivil.getEstadoCivils().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEstadoCiviles = todo;
        });
    };
    RegistroComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
        });
    };
    RegistroComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', forms_1.Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', forms_1.Validators.required]
        });
    };
    RegistroComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    RegistroComponent.prototype.regionSeleccionada = function (region) {
        for (var i = 0; i < this.totalProvincias.length; i++) {
            if (this.totalProvincias[i].Region_id === region.id) {
                this.provinciasMostrar.push(this.totalProvincias[i]);
            }
        }
        this.mostrarRegiones = false;
        this.mostrarProvincias = true;
    };
    RegistroComponent.prototype.provinciaSeleccionada = function (provincia) {
        for (var i = 0; i < this.totalComunas.length; i++) {
            if (this.totalComunas[i].Provincia_id === provincia.id) {
                this.comunasMostrar.push(this.totalComunas[i]);
            }
        }
        this.mostrarProvincias = false;
        this.mostrarComunas = true;
    };
    RegistroComponent.prototype.defaultValues = function () {
        this.mostrarComunas = false;
        this.mostrarProvincias = false;
        this.mostrarRegiones = true;
        this.nuevaPersona = new Persona_model_1.Persona();
        this.nuevoUsuario = new Usuario_model_1.Usuario();
        this.provinciasMostrar = [];
        this.comunasMostrar = [];
    };
    RegistroComponent.prototype.agregarPersona = function () {
        var _this = this;
        if (!this.seEncontro) {
            console.log(this.nuevaPersona);
            this.servicioPersona.registerPersona(this.nuevaPersona).subscribe(function (data) {
                _this.servicioPersona.getPersonas().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    for (var j = 0; j < todo.length; j++) {
                        if (todo[j].rut === _this.nuevaPersona.rut) {
                            _this.nuevoUsuario.Persona_id = todo[j].id.toString();
                            _this.nuevoUsuario.Role_id = '1';
                            break;
                        }
                    }
                    console.log(_this.nuevoUsuario);
                    _this.servicioUsuario.registerUser(_this.nuevoUsuario).subscribe(function (data) {
                        _this.defaultValues();
                    });
                });
            });
        }
        else {
            console.log(this.nuevoUsuario);
            this.servicioUsuario.registerUser(this.nuevoUsuario).subscribe(function (data) {
                _this.defaultValues();
            });
        }
    };
    RegistroComponent.prototype.comunaSeleccionada = function (comuna) {
        this.nuevaPersona.Comuna_id = comuna.id;
        if (this.nuevaPersona.rut != '' && this.nuevaPersona.nombre1 != '' && this.nuevaPersona.nombre2 != '' && this.nuevaPersona.apellido1 != '' && this.nuevaPersona.apellido2 != '' && this.nuevaPersona.fono_casa != '' && this.nuevaPersona.fono_trabajo != '' && this.nuevaPersona.movil) {
            this.puedeSeguir = false;
        }
    };
    RegistroComponent.prototype.ecSeleccionado = function (ec) {
        this.nuevaPersona.EstadoCivil_id = ec.id;
    };
    RegistroComponent.prototype.generoSeleccionado = function (genero) {
        this.nuevaPersona.Genero_id = genero.id;
    };
    RegistroComponent.prototype.buscarRut = function () {
        if (this.nuevaPersona.rut != '') {
            if (this.validator(this.nuevaPersona.rut)) {
                this.puedeSeguir = true;
            }
            for (var i = 0; i < this.totalPersonas.length; i++) {
                if (this.totalPersonas[i].rut === this.nuevaPersona.rut) {
                    alert("¡Usted ya esta registrado!");
                    this.defaultValues();
                    this.onNoClick();
                    break;
                }
            }
        }
    };
    RegistroComponent.prototype.validator = function (rutComplete) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutComplete)) {
            return false;
        }
        var tmp = rutComplete.split('-');
        var checkDigit = tmp[1];
        var rut = tmp[0];
        if (checkDigit === 'K' || checkDigit === 'k') {
            checkDigit = 'k';
            return (this.verifyNumber(rut) === checkDigit);
        }
        return (this.verifyNumber(rut) === parseInt(checkDigit));
    };
    RegistroComponent.prototype.verifyNumber = function (T) {
        var M = 0;
        var S = 1;
        for (; T; T = Math.floor(T / 10)) {
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        }
        return S ? S - 1 : 'k';
    };
    RegistroComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(email));
        if (re.test(email) && this.nuevoUsuario.password != '') {
            this.emailValido = false;
        }
        else {
            this.emailValido = true;
        }
    };
    RegistroComponent = __decorate([
        core_1.Component({
            selector: 'app-registro',
            templateUrl: './registro.component.html',
            styleUrls: ['./registro.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, forms_1.FormBuilder,
            persona_service_1.PersonaService,
            region_service_1.RegionService,
            provincia_service_1.ProvinciaService,
            comuna_service_1.ComunaService,
            genero_service_1.GeneroService,
            estadocivil_service_1.EstadocivilService,
            router_1.Router,
            eventos_service_1.EventosService,
            user_service_1.UserService,
            role_service_1.RoleService])
    ], RegistroComponent);
    return RegistroComponent;
}());
exports.RegistroComponent = RegistroComponent;
//# sourceMappingURL=registro.component.js.map