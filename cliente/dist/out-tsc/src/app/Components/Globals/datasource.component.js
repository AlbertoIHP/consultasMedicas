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
                else if (_this.filtro === "EC" || _this.filtro === "Region" || _this.filtro === "Provincia" || _this.filtro === "Comuna" || _this.filtro === "Prevision" || _this.filtro === "Genero") {
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
                else if (_this.filtro === "Paciente") {
                    var searchStr = (item.rut).toLowerCase();
                    return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
                }
            });
        });
    };
    buscadorPorNombre.prototype.disconnect = function () { };
    return buscadorPorNombre;
}(collections_1.DataSource));
exports.buscadorPorNombre = buscadorPorNombre;
//# sourceMappingURL=datasource.component.js.map