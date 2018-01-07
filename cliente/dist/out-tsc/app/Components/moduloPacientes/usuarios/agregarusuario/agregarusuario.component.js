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
var startWith_1 = require("rxjs/operators/startWith");
var map_1 = require("rxjs/operators/map");
// Modelos y servicios
var eventos_service_1 = require("../../../../Services/eventos/eventos.service");
var AgregarusuarioComponent = /** @class */ (function () {
    function AgregarusuarioComponent(
        //Se declaran los servicios y componentes a utilizar
        dialogRef, data, servicioEvento) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.servicioEvento = servicioEvento;
        this.emailValido = true;
        // Se inicializan los atributos
        this.personasDisponibles = data.personasDisponibles;
        this.servicioPersona = data.servicioPersona;
        this.servicioUsuario = data.servicioUsuario;
        this.servicioRole = data.servicioRole;
        this.usuario = data.usuario;
        this.totalRoles = data.roles;
        this.totalPersonas = data.personas;
        this.totalUsuarios = data.usuarios;
        this.servicioRole.getRoles().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalRoles = todo;
        });
        this.actualizarPersonas();
    }
    AgregarusuarioComponent.prototype.GeneratePassword = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    AgregarusuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se inician las validaciones usando un FormGroup y se dan los parámetros
        this.agregarForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required]),
            rol: new forms_1.FormControl('', [forms_1.Validators.required]),
            personaAsociada: new forms_1.FormControl('', [forms_1.Validators.required])
        });
        //Se hace un filtro de personas para obtener aquellas que estén disponibles
        this.filteredPersonas = this.agregarForm.controls['personaAsociada'].valueChanges
            .pipe(startWith_1.startWith(''), map_1.map(function (persona) { return persona ? _this.filterPersonas(persona) : _this.personasDisponibles.slice(); }));
    };
    AgregarusuarioComponent.prototype.filterPersonas = function (rut) {
        return this.personasDisponibles.filter(function (persona) {
            return persona.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0;
        });
    };
    //Cerrar el diálogo
    AgregarusuarioComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarusuarioComponent.prototype.actualizarUsuarios = function () {
        var _this = this;
        this.servicioUsuario.getUsers().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalUsuarios = todo;
            _this.filtrarUsuariosRegistrados();
        });
    };
    AgregarusuarioComponent.prototype.actualizarPersonas = function () {
        var _this = this;
        this.servicioPersona.getPersonas().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.totalPersonas = todo;
            _this.personasDisponibles = _this.totalPersonas;
            _this.actualizarUsuarios();
        });
    };
    AgregarusuarioComponent.prototype.agregarUsuario = function () {
        var _this = this;
        this.usuario.password = this.GeneratePassword();
        // Se registra  la el nuevo usuario  con los datos obtenidos
        this.servicioUsuario.registerUser(this.usuario).subscribe(function (data) {
            //Se emite un evento para actualizar los datos
            _this.servicioEvento.actualizacion(true);
            // Se cierra el diálogo        
            _this.dialogRef.close();
        });
        //   //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
        //   (err) => {
        //   if (err === 'Used') {
        // 	alert("Esta persona ya tiene asignado un usuario")
        //   }
        // });
    };
    AgregarusuarioComponent.prototype.filtrarUsuariosRegistrados = function () {
        for (var i = 0; i < this.totalUsuarios.length; i++) {
            for (var j = 0; j < this.personasDisponibles.length; j++) {
                if (this.totalUsuarios[i].Persona_id === this.personasDisponibles[j].id) {
                    this.personasDisponibles.splice(j, 1);
                }
            }
        }
    };
    //Función para validar correos electrónicos a través de una exprexión regular
    AgregarusuarioComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(email));
        if (re.test(email)) {
            this.emailValido = false;
        }
        else {
            this.emailValido = true;
        }
    };
    AgregarusuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarusuario',
            templateUrl: './agregarusuario.component.html',
            styleUrls: ['./agregarusuario.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, eventos_service_1.EventosService])
    ], AgregarusuarioComponent);
    return AgregarusuarioComponent;
}());
exports.AgregarusuarioComponent = AgregarusuarioComponent;
//# sourceMappingURL=agregarusuario.component.js.map