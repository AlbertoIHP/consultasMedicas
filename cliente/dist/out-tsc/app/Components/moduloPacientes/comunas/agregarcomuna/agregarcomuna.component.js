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
var Comuna_model_1 = require("../../../../Models/Comuna.model");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var AgregarcomunaComponent = /** @class */ (function () {
    function AgregarcomunaComponent(
        //Se declaran los servicios y componentes a utilizar	
        dialogRef, data, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.nuevaComuna = new Comuna_model_1.Comuna();
        this.totalProvincias = data.provincias;
        this.servicioComuna = data.servicioComuna;
    }
    AgregarcomunaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
            provincia: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
        //Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    AgregarcomunaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarcomunaComponent.prototype.agregarComuna = function () {
        var _this = this;
        //Se agrega la nueva comuna al dar click en el botón
        this.servicioComuna.registerComuna(this.nuevaComuna).subscribe(function (data) {
            //Se emite un evento para actualizar los datos
            _this.servicioEvento.actualizacion(true);
            // Se cierra el diálogo
            _this.dialogRef.close();
        });
    };
    AgregarcomunaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarcomuna',
            templateUrl: './agregarcomuna.component.html',
            styleUrls: ['./agregarcomuna.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], AgregarcomunaComponent);
    return AgregarcomunaComponent;
}());
exports.AgregarcomunaComponent = AgregarcomunaComponent;
//# sourceMappingURL=agregarcomuna.component.js.map