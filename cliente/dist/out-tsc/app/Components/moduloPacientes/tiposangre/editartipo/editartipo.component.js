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
// Modelos y servicios
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditartipoComponent = /** @class */ (function () {
    function EditartipoComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.ts = data.ts;
        this.servicio = data.servicioTS;
    }
    EditartipoComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl(this.ts.nombre, [forms_1.Validators.required]),
            descripcion: new forms_1.FormControl(this.ts.descripcion, [forms_1.Validators.required])
        });
        // Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    EditartipoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditartipoComponent.prototype.editarTS = function () {
        var _this = this;
        //Usando el id del tipo sangre, se actualiza con los nuevos datos
        this.servicio.editTipoSangre(this.ts, this.ts.id).subscribe(function (data) {
            //Se emite un evento para no actualizar la vista
            _this.servicioEvento.actualizacion(true);
            _this.dialogRef.close();
        });
    };
    EditartipoComponent = __decorate([
        core_1.Component({
            selector: 'app-editartipo',
            templateUrl: './editartipo.component.html',
            styleUrls: ['./editartipo.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], EditartipoComponent);
    return EditartipoComponent;
}());
exports.EditartipoComponent = EditartipoComponent;
//# sourceMappingURL=editartipo.component.js.map