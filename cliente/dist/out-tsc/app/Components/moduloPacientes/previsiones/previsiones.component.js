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
// Componentes generales
var core_1 = require("@angular/core");
var prevision_service_1 = require("../../../Services/prevision/prevision.service");
// Componentes hijos
var agregarprevision_component_1 = require("./agregarprevision/agregarprevision.component");
var editarprevision_component_1 = require("./editarprevision/editarprevision.component");
// Componente para verificación de roles
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var router_1 = require("@angular/router");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
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
var PrevisionesComponent = /** @class */ (function () {
    function PrevisionesComponent(
        //Se declaran los servicios y componentes a utilizar		
        servicioPrevisiones, dialog, router, servicioEvento) {
        this.servicioPrevisiones = servicioPrevisiones;
        this.dialog = dialog;
        this.router = router;
        this.servicioEvento = servicioEvento;
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion', 'Isapre'];
        this.selection = new collections_1.SelectionModel(true, []);
        // Se inicializan los atributos
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalPrevisiones = [];
        this.actualizarPrevisiones();
    }
    PrevisionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Se inicializa el datasource
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Prevision');
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
        // Se obtiene el evento emitido desde agregar
        this.servicioEvento.actualizar.subscribe(function (data) { _this.actualizar = data; });
    };
    PrevisionesComponent.prototype.isAllSelected = function () {
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
    PrevisionesComponent.prototype.masterToggle = function () {
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
    PrevisionesComponent.prototype.actualizarPrevisiones = function () {
        var _this = this;
        this.servicioPrevisiones.getPrevisions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPrevisiones = todo;
            _this.pasarIdString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalPrevisiones);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Prevision');
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
    //Se obtiene la previsión desde la fila para obtener su id
    PrevisionesComponent.prototype.eliminarPrevision = function (prevision) {
        var _this = this;
        //Usando el id, de la previsión se elimina esta
        this.servicioPrevisiones.deletePrevision(prevision.id).subscribe(function (data) {
            //Se actualizan las previsiones a mostrar
            _this.actualizarPrevisiones();
        });
    };
    PrevisionesComponent.prototype.pasarIdString = function () {
        for (var i = 0; i < this.totalPrevisiones.length; i++) {
            if (parseInt(this.totalPrevisiones[i].isapre) === 1) {
                this.totalPrevisiones[i].isapre = "ISAPRE";
            }
            else {
                this.totalPrevisiones[i].isapre = "NO ISAPRE";
            }
        }
    };
    PrevisionesComponent.prototype.pasarStringId = function (prevision) {
        if (prevision.isapre === "ISAPRE") {
            prevision.isapre = "1";
        }
        else {
            prevision.isapre = "0";
        }
    };
    // Se obtiene la comuna a modificar desde el frontend
    PrevisionesComponent.prototype.edicionPrevision = function (prevision) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(prevision));
        this.pasarStringId(a);
        //Se abre un dialogo para editar la previsión, se abre un componente hijo
        var dialogRef = this.dialog.open(editarprevision_component_1.EditarprevisionComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                prevision: a
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            /*
            // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
            if (!this.actualizar) { this.actualizarComunas();}
            */
            _this.actualizarPrevisiones();
        });
    };
    PrevisionesComponent.prototype.agregacionPrevision = function () {
        var _this = this;
        // Se abre un nuevo dialogo para agregar una previsión, se abre un componente hijo	
        var dialogRef = this.dialog.open(agregarprevision_component_1.AgregarprevisionComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px'
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
            if (_this.actualizar) {
                _this.actualizarPrevisiones();
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], PrevisionesComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], PrevisionesComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], PrevisionesComponent.prototype, "filter", void 0);
    PrevisionesComponent = __decorate([
        core_1.Component({
            selector: 'app-previsiones',
            templateUrl: './previsiones.component.html',
            styleUrls: ['./previsiones.component.css']
        }),
        __metadata("design:paramtypes", [prevision_service_1.PrevisionService,
            material_2.MatDialog,
            router_1.Router,
            eventos_service_1.EventosService])
    ], PrevisionesComponent);
    return PrevisionesComponent;
}());
exports.PrevisionesComponent = PrevisionesComponent;
//# sourceMappingURL=previsiones.component.js.map