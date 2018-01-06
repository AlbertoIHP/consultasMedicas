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
var persona_service_1 = require("../../../Services/persona/persona.service");
var especialidad_service_1 = require("../../../Services/especialidad/especialidad.service");
var Medico_model_1 = require("../../../Models/Medico.model");
var medico_service_1 = require("../../../Services/medico/medico.service");
var verpersona_component_1 = require("../../moduloPacientes/personas/verpersona/verpersona.component");
var agregarmedico_component_1 = require("./agregarmedico/agregarmedico.component");
var editarmedico_component_1 = require("./editarmedico/editarmedico.component");
var eventos_service_1 = require("../../../Services/eventos/eventos.service");
var usuarioactual_component_1 = require("../../Globals/usuarioactual.component");
var disponibilidad_service_1 = require("../../../Services/disponibilidad/disponibilidad.service");
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
var disponibilidad_component_1 = require("./disponibilidad/disponibilidad.component");
var MedicoComponent = /** @class */ (function () {
    function MedicoComponent(servicioPersona, servicioEspecialidad, servicioMedico, dialog, servicioEventos, servicioDisponibilidad) {
        var _this = this;
        this.servicioPersona = servicioPersona;
        this.servicioEspecialidad = servicioEspecialidad;
        this.servicioMedico = servicioMedico;
        this.dialog = dialog;
        this.servicioEventos = servicioEventos;
        this.servicioDisponibilidad = servicioDisponibilidad;
        /*Temporal para validación
        public totalCitas: Cita[];*/
        this.displayedColumns = ['Acciones', 'Rut', 'Persona', 'Especialidad', 'Disponibilidad'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.usuarioActual = new usuarioactual_component_1.UsuarioActual();
        this.totalEspecialidad = [];
        this.totalMedicos = [];
        this.totalPersonas = [];
        this.actualizarPersonas();
        this.actualizarEspecialidads();
        //this.actualizarCitas();
        this.servicioEventos.seActivo.subscribe(function () {
            _this.actualizarPersonas();
        });
    }
    MedicoComponent.prototype.abrirDisponibilidad = function (medico) {
        var _this = this;
        this.servicioDisponibilidad.getDisponibilidads().subscribe(function (data) {
            var a = JSON.parse(JSON.stringify(medico));
            _this.pasarStringId(a);
            _this.AUX = a;
            var disponibilidadMedico = _this.normalizeData(data);
            console.log(disponibilidadMedico);
            disponibilidadMedico = disponibilidadMedico.filter(function (dis) { return parseInt(dis.Medico_id) === _this.AUX.id; });
            var dialogRef = _this.dialog.open(disponibilidad_component_1.DisponibilidadComponent, {
                width: '700px',
                data: {
                    disponibilidad: disponibilidadMedico
                }
            });
        });
    };
    MedicoComponent.prototype.normalizeData = function (todo) {
        return todo.data;
    };
    MedicoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new datasource_component_1.ExampleDataSource(new datasource_component_1.ExampleDatabase([]), this.paginator, this.sort, 'Medico');
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
    MedicoComponent.prototype.isAllSelected = function () {
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
    MedicoComponent.prototype.masterToggle = function () {
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
    MedicoComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.totalPersonas = [];
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
            _this.actualizarMedicos();
        });
    };
    MedicoComponent.prototype.actualizarEspecialidads = function () {
        var _this = this;
        this.totalEspecialidad = [];
        this.servicioEspecialidad.getEspecialidads().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalEspecialidad = todo;
        });
    };
    MedicoComponent.prototype.actualizarMedicos = function () {
        var _this = this;
        this.totalMedicos = [];
        this.servicioMedico.getMedicos().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalMedicos = todo;
            //Asignar rut busca el rut de cad apacietne buscando en su persona
            _this.asignarRut();
            //Lo mismo que arriba solo que con activado
            _this.reconocerActivado();
            _this.reemplazarIdPorString();
            //DATATABLE
            _this.exampleDatabase = new datasource_component_1.ExampleDatabase(_this.totalMedicos);
            _this.dataSource = new datasource_component_1.ExampleDataSource(_this.exampleDatabase, _this.paginator, _this.sort, 'Medico');
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
    MedicoComponent.prototype.reconocerActivado = function () {
        for (var i = 0; i < this.totalMedicos.length; i++) {
            for (var j = 0; j < this.totalPersonas.length; j++) {
                if (parseInt(this.totalMedicos[i].Persona_id) === this.totalPersonas[j].id) {
                    this.totalPersonas[j].estado === 0 ? this.totalMedicos[i].activado = 0 : this.totalMedicos[i].activado = 1;
                    console.log(this.totalMedicos);
                    break;
                }
            }
        }
    };
    MedicoComponent.prototype.asignarRut = function () {
        for (var i = 0; i < this.totalMedicos.length; i++) {
            for (var j = 0; j < this.totalPersonas.length; j++) {
                if (parseInt(this.totalMedicos[i].Persona_id) === this.totalPersonas[j].id) {
                    console.log(this.totalPersonas[j].rut);
                    this.totalMedicos[i].rut = this.totalPersonas[j].rut;
                    console.log(this.totalMedicos[i]);
                    break;
                }
            }
        }
    };
    MedicoComponent.prototype.eliminarMedico = function (medico) {
        var _this = this;
        this.servicioMedico.deleteMedico(medico.id).subscribe(function (data) {
            _this.actualizarPersonas();
        });
    };
    MedicoComponent.prototype.edicionMedico = function (medico) {
        var _this = this;
        var a = JSON.parse(JSON.stringify(medico));
        this.pasarStringId(a);
        console.log(a);
        var dialogRef = this.dialog.open(editarmedico_component_1.EditarmedicoComponent, {
            width: '700px',
            data: {
                medicos: this.totalMedicos,
                medico: a,
                personas: this.totalPersonas,
                especialidades: this.totalEspecialidad,
                servicioMedico: this.servicioMedico,
                servicioPersona: this.servicioPersona,
                servicioEspecialidad: this.servicioEspecialidad,
                servicioDisponibilidad: this.servicioDisponibilidad
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarPersonas();
        });
    };
    MedicoComponent.prototype.agregacionMedico = function () {
        var _this = this;
        var dialogRef = this.dialog.open(agregarmedico_component_1.AgregarmedicoComponent, {
            width: '700px',
            data: {
                medico: new Medico_model_1.Medico(),
                personas: this.totalPersonas,
                especialidades: this.totalEspecialidad,
                servicioMedico: this.servicioMedico,
                servicioPersona: this.servicioPersona,
                servicioEspecialidad: this.servicioEspecialidad,
                servicioDisponibilidad: this.servicioDisponibilidad
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.actualizarPersonas();
        });
    };
    MedicoComponent.prototype.desplegarPersona = function (medico) {
        var _this = this;
        this.servicioPersona.getPersona(parseInt(medico.Persona_id)).subscribe(function (data) {
            var persona = data;
            persona = persona.data;
            console.log(persona);
            var dialogRef = _this.dialog.open(verpersona_component_1.VerpersonaComponent, {
                width: '700px',
                data: { persona: persona }
            });
        });
    };
    MedicoComponent.prototype.reemplazarIdPorString = function () {
        for (var i = 0; i < this.totalMedicos.length; i++) {
            for (var j = 0; j < this.totalEspecialidad.length; j++) {
                if (parseInt(this.totalMedicos[i].Especialidad_id) === this.totalEspecialidad[j].id) {
                    this.totalMedicos[i].Especialidad_id = this.totalEspecialidad[j].nombre;
                    break;
                }
            }
        }
    };
    MedicoComponent.prototype.pasarStringId = function (medico) {
        for (var i = 0; i < this.totalEspecialidad.length; i++) {
            if (medico.Especialidad_id === this.totalEspecialidad[i].nombre) {
                medico.Especialidad_id = this.totalEspecialidad[i].id;
            }
        }
    };
    MedicoComponent.prototype.desactivarMedico = function (medico) {
        var _this = this;
        this.servicioPersona.getPersona(medico.Persona_id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            todo.estado = 0;
            _this.servicioPersona.editPersona(todo, todo.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarPersonas();
                //El servicio con este metodo emite un evento que cualqueir componetne que este suscrito a dicho evento reaccionara
                console.log("Yo hice un cambio (SoyMedico)");
                _this.servicioEventos.hiceUnCambio();
            });
        });
    };
    MedicoComponent.prototype.activarMedico = function (medico) {
        var _this = this;
        this.servicioPersona.getPersona(medico.Persona_id).subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            todo.estado = 1;
            _this.servicioPersona.editPersona(todo, todo.id).subscribe(function (data) {
                console.log(data);
                _this.actualizarPersonas();
                _this.servicioEventos.hiceUnCambio();
            });
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], MedicoComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], MedicoComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], MedicoComponent.prototype, "filter", void 0);
    MedicoComponent = __decorate([
        core_1.Component({
            selector: 'app-medico',
            templateUrl: './medico.component.html',
            styleUrls: ['./medico.component.css']
        }),
        __metadata("design:paramtypes", [persona_service_1.PersonaService,
            especialidad_service_1.EspecialidadService,
            medico_service_1.MedicoService,
            material_2.MatDialog,
            eventos_service_1.EventosService,
            disponibilidad_service_1.DisponibilidadService])
    ], MedicoComponent);
    return MedicoComponent;
}());
exports.MedicoComponent = MedicoComponent;
//# sourceMappingURL=medico.component.js.map