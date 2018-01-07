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
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditarcomunaComponent = /** @class */ (function () {
    function EditarcomunaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.comuna = data.comuna;
        this.totalProvincias = data.provincias;
        this.servicioComuna = data.servicioComuna;
    }
    EditarcomunaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl(this.comuna.nombre, [forms_1.Validators.required]),
            provincia: new forms_1.FormControl(this.comuna.Provincia_id, [forms_1.Validators.required]),
        });
        /*
            // Se inicializa el evento en false
            this.servicioEvento.actualizacion(false);
        */
    };
    //Cerrar el diálogo
    EditarcomunaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarcomunaComponent.prototype.editarComuna = function () {
        var _this = this;
        //Usando el id de la comuna, se actualiza con los nuevos datos
        this.servicioComuna.editComuna(this.comuna, this.comuna.id).subscribe(function (data) {
            /*
            //Se emite un evento para no actualizar la vista
            this.servicioEvento.actualizacion(true);
            */
            _this.dialogRef.close();
        });
    };
    EditarcomunaComponent = __decorate([
        core_1.Component({
            selector: 'app-editarcomuna',
            templateUrl: './editarcomuna.component.html',
            styleUrls: ['./editarcomuna.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], EditarcomunaComponent);
    return EditarcomunaComponent;
}());
exports.EditarcomunaComponent = EditarcomunaComponent;
//# sourceMappingURL=editarcomuna.component.js.map