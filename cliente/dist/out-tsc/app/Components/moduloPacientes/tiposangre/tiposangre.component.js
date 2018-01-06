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
var TipoSangre_model_1 = require("../../../Models/TipoSangre.model");
var tiposangre_service_1 = require("../../../Services/tiposangre/tiposangre.service");
//Componentes hijos
var agregartipo_component_1 = require("./agregartipo/agregartipo.component");
var editartipo_component_1 = require("./editartipo/editartipo.component");
var router_1 = require("@angular/router");
//Componente para verificación de roles
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
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
var TiposangreComponent = /** @class */ (function () {
    function TiposangreComponent(
        //Se declaran los servicios y componentes a utilizar
        servicioTS, dialog, router, servicioEvento) {
        this.servicioTS = servicioTS;
        this.dialog = dialog;
        this.router = router;
        this.servicioEvento = servicioEvento;
        this.displayedColumns = ['Acciones', 'Nombre', 'Descripcion'];
        this.selection = new collections_1.SelectionModel(true, []);
        // Se inicializan los atributos
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalTS = [];
        // Se obtienen los registros de tipos de sangre a la base de datos
        this.actualizarTSs();
    }
    TiposangreComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Se inicializa el datasource
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'TS');
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
    TiposangreComponent.prototype.isAllSelected = function () {
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
    TiposangreComponent.prototype.masterToggle = function () {
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
    TiposangreComponent.prototype.actualizarTSs = function () {
        var _this = this;
        // Se obtienen todas las vacunas desde la API
        this.servicioTS.getTipoSangres().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalTS = todo;
            //DATATABLE
            //Se asignan los datos obtenidos al datasource
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalTS);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'TS');
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
    TiposangreComponent.prototype.eliminarTS = function (ts) {
        var _this = this;
        this.servicioTS.deleteTipoSangre(ts.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarTSs();
        });
    };
    // Se envía el tipo sangre a modificar desde el frontend
    TiposangreComponent.prototype.edicionTS = function (ts) {
        var _this = this;
        //Se abre un dialogo para editar el tipo sangre, se abre un componente hijo
        var dialogRef = this.dialog.open(editartipo_component_1.EditartipoComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                ts: ts,
                servicioTS: this.servicioTS
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
            if (!_this.actualizar) {
                _this.actualizarTSs();
            }
        });
    };
    TiposangreComponent.prototype.agregacionTS = function () {
        var _this = this;
        // Se abre un nuevo dialogo para agregar un tipo sangre, se abre un componente hijo
        var dialogRef = this.dialog.open(agregartipo_component_1.AgregartipoComponent, {
            // Se asignan los parámetros
            width: '700px',
            data: {
                ts: new TipoSangre_model_1.TipoSangre(),
                servicioTS: this.servicioTS
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
            if (_this.actualizar) {
                _this.actualizarTSs();
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], TiposangreComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], TiposangreComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], TiposangreComponent.prototype, "filter", void 0);
    TiposangreComponent = __decorate([
        core_1.Component({
            selector: 'app-tiposangre',
            templateUrl: './tiposangre.component.html',
            styleUrls: ['./tiposangre.component.css']
        }),
        __metadata("design:paramtypes", [tiposangre_service_1.TipoSangreService,
            material_2.MatDialog,
            router_1.Router,
            eventos_service_1.EventosService])
    ], TiposangreComponent);
    return TiposangreComponent;
}());
exports.TiposangreComponent = TiposangreComponent;
//# sourceMappingURL=tiposangre.component.js.map