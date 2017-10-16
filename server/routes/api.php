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
});






