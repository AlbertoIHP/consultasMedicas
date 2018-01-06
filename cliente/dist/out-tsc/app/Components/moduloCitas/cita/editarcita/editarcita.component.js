"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var forms_1 = require("@angular/forms");
var especialidad_service_1 = require("../../../../Services/especialidad/especialidad.service");
var persona_service_1 = require("../../../../Services/persona/persona.service");
var disponibilidad_service_1 = require("../../../../Services/disponibilidad/disponibilidad.service");
var agregarcita_component_1 = require("../agregarcita/agregarcita.component");
var EditarcitaComponent = /** @class */ (function (_super) {
    __extends(EditarcitaComponent, _super);
    function EditarcitaComponent(dialogRef, data, _formBuilder, servicioEspecialidad, servicioPersona, servicioDisponibilidad) {
        var _this = _super.call(this, dialogRef, data, _formBuilder, servicioEspecialidad, servicioPersona, servicioDisponibilidad) || this;
        _this.data = data;
        return _this;
    }
    EditarcitaComponent.prototype.ngOnInit = function () {
    };
    EditarcitaComponent.prototype.editarCita = function () {
        this.servicioCitas.editCita(this.cita, this.cita.id).subscribe(function (data) {
            console.log(data);
        });
    };
    EditarcitaComponent = __decorate([
        core_1.Component({
            selector: 'app-editarcita',
            templateUrl: './editarcita.component.html',
            styleUrls: ['./editarcita.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, forms_1.FormBuilder,
            especialidad_service_1.EspecialidadService,
            persona_service_1.PersonaService,
            disponibilidad_service_1.DisponibilidadService])
    ], EditarcitaComponent);
    return EditarcitaComponent;
}(agregarcita_component_1.AgregarcitaComponent));
exports.EditarcitaComponent = EditarcitaComponent;
//# sourceMappingURL=editarcita.component.js.map