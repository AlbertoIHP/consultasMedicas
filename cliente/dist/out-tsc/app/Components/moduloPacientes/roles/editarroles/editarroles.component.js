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
// Componentes generales
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
// Modelos y servicios
var role_service_1 = require("../../../../Services/role/role.service");
var modulo_service_1 = require("../../../../Services/modulo/modulo.service");
var permisomodulo_service_1 = require("../../../../Services/permisomodulo/permisomodulo.service");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditarrolesComponent = /** @class */ (function () {
    function EditarrolesComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioRole, servicioModulo, servicioPM, servicioEvento) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioRole = servicioRole;
        this.servicioModulo = servicioModulo;
        this.servicioPM = servicioPM;
        this.servicioEvento = servicioEvento;
        this.displayedColumns = ['function', 'permissions'];
        // Se inicializan los atributos
        this.totalPM = [];
        this.role = data.role;
        this.servicioModulo.getModulos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalModulos = todo;
            _this.servicioPM.getPermisoModulos().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPM = todo.filter(function (permiso) { return parseInt(permiso.Role_id) === _this.role.id; });
                var _loop_1 = function (i) {
                    a = _this.totalModulos.filter(function (modulo) { return modulo.id === parseInt(_this.totalPM[i].Modulo_id); });
                    a = a[0];
                    _this.totalPM[i].Modulo_id = a.name;
                    console.log(_this.totalPM[i]);
                    _this.totalPM[i].write === 0 ? _this.totalPM[i].write = false : _this.totalPM[i].write = true;
                    _this.totalPM[i].erase === 0 ? _this.totalPM[i].erase = false : _this.totalPM[i].erase = true;
                    _this.totalPM[i].update === 0 ? _this.totalPM[i].update = false : _this.totalPM[i].update = true;
                    _this.totalPM[i].view === 0 ? _this.totalPM[i].view = false : _this.totalPM[i].view = true;
                };
                var a;
                for (var i = 0; i < _this.totalPM.length; i++) {
                    _loop_1(i);
                }
            });
        });
    }
    EditarrolesComponent.prototype.ngOnInit = function () {
        // Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    EditarrolesComponent.prototype.obtenerNombre = function () {
        if (this.role.nombre != "") {
            return true;
        }
        else {
            return false;
        }
    };
    //Cerrar el diálogo
    EditarrolesComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarrolesComponent.prototype.editarRole = function () {
        var _this = this;
        //Usando el id del rol, se actualiza con los nuevos datos
        this.servicioRole.editRole(this.role, this.role.id).subscribe(function (data) {
            var _loop_2 = function (j) {
                module = _this.totalModulos.filter(function (modulo) { return modulo.name === _this.totalPM[j].Modulo_id; });
                _this.totalPM[j].Modulo_id = module[0].id.toString();
                _this.totalPM[j].write === true ? _this.totalPM[j].write = 1 : _this.totalPM[j].write = 0;
                _this.totalPM[j].erase === true ? _this.totalPM[j].erase = 1 : _this.totalPM[j].erase = 0;
                _this.totalPM[j].update === true ? _this.totalPM[j].update = 1 : _this.totalPM[j].update = 0;
                _this.totalPM[j].view === true ? _this.totalPM[j].view = 1 : _this.totalPM[j].view = 0;
                _this.servicioPM.editPermisoModulo(_this.totalPM[j], _this.totalPM[j].id).subscribe(function (data) {
                    //Se emite un evento para no actualizar la vista
                    _this.servicioEvento.actualizacion(true);
                    _this.dialogRef.close();
                });
            };
            var module;
            for (var j = 0; j < _this.totalPM.length; j++) {
                _loop_2(j);
            }
        });
    };
    EditarrolesComponent = __decorate([
        core_1.Component({
            selector: 'app-editarroles',
            templateUrl: './editarroles.component.html',
            styleUrls: ['./editarroles.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, role_service_1.RoleService,
            modulo_service_1.ModuloService,
            permisomodulo_service_1.PermisoModuloService,
            eventos_service_1.EventosService])
    ], EditarrolesComponent);
    return EditarrolesComponent;
}());
exports.EditarrolesComponent = EditarrolesComponent;
//# sourceMappingURL=editarroles.component.js.map