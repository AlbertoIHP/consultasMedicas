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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var box_consulta_service_1 = require("../../../Services/boxconsulta/box-consulta.service");
var tipo_box_service_1 = require("../../../Services/tipobox/tipo-box.service");
var especialidad_service_1 = require("../../../Services/especialidad/especialidad.service");
var cita_service_1 = require("../../../Services/cita/cita.service");
var agregarboxconsulta_component_1 = require("./agregarboxconsulta/agregarboxconsulta.component");
var editarboxconsulta_component_1 = require("./editarboxconsulta/editarboxconsulta.component");
var mensaje_error_component_1 = require("../../Globals/mensaje-error/mensaje-error.component");
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var datasource_component_1 = require("../../Globals/datasource.component");
var material_2 = require("@angular/material");
var BoxconsultaComponent = /** @class */ (function () {
    function BoxconsultaComponent(servicioEspecialidad, servicioBoxConsulta, servicioTipoBox, servicioCita, dialog) {
        this.servicioEspecialidad = servicioEspecialidad;
        this.servicioBoxConsulta = servicioBoxConsulta;
        this.servicioTipoBox = servicioTipoBox;
        this.servicioCita = servicioCita;
        this.dialog = dialog;
        this.displayedColumns = ['Acciones', 'Ubicacion', 'TipoBox'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalBoxConsultas = [];
        this.totalTipoBoxes = [];
        this.actualizarTipoBoxes();
        this.actualizarBoxConsultas();
        this.actualizarCitas();
    }
    BoxconsultaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'BoxConsulta');
        Observable_1.Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filter.nativeElement.value;
        });
        this.exampleDatabase = [];
    };
    BoxconsultaComponent.prototype.isAllSelected = function () {
        if (!this.dataSource) {
            return false;
        }
        if (this.selection.isEmpty()) {
            return false;
        }
        if (this.filter.nativeElement.value) {
            return this.selection.selected.length == this.dataSource.renderedData.length;
        }
        else {
            return this.selection.selected.length == this.exampleDatabase.data.length;
        }
    };
    BoxconsultaComponent.prototype.masterToggle = function () {
        var _this = this;
        if (!this.dataSource) {
            return;
        }
        if (this.isAllSelected()) {
            this.selection.clear();
        }
        else if (this.filter.nativeElement.value) {
            this.dataSource.renderedData.forEach(function (data) { return _this.selection.select(data.id); });
        }
        else {
            this.exampleDatabase.data.forEach(function (data) { return _this.selection.select(data.id); });
        }
    };
    BoxconsultaComponent.prototype.actualizarTipoBoxes = function () {
        var _this = this;
        this.servicioEspecialidad.getEspecialidads().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalTipoBoxes = todo;
        });
        // this.servicioTipoBox.getTipoBoxes().subscribe(data => {
        // 	var todo: any = data;
        // 	todo = todo.data;
        // 	this.totalTipoBoxes = todo;
        // });
    };
    BoxconsultaComponent.prototype.actualizarBoxConsultas = function () {
        var _this = this;
        this.servicioBoxConsulta.getBoxConsultas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalBoxConsultas = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalBoxConsultas);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'BoxConsulta');
            Observable_1.Observable.fromEvent(_this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(function () {
                if (!_this.dataSource) {
                    return;
                }
                _this.dataSource.filter = _this.filter.nativeElement.value;
            });
        });
    };
    BoxconsultaComponent.prototype.actualizarCitas = function () {
        var _this = this;
        //buscar en box consultas el box que tenga el tipo box asociado (cambiar en backend)
        this.servicioCita.getCitas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalCitas = todo;
        });
    };
    //Función temporal que retornará true en caso de que la box consulta esté en uso
    BoxconsultaComponent.prototype.verificarUsoBoxConsulta = function (boxconsulta) {
        console.log(this.totalCitas.length);
        for (var i = 0; i < this.totalCitas.length; i++) {
            console.log(this.totalCitas[i].BoxConsulta_id + '-' + boxconsulta.id);
            if (parseInt(this.totalCitas[i].BoxConsulta_id) === parseInt(boxconsulta.id)) {
                return true;
            }
        }
        return false;
    };
    BoxconsultaComponent.prototype.eliminarBoxConsulta = function (boxconsulta) {
        var _this = this;
        console.log('click');
        if (this.verificarUsoBoxConsulta(boxconsulta) == true) {
            this.mostrarMensaje("Esta box consulta está siendo usada por un médico.");
        }
        else {
            this.servicioBoxConsulta.deleteBoxConsulta(boxconsulta.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarBoxConsultas();
            });
        }
    };
    BoxconsultaComponent.prototype.edicionBoxConsulta = function (boxconsulta) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(boxconsulta));
        this.pasarStringId(a);
        var dialogRef = this.dialog.open(editarboxconsulta_component_1.EditarboxconsultaComponent, {
            width: '700px',
            data: {
                boxconsulta: a,
                tipoboxes: this.totalTipoBoxes,
                servicioTipoBox: this.servicioTipoBox
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarBoxConsultas();
        });
    };
    BoxconsultaComponent.prototype.agregacionBoxConsulta = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarboxconsulta_component_1.AgregarboxconsultaComponent, {
            width: '700px',
            data: {
                totalTipoBoxes: this.totalTipoBoxes,
                servicioTipoBox: this.servicioTipoBox,
                servicioBoxConsulta: this.servicioBoxConsulta
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarBoxConsultas();
        });
    };
    //función para mostrar un mensaje de error
    BoxconsultaComponent.prototype.mostrarMensaje = function (mensaje) {
        var _this = this;
        var dialogRef = this.dialog.open(mensaje_error_component_1.MensajeErrorComponent, {
            width: '400px',
            data: {
                mensajeError: mensaje
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarBoxConsultas();
        });
    };
    BoxconsultaComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalBoxConsultas.length; i++) {
            for (var j = 0; j < this.totalTipoBoxes.length; j++) {
                if (parseInt(this.totalBoxConsultas[i].TipoBox_id) === this.totalTipoBoxes[j].id) {
                    this.totalBoxConsultas[i].TipoBox_id = this.totalTipoBoxes[j].nombre;
                    break;
                }
            }
        }
    };
    BoxconsultaComponent.prototype.pasarStringId = function (boxconsulta) {
        for (var i = 0; i < this.totalTipoBoxes.length; i++) {
            if (boxconsulta.TipoBox_id === this.totalTipoBoxes[i].nombre) {
                boxconsulta.TipoBox_id = this.totalTipoBoxes[i].id;
            }
        }
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], BoxconsultaComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], BoxconsultaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], BoxconsultaComponent.prototype, "filter", void 0);
    BoxconsultaComponent = __decorate([
        core_1.Component({
            selector: 'app-boxconsulta',
            templateUrl: './boxconsulta.component.html',
            styleUrls: ['./boxconsulta.component.css']
        }),
        __metadata("design:paramtypes", [especialidad_service_1.EspecialidadService, box_consulta_service_1.BoxConsultaService, tipo_box_service_1.TipoBoxService, cita_service_1.CitaService, material_2.MatDialog])
    ], BoxconsultaComponent);
    return BoxconsultaComponent;
}());
exports.BoxconsultaComponent = BoxconsultaComponent;
//# sourceMappingURL=boxconsulta.component.js.map