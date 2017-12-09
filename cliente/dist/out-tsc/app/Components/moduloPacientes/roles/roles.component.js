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
var role_service_1 = require("../../../Services/role/role.service");
var agregarroles_component_1 = require("./agregarroles/agregarroles.component");
var editarroles_component_1 = require("./editarroles/editarroles.component");
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var router_1 = require("@angular/router");
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
var RolesComponent = /** @class */ (function () {
    function RolesComponent(servicioRole, dialog, router) {
        this.servicioRole = servicioRole;
        this.dialog = dialog;
        this.router = router;
        this.displayedColumns = ['Acciones', 'Nombre'];
        this.selection = new collections_1.SelectionModel(true, []);
        if (!(localStorage.getItem('currentUser'))) {
            this.router.navigate(['login']);
        }
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalRoles = [];
        this.actualizarRoles();
    }
    RolesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Role');
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
    RolesComponent.prototype.isAllSelected = function () {
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
    RolesComponent.prototype.masterToggle = function () {
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
    RolesComponent.prototype.actualizarRoles = function () {
        var _this = this;
        this.servicioRole.getRoles().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRoles = todo;
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalRoles);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Role');
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
    RolesComponent.prototype.eliminarRole = function (role) {
        var _this = this;
        this.servicioRole.deleteRole(role.id).subscribe(function (data) {
            console.log(data);
            _this.actualizarRoles();
        });
    };
    RolesComponent.prototype.edicionRole = function (role) {
        var _this = this;
        var dialogRef = this.dialog.open(editarroles_component_1.EditarrolesComponent, {
            width: '700px',
            data: {
                role: role
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarRoles();
        });
    };
    RolesComponent.prototype.agregacionRole = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarroles_component_1.AgregarrolesComponent, {
            width: '700px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarRoles();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], RolesComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], RolesComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], RolesComponent.prototype, "filter", void 0);
    RolesComponent = __decorate([
        core_1.Component({
            selector: 'app-roles',
            templateUrl: './roles.component.html',
            styleUrls: ['./roles.component.css']
        }),
        __metadata("design:paramtypes", [role_service_1.RoleService,
            material_2.MatDialog,
            router_1.Router])
    ], RolesComponent);
    return RolesComponent;
}());
exports.RolesComponent = RolesComponent;
//# sourceMappingURL=roles.component.js.map