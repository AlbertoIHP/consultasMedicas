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
// Componentes generales
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var persona_service_1 = require("../../../../Services/persona/persona.service");
var EspDateAdapter_1 = require("../../../Globals/EspDateAdapter");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EditarpersonaComponent = /** @class */ (function () {
    function EditarpersonaComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioPersona, dateAdapter, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioPersona = servicioPersona;
        this.dateAdapter = dateAdapter;
        this.servicioEvento = servicioEvento;
        // Se inicializan los atributos
        dateAdapter.setLocale('es-MX');
        this.defaultValues();
        this.date = new forms_1.FormControl(new Date(this.persona.fechaNacimiento));
        this.obtenerUbicacionPersona();
    }
    EditarpersonaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.servicioGenero.getGeneros().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalGeneros = todo;
        });
        this.servicioEC.getEstadoCivils().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalEstadoCiviles = todo;
        });
        this.servicioRegion.getRegions().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalRegiones = todo;
        });
        this.servicioComuna.getComunas().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalComunas = todo;
        });
        this.servicioProvincia.getProvincias().subscribe(function (data) {
            var todo;
            todo = data;
            todo = todo.data;
            _this.totalProvincias = todo;
        });
        // Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.editarForm = new forms_1.FormGroup({
            // tslint:disable-next-line
            rut: new forms_1.FormControl(this.persona.rut, [forms_1.Validators.required]),
            primerNombre: new forms_1.FormControl(this.persona.nombre1, [forms_1.Validators.required]),
            segundoNombre: new forms_1.FormControl(this.persona.nombre2, [forms_1.Validators.required]),
            primerApellido: new forms_1.FormControl(this.persona.apellido1, [forms_1.Validators.required]),
            segundoApellido: new forms_1.FormControl(this.persona.apellido2, [forms_1.Validators.required]),
            fonoCasa: new forms_1.FormControl(this.persona.fono_casa, [forms_1.Validators.required]),
            fonoTrabajo: new forms_1.FormControl(this.persona.fono_trabajo, [forms_1.Validators.required]),
            fonoMovil: new forms_1.FormControl(this.persona.movil, [forms_1.Validators.required]),
            direccion: new forms_1.FormControl(this.persona.direccion, [forms_1.Validators.required]),
            genero: new forms_1.FormControl(this.persona.Genero_id, [forms_1.Validators.required]),
            estadoCivil: new forms_1.FormControl(this.persona.EstadoCivil_id, [forms_1.Validators.required]),
            comuna: new forms_1.FormControl(this.comunaPersona.id, [forms_1.Validators.required]),
            region: new forms_1.FormControl(this.regionPersona.id, [forms_1.Validators.required]),
            provincia: new forms_1.FormControl(this.provinciaPersona.id, [forms_1.Validators.required])
        });
        /*
            // Se inicializa el evento en false
            this.servicioEvento.actualizacion(false);
        */
        this.regionSeleccionadaInicial(this.regionPersona);
        this.provinciaSeleccionadaInicial(this.provinciaPersona);
        this.comunaSeleccionada(this.comunaPersona);
    };
    EditarpersonaComponent.prototype.defaultValues = function () {
        this.servicioRegion = this.data.servicioRegion;
        this.servicioProvincia = this.data.servicioProvincia;
        this.servicioComuna = this.data.servicioComuna;
        this.servicioGenero = this.data.servicioGenero;
        this.servicioEC = this.data.servicioEC;
        this.mostrarComunas = false;
        this.mostrarProvincias = false;
        this.mostrarRegiones = true;
        this.persona = this.data.persona;
        this.totalRegiones = this.data.regiones;
        this.totalProvincias = this.data.provincias;
        this.totalComunas = this.data.comunas;
        this.totalEstadoCiviles = this.data.ec;
        this.totalGeneros = this.data.generos;
        this.provinciasMostrar = [];
        this.comunasMostrar = [];
    };
    //Cerrar el diálogo
    EditarpersonaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditarpersonaComponent.prototype.obtenerUbicacionPersona = function () {
        var _this = this;
        var currentComuna = this.totalComunas.filter(function (comuna) { return comuna.id === _this.persona.Comuna_id; });
        this.comunaPersona = currentComuna[0];
        var currentProvincia = this.totalProvincias.filter(function (provincia) { return provincia.id === _this.comunaPersona.Provincia_id; });
        this.provinciaPersona = currentProvincia[0];
        var currentRegion = this.totalRegiones.filter(function (region) { return region.id === _this.provinciaPersona.Region_id; });
        this.regionPersona = currentRegion[0];
    };
    EditarpersonaComponent.prototype.regionSeleccionada = function (region) {
        this.provinciasMostrar = [];
        this.comunasMostrar = [];
        this.editarForm.controls['provincia'].setValue('');
        this.editarForm.controls['comuna'].setValue('');
        for (var i = 0; i < this.totalProvincias.length; i++) {
            if (this.totalProvincias[i].Region_id === region.id) {
                this.provinciasMostrar.push(this.totalProvincias[i]);
            }
        }
        this.mostrarProvincias = true;
    };
    EditarpersonaComponent.prototype.provinciaSeleccionada = function (provincia) {
        this.comunasMostrar = [];
        this.editarForm.controls['comuna'].setValue('');
        for (var i = 0; i < this.totalComunas.length; i++) {
            if (this.totalComunas[i].Provincia_id === provincia.id) {
                this.comunasMostrar.push(this.totalComunas[i]);
            }
        }
        this.mostrarComunas = true;
    };
    EditarpersonaComponent.prototype.regionSeleccionadaInicial = function (region) {
        this.provinciasMostrar = [];
        this.comunasMostrar = [];
        for (var i = 0; i < this.totalProvincias.length; i++) {
            if (this.totalProvincias[i].Region_id === region.id) {
                this.provinciasMostrar.push(this.totalProvincias[i]);
            }
        }
        this.mostrarProvincias = true;
    };
    EditarpersonaComponent.prototype.provinciaSeleccionadaInicial = function (provincia) {
        this.comunasMostrar = [];
        for (var i = 0; i < this.totalComunas.length; i++) {
            if (this.totalComunas[i].Provincia_id === provincia.id) {
                this.comunasMostrar.push(this.totalComunas[i]);
            }
        }
        this.mostrarComunas = true;
    };
    EditarpersonaComponent.prototype.actualizarPersona = function () {
        var _this = this;
        this.persona.fechaNacimiento = new Date(this.date.value).toISOString().slice(0, 19).replace('T', ' ');
        //Usando el id de la comuna, se actualiza con los nuevos datos
        this.servicioPersona.editPersona(this.persona, this.persona.id).subscribe(function (data) {
            /*
            //Se emite un evento para no actualizar la vista
            this.servicioEvento.actualizacion(true);
            */
            _this.dialogRef.close();
        });
    };
    EditarpersonaComponent.prototype.nuevaProvincia = function () {
        this.mostrarProvincias = true;
    };
    EditarpersonaComponent.prototype.comunaSeleccionada = function (comuna) {
        this.persona.Comuna_id = comuna.id;
    };
    EditarpersonaComponent = __decorate([
        core_1.Component({
            selector: 'app-editarpersona',
            templateUrl: './editarpersona.component.html',
            styleUrls: ['./editarpersona.component.css'],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: 'es-MX' },
                { provide: material_1.DateAdapter, useClass: EspDateAdapter_1.EspDateAdapter },
            ],
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, persona_service_1.PersonaService,
            material_1.DateAdapter,
            eventos_service_1.EventosService])
    ], EditarpersonaComponent);
    return EditarpersonaComponent;
}());
exports.EditarpersonaComponent = EditarpersonaComponent;
//# sourceMappingURL=editarpersona.component.js.map