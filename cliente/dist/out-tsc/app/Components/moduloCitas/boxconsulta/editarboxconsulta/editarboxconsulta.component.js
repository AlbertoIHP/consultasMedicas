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
var box_consulta_service_1 = require("../../../../Services/boxconsulta/box-consulta.service");
var EditarboxconsultaComponent = /** @class */ (function () {
    function EditarboxconsultaComponent(dialogRef, data, servicioBoxConsulta) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioBoxConsulta = servicioBoxConsulta;
        this.boxConsulta = data.boxconsulta;
        this.totalTipoBoxes = data.tipoboxes;
        this.servicioTipoBox = data.servicioTipoBox;
        console.log(this.boxConsulta);
        console.log(this.totalTipoBoxes);
    }
    EditarboxconsultaComponent.prototype.ngOnInit = function () {
        // this.servicioTipoBox.getTipoBoxes().subscribe( data => {
        //    var todo: any = data;
        //    todo = todo.data;
        //    this.totalTipoBoxes = todo;
        //  });
    };
    EditarboxconsultaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarboxconsultaComponent.prototype.editarBoxConsulta = function () {
        var _this = this;
        this.servicioBoxConsulta.editBoxConsulta(this.boxConsulta, this.boxConsulta.id).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    EditarboxconsultaComponent = __decorate([
        core_1.Component({
            selector: 'app-editarboxconsulta',
            templateUrl: './editarboxconsulta.component.html',
            styleUrls: ['./editarboxconsulta.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, box_consulta_service_1.BoxConsultaService])
    ], EditarboxconsultaComponent);
    return EditarboxconsultaComponent;
}());
exports.EditarboxconsultaComponent = EditarboxconsultaComponent;
//# sourceMappingURL=editarboxconsulta.component.js.map