"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//SERVICIOS
var comuna_service_1 = require("./Services/comuna/comuna.service");
var estadocivil_service_1 = require("./Services/estadocivil/estadocivil.service");
var genero_service_1 = require("./Services/genero/genero.service");
var persona_service_1 = require("./Services/persona/persona.service");
var paciente_service_1 = require("./Services/paciente/paciente.service");
var prevision_service_1 = require("./Services/prevision/prevision.service");
var previsionactual_service_1 = require("./Services/previsionactual/previsionactual.service");
var provincia_service_1 = require("./Services/provincia/provincia.service");
var region_service_1 = require("./Services/region/region.service");
var role_service_1 = require("./Services/role/role.service");
var user_service_1 = require("./Services/user/user.service");
var tiposangre_service_1 = require("./Services/tiposangre/tiposangre.service");
var authentication_service_1 = require("./Services/authentication/authentication.service");
var eventos_service_1 = require("./Services/eventos/eventos.service");
//MODULOS
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./Routes/app-routing.module");
var ng2_semantic_ui_1 = require("ng2-semantic-ui");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
// COMPONENTES
//Componentes Raices
var app_component_1 = require("./app.component");
var login_component_1 = require("./Components/login/login.component");
//Modulo Pacientes
var homemp_component_1 = require("./Components/moduloPacientes/homemp.component");
//Componente Ficha Medica
var verfichamedica_component_1 = require("./Components/moduloPacientes/fichamedica/verfichamedica/verfichamedica.component");
//Componente Estado Civil
var estadocivil_component_1 = require("./Components/moduloPacientes/estadocivil/estadocivil.component");
var editar_estado_c_component_1 = require("./Components/moduloPacientes/estadocivil/editar-estado-c/editar-estado-c.component");
var agregar_estado_c_component_1 = require("./Components/moduloPacientes/estadocivil/agregar-estado-c/agregar-estado-c.component");
//Componente Generos
var generos_component_1 = require("./Components/moduloPacientes/generos/generos.component");
var editargenero_component_1 = require("./Components/moduloPacientes/generos/editargenero/editargenero.component");
var agregargenero_component_1 = require("./Components/moduloPacientes/generos/agregargenero/agregargenero.component");
//Componente Comunas
var comunas_component_1 = require("./Components/moduloPacientes/comunas/comunas.component");
var agregarcomuna_component_1 = require("./Components/moduloPacientes/comunas/agregarcomuna/agregarcomuna.component");
var editarcomuna_component_1 = require("./Components/moduloPacientes/comunas/editarcomuna/editarcomuna.component");
//Componente Previsiones
var previsiones_component_1 = require("./Components/moduloPacientes/previsiones/previsiones.component");
var editarprevision_component_1 = require("./Components/moduloPacientes/previsiones/editarprevision/editarprevision.component");
var agregarprevision_component_1 = require("./Components/moduloPacientes/previsiones/agregarprevision/agregarprevision.component");
var verprevision_component_1 = require("./Components/moduloPacientes/previsiones/verprevision/verprevision.component");
//Componente Provincias
var provincias_component_1 = require("./Components/moduloPacientes/provincias/provincias.component");
var agregarprovincia_component_1 = require("./Components/moduloPacientes/provincias/agregarprovincia/agregarprovincia.component");
var editarprovincia_component_1 = require("./Components/moduloPacientes/provincias/editarprovincia/editarprovincia.component");
//Componente Regiones
var regiones_component_1 = require("./Components/moduloPacientes/regiones/regiones.component");
var editarregiones_component_1 = require("./Components/moduloPacientes/regiones/editarregiones/editarregiones.component");
var agregarregiones_component_1 = require("./Components/moduloPacientes/regiones/agregarregiones/agregarregiones.component");
//Componente Roles
var roles_component_1 = require("./Components/moduloPacientes/roles/roles.component");
var agregarroles_component_1 = require("./Components/moduloPacientes/roles/agregarroles/agregarroles.component");
var editarroles_component_1 = require("./Components/moduloPacientes/roles/editarroles/editarroles.component");
//Componente Usuario
var usuarios_component_1 = require("./Components/moduloPacientes/usuarios/usuarios.component");
var editarusuario_component_1 = require("./Components/moduloPacientes/usuarios/editarusuario/editarusuario.component");
var agregarusuario_component_1 = require("./Components/moduloPacientes/usuarios/agregarusuario/agregarusuario.component");
//Componente Persona
var personas_component_1 = require("./Components/moduloPacientes/personas/personas.component");
var verpersona_component_1 = require("./Components/moduloPacientes/personas/verpersona/verpersona.component");
var agregarpersona_component_1 = require("./Components/moduloPacientes/personas/agregarpersona/agregarpersona.component");
var editarpersona_component_1 = require("./Components/moduloPacientes/personas/editarpersona/editarpersona.component");
//Componente Pacientes
var pacientes_component_1 = require("./Components/moduloPacientes/pacientes/pacientes.component");
var editarpaciente_component_1 = require("./Components/moduloPacientes/pacientes/editarpaciente/editarpaciente.component");
var agregarpaciente_component_1 = require("./Components/moduloPacientes/pacientes/agregarpaciente/agregarpaciente.component");
//Componente Tipo Sangre
var tiposangre_component_1 = require("./Components/moduloPacientes/tiposangre/tiposangre.component");
var agregartipo_component_1 = require("./Components/moduloPacientes/tiposangre/agregartipo/agregartipo.component");
var editartipo_component_1 = require("./Components/moduloPacientes/tiposangre/editartipo/editartipo.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                //Componentes Raiz
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                //Modulo MP y todos sus componentes
                homemp_component_1.Homemp,
                personas_component_1.PersonaComponent,
                pacientes_component_1.PacientesComponent,
                estadocivil_component_1.EstadocivilComponent,
                generos_component_1.GenerosComponent,
                comunas_component_1.ComunasComponent,
                provincias_component_1.ProvinciasComponent,
                regiones_component_1.RegionesComponent,
                previsiones_component_1.PrevisionesComponent,
                usuarios_component_1.UsuariosComponent,
                roles_component_1.RolesComponent,
                verfichamedica_component_1.VerFichaMedicaComponent,
                //Componentes Hijos (CRUD)
                agregarpersona_component_1.AgregarpersonaComponent,
                editarpersona_component_1.EditarpersonaComponent,
                editar_estado_c_component_1.EditarEstadoCComponent,
                agregar_estado_c_component_1.AgregarEstadoCComponent,
                editargenero_component_1.EditargeneroComponent,
                agregargenero_component_1.AgregargeneroComponent,
                agregarcomuna_component_1.AgregarcomunaComponent,
                editarcomuna_component_1.EditarcomunaComponent,
                editarprevision_component_1.EditarprevisionComponent,
                agregarprevision_component_1.AgregarprevisionComponent,
                verprevision_component_1.VerPrevisionComponent,
                agregarprovincia_component_1.AgregarprovinciaComponent,
                editarprovincia_component_1.EditarprovinciaComponent,
                editarregiones_component_1.EditarregionesComponent,
                agregarregiones_component_1.AgregarregionesComponent,
                agregarroles_component_1.AgregarrolesComponent,
                editarroles_component_1.EditarrolesComponent,
                editarusuario_component_1.EditarusuarioComponent,
                agregarusuario_component_1.AgregarusuarioComponent,
                verpersona_component_1.VerpersonaComponent,
                editarpaciente_component_1.EditarpacienteComponent,
                agregarpaciente_component_1.AgregarpacienteComponent,
                tiposangre_component_1.TiposangreComponent,
                agregartipo_component_1.AgregartipoComponent,
                editartipo_component_1.EditartipoComponent
            ],
            entryComponents: [
                //Componentes de entrada para Modales en Materialize
                agregarpersona_component_1.AgregarpersonaComponent,
                editarpersona_component_1.EditarpersonaComponent,
                editar_estado_c_component_1.EditarEstadoCComponent,
                agregar_estado_c_component_1.AgregarEstadoCComponent,
                editargenero_component_1.EditargeneroComponent,
                agregargenero_component_1.AgregargeneroComponent,
                agregarcomuna_component_1.AgregarcomunaComponent,
                editarcomuna_component_1.EditarcomunaComponent,
                editarprevision_component_1.EditarprevisionComponent,
                agregarprevision_component_1.AgregarprevisionComponent,
                verprevision_component_1.VerPrevisionComponent,
                agregarprovincia_component_1.AgregarprovinciaComponent,
                editarprovincia_component_1.EditarprovinciaComponent,
                editarregiones_component_1.EditarregionesComponent,
                agregarregiones_component_1.AgregarregionesComponent,
                agregarroles_component_1.AgregarrolesComponent,
                editarroles_component_1.EditarrolesComponent,
                editarusuario_component_1.EditarusuarioComponent,
                agregarusuario_component_1.AgregarusuarioComponent,
                verpersona_component_1.VerpersonaComponent,
                editarpaciente_component_1.EditarpacienteComponent,
                agregarpaciente_component_1.AgregarpacienteComponent,
                tiposangre_component_1.TiposangreComponent,
                agregartipo_component_1.AgregartipoComponent,
                editartipo_component_1.EditartipoComponent,
                verfichamedica_component_1.VerFichaMedicaComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ng2_semantic_ui_1.SuiModule,
                app_routing_module_1.routing,
                forms_1.FormsModule,
                http_1.HttpModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatButtonModule,
                material_1.MatCheckboxModule,
                material_1.MatSidenavModule,
                material_1.MatToolbarModule,
                material_1.MatMenuModule,
                material_1.MatIconModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatDialogModule,
                material_1.MatInputModule,
                material_1.MatSelectModule,
                material_1.MatTabsModule
                //NgbModule.forRoot()
            ],
            providers: [
                app_routing_module_1.appRoutingProviders,
                comuna_service_1.ComunaService,
                estadocivil_service_1.EstadocivilService,
                genero_service_1.GeneroService,
                persona_service_1.PersonaService,
                paciente_service_1.PacienteService,
                prevision_service_1.PrevisionService,
                previsionactual_service_1.PrevisionactualService,
                provincia_service_1.ProvinciaService,
                region_service_1.RegionService,
                role_service_1.RoleService,
                user_service_1.UserService,
                tiposangre_service_1.TipoSangreService,
                authentication_service_1.AuthenticationService,
                eventos_service_1.EventosService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map