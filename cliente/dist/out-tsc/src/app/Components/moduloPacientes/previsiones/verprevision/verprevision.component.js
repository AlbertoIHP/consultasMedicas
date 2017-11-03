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
var persona_service_1 = require("../../../../Services/persona/persona.service");
var prevision_service_1 = require("../../../../Services/prevision/prevision.service");
var previsionactual_service_1 = require("../../../../Services/previsionactual/previsionactual.service");
var PrevisionActual_model_1 = require("../../../../Models/PrevisionActual.model");
var material_1 = require("@angular/material");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var material_2 = require("@angular/material");
var datasource_component_1 = require("../../../Globals/datasource.component");
var VerPrevisionComponent = /** @class */ (function () {
    function VerPrevisionComponent(servicioPrevision, servicioPrevisionActual, servicioPersona, dialog, dialogRef, data) {
        this.servicioPrevision = servicioPrevision;
        this.servicioPrevisionActual = servicioPrevisionActual;
        this.servicioPersona = servicioPersona;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.displayedColumns = ['Fecha Actualizacion', 'Prevision', 'Estado'];
        this.buscarPorNombre = false;
        this.totalPrevision = [];
        this.totalPrevisionActual = [];
        this.previsionActual = new PrevisionActual_model_1.PrevisionActual();
        this.nuevaPrevisionActual = new PrevisionActual_model_1.PrevisionActual();
        this.pacienteActual = data.persona;
        this.nuevaPrevisionActual.Persona_id = this.pacienteActual.id.toString();
        this.actualizarPrevision();
        this.actualizarPrevisionActual();
    }
    VerPrevisionComponent.prototype.seleccionPrevision = function (prevision) {
        this.descripcionSeleccionada = prevision.descripcion;
        this.nuevaPrevisionActual.Prevision_id = prevision.id;
        console.log(this.nuevaPrevisionActual);
    };
    VerPrevisionComponent.prototype.cambiarPrevision = function () {
        var _this = this;
        if (this.totalPrevisionActual.length >= 1) {
            this.previsionActual.activado = 0;
            for (var j = 0; j < this.totalPrevision.length; j++) {
                if (this.previsionActual.Prevision_id === this.totalPrevision[j].nombre) {
                    this.previsionActual.Prevision_id = this.totalPrevision[j].id.toString();
                }
            }
            this.servicioPrevisionActual.editPrevisionActual(this.previsionActual, this.previsionActual.id).subscribe(function (data) {
                _this.servicioPrevisionActual.registerPrevisionActual(_this.nuevaPrevisionActual).subscribe(function (data) {
                    _this.actualizarPrevisionActual();
                    _this.previsionActual = new PrevisionActual_model_1.PrevisionActual();
                });
            });
        }
        else {
            this.servicioPrevisionActual.registerPrevisionActual(this.nuevaPrevisionActual).subscribe(function (data) {
                _this.previsionActual = _this.nuevaPrevisionActual;
                _this.previsionActual = new PrevisionActual_model_1.PrevisionActual();
                _this.actualizarPrevisionActual();
            });
        }
    };
    VerPrevisionComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    /**
    **Este metodo consume todas las previsiones registradas en la API
    **/
    VerPrevisionComponent.prototype.actualizarPrevision = function () {
        var _this = this;
        this.totalPrevision = [];
        this.servicioPrevision.getPrevisions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPrevision = todo;
        });
    };
    /**
    ** Este metodo filtra el total de las previsiones a aquellas que solamente son del paciente y luego filtra aquellas activadas y desactivadas
    **/
    VerPrevisionComponent.prototype.actualizarPrevisionActual = function () {
        var _this = this;
        this.totalPrevisionActual = [];
        this.servicioPrevisionActual.getPrevisionActuals().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            for (var i = 0; i < todo.length; i++) {
                if (todo[i].Persona_id === _this.pacienteActual.id) {
                    _this.totalPrevisionActual.push(todo[i]);
                }
            }
            if (_this.totalPrevisionActual.length >= 1) {
                _this.identificarPrevisionActiva();
            }
            _this.bdEstructura = new datasource_component_1.ExampleDatabase(_this.totalPrevisionActual);
            _this.sourceDatatable = new datasource_component_1.dataTable(_this.bdEstructura, _this.paginator);
        });
    };
    /**
    ** Este metodo identifica la prevision que esta activa de todas las filtradas arriba
    ** Luego se cambian las ID por String para desplegarlas en la table
    **/
    VerPrevisionComponent.prototype.identificarPrevisionActiva = function () {
        for (var i = 0; i < this.totalPrevisionActual.length; i++) {
            if (this.totalPrevisionActual[i].activado === 1) {
                this.previsionActual = this.totalPrevisionActual[i];
                break;
            }
        }
        this.cambiarIdPorString();
    };
    /**
    ** Este metodo cambia los ID por String
    **/
    VerPrevisionComponent.prototype.cambiarIdPorString = function () {
        for (var x = 0; x < this.totalPrevisionActual.length; x++) {
            for (var j = 0; j < this.totalPrevision.length; j++) {
                if (parseInt(this.totalPrevisionActual[x].Prevision_id) === this.totalPrevision[j].id) {
                    this.totalPrevisionActual[x].Prevision_id = this.totalPrevision[j].nombre;
                }
            }
        }
        for (var j = 0; j < this.totalPrevision.length; j++) {
            if (parseInt(this.totalPrevision[j].isapre) === 1) {
                this.totalPrevision[j].isapre = "Isapre";
            }
            else {
                this.totalPrevision[j].isapre = "No Isapre";
            }
        }
    };
    VerPrevisionComponent.prototype.cambiarBusqueda = function () {
        this.buscarPorNombre = !this.buscarPorNombre;
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], VerPrevisionComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], VerPrevisionComponent.prototype, "filter", void 0);
    VerPrevisionComponent = __decorate([
        core_1.Component({
            selector: 'app-verprevision',
            templateUrl: './verprevision.component.html',
            styleUrls: ['./verprevision.component.css']
        }),
        __param(5, core_1.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [prevision_service_1.PrevisionService,
            previsionactual_service_1.PrevisionactualService,
            persona_service_1.PersonaService,
            material_2.MatDialog,
            material_2.MatDialogRef, Object])
    ], VerPrevisionComponent);
    return VerPrevisionComponent;
}());
exports.VerPrevisionComponent = VerPrevisionComponent;
//# sourceMappingURL=verprevision.component.js.map