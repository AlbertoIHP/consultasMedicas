"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExamenFisico = /** @class */ (function () {
    function ExamenFisico() {
        this.id = 0;
        this.fechaExamen = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.peso = 0.0;
        this.estatura = 0.0;
    }
    return ExamenFisico;
}());
exports.ExamenFisico = ExamenFisico;
//# sourceMappingURL=ExamenFisico.model.js.map