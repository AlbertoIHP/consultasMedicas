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
var provincia_service_1 = require("../../../../Services/provincia/provincia.service");
var EditarprovinciaComponent = /** @class */ (function () {
    function EditarprovinciaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioProvincia) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioProvincia = servicioProvincia;
        // Se inicializan los atributos
        this.provincia = data.provincia;
        this.totalRegiones = data.regiones;
        this.servicioRegion = data.servicioRegion;
    }
    EditarprovinciaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.editarForm = new forms_1.FormGroup({
            nombre: new forms_1.FormControl(this.provincia.nombre, [forms_1.Validators.required]),
            region: new forms_1.FormControl(this.provincia.Region_id, [forms_1.Validators.required]),
        });
        /*
            // Se inicializa el evento en false
            this.servicioEvento.actualizacion(false);
        */
    };
    //Cerrar el diálogo
    EditarprovinciaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarprovinciaComponent.prototype.editarProvincia = function () {
        var _this = this;
        //Usando el id de la provincia, se actualiza con los nuevos datos
        this.servicioProvincia.editProvincia(this.provincia, this.provincia.id).subscribe(function (data) {
            /*
            //Se emite un evento para no actualizar la vista
            this.servicioEvento.actualizacion(true);
            */
            _this.dialogRef.close();
        });
    };
    EditarprovinciaComponent = __decorate([
        core_1.Component({
            selector: 'app-editarprovincia',
            templateUrl: './editarprovincia.component.html',
            styleUrls: ['./editarprovincia.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, provincia_service_1.ProvinciaService])
    ], EditarprovinciaComponent);
    return EditarprovinciaComponent;
}());
exports.EditarprovinciaComponent = EditarprovinciaComponent;
//# sourceMappingURL=editarprovincia.component.js.map