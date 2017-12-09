"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//DATATABLES
var collections_1 = require("@angular/cdk/collections");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var ExampleDatabase = /** @class */ (function () {
    function ExampleDatabase(ec) {
        /** Stream that emits whenever the data has been modified. */
        this.dataChange = new BehaviorSubject_1.BehaviorSubject([]);
        // Fill up the database with 100 users.
        for (var i = 0; i < ec.length; i++) {
            this.addUser(ec[i]);
        }
    }
    Object.defineProperty(ExampleDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    /** Adds a new user to the database. */
    ExampleDatabase.prototype.addUser = function (ec) {
        var copiedData = this.data.slice();
        copiedData.push(ec);
        this.dataChange.next(copiedData);
    };
    return ExampleDatabase;
}());
exports.ExampleDatabase = ExampleDatabase;
var dataTable = /** @class */ (function (_super) {
    __extends(dataTable, _super);
    function dataTable(_exampleDatabase, _paginator) {
        var _this = _super.call(this) || this;
        _this._exampleDatabase = _exampleDatabase;
        _this._paginator = _paginator;
        _this._filterChange = new BehaviorSubject_1.BehaviorSubject('');
        return _this;
    }
    Object.defineProperty(dataTable.prototype, "filter", {
        get: function () { return this._filterChange.value; },
        set: function (filter) { this._filterChange.next(filter); },
        enumerable: true,
        configurable: true
    });
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    dataTable.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._paginator.page,
            this._filterChange,
        ];
        return Observable_1.Observable.merge.apply(Observable_1.Observable, displayDataChanges).map(function () {
            var data = _this._exampleDatabase.data.slice();
            var startIndex = _this._paginator.pageIndex * _this._paginator.pageSize;
            return data.splice(startIndex, _this._paginator.pageSize);
        });
    };
    dataTable.prototype.disconnect = function () { };
    return dataTable;
}(collections_1.DataSource));
exports.dataTable = dataTable;
var buscadorPorNombre = /** @class */ (function (_super) {
    __extends(buscadorPorNombre, _super);
    function buscadorPorNombre(_exampleDatabase, filtro) {
        var _this = _super.call(this) || this;
        _this._exampleDatabase = _exampleDatabase;
        _this._filterChange = new BehaviorSubject_1.BehaviorSubject('');
        _this.filtro = filtro;
        return _this;
    }
    Object.defineProperty(buscadorPorNombre.prototype, "filter", {
        get: function () { return this._filterChange.value; },
        set: function (filter) { this._filterChange.next(filter); },
        enumerable: true,
        configurable: true
    });
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    buscadorPorNombre.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._filterChange,
        ];
        return Observable_1.Observable.merge.apply(Observable_1.Observable, displayDataChanges).map(function () {
            return _this._exampleDatabase.data.slice().filter(function (item) {
                if (_this.filtro === "Usuario") {
                    var searchStr = (item.email).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "Role") {
                    var searchStr = (item.nombre).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "EC" || _this.filtro === "Region" || _this.filtro === "Provincia" || _this.filtro === "Comuna" || _this.filtro === "Prevision" || _this.filtro === "Genero" || _this.filtro === "EstadoCita" || _this.filtro === "Especialidad" || _this.filtro === "TipoBox") {
                    var searchStr = (item.nombre).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "Persona") {
                    var searchStr = (item.rut).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "EC") {
                    var searchStr = (item.nombre).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "Paciente" || _this.filtro === "Medico") {
                    var searchStr = (item.rut).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "BoxConsulta") {
                    var searchStr = (item.ubicacion).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "Diagnostico") {
                    var searchStr = (item.diagnostico).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "ViaAdminMed") {
                    var searchStr = (item.descripcion.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "Ocupacion") {
                    var searchStr = (item.nombre.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "Vacuna") {
                    var searchStr = (item.nombre.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "ExamenFisico") {
                    var searchStr = (item.fechaExamen.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
            });
        });
    };
    buscadorPorNombre.prototype.disconnect = function () { };
    return buscadorPorNombre;
}(collections_1.DataSource));
exports.buscadorPorNombre = buscadorPorNombre;
/////////////////////////////////////////////////////////////////////////////////////
var ExampleDataSource = /** @class */ (function (_super) {
    __extends(ExampleDataSource, _super);
    function ExampleDataSource(_exampleDatabase, _paginator, _sort, filtro) {
        var _this = _super.call(this) || this;
        _this._exampleDatabase = _exampleDatabase;
        _this._paginator = _paginator;
        _this._sort = _sort;
        _this._filterChange = new BehaviorSubject_1.BehaviorSubject('');
        _this.filteredData = [];
        _this.renderedData = [];
        _this.filtro = filtro;
        // Reset to the first page when the user changes the filter.
        _this._filterChange.subscribe(function () { return _this._paginator.pageIndex = 0; });
        return _this;
    }
    Object.defineProperty(ExampleDataSource.prototype, "filter", {
        get: function () { return this._filterChange.value; },
        set: function (filter) { this._filterChange.next(filter); },
        enumerable: true,
        configurable: true
    });
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    ExampleDataSource.prototype.connect = function () {
        var _this = this;
        // Listen for any changes in the base data, sorting, filtering, or pagination
        var displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page,
        ];
        return Observable_1.Observable.merge.apply(Observable_1.Observable, displayDataChanges).map(function () {
            // Filter data
            _this.filteredData = _this._exampleDatabase.data.slice().filter(function (item) {
                if (_this.filtro === "Usuario") {
                    var searchStr = (item.email).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "Role") {
                    var searchStr = (item.nombre).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "EC" || _this.filtro === "Region" || _this.filtro === "Provincia" || _this.filtro === "Comuna" || _this.filtro === "Prevision" || _this.filtro === "Genero" || _this.filtro === "EstadoCita" || _this.filtro === "Especialidad" || _this.filtro === "TipoBox") {
                    var searchStr = (item.nombre).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "Persona") {
                    var searchStr = (item.rut).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "EC") {
                    var searchStr = (item.nombre).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro === "Paciente" || _this.filtro === "Medico") {
                    var searchStr = (item.rut).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "BoxConsulta") {
                    var searchStr = (item.ubicacion).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "TS") {
                    var searchStr = (item.nombre).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "Citas") {
                    var searchStr = (item.Medico_id.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "Diagnostico") {
                    var searchStr = (item.diagnostico.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "ViaAdminMed") {
                    var searchStr = (item.descripcion.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "Ocupacion") {
                    var searchStr = (item.nombre.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "Vacuna") {
                    var searchStr = (item.nombre.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
                else if (_this.filtro == "ExamenFisico") {
                    var searchStr = (item.fechaExamen.toString()).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
            });
            // Sort filtered data
            var sortedData = _this.sortData(_this.filteredData.slice());
            // Grab the page's slice of the filtered sorted data.
            var startIndex = _this._paginator.pageIndex * _this._paginator.pageSize;
            _this.renderedData = sortedData.splice(startIndex, _this._paginator.pageSize);
            return _this.renderedData;
        });
    };
    ExampleDataSource.prototype.disconnect = function () { };
    /** Returns a sorted copy of the database data. */
    ExampleDataSource.prototype.sortData = function (data) {
        var _this = this;
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }
        return data.sort(function (a, b) {
            var propertyA = '';
            var propertyB = '';
            if (_this.filtro === "Usuario") {
                switch (_this._sort.active) {
                    case 'Email':
                        _a = [a.email, b.email], propertyA = _a[0], propertyB = _a[1];
                        break;
                    case 'Role':
                        _b = [a.Role_id, b.Role_id], propertyA = _b[0], propertyB = _b[1];
                        break;
                }
            }
            else if (_this.filtro === "Role") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _c = [a.nombre, b.nombre], propertyA = _c[0], propertyB = _c[1];
                        break;
                }
            }
            else if (_this.filtro === "EC") {
            }
            else if (_this.filtro === "Persona") {
                switch (_this._sort.active) {
                    case 'Rut':
                        _d = [a.rut, b.rut], propertyA = _d[0], propertyB = _d[1];
                        break;
                    case 'Nombre':
                        _e = [a.apellido1, b.apellido1], propertyA = _e[0], propertyB = _e[1];
                        break;
                    case 'Telefonos':
                        _f = [a.movil, b.movil], propertyA = _f[0], propertyB = _f[1];
                        break;
                    case 'Sexo':
                        _g = [a.Genero_id, b.Genero_id], propertyA = _g[0], propertyB = _g[1];
                        break;
                    case 'Comuna':
                        _h = [a.Comuna_id, b.Comuna_id], propertyA = _h[0], propertyB = _h[1];
                        break;
                    case 'Estado Civil':
                        _j = [a.EstadoCivil_id, b.EstadoCivil_id], propertyA = _j[0], propertyB = _j[1];
                        break;
                }
            }
            else if (_this.filtro === "EC") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _k = [a.nombre, b.nombre], propertyA = _k[0], propertyB = _k[1];
                        break;
                    case 'Descripcion':
                        _l = [a.descripcion, b.descripcion], propertyA = _l[0], propertyB = _l[1];
                        break;
                }
            }
            else if (_this.filtro === "Paciente") {
                switch (_this._sort.active) {
                    case 'Rut':
                        _m = [a.rut, b.rut], propertyA = _m[0], propertyB = _m[1];
                        break;
                    case 'Tipo Sangre':
                        _o = [a.TipoSangre_id, b.TipoSangre_id], propertyA = _o[0], propertyB = _o[1];
                        break;
                }
            }
            else if (_this.filtro == "BoxConsulta") {
                switch (_this._sort.active) {
                    case 'Ubicacion':
                        _p = [a.ubicacion, b.ubicacion], propertyA = _p[0], propertyB = _p[1];
                        break;
                    case 'TipoBox':
                        _q = [a.TipoBox_id, b.TipoBox_id], propertyA = _q[0], propertyB = _q[1];
                        break;
                }
            }
            else if (_this.filtro === "Region") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _r = [a.nombre, b.nombre], propertyA = _r[0], propertyB = _r[1];
                        break;
                }
            }
            else if (_this.filtro === "Provincia") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _s = [a.nombre, b.nombre], propertyA = _s[0], propertyB = _s[1];
                        break;
                    case 'Region':
                        _t = [a.Region_id, b.Region_id], propertyA = _t[0], propertyB = _t[1];
                        break;
                }
            }
            else if (_this.filtro === "Comuna") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _u = [a.nombre, b.nombre], propertyA = _u[0], propertyB = _u[1];
                        break;
                    case 'Provincia':
                        _v = [a.Provincia_id, b.Provincia_id], propertyA = _v[0], propertyB = _v[1];
                        break;
                }
            }
            else if (_this.filtro === "Prevision") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _w = [a.nombre, b.nombre], propertyA = _w[0], propertyB = _w[1];
                        break;
                    case 'Descripcion':
                        _x = [a.descripcion, b.descripcion], propertyA = _x[0], propertyB = _x[1];
                        break;
                }
            }
            else if (_this.filtro === "Genero") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _y = [a.nombre, b.nombre], propertyA = _y[0], propertyB = _y[1];
                        break;
                    case 'Descripcion':
                        _z = [a.descripcion, b.descripcion], propertyA = _z[0], propertyB = _z[1];
                        break;
                    case 'Isapre':
                        _0 = [a.isapre, b.isapre], propertyA = _0[0], propertyB = _0[1];
                        break;
                }
            }
            else if (_this.filtro === "EstadoCita") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _1 = [a.nombre, b.nombre], propertyA = _1[0], propertyB = _1[1];
                        break;
                    case 'Descripcion':
                        _2 = [a.descripcion, b.descripcion], propertyA = _2[0], propertyB = _2[1];
                        break;
                }
            }
            else if (_this.filtro === "Especialidad") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _3 = [a.nombre, b.nombre], propertyA = _3[0], propertyB = _3[1];
                        break;
                }
            }
            else if (_this.filtro === "Medico") {
                switch (_this._sort.active) {
                    case 'Rut':
                        _4 = [a.rut, b.rut], propertyA = _4[0], propertyB = _4[1];
                        break;
                    case 'Especialidad':
                        _5 = [a.Especialidad_id, b.Especialidad_id], propertyA = _5[0], propertyB = _5[1];
                        break;
                }
            }
            else if (_this.filtro === "TS") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _6 = [a.nombre, b.nombre], propertyA = _6[0], propertyB = _6[1];
                        break;
                    case 'Descripcion':
                        _7 = [a.descripcion, b.descripcion], propertyA = _7[0], propertyB = _7[1];
                        break;
                }
            }
            else if (_this.filtro === "Citas") {
                switch (_this._sort.active) {
                    case 'Fecha':
                        _8 = [a.fecha, b.fecha], propertyA = _8[0], propertyB = _8[1];
                        break;
                    case 'Hora':
                        _9 = [a.hora, b.hora], propertyA = _9[0], propertyB = _9[1];
                        break;
                    case 'Estado':
                        _10 = [a.EstadoCita_id, b.EstadoCita_id], propertyA = _10[0], propertyB = _10[1];
                        break;
                    case 'Box':
                        _11 = [a.BoxConsulta_id, b.BoxConsulta_id], propertyA = _11[0], propertyB = _11[1];
                        break;
                    case 'Paciente':
                        _12 = [a.Paciente_id, b.Paciente_id], propertyA = _12[0], propertyB = _12[1];
                        break;
                    case 'Medico':
                        _13 = [a.Medico_id, b.Medico_id], propertyA = _13[0], propertyB = _13[1];
                        break;
                }
            }
            else if (_this.filtro === "Diagnostico") {
                switch (_this._sort.active) {
                    case 'Diagnostico':
                        _14 = [a.diagnostico, b.diagnostico], propertyA = _14[0], propertyB = _14[1];
                        break;
                }
            }
            else if (_this.filtro === "ViaAdminMed") {
                switch (_this._sort.active) {
                    case 'Descripcion':
                        _15 = [a.descripcion, b.descripcion], propertyA = _15[0], propertyB = _15[1];
                        break;
                }
            }
            else if (_this.filtro === "Ocupacion") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _16 = [a.nombre, b.nombre], propertyA = _16[0], propertyB = _16[1];
                        break;
                }
            }
            else if (_this.filtro === "Vacuna") {
                switch (_this._sort.active) {
                    case 'Nombre':
                        _17 = [a.nombre, b.nombre], propertyA = _17[0], propertyB = _17[1];
                        break;
                }
            }
            else if (_this.filtro === "ExamenFisico") {
                switch (_this._sort.active) {
                    case 'FechaExamen':
                        _18 = [a.fechaExamen, b.fechaExamen], propertyA = _18[0], propertyB = _18[1];
                        break;
                    case 'Peso':
                        _19 = [a.peso, b.peso], propertyA = _19[0], propertyB = _19[1];
                        break;
                    case 'Estatura':
                        _20 = [a.estatura, b.estatura], propertyA = _20[0], propertyB = _20[1];
                        break;
                }
            }
            var valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            var valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (_this._sort.direction == 'asc' ? 1 : -1);
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20;
        });
    };
    return ExampleDataSource;
}(collections_1.DataSource));
exports.ExampleDataSource = ExampleDataSource;
//# sourceMappingURL=datasource.component.js.map