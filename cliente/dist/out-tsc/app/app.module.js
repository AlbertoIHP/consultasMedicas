"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ng2_device_detector_1 = require("ng2-device-detector");
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
var modulo_service_1 = require("./Services/modulo/modulo.service");
var permisomodulo_service_1 = require("./Services/permisomodulo/permisomodulo.service");
var vacuna_service_1 = require("./Services/vacuna/vacuna.service");
var vacunaspaciente_service_1 = require("./Services/vacunaspaciente/vacunaspaciente.service");
var habitos_sexuales_paciente_service_1 = require("./Services/habitossexualespaciente/habitos-sexuales-paciente.service");
var habito_sexual_service_1 = require("./Services/habitosexual/habito-sexual.service");
var habitos_paciente_service_1 = require("./Services/habitospaciente/habitos-paciente.service");
var habito_service_1 = require("./Services/habito/habito.service");
var enfermedad_cronica_service_1 = require("./Services/enfermedadcronica/enfermedad-cronica.service");
var enfermedades_cronicas_paciente_service_1 = require("./Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service");
var ocupacion_service_1 = require("./Services/ocupacion/ocupacion.service");
var grupo_etnico_service_1 = require("./Services/grupoetnico/grupo-etnico.service");
var uso_medicamento_service_1 = require("./Services/usomedicamento/uso-medicamento.service");
var alergia_service_1 = require("./Services/alergia/alergia.service");
var alergias_comunes_paciente_service_1 = require("./Services/alergiascomunespaciente/alergias-comunes-paciente.service");
// SERVICIOS MODULO CITAS
var box_consulta_service_1 = require("./Services/boxconsulta/box-consulta.service");
var cita_service_1 = require("./Services/cita/cita.service");
var especialidad_service_1 = require("./Services/especialidad/especialidad.service");
var estado_cita_service_1 = require("./Services/estadocita/estado-cita.service");
var medico_service_1 = require("./Services/medico/medico.service");
var tipo_box_service_1 = require("./Services/tipobox/tipo-box.service");
var disponibilidad_service_1 = require("./Services/disponibilidad/disponibilidad.service");
//SERVICIOS MODULO ATENCIONES
var atencion_service_1 = require("./Services/atencion/atencion.service");
var diagnostico_service_1 = require("./Services/diagnostico/diagnostico.service");
var diagnosticos_atencion_service_1 = require("./Services/diagnosticosatencion/diagnosticos-atencion.service");
var via_administracion_medicamento_service_1 = require("./Services/viaAdministracionMedicamento/via-administracion-medicamento.service");
var medicamento_service_1 = require("./Services/medicamento/medicamento.service");
var receta_service_1 = require("./Services/receta/receta.service");
var medicamentos_receta_service_1 = require("./Services/medicamentosReceta/medicamentos-receta.service");
var alergias_medicamentos_paciente_service_1 = require("./Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service");
var examen_fisico_service_1 = require("./Services/examenfisico/examen-fisico.service");
//MODULOS
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./Routes/app-routing.module");
var angular_calendar_1 = require("angular-calendar");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var table_1 = require("@angular/cdk/table");
// COMPONENTES
//Componentes Raices
var app_component_1 = require("./app.component");
var login_component_1 = require("./Components/login/login.component");
//Modulo Pacientes
var homemp_component_1 = require("./Components/moduloPacientes/homemp.component");
var homema_component_1 = require("./Components/moduloAtenciones/homema.component");
//Componente Ficha Medica
var verfichamedica_component_1 = require("./Components/moduloPacientes/fichamedica/verfichamedica/verfichamedica.component");
var fichamedica_component_1 = require("./Components/moduloPacientes/fichamedica/fichamedica.component");
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
var registro_component_1 = require("./Components/login/registro/registro.component");
//Modulo Citas
var homemc_component_1 = require("./Components/moduloCitas/homemc.component");
//Componente Box Consulta
var boxconsulta_component_1 = require("./Components/moduloCitas/boxconsulta/boxconsulta.component");
var agregarboxconsulta_component_1 = require("./Components/moduloCitas/boxconsulta/agregarboxconsulta/agregarboxconsulta.component");
var editarboxconsulta_component_1 = require("./Components/moduloCitas/boxconsulta/editarboxconsulta/editarboxconsulta.component");
//Componente Estado Cita
var estadocita_component_1 = require("./Components/moduloCitas/estadocita/estadocita.component");
var agregarestadocita_component_1 = require("./Components/moduloCitas/estadocita/agregarestadocita/agregarestadocita.component");
var editarestadocita_component_1 = require("./Components/moduloCitas/estadocita/editarestadocita/editarestadocita.component");
//Componente Especialidad
var especialidad_component_1 = require("./Components/moduloCitas/especialidad/especialidad.component");
var agregarespecialidad_component_1 = require("./Components/moduloCitas/especialidad/agregarespecialidad/agregarespecialidad.component");
var editarespecialidad_component_1 = require("./Components/moduloCitas/especialidad/editarespecialidad/editarespecialidad.component");
//Componente Medico
var medico_component_1 = require("./Components/moduloCitas/medico/medico.component");
var agregarmedico_component_1 = require("./Components/moduloCitas/medico/agregarmedico/agregarmedico.component");
var editarmedico_component_1 = require("./Components/moduloCitas/medico/editarmedico/editarmedico.component");
var disponibilidad_component_1 = require("./Components/moduloCitas/medico/disponibilidad/disponibilidad.component");
//Componente Cita
var header_component_1 = require("./Components/moduloCitas/cita/header.component");
var cita_component_1 = require("./Components/moduloCitas/cita/cita.component");
var agregarcita_component_1 = require("./Components/moduloCitas/cita/agregarcita/agregarcita.component");
var editarcita_component_1 = require("./Components/moduloCitas/cita/editarcita/editarcita.component");
var vercita_component_1 = require("./Components/moduloCitas/cita/vercita/vercita.component");
var mensaje_error_component_1 = require("./Components/Globals/mensaje-error/mensaje-error.component");
//Módulo Atenciones
var atencion_component_1 = require("./Components/moduloAtenciones/atencion/atencion.component");
var agregar_atencion_component_1 = require("./Components/moduloAtenciones/atencion/agregar-atencion/agregar-atencion.component");
var editar_atencion_component_1 = require("./Components/moduloAtenciones/atencion/editar-atencion/editar-atencion.component");
var diagnostico_component_1 = require("./Components/moduloAtenciones/diagnostico/diagnostico.component");
var agregar_diagnostico_component_1 = require("./Components/moduloAtenciones/diagnostico/agregar-diagnostico/agregar-diagnostico.component");
var editar_diagnostico_component_1 = require("./Components/moduloAtenciones/diagnostico/editar-diagnostico/editar-diagnostico.component");
var receta_component_1 = require("./Components/moduloAtenciones/receta/receta.component");
var agregar_receta_component_1 = require("./Components/moduloAtenciones/receta/agregar-receta/agregar-receta.component");
var editar_receta_component_1 = require("./Components/moduloAtenciones/receta/editar-receta/editar-receta.component");
var medicamento_component_1 = require("./Components/moduloAtenciones/medicamento/medicamento.component");
var agregar_medicamento_component_1 = require("./Components/moduloAtenciones/medicamento/agregar-medicamento/agregar-medicamento.component");
var editar_medicamento_component_1 = require("./Components/moduloAtenciones/medicamento/editar-medicamento/editar-medicamento.component");
var diagnosticosatencion_component_1 = require("./Components/moduloAtenciones/diagnosticosatencion/diagnosticosatencion.component");
var agregar_diagnosticos_atencion_component_1 = require("./Components/moduloAtenciones/diagnosticosatencion/agregar-diagnosticos-atencion/agregar-diagnosticos-atencion.component");
var editar_diagnosticos_atencion_component_1 = require("./Components/moduloAtenciones/diagnosticosatencion/editar-diagnosticos-atencion/editar-diagnosticos-atencion.component");
var viaadministracionmedicamento_component_1 = require("./Components/moduloAtenciones/viaadministracionmedicamento/viaadministracionmedicamento.component");
var agregar_via_administracion_medicamento_component_1 = require("./Components/moduloAtenciones/viaadministracionmedicamento/agregar-via-administracion-medicamento/agregar-via-administracion-medicamento.component");
var editar_via_administracion_medicamento_component_1 = require("./Components/moduloAtenciones/viaadministracionmedicamento/editar-via-administracion-medicamento/editar-via-administracion-medicamento.component");
var medicamentosreceta_component_1 = require("./Components/moduloAtenciones/medicamentosreceta/medicamentosreceta.component");
var agregar_medicamentos_receta_component_1 = require("./Components/moduloAtenciones/medicamentosreceta/agregar-medicamentos-receta/agregar-medicamentos-receta.component");
var editar_medicamentos_receta_component_1 = require("./Components/moduloAtenciones/medicamentosreceta/editar-medicamentos-receta/editar-medicamentos-receta.component");
var alergiaspaciente_component_1 = require("./Components/moduloAtenciones/alergiasmedicamentospaciente/alergiaspaciente.component");
var agregar_alergias_paciente_component_1 = require("./Components/moduloAtenciones/alergiasmedicamentospaciente/agregar-alergias-paciente/agregar-alergias-paciente.component");
var editar_alergias_paciente_component_1 = require("./Components/moduloAtenciones/alergiasmedicamentospaciente/editar-alergias-paciente/editar-alergias-paciente.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var vacuna_component_1 = require("./Components/moduloPacientes/vacuna/vacuna.component");
var vacunas_paciente_component_1 = require("./Components/moduloPacientes/vacunas-paciente/vacunas-paciente.component");
var habito_sexual_component_1 = require("./Components/moduloPacientes/habito-sexual/habito-sexual.component");
var habitos_paciente_component_1 = require("./Components/moduloPacientes/habitos-paciente/habitos-paciente.component");
var habito_component_1 = require("./Components/moduloPacientes/habito/habito.component");
var enfermedades_cronicas_paciente_component_1 = require("./Components/moduloPacientes/enfermedades-cronicas-paciente/enfermedades-cronicas-paciente.component");
var enfermedad_cronica_component_1 = require("./Components/moduloPacientes/enfermedad-cronica/enfermedad-cronica.component");
var ocupacion_component_1 = require("./Components/moduloPacientes/ocupacion/ocupacion.component");
var alergias_comunes_paciente_component_1 = require("./Components/moduloPacientes/alergias-comunes-paciente/alergias-comunes-paciente.component");
var alergia_component_1 = require("./Components/moduloPacientes/alergia/alergia.component");
var grupo_etnico_component_1 = require("./Components/moduloPacientes/grupo-etnico/grupo-etnico.component");
var uso_medicamento_component_1 = require("./Components/moduloPacientes/uso-medicamento/uso-medicamento.component");
var agregar_alergia_component_1 = require("./Components/moduloPacientes/alergia/agregar-alergia/agregar-alergia.component");
var editar_alergia_component_1 = require("./Components/moduloPacientes/alergia/editar-alergia/editar-alergia.component");
var agregar_alergias_comunes_paciente_component_1 = require("./Components/moduloPacientes/alergias-comunes-paciente/agregar-alergias-comunes-paciente/agregar-alergias-comunes-paciente.component");
var editar_alergias_comunes_paciente_component_1 = require("./Components/moduloPacientes/alergias-comunes-paciente/editar-alergias-comunes-paciente/editar-alergias-comunes-paciente.component");
var agregar_enfermedad_cronica_component_1 = require("./Components/moduloPacientes/enfermedad-cronica/agregar-enfermedad-cronica/agregar-enfermedad-cronica.component");
var editar_enfermedad_cronica_component_1 = require("./Components/moduloPacientes/enfermedad-cronica/editar-enfermedad-cronica/editar-enfermedad-cronica.component");
var agregar_enfermedades_cronicas_paciente_component_1 = require("./Components/moduloPacientes/enfermedades-cronicas-paciente/agregar-enfermedades-cronicas-paciente/agregar-enfermedades-cronicas-paciente.component");
var editar_enfermedades_cronicas_paciente_component_1 = require("./Components/moduloPacientes/enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente/editar-enfermedades-cronicas-paciente.component");
var agregar_grupo_etnico_component_1 = require("./Components/moduloPacientes/grupo-etnico/agregar-grupo-etnico/agregar-grupo-etnico.component");
var editar_grupo_etnico_component_1 = require("./Components/moduloPacientes/grupo-etnico/editar-grupo-etnico/editar-grupo-etnico.component");
var agregar_habito_component_1 = require("./Components/moduloPacientes/habito/agregar-habito/agregar-habito.component");
var editar_habito_component_1 = require("./Components/moduloPacientes/habito/editar-habito/editar-habito.component");
var agregar_habito_sexual_component_1 = require("./Components/moduloPacientes/habito-sexual/agregar-habito-sexual/agregar-habito-sexual.component");
var editar_habito_sexual_component_1 = require("./Components/moduloPacientes/habito-sexual/editar-habito-sexual/editar-habito-sexual.component");
var agregar_habitos_paciente_component_1 = require("./Components/moduloPacientes/habitos-paciente/agregar-habitos-paciente/agregar-habitos-paciente.component");
var editar_habitos_paciente_component_1 = require("./Components/moduloPacientes/habitos-paciente/editar-habitos-paciente/editar-habitos-paciente.component");
var habitos_sexuales_paciente_component_1 = require("./Components/moduloPacientes/habitos-sexuales-paciente/habitos-sexuales-paciente.component");
var agregar_habitos_sexuales_paciente_component_1 = require("./Components/moduloPacientes/habitos-sexuales-paciente/agregar-habitos-sexuales-paciente/agregar-habitos-sexuales-paciente.component");
var editar_habitos_sexuales_paciente_component_1 = require("./Components/moduloPacientes/habitos-sexuales-paciente/editar-habitos-sexuales-paciente/editar-habitos-sexuales-paciente.component");
var agregar_ocupacion_component_1 = require("./Components/moduloPacientes/ocupacion/agregar-ocupacion/agregar-ocupacion.component");
var editar_ocupacion_component_1 = require("./Components/moduloPacientes/ocupacion/editar-ocupacion/editar-ocupacion.component");
var agregar_uso_medicamento_component_1 = require("./Components/moduloPacientes/uso-medicamento/agregar-uso-medicamento/agregar-uso-medicamento.component");
var editar_uso_medicamento_component_1 = require("./Components/moduloPacientes/uso-medicamento/editar-uso-medicamento/editar-uso-medicamento.component");
var agregar_vacuna_component_1 = require("./Components/moduloPacientes/vacuna/agregar-vacuna/agregar-vacuna.component");
var editar_vacuna_component_1 = require("./Components/moduloPacientes/vacuna/editar-vacuna/editar-vacuna.component");
var agregar_vacunas_paciente_component_1 = require("./Components/moduloPacientes/vacunas-paciente/agregar-vacunas-paciente/agregar-vacunas-paciente.component");
var editar_vacunas_paciente_component_1 = require("./Components/moduloPacientes/vacunas-paciente/editar-vacunas-paciente/editar-vacunas-paciente.component");
var examen_fisico_component_1 = require("./Components/moduloAtenciones/examen-fisico/examen-fisico.component");
var agregar_examen_fisico_component_1 = require("./Components/moduloAtenciones/examen-fisico/agregar-examen-fisico/agregar-examen-fisico.component");
var editar_examen_fisico_component_1 = require("./Components/moduloAtenciones/examen-fisico/editar-examen-fisico/editar-examen-fisico.component");
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
                homema_component_1.Homema,
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
                fichamedica_component_1.FichaMedicaComponent,
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
                editartipo_component_1.EditartipoComponent,
                registro_component_1.RegistroComponent,
                editartipo_component_1.EditartipoComponent,
                //Modulo Citas
                homemc_component_1.HomemcComponent,
                boxconsulta_component_1.BoxconsultaComponent,
                estadocita_component_1.EstadocitaComponent,
                especialidad_component_1.EspecialidadComponent,
                medico_component_1.MedicoComponent,
                cita_component_1.CitaComponent,
                header_component_1.CalendarHeaderComponent,
                //Modulos hijos (CRUD)
                agregarboxconsulta_component_1.AgregarboxconsultaComponent,
                editarboxconsulta_component_1.EditarboxconsultaComponent,
                agregarcita_component_1.AgregarcitaComponent,
                editarcita_component_1.EditarcitaComponent,
                vercita_component_1.VercitaComponent,
                agregarespecialidad_component_1.AgregarespecialidadComponent,
                editarespecialidad_component_1.EditarespecialidadComponent,
                agregarestadocita_component_1.AgregarestadocitaComponent,
                editarestadocita_component_1.EditarestadocitaComponent,
                agregarmedico_component_1.AgregarmedicoComponent,
                editarmedico_component_1.EditarmedicoComponent,
                mensaje_error_component_1.MensajeErrorComponent,
                disponibilidad_component_1.DisponibilidadComponent,
                atencion_component_1.AtencionComponent,
                diagnostico_component_1.DiagnosticoComponent,
                receta_component_1.RecetaComponent,
                medicamento_component_1.MedicamentoComponent,
                diagnosticosatencion_component_1.DiagnosticosatencionComponent,
                viaadministracionmedicamento_component_1.ViaadministracionmedicamentoComponent,
                medicamentosreceta_component_1.MedicamentosrecetaComponent,
                alergiaspaciente_component_1.AlergiaspacienteComponent,
                agregar_alergias_paciente_component_1.AgregarAlergiasPacienteComponent,
                editar_alergias_paciente_component_1.EditarAlergiasPacienteComponent,
                agregar_atencion_component_1.AgregarAtencionComponent,
                editar_atencion_component_1.EditarAtencionComponent,
                agregar_diagnostico_component_1.AgregarDiagnosticoComponent,
                editar_diagnostico_component_1.EditarDiagnosticoComponent,
                agregar_diagnosticos_atencion_component_1.AgregarDiagnosticosAtencionComponent,
                editar_diagnosticos_atencion_component_1.EditarDiagnosticosAtencionComponent,
                agregar_medicamento_component_1.AgregarMedicamentoComponent,
                editar_medicamento_component_1.EditarMedicamentoComponent,
                agregar_medicamentos_receta_component_1.AgregarMedicamentosRecetaComponent,
                editar_medicamentos_receta_component_1.EditarMedicamentosRecetaComponent,
                agregar_receta_component_1.AgregarRecetaComponent,
                editar_receta_component_1.EditarRecetaComponent,
                agregar_via_administracion_medicamento_component_1.AgregarViaAdministracionMedicamentoComponent,
                editar_via_administracion_medicamento_component_1.EditarViaAdministracionMedicamentoComponent,
                vacuna_component_1.VacunaComponent,
                vacunas_paciente_component_1.VacunasPacienteComponent,
                habito_sexual_component_1.HabitoSexualComponent,
                habitos_paciente_component_1.HabitosPacienteComponent,
                habito_component_1.HabitoComponent,
                enfermedades_cronicas_paciente_component_1.EnfermedadesCronicasPacienteComponent,
                enfermedad_cronica_component_1.EnfermedadCronicaComponent,
                ocupacion_component_1.OcupacionComponent,
                alergias_comunes_paciente_component_1.AlergiasComunesPacienteComponent,
                alergia_component_1.AlergiaComponent,
                grupo_etnico_component_1.GrupoEtnicoComponent,
                uso_medicamento_component_1.UsoMedicamentoComponent,
                agregar_alergia_component_1.AgregarAlergiaComponent,
                editar_alergia_component_1.EditarAlergiaComponent,
                agregar_alergias_comunes_paciente_component_1.AgregarAlergiasComunesPacienteComponent,
                editar_alergias_comunes_paciente_component_1.EditarAlergiasComunesPacienteComponent,
                agregar_enfermedad_cronica_component_1.AgregarEnfermedadCronicaComponent,
                editar_enfermedad_cronica_component_1.EditarEnfermedadCronicaComponent,
                agregar_enfermedades_cronicas_paciente_component_1.AgregarEnfermedadesCronicasPacienteComponent,
                editar_enfermedades_cronicas_paciente_component_1.EditarEnfermedadesCronicasPacienteComponent,
                agregar_grupo_etnico_component_1.AgregarGrupoEtnicoComponent,
                editar_grupo_etnico_component_1.EditarGrupoEtnicoComponent,
                agregar_habito_component_1.AgregarHabitoComponent,
                editar_habito_component_1.EditarHabitoComponent,
                agregar_habito_sexual_component_1.AgregarHabitoSexualComponent,
                editar_habito_sexual_component_1.EditarHabitoSexualComponent,
                agregar_habitos_paciente_component_1.AgregarHabitosPacienteComponent,
                editar_habitos_paciente_component_1.EditarHabitosPacienteComponent,
                habitos_sexuales_paciente_component_1.HabitosSexualesPacienteComponent,
                agregar_habitos_sexuales_paciente_component_1.AgregarHabitosSexualesPacienteComponent,
                editar_habitos_sexuales_paciente_component_1.EditarHabitosSexualesPacienteComponent,
                agregar_ocupacion_component_1.AgregarOcupacionComponent,
                editar_ocupacion_component_1.EditarOcupacionComponent,
                agregar_uso_medicamento_component_1.AgregarUsoMedicamentoComponent,
                editar_uso_medicamento_component_1.EditarUsoMedicamentoComponent,
                agregar_vacuna_component_1.AgregarVacunaComponent,
                editar_vacuna_component_1.EditarVacunaComponent,
                agregar_vacunas_paciente_component_1.AgregarVacunasPacienteComponent,
                editar_vacunas_paciente_component_1.EditarVacunasPacienteComponent,
                examen_fisico_component_1.ExamenFisicoComponent,
                agregar_examen_fisico_component_1.AgregarExamenFisicoComponent,
                editar_examen_fisico_component_1.EditarExamenFisicoComponent
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
                verfichamedica_component_1.VerFichaMedicaComponent,
                registro_component_1.RegistroComponent,
                agregarboxconsulta_component_1.AgregarboxconsultaComponent,
                editarboxconsulta_component_1.EditarboxconsultaComponent,
                agregarcita_component_1.AgregarcitaComponent,
                editarcita_component_1.EditarcitaComponent,
                vercita_component_1.VercitaComponent,
                agregarespecialidad_component_1.AgregarespecialidadComponent,
                editarespecialidad_component_1.EditarespecialidadComponent,
                agregarestadocita_component_1.AgregarestadocitaComponent,
                editarestadocita_component_1.EditarestadocitaComponent,
                agregarmedico_component_1.AgregarmedicoComponent,
                editarmedico_component_1.EditarmedicoComponent,
                mensaje_error_component_1.MensajeErrorComponent,
                disponibilidad_component_1.DisponibilidadComponent,
                agregar_diagnostico_component_1.AgregarDiagnosticoComponent,
                editar_diagnostico_component_1.EditarDiagnosticoComponent,
                agregar_via_administracion_medicamento_component_1.AgregarViaAdministracionMedicamentoComponent,
                editar_via_administracion_medicamento_component_1.EditarViaAdministracionMedicamentoComponent,
                agregar_alergia_component_1.AgregarAlergiaComponent,
                editar_alergia_component_1.EditarAlergiaComponent,
                agregar_alergias_comunes_paciente_component_1.AgregarAlergiasComunesPacienteComponent,
                editar_alergias_comunes_paciente_component_1.EditarAlergiasComunesPacienteComponent,
                agregar_enfermedad_cronica_component_1.AgregarEnfermedadCronicaComponent,
                editar_enfermedad_cronica_component_1.EditarEnfermedadCronicaComponent,
                agregar_enfermedades_cronicas_paciente_component_1.AgregarEnfermedadesCronicasPacienteComponent,
                editar_enfermedades_cronicas_paciente_component_1.EditarEnfermedadesCronicasPacienteComponent,
                agregar_grupo_etnico_component_1.AgregarGrupoEtnicoComponent,
                editar_grupo_etnico_component_1.EditarGrupoEtnicoComponent,
                agregar_habito_component_1.AgregarHabitoComponent,
                editar_habito_component_1.EditarHabitoComponent,
                agregar_habitos_paciente_component_1.AgregarHabitosPacienteComponent,
                editar_habitos_paciente_component_1.EditarHabitosPacienteComponent,
                agregar_habito_sexual_component_1.AgregarHabitoSexualComponent,
                editar_habito_sexual_component_1.EditarHabitoSexualComponent,
                agregar_habitos_sexuales_paciente_component_1.AgregarHabitosSexualesPacienteComponent,
                editar_habitos_sexuales_paciente_component_1.EditarHabitosSexualesPacienteComponent,
                agregar_ocupacion_component_1.AgregarOcupacionComponent,
                editar_ocupacion_component_1.EditarOcupacionComponent,
                agregar_vacuna_component_1.AgregarVacunaComponent,
                editar_vacuna_component_1.EditarVacunaComponent,
                agregar_vacunas_paciente_component_1.AgregarVacunasPacienteComponent,
                editar_vacunas_paciente_component_1.EditarVacunasPacienteComponent,
                agregar_atencion_component_1.AgregarAtencionComponent,
                editar_atencion_component_1.EditarAtencionComponent,
                agregar_diagnosticos_atencion_component_1.AgregarDiagnosticosAtencionComponent,
                editar_diagnosticos_atencion_component_1.EditarDiagnosticosAtencionComponent,
                agregar_medicamento_component_1.AgregarMedicamentoComponent,
                editar_medicamento_component_1.EditarMedicamentoComponent,
                agregar_receta_component_1.AgregarRecetaComponent,
                editar_receta_component_1.EditarRecetaComponent,
                agregar_medicamentos_receta_component_1.AgregarMedicamentosRecetaComponent,
                editar_medicamentos_receta_component_1.EditarMedicamentosRecetaComponent,
                agregar_examen_fisico_component_1.AgregarExamenFisicoComponent,
                editar_examen_fisico_component_1.EditarExamenFisicoComponent,
            ],
            imports: [
                forms_1.ReactiveFormsModule,
                platform_browser_1.BrowserModule,
                app_routing_module_1.routing,
                forms_1.FormsModule,
                http_1.HttpModule,
                animations_1.BrowserAnimationsModule,
                table_1.CdkTableModule,
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatStepperModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                ng_bootstrap_1.NgbDatepickerModule.forRoot(),
                ng_bootstrap_1.NgbTimepickerModule.forRoot(),
                angular_calendar_1.CalendarModule.forRoot(),
                ng2_device_detector_1.Ng2DeviceDetectorModule.forRoot(),
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
                eventos_service_1.EventosService,
                modulo_service_1.ModuloService,
                permisomodulo_service_1.PermisoModuloService,
                box_consulta_service_1.BoxConsultaService,
                cita_service_1.CitaService,
                especialidad_service_1.EspecialidadService,
                estado_cita_service_1.EstadoCitaService,
                medico_service_1.MedicoService,
                tipo_box_service_1.TipoBoxService,
                disponibilidad_service_1.DisponibilidadService,
                atencion_service_1.AtencionService,
                diagnostico_service_1.DiagnosticoService,
                diagnosticos_atencion_service_1.DiagnosticosAtencionService,
                via_administracion_medicamento_service_1.ViaAdministracionMedicamentoService,
                medicamento_service_1.MedicamentoService,
                medicamentos_receta_service_1.MedicamentosRecetaService,
                receta_service_1.RecetaService,
                alergias_medicamentos_paciente_service_1.AlergiasMedicamentosPacienteService,
                vacuna_service_1.VacunaService,
                vacunaspaciente_service_1.VacunasPacienteService,
                habitos_sexuales_paciente_service_1.HabitosSexualesPacienteService,
                habito_sexual_service_1.HabitoSexualService,
                habitos_paciente_service_1.HabitosPacienteService,
                habito_service_1.HabitoService,
                enfermedad_cronica_service_1.EnfermedadCronicaService,
                enfermedades_cronicas_paciente_service_1.EnfermedadesCronicasPacienteService,
                ocupacion_service_1.OcupacionService,
                grupo_etnico_service_1.GrupoEtnicoService,
                uso_medicamento_service_1.UsoMedicamentoService,
                alergia_service_1.AlergiaService,
                alergias_comunes_paciente_service_1.AlergiasComunesPacienteService,
                examen_fisico_service_1.ExamenFisicoService,
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