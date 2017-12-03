<?php




Route::get('/register/verify/{confirmationCode}', 'UserAPIController@confirm');




Route::resource('atencions', 'AtencionController');

Route::resource('diagnosticos', 'DiagnosticoController');

Route::resource('diagnosticosAtencions', 'DiagnosticosAtencionController');

Route::resource('viaAdministracionMedicamentos', 'ViaAdministracionMedicamentoController');

Route::resource('recetas', 'RecetaController');

Route::resource('medicamentos', 'MedicamentoController');

Route::resource('medicamentosRecetas', 'MedicamentosRecetaController');

Route::resource('alergiasPacientes', 'AlergiasPacienteController');