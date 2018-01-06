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
var Genero_model_1 = require("../../../../Models/Genero.model");
var genero_service_1 = require("../../../../Services/genero/genero.service");
var forms_1 = require("@angular/forms");
var AgregargeneroComponent = /** @class */ (function () {
    function AgregargeneroComponent(dialogRef, data, servicioGenero) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioGenero = servicioGenero;
        this.nuevoGenero = new Genero_model_1.Genero();
    }
    AgregargeneroComponent.prototype.ngOnInit = function () {
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
            descripcion: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    AgregargeneroComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregargeneroComponent.prototype.agregarGenero = function () {
        var _this = this;
        this.servicioGenero.registerGenero(this.nuevoGenero).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    AgregargeneroComponent = __decorate([
        core_1.Component({
            selector: 'app-agregargenero',
            templateUrl: './agregargenero.component.html',
            styleUrls: ['./agregargenero.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, genero_service_1.GeneroService])
    ], AgregargeneroComponent);
    return AgregargeneroComponent;
}());
exports.AgregargeneroComponent = AgregargeneroComponent;
//# sourceMappingURL=agregargenero.component.js.map