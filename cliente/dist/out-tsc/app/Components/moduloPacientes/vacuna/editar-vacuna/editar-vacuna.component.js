"use strict";
// Componentes generales
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
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditarVacunaComponent = /** @class */ (function () {
    function EditarVacunaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos con los obtenidos en la base de datos    
        this.vacuna = data.vacuna;
        this.servicioVacuna = data.servicioVacuna;
    }
    EditarVacunaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
        // Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    EditarVacunaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarVacunaComponent.prototype.editarVacuna = function () {
        var _this = this;
        //Utilizando el id de la vacuna a editar, se modifican sus parámetros
        this.servicioVacuna.editVacuna(this.vacuna, this.vacuna.id).subscribe(function (data) {
            //Se emite un evento para no actualizar la vista
            _this.servicioEvento.actualizacion(true);
            // Se cierra el diálogo
            _this.dialogRef.close();
        });
    };
    EditarVacunaComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-vacuna',
            templateUrl: './editar-vacuna.component.html',
            styleUrls: ['./editar-vacuna.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], EditarVacunaComponent);
    return EditarVacunaComponent;
}());
exports.EditarVacunaComponent = EditarVacunaComponent;
//# sourceMappingURL=editar-vacuna.component.js.map