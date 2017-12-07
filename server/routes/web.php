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

Route::resource('vacunas', 'VacunaController');

Route::resource('habitoSexuals', 'HabitoSexualController');

Route::resource('habitos', 'HabitoController');

Route::resource('enfermedadCronicas', 'EnfermedadCronicaController');

Route::resource('ocupacions', 'OcupacionController');

Route::resource('alergias', 'AlergiaController');

Route::resource('grupoEtnicos', 'GrupoEtnicoController');

Route::resource('vacunasPacientes', 'VacunasPacienteController');

Route::resource('habitosSexualesPacientes', 'HabitosSexualesPacienteController');

Route::resource('habitosPacientes', 'HabitosPacienteController');

Route::resource('enfermedadesCronicasPacientes', 'EnfermedadesCronicasPacienteController');

Route::resource('alergiasComunesPacientes', 'AlergiasComunesPacienteController');

Route::resource('usoMedicamentos', 'UsoMedicamentoController');

Route::resource('alergiasMedicamentosPacientes', 'AlergiasMedicamentosPacienteController');