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
var genero_service_1 = require("../../../../Services/genero/genero.service");
var forms_1 = require("@angular/forms");
var EditargeneroComponent = /** @class */ (function () {
    function EditargeneroComponent(dialogRef, data, servicioGenero) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioGenero = servicioGenero;
        this.genero = data.genero;
    }
    EditargeneroComponent.prototype.ngOnInit = function () {
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
            descripcion: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    EditargeneroComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditargeneroComponent.prototype.editarGenero = function () {
        var _this = this;
        this.servicioGenero.editGenero(this.genero, this.genero.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    EditargeneroComponent = __decorate([
        core_1.Component({
            selector: 'app-editargenero',
            templateUrl: './editargenero.component.html',
            styleUrls: ['./editargenero.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, genero_service_1.GeneroService])
    ], EditargeneroComponent);
    return EditargeneroComponent;
}());
exports.EditargeneroComponent = EditargeneroComponent;
//# sourceMappingURL=editargenero.component.js.map