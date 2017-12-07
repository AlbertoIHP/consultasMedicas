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


    Route::resource('v1/atencions', 'AtencionAPIController');

    Route::resource('v1/diagnosticos', 'DiagnosticoAPIController');

    Route::resource('v1/diagnosticosAtencions', 'DiagnosticosAtencionAPIController');

    Route::resource('v1/viaAdministracionMedicamentos', 'ViaAdministracionMedicamentoAPIController');

    Route::resource('v1/recetas', 'RecetaAPIController');

    Route::resource('v1/medicamentos', 'MedicamentoAPIController');

    Route::resource('v1/medicamentosRecetas', 'MedicamentosRecetaAPIController');

    Route::resource('v1/alergiasPacientes', 'AlergiasPacienteAPIController');
});













Route::resource('vacunas', 'VacunaAPIController');

Route::resource('habito_sexuals', 'HabitoSexualAPIController');

Route::resource('habitos', 'HabitoAPIController');

Route::resource('enfermedad_cronicas', 'EnfermedadCronicaAPIController');

Route::resource('ocupacions', 'OcupacionAPIController');

Route::resource('alergias', 'AlergiaAPIController');

Route::resource('grupo_etnicos', 'GrupoEtnicoAPIController');

Route::resource('vacunas_pacientes', 'VacunasPacienteAPIController');

Route::resource('habitos_sexuales_pacientes', 'HabitosSexualesPacienteAPIController');

Route::resource('habitos_pacientes', 'HabitosPacienteAPIController');

Route::resource('enfermedades_cronicas_pacientes', 'EnfermedadesCronicasPacienteAPIController');

Route::resource('alergias_comunes_pacientes', 'AlergiasComunesPacienteAPIController');

Route::resource('uso_medicamentos', 'UsoMedicamentoAPIController');

Route::resource('alergias_medicamentos_pacientes', 'AlergiasMedicamentosPacienteAPIController');