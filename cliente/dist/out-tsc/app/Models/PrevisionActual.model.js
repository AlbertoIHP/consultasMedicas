"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrevisionActual = /** @class */ (function () {
    function PrevisionActual() {
        this.id = 0;
        this.fechaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.Prevision_id = "";
        this.Persona_id = "";
        this.activado = 1;
    }
    return PrevisionActual;
}());
exports.PrevisionActual = PrevisionActual;
//# sourceMappingURL=PrevisionActual.model.js.map