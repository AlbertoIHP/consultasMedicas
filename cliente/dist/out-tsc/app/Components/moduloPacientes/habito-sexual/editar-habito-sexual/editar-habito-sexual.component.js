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
var habito_sexual_service_1 = require("../../../../Services/habitosexual/habito-sexual.service");
var forms_1 = require("@angular/forms");
var EditarHabitoSexualComponent = /** @class */ (function () {
    function EditarHabitoSexualComponent(dialogRef, data, servicioHabitoSexual) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioHabitoSexual = servicioHabitoSexual;
        this.habitosexual = data.habitosexual;
    }
    EditarHabitoSexualComponent.prototype.ngOnInit = function () {
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    EditarHabitoSexualComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarHabitoSexualComponent.prototype.editarHabitoSexual = function () {
        var _this = this;
        this.servicioHabitoSexual.editHabitoSexual(this.habitosexual, this.habitosexual.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    EditarHabitoSexualComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-habito-sexual',
            templateUrl: './editar-habito-sexual.component.html',
            styleUrls: ['./editar-habito-sexual.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, habito_sexual_service_1.HabitoSexualService])
    ], EditarHabitoSexualComponent);
    return EditarHabitoSexualComponent;
}());
exports.EditarHabitoSexualComponent = EditarHabitoSexualComponent;
//# sourceMappingURL=editar-habito-sexual.component.js.map