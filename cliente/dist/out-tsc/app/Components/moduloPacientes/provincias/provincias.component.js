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
var router_1 = require("@angular/router");
var provincia_service_1 = require("../../../Services/provincia/provincia.service");
var region_service_1 = require("../../../Services/region/region.service");
// Componentes hijos
var agregarprovincia_component_1 = require("./agregarprovincia/agregarprovincia.component");
var editarprovincia_component_1 = require("./editarprovincia/editarprovincia.component");
// Componente para verificación de roles
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
var ProvinciasComponent = /** @class */ (function () {
    function ProvinciasComponent(
        //Se declaran los servicios y componentes a utilizar
        servicioRegion, servicioProvincia, dialog, router, servicioEvento) {
        this.servicioRegion = servicioRegion;
        this.servicioProvincia = servicioProvincia;
        this.dialog = dialog;
        this.router = router;
        this.servicioEvento = servicioEvento;
        this.displayedColumns = ['Acciones', 'Nombre', 'Region'];
        this.selection = new collections_1.SelectionModel(true, []);
        // Se inicializan los atributos
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalRegiones = [];
        this.totalProvincias = [];
        this.actualizarRegiones();
        this.actualizarProvincias();
    }
    ProvinciasComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Se inicializa el datasource
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Provincia');
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
    ProvinciasComponent.prototype.isAllSelected = function () {
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
    ProvinciasComponent.prototype.masterToggle = function () {
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
    ProvinciasComponent.prototype.actualizarRegiones = function () {
        var _this = this;
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
    };
    ProvinciasComponent.prototype.actualizarProvincias = function () {
        var _this = this;
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalProvincias);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Provincia');
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
    //Se obtiene la provincia desde la fila para obtener su id
    ProvinciasComponent.prototype.eliminarProvincia = function (provincia) {
        var _this = this;
        //Usando el id, de la provincia se elimina esta
        this.servicioProvincia.deleteProvincia(provincia.id).subscribe(function (data) {
            //Se actualizan las provincias a mostrar
            _this.actualizarProvincias();
        });
    };
    ProvinciasComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalProvincias.length; i++) {
            for (var j = 0; j < this.totalRegiones.length; j++) {
                if (parseInt(this.totalProvincias[i].Region_id) === this.totalRegiones[j].id) {
                    this.totalProvincias[i].Region_id = this.totalRegiones[j].nombre;
                    break;
                }
            }
        }
    };
    ProvinciasComponent.prototype.pasarStringId = function (provincia) {
        for (var i = 0; i < this.totalRegiones.length; i++) {
            if (provincia.Region_id === this.totalRegiones[i].nombre) {
                provincia.Region_id = this.totalRegiones[i].id;
            }
        }
    };
    // Se obtiene la provincia a modificar desde el frontend
    ProvinciasComponent.prototype.edicionProvincia = function (provincia) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(provincia));
        this.pasarStringId(a);
        //Se abre un dialogo para editar la provincia, se abre un componente hijo	
        var dialogRef = this.dialog.open(editarprovincia_component_1.EditarprovinciaComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                provincia: a,
                regiones: this.totalRegiones,
                servicioRegion: this.servicioRegion
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            /*
            // Si recibe un 'false' se actualiza, si no, significa que se dio en editar
            if (!this.actualizar) { this.actualizarComunas();}
            */
            _this.actualizarProvincias();
        });
    };
    ProvinciasComponent.prototype.agregacionProvincia = function () {
        var _this = this;
        // Se abre un nuevo dialogo para agregar una provincia, se abre un componente hijo		
        var dialogRef = this.dialog.open(agregarprovincia_component_1.AgregarprovinciaComponent, {
            //Los parámetros se asignan y se envían los datos necesarios
            width: '700px',
            data: {
                regiones: this.totalRegiones,
                servicioRegion: this.servicioRegion,
                servicioProvincia: this.servicioProvincia
            }
        });
        //Luego de cerrar el dialogo se ejecuta lo siguiente
        dialogRef.afterClosed().subscribe(function (result) {
            // Si recibe un 'true' se actualiza, si no, significa que se dio en cancelar
            if (_this.actualizar) {
                _this.actualizarProvincias();
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ProvinciasComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ProvinciasComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], ProvinciasComponent.prototype, "filter", void 0);
    ProvinciasComponent = __decorate([
        core_1.Component({
            selector: 'app-provincias',
            templateUrl: './provincias.component.html',
            styleUrls: ['./provincias.component.css']
        }),
        __metadata("design:paramtypes", [region_service_1.RegionService,
            provincia_service_1.ProvinciaService,
            material_2.MatDialog,
            router_1.Router,
            eventos_service_1.EventosService])
    ], ProvinciasComponent);
    return ProvinciasComponent;
}());
exports.ProvinciasComponent = ProvinciasComponent;
//# sourceMappingURL=provincias.component.js.map