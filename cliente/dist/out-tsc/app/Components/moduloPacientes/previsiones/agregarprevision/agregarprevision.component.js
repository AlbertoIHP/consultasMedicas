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
var prevision_service_1 = require("../../../../Services/prevision/prevision.service");
var Prevision_model_1 = require("../../../../Models/Prevision.model");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var AgregarprevisionComponent = /** @class */ (function () {
    function AgregarprevisionComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioPrevision, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioPrevision = servicioPrevision;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        this.nuevaPrevision = new Prevision_model_1.Prevision();
    }
    AgregarprevisionComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.opciones = [{ id: '1', nombre: 'Si' }, { id: '2', nombre: 'No' }];
        this.agregarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
            descripcion: new forms_1.FormControl('', [forms_1.Validators.required]),
            isapre: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
        //Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    AgregarprevisionComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarprevisionComponent.prototype.agregarPrevision = function () {
        var _this = this;
        //Esto lo hice, porque el ngFor usa el id 0 como valor por defecto para mostrar en el select
        //entonces como la id = 0 es No, siempre está seleccionado el No por default
        if (this.nuevaPrevision.isapre === '2') {
            this.nuevaPrevision.isapre === '0';
        }
        //Se agrega la nueva comuna al dar click en el botón
        this.servicioPrevision.registerPrevision(this.nuevaPrevision).subscribe(function (data) {
            //Se emite un evento para actualizar los datos
            _this.servicioEvento.actualizacion(true);
            // Se cierra el diálogo
            _this.dialogRef.close();
        });
    };
    AgregarprevisionComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarprevision',
            templateUrl: './agregarprevision.component.html',
            styleUrls: ['./agregarprevision.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, prevision_service_1.PrevisionService,
            eventos_service_1.EventosService])
    ], AgregarprevisionComponent);
    return AgregarprevisionComponent;
}());
exports.AgregarprevisionComponent = AgregarprevisionComponent;
//# sourceMappingURL=agregarprevision.component.js.map