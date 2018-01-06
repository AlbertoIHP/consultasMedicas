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
var grupo_etnico_service_1 = require("../../../../Services/grupoetnico/grupo-etnico.service");
var forms_1 = require("@angular/forms");
var EditarGrupoEtnicoComponent = /** @class */ (function () {
    function EditarGrupoEtnicoComponent(dialogRef, data, servicioGrupoEtnico) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioGrupoEtnico = servicioGrupoEtnico;
        this.grupoetnico = data.grupoetnico;
    }
    EditarGrupoEtnicoComponent.prototype.ngOnInit = function () {
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl(this.grupoetnico.nombre, [forms_1.Validators.required]),
        });
    };
    EditarGrupoEtnicoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarGrupoEtnicoComponent.prototype.editarGrupoEtnico = function () {
        var _this = this;
        this.servicioGrupoEtnico.editGrupoEtnico(this.grupoetnico, this.grupoetnico.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    EditarGrupoEtnicoComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-grupo-etnico',
            templateUrl: './editar-grupo-etnico.component.html',
            styleUrls: ['./editar-grupo-etnico.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, grupo_etnico_service_1.GrupoEtnicoService])
    ], EditarGrupoEtnicoComponent);
    return EditarGrupoEtnicoComponent;
}());
exports.EditarGrupoEtnicoComponent = EditarGrupoEtnicoComponent;
//# sourceMappingURL=editar-grupo-etnico.component.js.map