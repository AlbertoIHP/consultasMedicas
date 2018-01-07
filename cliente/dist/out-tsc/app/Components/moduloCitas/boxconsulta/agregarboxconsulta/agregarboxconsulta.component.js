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
var BoxConsulta_model_1 = require("../../../../Models/BoxConsulta.model");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var AgregarboxconsultaComponent = /** @class */ (function () {
    function AgregarboxconsultaComponent(
        //Se declaran los servicios y componentes a utilizar  
        dialogRef, data, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.nuevoBoxConsulta = new BoxConsulta_model_1.BoxConsulta();
        this.totalTipoBoxes = data.totalTipoBoxes;
        this.servicioTipoBox = data.servicioTipoBox;
        this.servicioBoxConsulta = data.servicioBoxConsulta;
    }
    AgregarboxconsultaComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.agregarForm = new forms_1.FormGroup({
            ubicacion: new forms_1.FormControl('', [forms_1.Validators.required]),
            tipoBox: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
        //Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    AgregarboxconsultaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarboxconsultaComponent.prototype.agregarBoxConsulta = function () {
        var _this = this;
        //Se agrega el nuevo box al dar click en el botón
        this.servicioBoxConsulta.registerBoxConsulta(this.nuevoBoxConsulta).subscribe(function (data) {
            //Se emite un evento para actualizar los datos
            _this.servicioEvento.actualizacion(true);
            // Se cierra el diálogo
            _this.dialogRef.close();
        });
    };
    AgregarboxconsultaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarboxconsulta',
            templateUrl: './agregarboxconsulta.component.html',
            styleUrls: ['./agregarboxconsulta.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], AgregarboxconsultaComponent);
    return AgregarboxconsultaComponent;
}());
exports.AgregarboxconsultaComponent = AgregarboxconsultaComponent;
//# sourceMappingURL=agregarboxconsulta.component.js.map