"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_component_1 = require("../Components/login/login.component");
//Componente Regiones
var regiones_component_1 = require("../Components/moduloPacientes/regiones/regiones.component");
//Componente Roles
var roles_component_1 = require("../Components/moduloPacientes/roles/roles.component");
//Componente Usuario
var usuarios_component_1 = require("../Components/moduloPacientes/usuarios/usuarios.component");
//Componente Persona
var personas_component_1 = require("../Components/moduloPacientes/personas/personas.component");
//Componente Pacientes
var pacientes_component_1 = require("../Components/moduloPacientes/pacientes/pacientes.component");
//Componente Tipo Sangre
var tiposangre_component_1 = require("../Components/moduloPacientes/tiposangre/tiposangre.component");
//Componente Ficha Medica
var fichamedica_component_1 = require("../Components/moduloPacientes/fichamedica/fichamedica.component");
//Componente Estado Civil
var estadocivil_component_1 = require("../Components/moduloPacientes/estadocivil/estadocivil.component");
//Componente Generos
var generos_component_1 = require("../Components/moduloPacientes/generos/generos.component");
//Componente Comunas
var comunas_component_1 = require("../Components/moduloPacientes/comunas/comunas.component");
//Componente Previsiones
var previsiones_component_1 = require("../Components/moduloPacientes/previsiones/previsiones.component");
//Componente Provincias
var provincias_component_1 = require("../Components/moduloPacientes/provincias/provincias.component");
//Componente Alergia
var alergia_component_1 = require("../Components/moduloPacientes/alergia/alergia.component");
//Componente Alergias Comunes Paciente
var alergias_comunes_paciente_component_1 = require("../Components/moduloPacientes/alergias-comunes-paciente/alergias-comunes-paciente.component");
//Componente Enfermedad Crónica
var enfermedad_cronica_component_1 = require("../Components/moduloPacientes/enfermedad-cronica/enfermedad-cronica.component");
//Componente Enfermedades Crónicas Paciente 
var enfermedades_cronicas_paciente_component_1 = require("../Components/moduloPacientes/enfermedades-cronicas-paciente/enfermedades-cronicas-paciente.component");
//Componente Grupo Étnico
var grupo_etnico_component_1 = require("../Components/moduloPacientes/grupo-etnico/grupo-etnico.component");
//Componente Hábito
var habito_component_1 = require("../Components/moduloPacientes/habito/habito.component");
//Componente Hábito Sexual
var habito_sexual_component_1 = require("../Components/moduloPacientes/habito-sexual/habito-sexual.component");
//Componente Hábitos Paciente
var habitos_paciente_component_1 = require("../Components/moduloPacientes/habitos-paciente/habitos-paciente.component");
//Componente Hábitos Sexuales Paciente
var habitos_sexuales_paciente_component_1 = require("../Components/moduloPacientes/habitos-sexuales-paciente/habitos-sexuales-paciente.component");
//Componente Ocupación
var ocupacion_component_1 = require("../Components/moduloPacientes/ocupacion/ocupacion.component");
//Componente Uso Medicamento
var uso_medicamento_component_1 = require("../Components/moduloPacientes/uso-medicamento/uso-medicamento.component");
//Componente Vacuna
var vacuna_component_1 = require("../Components/moduloPacientes/vacuna/vacuna.component");
//Componente Vacunas Paciente
var vacunas_paciente_component_1 = require("../Components/moduloPacientes/vacunas-paciente/vacunas-paciente.component");
//Componente Box Consulta
var boxconsulta_component_1 = require("../Components/moduloCitas/boxconsulta/boxconsulta.component");
//Componente Estado Cita
var estadocita_component_1 = require("../Components/moduloCitas/estadocita/estadocita.component");
//Componente Especialidad
var especialidad_component_1 = require("../Components/moduloCitas/especialidad/especialidad.component");
//Componente Medico
var medico_component_1 = require("../Components/moduloCitas/medico/medico.component");
//Componente Cita
var cita_component_1 = require("../Components/moduloCitas/cita/cita.component");
//Componente Feriados
var feriados_component_1 = require("../Components/moduloCitas/feriados/feriados.component");
//Componente Alergias Paciente
var alergiaspaciente_component_1 = require("../Components/moduloAtenciones/alergiasmedicamentospaciente/alergiaspaciente.component");
//Componente Atención
var atencion_component_1 = require("../Components/moduloAtenciones/atencion/atencion.component");
//Componente Diagnóstico
var diagnostico_component_1 = require("../Components/moduloAtenciones/diagnostico/diagnostico.component");
//Componente Diagnoóticos Atención
var diagnosticosatencion_component_1 = require("../Components/moduloAtenciones/diagnosticosatencion/diagnosticosatencion.component");
//Componente Medicamento
var medicamento_component_1 = require("../Components/moduloAtenciones/medicamento/medicamento.component");
//Componente Medicamentos Receta
var medicamentosreceta_component_1 = require("../Components/moduloAtenciones/medicamentosreceta/medicamentosreceta.component");
//Componente Receta
var receta_component_1 = require("../Components/moduloAtenciones/receta/receta.component");
//Componente Vía Administración Medicamento
var viaadministracionmedicamento_component_1 = require("../Components/moduloAtenciones/viaadministracionmedicamento/viaadministracionmedicamento.component");
//Componente Exámen Físico
var examen_fisico_component_1 = require("../Components/moduloAtenciones/examen-fisico/examen-fisico.component");
//COMPONENTES MOBILE
var homemc_component_1 = require("../Components/moduloCitas/homemc.component");
var homemp_component_1 = require("../Components/moduloPacientes/homemp.component");
var homema_component_1 = require("../Components/moduloAtenciones/homema.component");
//GUARDS
var login_guard_1 = require("../Guards/login.guard");
var auth_guard_1 = require("../Guards/auth.guard");
var inicio_guard_1 = require("../Guards/inicio.guard");
var routes = [
    //RUTAS MOBILE
    { path: 'mobile/mc', component: homemc_component_1.HomemcComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'libre' } },
    { path: 'mobile/mp', component: homemp_component_1.Homemp, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'libre' } },
    { path: 'mobile/ma', component: homema_component_1.Homema, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'libre' } },
    { path: 'login', component: login_component_1.LoginComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: '', component: personas_component_1.PersonaComponent, pathMatch: 'full', canActivate: [inicio_guard_1.InicioGuard] },
    //MÓDULO PACIENTES
    { path: 'ts', component: tiposangre_component_1.TiposangreComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'TipoSangre' } },
    { path: 'pac', component: pacientes_component_1.PacientesComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Pacientes' } },
    { path: 'per', component: personas_component_1.PersonaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Personas' } },
    { path: 'usu', component: usuarios_component_1.UsuariosComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Usuarios' } },
    { path: 'rol', component: roles_component_1.RolesComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Roles' } },
    { path: 'reg', component: regiones_component_1.RegionesComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Regiones' } },
    { path: 'pro', component: provincias_component_1.ProvinciasComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Provincias' } },
    { path: 'pre', component: previsiones_component_1.PrevisionesComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Previsiones' } },
    { path: 'com', component: comunas_component_1.ComunasComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Comunas' } },
    { path: 'gen', component: generos_component_1.GenerosComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Generos' } },
    { path: 'ec', component: estadocivil_component_1.EstadocivilComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'EstadoCivil' } },
    { path: 'fm', component: fichamedica_component_1.FichaMedicaComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'als', component: alergia_component_1.AlergiaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Alergias' } },
    { path: 'algc', component: alergias_comunes_paciente_component_1.AlergiasComunesPacienteComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'AlergiasComunesPaciente' } },
    { path: 'efc', component: enfermedad_cronica_component_1.EnfermedadCronicaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'EnfermedadCronica' } },
    { path: 'efcp', component: enfermedades_cronicas_paciente_component_1.EnfermedadesCronicasPacienteComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'EnfermedadesCronicasPaciente' } },
    { path: 'gre', component: grupo_etnico_component_1.GrupoEtnicoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'GrupoEtnico' } },
    { path: 'ha', component: habito_component_1.HabitoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Habitos' } },
    { path: 'has', component: habito_sexual_component_1.HabitoSexualComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'HabitoSexual' } },
    { path: 'hap', component: habitos_paciente_component_1.HabitosPacienteComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'HabitosPaciente' } },
    { path: 'hasp', component: habitos_sexuales_paciente_component_1.HabitosSexualesPacienteComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'HabitosSexualesPaciente' } },
    { path: 'ocp', component: ocupacion_component_1.OcupacionComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Ocupaciones' } },
    { path: 'ume', component: uso_medicamento_component_1.UsoMedicamentoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'UsoMedicamento' } },
    { path: 'vac', component: vacuna_component_1.VacunaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Vacuna' } },
    { path: 'vacp', component: vacunas_paciente_component_1.VacunasPacienteComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'VacunasPaciente' } },
    //MÓDULO CITAS
    { path: 'cit', component: cita_component_1.CitaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Cita' } },
    { path: 'med', component: medico_component_1.MedicoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Medico' } },
    { path: 'esp', component: especialidad_component_1.EspecialidadComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Especialidad' } },
    { path: 'es', component: estadocita_component_1.EstadocitaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'EstadoCita' } },
    { path: 'bc', component: boxconsulta_component_1.BoxconsultaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'BoxConsulta' } },
    { path: 'fer', component: feriados_component_1.FeriadosComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Feriado' } },
    //MÓDULO ATENCIONES
    { path: 'algm', component: alergiaspaciente_component_1.AlergiaspacienteComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'AlergiasMedicamentosPaciente' } },
    { path: 'atc', component: atencion_component_1.AtencionComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Atencion' } },
    { path: 'dia', component: diagnostico_component_1.DiagnosticoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Diagnostico' } },
    { path: 'diat', component: diagnosticosatencion_component_1.DiagnosticosatencionComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'DiagnosticosAtencion' } },
    { path: 'mto', component: medicamento_component_1.MedicamentoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Medicamento' } },
    { path: 'mre', component: medicamentosreceta_component_1.MedicamentosrecetaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'MedicamentosReceta' } },
    { path: 'rec', component: receta_component_1.RecetaComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'Receta' } },
    { path: 'vam', component: viaadministracionmedicamento_component_1.ViaadministracionmedicamentoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'ViaAdministracionMedicamento' } },
    { path: 'exf', component: examen_fisico_component_1.ExamenFisicoComponent, canActivate: [auth_guard_1.AuthGuard], data: { nombre: 'ExamenFisico' } }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map