<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group(['middleware' => ['cors','jwt.auth']], function(){

});

Route::group(['middleware' => ['cors']], function(){
  Route::post('/login','AuthController@userAuth');
  Route::get('/register/verify/{confirmationCode}', 'UserAPIController@confirm');
  Route::post('/v1/users', 'UserAPIController@store');






      // PROVISORIO
    Route::resource('v1/regions', 'RegionAPIController');

    Route::resource('v1/provincias', 'ProvinciaAPIController');

    Route::resource('v1/comunas', 'ComunaAPIController');

    Route::resource('v1/previsions', 'PrevisionAPIController');

    Route::resource('v1/previsionActuals', 'PrevisionActualAPIController');

    Route::resource('v1/roles', 'RoleAPIController');

    Route::resource('v1/estadoCivils', 'EstadoCivilAPIController');

    Route::resource('v1/generos', 'GeneroAPIController');

    Route::resource('v1/tipoSangres', 'TipoSangreAPIController');

    Route::resource('v1/personas', 'PersonaAPIController');

    Route::resource('v1/pacientes', 'PacienteAPIController');

    Route::resource('v1/users', 'UserAPIController');


    Route::resource('v1/permisoModulos', 'PermisoModuloAPIController');

    Route::resource('v1/modulos', 'ModuloAPIController');

    Route::resource('v1/tipoBoxes', 'TipoBoxAPIController');

    Route::resource('v1/boxConsultas', 'BoxConsultaAPIController');

    Route::resource('v1/estadoCitas', 'EstadoCitaAPIController');

    Route::resource('v1/especialidads', 'EspecialidadAPIController');

    Route::resource('v1/medicos', 'MedicoAPIController');

    Route::resource('v1/citas', 'CitaAPIController');

    Route::resource('v1/disponibilidads', 'DisponibilidadAPIController');

    Route::resource('v1/feriados', 'FeriadoAPIController');

    Route::resource('v1/horarios', 'HorarioAPIController');


    Route::resource('v1/atencions', 'AtencionAPIController');

    Route::resource('v1/diagnosticos', 'DiagnosticoAPIController');

    Route::resource('v1/diagnosticosAtencions', 'DiagnosticosAtencionAPIController');

    Route::resource('v1/viaAdministracionMedicamentos', 'ViaAdministracionMedicamentoAPIController');

    Route::resource('v1/recetas', 'RecetaAPIController');

    Route::resource('v1/medicamentos', 'MedicamentoAPIController');

    Route::resource('v1/medicamentosRecetas', 'MedicamentosRecetaAPIController');

    Route::resource('v1/alergiasPacientes', 'AlergiasPacienteAPIController');


    Route::resource('v1/vacunas', 'VacunaAPIController');

    Route::resource('v1/habitoSexuals', 'HabitoSexualAPIController');

    Route::resource('v1/habitos', 'HabitoAPIController');

    Route::resource('v1/enfermedadCronicas', 'EnfermedadCronicaAPIController');

    Route::resource('v1/ocupacions', 'OcupacionAPIController');

    Route::resource('v1/alergias', 'AlergiaAPIController');

    Route::resource('v1/grupoEtnicos', 'GrupoEtnicoAPIController');

    Route::resource('v1/vacunasPacientes', 'VacunasPacienteAPIController');

    Route::resource('v1/habitosSexualesPacientes', 'HabitosSexualesPacienteAPIController');

    Route::resource('v1/habitosPacientes', 'HabitosPacienteAPIController');

    Route::resource('v1/enfermedadesCronicasPacientes', 'EnfermedadesCronicasPacienteAPIController');

    Route::resource('v1/alergiasComunesPacientes', 'AlergiasComunesPacienteAPIController');

    Route::resource('v1/usoMedicamentos', 'UsoMedicamentoAPIController');

    Route::resource('v1/alergiasMedicamentosPacientes', 'AlergiasMedicamentosPacienteAPIController');

    Route::resource('v1/examenFisicos', 'ExamenFisicoAPIController');

    Route::resource('v1/vistaPacientes', 'VistaPacienteAPIController');

    Route::resource('v1/vistaComunas', 'VistaComunaAPIController');

    Route::resource('v1/vistaProvincias', 'VistaProvinciaAPIController');

    Route::resource('v1/vistaUsuarios', 'VistaUsuarioAPIController');

    Route::resource('v1/vistaBoxConsulta', 'VistaBoxConsultaAPIController');

    Route::resource('v1/vistaPersona', 'VistaPersonaAPIController');
});
