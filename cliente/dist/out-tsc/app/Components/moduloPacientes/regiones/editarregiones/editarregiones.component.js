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
var region_service_1 = require("../../../../Services/region/region.service");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditarregionesComponent = /** @class */ (function () {
    function EditarregionesComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioRegion, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioRegion = servicioRegion;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos con los obtenidos en la base de datos		
        this.region = data.region;
    }
    EditarregionesComponent.prototype.ngOnInit = function () {
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl(this.region.nombre, [forms_1.Validators.required])
        });
        // Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    //Cerrar el diálogo
    EditarregionesComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarregionesComponent.prototype.editarRegion = function () {
        var _this = this;
        //Utilizando el id de la región a editar, se modifican sus parámetros
        this.servicioRegion.editRegion(this.region, this.region.id).subscribe(function (data) {
            //Se emite un evento para no actualizar la vista
            _this.servicioEvento.actualizacion(true);
            // Se cierra el diálogo
            _this.dialogRef.close();
        });
    };
    EditarregionesComponent = __decorate([
        core_1.Component({
            selector: 'app-editarregiones',
            templateUrl: './editarregiones.component.html',
            styleUrls: ['./editarregiones.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, region_service_1.RegionService,
            eventos_service_1.EventosService])
    ], EditarregionesComponent);
    return EditarregionesComponent;
}());
exports.EditarregionesComponent = EditarregionesComponent;
//# sourceMappingURL=editarregiones.component.js.map