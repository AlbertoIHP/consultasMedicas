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
var material_1 = require("@angular/material");
var Persona_model_1 = require("../../../../Models/Persona.model");
var AgregarpersonaComponent = /** @class */ (function () {
    function AgregarpersonaComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioRegion = this.data.servicioRegion;
        this.servicioProvincia = this.data.servicioProvincia;
        this.servicioComuna = this.data.servicioComuna;
        this.servicioGenero = this.data.servicioGenero;
        this.servicioEC = this.data.servicioEC;
        this.servicioPersona = this.data.servicioPersona;
        this.defaultValues();
    }
    AgregarpersonaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioGenero.getGeneros().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalGeneros = todo;
        });
        this.servicioEC.getEstadoCivils().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalEstadoCiviles = todo;
        });
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
        this.servicioComuna.getComunas().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalComunas = todo;
        });
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
        });
    };
    AgregarpersonaComponent.prototype.defaultValues = function () {
        this.mostrarComunas = false;
        this.mostrarProvincias = false;
        this.mostrarRegiones = true;
        this.persona = new Persona_model_1.Persona();
        this.totalRegiones = this.data.regiones;
        this.totalProvincias = this.data.provincias;
        this.totalComunas = this.data.comunas;
        this.totalEstadoCiviles = this.data.ec;
        this.totalGeneros = this.data.generos;
        this.provinciasMostrar = [];
        this.comunasMostrar = [];
    };
    AgregarpersonaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarpersonaComponent.prototype.regionSeleccionada = function (region) {
        for (var i = 0; i < this.totalProvincias.length; i++) {
            if (this.totalProvincias[i].Region_id === region.id) {
                this.provinciasMostrar.push(this.totalProvincias[i]);
            }
        }
        this.mostrarRegiones = false;
        this.mostrarProvincias = true;
    };
    AgregarpersonaComponent.prototype.provinciaSeleccionada = function (provincia) {
        for (var i = 0; i < this.totalComunas.length; i++) {
            if (this.totalComunas[i].Provincia_id === provincia.id) {
                this.comunasMostrar.push(this.totalComunas[i]);
            }
        }
        this.mostrarProvincias = false;
        this.mostrarComunas = true;
    };
    AgregarpersonaComponent.prototype.agregarPersona = function () {
        var _this = this;
        this.servicioPersona.registerPersona(this.persona).subscribe(function (data) {
            _this.defaultValues();
            _this.onNoClick();
        });
    };
    AgregarpersonaComponent.prototype.comunaSeleccionada = function (comuna) {
        this.persona.Comuna_id = comuna.id;
    };
    AgregarpersonaComponent.prototype.ecSeleccionado = function (ec) {
        this.persona.EstadoCivil_id = ec.id;
    };
    AgregarpersonaComponent.prototype.generoSeleccionado = function (genero) {
        this.persona.Genero_id = genero.id;
    };
    AgregarpersonaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarpersona',
            templateUrl: './agregarpersona.component.html',
            styleUrls: ['./agregarpersona.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AgregarpersonaComponent);
    return AgregarpersonaComponent;
}());
exports.AgregarpersonaComponent = AgregarpersonaComponent;
//# sourceMappingURL=agregarpersona.component.js.map