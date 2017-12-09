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
var routes = [
    //RUTAS MOBILE
    { path: 'mobile/mc', component: homemc_component_1.HomemcComponent },
    { path: 'mobile/mp', component: homemp_component_1.Homemp },
    { path: 'mobile/ma', component: homema_component_1.Homema },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', component: personas_component_1.PersonaComponent, pathMatch: 'full' },
    //MÓDULO PACIENTES
    { path: 'ts', component: tiposangre_component_1.TiposangreComponent },
    { path: 'pac', component: pacientes_component_1.PacientesComponent },
    { path: 'per', component: personas_component_1.PersonaComponent },
    { path: 'usu', component: usuarios_component_1.UsuariosComponent },
    { path: 'rol', component: roles_component_1.RolesComponent },
    { path: 'reg', component: regiones_component_1.RegionesComponent },
    { path: 'pro', component: provincias_component_1.ProvinciasComponent },
    { path: 'pre', component: previsiones_component_1.PrevisionesComponent },
    { path: 'com', component: comunas_component_1.ComunasComponent },
    { path: 'gen', component: generos_component_1.GenerosComponent },
    { path: 'ec', component: estadocivil_component_1.EstadocivilComponent },
    { path: 'fm', component: fichamedica_component_1.FichaMedicaComponent },
    { path: 'als', component: alergia_component_1.AlergiaComponent },
    { path: 'algc', component: alergias_comunes_paciente_component_1.AlergiasComunesPacienteComponent },
    { path: 'efc', component: enfermedad_cronica_component_1.EnfermedadCronicaComponent },
    { path: 'efcp', component: enfermedades_cronicas_paciente_component_1.EnfermedadesCronicasPacienteComponent },
    { path: 'gre', component: grupo_etnico_component_1.GrupoEtnicoComponent },
    { path: 'ha', component: habito_component_1.HabitoComponent },
    { path: 'has', component: habito_sexual_component_1.HabitoSexualComponent },
    { path: 'hap', component: habitos_paciente_component_1.HabitosPacienteComponent },
    { path: 'hasp', component: habitos_sexuales_paciente_component_1.HabitosSexualesPacienteComponent },
    { path: 'ocp', component: ocupacion_component_1.OcupacionComponent },
    { path: 'ume', component: uso_medicamento_component_1.UsoMedicamentoComponent },
    { path: 'vac', component: vacuna_component_1.VacunaComponent },
    { path: 'vacp', component: vacunas_paciente_component_1.VacunasPacienteComponent },
    //MÓDULO CITAS
    { path: 'cit', component: cita_component_1.CitaComponent },
    { path: 'med', component: medico_component_1.MedicoComponent },
    { path: 'esp', component: especialidad_component_1.EspecialidadComponent },
    { path: 'es', component: estadocita_component_1.EstadocitaComponent },
    { path: 'bc', component: boxconsulta_component_1.BoxconsultaComponent },
    //MÓDULO ATENCIONES
    { path: 'alg', component: alergiaspaciente_component_1.AlergiaspacienteComponent },
    { path: 'atc', component: atencion_component_1.AtencionComponent },
    { path: 'dia', component: diagnostico_component_1.DiagnosticoComponent },
    { path: 'diat', component: diagnosticosatencion_component_1.DiagnosticosatencionComponent },
    { path: 'mto', component: medicamento_component_1.MedicamentoComponent },
    { path: 'mre', component: medicamentosreceta_component_1.MedicamentosrecetaComponent },
    { path: 'rec', component: receta_component_1.RecetaComponent },
    { path: 'vam', component: viaadministracionmedicamento_component_1.ViaadministracionmedicamentoComponent },
    { path: 'exf', component: examen_fisico_component_1.ExamenFisicoComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map