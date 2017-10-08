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
});


Route::resource('v1/users', 'UserAPIController');

Route::resource('v1/roles', 'RoleAPIController');

Route::resource('v1/estado_civils', 'EstadoCivilAPIController');

Route::resource('v1/previsions', 'PrevisionAPIController');

Route::resource('v1/prevision_actuals', 'PrevisionActualAPIController');

Route::resource('v1/regions', 'RegionAPIController');

Route::resource('v1/provincias', 'ProvinciaAPIController');

Route::resource('v1/comunas', 'ComunaAPIController');

Route::resource('v1/generos', 'GeneroAPIController');

Route::resource('v1/ficha_medicas', 'FichaMedicaAPIController');

Route::resource('v1/estado_citas', 'EstadoCitaAPIController');

Route::resource('v1/citas', 'CitaAPIController');

Route::resource('v1/especialidads', 'EspecialidadAPIController');

Route::resource('v1/personas', 'PersonaAPIController');

Route::resource('v1/atentions', 'AtentionAPIController');

Route::resource('v1/diagnosticos', 'DiagnosticoAPIController');

Route::resource('v1/diagnostico_atencions', 'DiagnosticoAtencionAPIController');

Route::resource('v1/box_consultas', 'BoxConsultaAPIController');

Route::resource('v1/recetas', 'RecetaAPIController');

Route::resource('v1/tipo_boxes', 'TipoBoxAPIController');

Route::resource('v1/medicamentos', 'MedicamentoAPIController');

Route::resource('v1/via_administracion_medicamentos', 'ViaAdministracionMedicamentoAPIController');

Route::resource('v1/receta_medicamentos', 'RecetaMedicamentoAPIController');
