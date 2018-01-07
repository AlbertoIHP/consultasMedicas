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
// Modelos y servicios
var Persona_model_1 = require("../../../../Models/Persona.model");
var Usuario_model_1 = require("../../../../Models/Usuario.model");
var user_service_1 = require("../../../../Services/user/user.service");
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var EspDateAdapter_1 = require("../../../Globals/EspDateAdapter");
var AgregarpersonaComponent = /** @class */ (function () {
    function AgregarpersonaComponent(
        //Se declaran los servicios y componentes a utilizar  
        dialogRef, data, _formBuilder, servicioUsuario, dateAdapter, servicioEvento) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._formBuilder = _formBuilder;
        this.servicioUsuario = servicioUsuario;
        this.dateAdapter = dateAdapter;
        this.servicioEvento = servicioEvento;
        this.emailValido = true;
        this.rutValido = true;
        // Se inicializan los atributos
        dateAdapter.setLocale('es-MX');
        this.servicioRegion = this.data.servicioRegion;
        this.servicioProvincia = this.data.servicioProvincia;
        this.servicioComuna = this.data.servicioComuna;
        this.servicioGenero = this.data.servicioGenero;
        this.servicioEC = this.data.servicioEC;
        this.servicioPersona = this.data.servicioPersona;
        this.nuevoUsuario = new Usuario_model_1.Usuario();
        this.date = new forms_1.FormControl(new Date());
        this.defaultValues();
    }
    AgregarpersonaComponent.prototype.ngOnInit = function () {
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
        this.firstFormGroup = new forms_1.FormGroup({
            comuna: new forms_1.FormControl('', [forms_1.Validators.required]),
            region: new forms_1.FormControl('', [forms_1.Validators.required]),
            provincia: new forms_1.FormControl('', [forms_1.Validators.required]),
            genero: new forms_1.FormControl('', [forms_1.Validators.required]),
            estadocivil: new forms_1.FormControl('', [forms_1.Validators.required]),
            celular: new forms_1.FormControl('', [forms_1.Validators.required]),
            telefonotrabajo: new forms_1.FormControl('', [forms_1.Validators.required]),
            telefonocasa: new forms_1.FormControl('', [forms_1.Validators.required]),
            direccion: new forms_1.FormControl('', [forms_1.Validators.required]),
            nombre_uno: new forms_1.FormControl('', [forms_1.Validators.required]),
            nombre_dos: new forms_1.FormControl('', [forms_1.Validators.required]),
            apellido_uno: new forms_1.FormControl('', [forms_1.Validators.required]),
            apellido_dos: new forms_1.FormControl('', [forms_1.Validators.required]),
            rut: new forms_1.FormControl('', [forms_1.Validators.required])
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', forms_1.Validators.required]
        });
        //Se inicializa el evento en false
        this.servicioEvento.actualizacion(false);
    };
    AgregarpersonaComponent.prototype.defaultValues = function () {
        this.mostrarComunas = false;
        this.mostrarProvincias = false;
        this.mostrarRegiones = true;
        this.persona = new Persona_model_1.Persona();
        this.totalRegiones = this.data.regiones;
        this.totalProvincias = this.data.provincias;
        this.totalComunas = this.data.comunas;
        this.totalEstadoCiviles = this.data.ec;
        this.totalGeneros = this.data.generos;
        this.provinciasMostrar = [];
        this.comunasMostrar = [];
    };
    //Cerrar el diálogo
    AgregarpersonaComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarpersonaComponent.prototype.regionSeleccionada = function (region) {
        this.provinciasMostrar = [];
        this.comunasMostrar = [];
        this.firstFormGroup.controls['provincia'].setValue('');
        this.firstFormGroup.controls['comuna'].setValue('');
        for (var i = 0; i < this.totalProvincias.length; i++) {
            if (this.totalProvincias[i].Region_id === region.id) {
                this.provinciasMostrar.push(this.totalProvincias[i]);
            }
        }
        this.mostrarProvincias = true;
    };
    AgregarpersonaComponent.prototype.provinciaSeleccionada = function (provincia) {
        this.comunasMostrar = [];
        this.firstFormGroup.controls['comuna'].setValue('');
        for (var i = 0; i < this.totalComunas.length; i++) {
            if (this.totalComunas[i].Provincia_id === provincia.id) {
                this.comunasMostrar.push(this.totalComunas[i]);
            }
        }
        this.mostrarComunas = true;
    };
    AgregarpersonaComponent.prototype.agregarPersona = function () {
        var _this = this;
        //Se agrega la nueva persona al dar click en el botón
        this.persona.fechaNacimiento = new Date(this.date.value).toISOString().slice(0, 19).replace('T', ' ');
        this.servicioPersona.registerPersona(this.persona).subscribe(function (data) {
            _this.servicioPersona.getPersonas().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                var persona = todo.filter(function (persona) { return persona.rut === _this.persona.rut; });
                _this.nuevoUsuario.Persona_id = persona[0].id;
                _this.nuevoUsuario.Role_id = '4';
                _this.nuevoUsuario.password = _this.GeneratePassword();
                _this.servicioUsuario.registerUser(_this.nuevoUsuario).subscribe(function (data) {
                    _this.defaultValues();
                    //Se emite un evento para actualizar los datos
                    _this.servicioEvento.actualizacion(true);
                    // Se cierra el diálogo
                    _this.dialogRef.close();
                });
            });
        });
    };
    AgregarpersonaComponent.prototype.comunaSeleccionada = function (comuna) {
        this.persona.Comuna_id = comuna.id;
        if (this.validator(this.persona.rut)) {
            this.rutValido = false;
        }
        else {
            this.rutValido = true;
        }
    };
    AgregarpersonaComponent.prototype.GeneratePassword = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    AgregarpersonaComponent.prototype.validator = function (rutComplete) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutComplete)) {
            return false;
        }
        var tmp = rutComplete.split('-');
        var checkDigit = tmp[1];
        var rut = tmp[0];
        if (checkDigit === 'K' || checkDigit === 'k') {
            checkDigit = 'k';
            return (this.verifyNumber(rut) === checkDigit);
        }
        return (this.verifyNumber(rut) === parseInt(checkDigit));
    };
    AgregarpersonaComponent.prototype.verifyNumber = function (T) {
        var M = 0;
        var S = 1;
        for (; T; T = Math.floor(T / 10)) {
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        }
        return S ? S - 1 : 'k';
    };
    AgregarpersonaComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(email));
        if (re.test(email)) {
            this.emailValido = false;
        }
        else {
            this.emailValido = true;
        }
    };
    AgregarpersonaComponent.prototype.verificarRut = function () {
        console.log("Esta funcion hasta ahora no tiene ninguna utilidad, deprecada en las proximas actualizacioens");
    };
    AgregarpersonaComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarpersona',
            templateUrl: './agregarpersona.component.html',
            styleUrls: ['./agregarpersona.component.css'],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: 'es-MX' },
                { provide: material_1.DateAdapter, useClass: EspDateAdapter_1.EspDateAdapter },
            ],
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, forms_1.FormBuilder,
            user_service_1.UserService,
            material_1.DateAdapter,
            eventos_service_1.EventosService])
    ], AgregarpersonaComponent);
    return AgregarpersonaComponent;
}());
exports.AgregarpersonaComponent = AgregarpersonaComponent;
//# sourceMappingURL=agregarpersona.component.js.map