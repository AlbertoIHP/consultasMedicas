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
var forms_1 = require("@angular/forms");
var alergia_service_1 = require("../../../../Services/alergia/alergia.service");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditarAlergiaComponent = /** @class */ (function () {
    function EditarAlergiaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioAlergia, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioAlergia = servicioAlergia;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos con los obtenidos en la base de datos		
        this.alergia = data.alergia;
    }
    EditarAlergiaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl(this.alergia.nombre, [forms_1.Validators.required]),
        });
        // Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    EditarAlergiaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarAlergiaComponent.prototype.editarAlergia = function () {
        var _this = this;
        //Utilizando el id de la alergia a editar, se modifican sus parámetros
        this.servicioAlergia.editAlergia(this.alergia, this.alergia.id).subscribe(function (data) {
            //Se emite un evento para no actualizar la vista
            _this.servicioEvento.actualizacion(true);
            // Se cierra el diálogo
            _this.dialogRef.close();
        });
    };
    EditarAlergiaComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-alergia',
            templateUrl: './editar-alergia.component.html',
            styleUrls: ['./editar-alergia.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, alergia_service_1.AlergiaService,
            eventos_service_1.EventosService])
    ], EditarAlergiaComponent);
    return EditarAlergiaComponent;
}());
exports.EditarAlergiaComponent = EditarAlergiaComponent;
//# sourceMappingURL=editar-alergia.component.js.map