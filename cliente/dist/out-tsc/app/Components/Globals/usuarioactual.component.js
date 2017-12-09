"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsuarioActual = /** @class */ (function () {
    function UsuarioActual() {
        this.permisos = JSON.parse(localStorage.getItem('permisos'));
    }
    UsuarioActual.prototype.ngOnInit = function () {
    };
    UsuarioActual.prototype.obtenerExistenciaPermiso = function (nombreModulo) {
        for (var i = 0; i < this.permisos.length; i++) {
            if (this.permisos[i].Modulo_id === nombreModulo && this.permisos[i].view == 1) {
                return true;
            }
        }
    };
    UsuarioActual.prototype.obtenerPermisoWrite = function (nombreModulo) {
        for (var i = 0; i < this.permisos.length; i++) {
            if (this.permisos[i].Modulo_id === nombreModulo && this.permisos[i].write == 1) {
                return true;
            }
        }
    };
    UsuarioActual.prototype.obtenerPermisoErase = function (nombreModulo) {
        for (var i = 0; i < this.permisos.length; i++) {
            if (this.permisos[i].Modulo_id === nombreModulo && this.permisos[i].erase == 1) {
                return true;
            }
        }
    };
    UsuarioActual.prototype.obtenerPermisoUpdate = function (nombreModulo) {
        for (var i = 0; i < this.permisos.length; i++) {
            if (this.permisos[i].Modulo_id === nombreModulo && this.permisos[i].update == 1) {
                return true;
            }
        }
    };
    return UsuarioActual;
}());
exports.UsuarioActual = UsuarioActual;
//# sourceMappingURL=usuarioactual.component.js.map