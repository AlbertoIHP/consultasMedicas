"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var startWith_1 = require("rxjs/operators/startWith");
var map_1 = require("rxjs/operators/map");
var HabitosSexualesPaciente_model_1 = require("../../../../Models/HabitosSexualesPaciente.model");
var habitos_sexuales_paciente_service_1 = require("../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service");
var habito_sexual_service_1 = require("../../../../Services/habitosexual/habito-sexual.service");
var AlergiasComunesPaciente_model_1 = require("../../../../Models/AlergiasComunesPaciente.model");
var alergias_comunes_paciente_service_1 = require("../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service");
var alergia_service_1 = require("../../../../Services/alergia/alergia.service");
var AlergiasMedicamentosPaciente_model_1 = require("../../../../Models/AlergiasMedicamentosPaciente.model");
var alergias_medicamentos_paciente_service_1 = require("../../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service");
var medicamento_service_1 = require("../../../../Services/medicamento/medicamento.service");
var EnfermedadesCronicasPaciente_model_1 = require("../../../../Models/EnfermedadesCronicasPaciente.model");
var enfermedades_cronicas_paciente_service_1 = require("../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service");
var enfermedad_cronica_service_1 = require("../../../../Services/enfermedadcronica/enfermedad-cronica.service");
var HabitosPaciente_model_1 = require("../../../../Models/HabitosPaciente.model");
var habitos_paciente_service_1 = require("../../../../Services/habitospaciente/habitos-paciente.service");
var habito_service_1 = require("../../../../Services/habito/habito.service");
var UsoMedicamento_model_1 = require("../../../../Models/UsoMedicamento.model");
var uso_medicamento_service_1 = require("../../../../Services/usomedicamento/uso-medicamento.service");
var VacunasPaciente_model_1 = require("../../../../Models/VacunasPaciente.model");
var vacunaspaciente_service_1 = require("../../../../Services/vacunaspaciente/vacunaspaciente.service");
var vacuna_service_1 = require("../../../../Services/vacuna/vacuna.service");
var AgregarpacienteComponent = /** @class */ (function () {
    function AgregarpacienteComponent(dialogRef, servicioHabitosSexualesPaciente, servicioHabitoSexual, servicioAlergiasComunesPaciente, servicioAlergia, servicioAlergiasMedicamentosPaciente, servicioMedicamento, servicioEnfermedadesCronicasPaciente, servicioEnfermedadCronica, servicioHabitosPaciente, servicioHabito, servicioUsoMedicamento, servicioVacuna, servicioVacunasPaciente, data) {
        this.dialogRef = dialogRef;
        this.servicioHabitosSexualesPaciente = servicioHabitosSexualesPaciente;
        this.servicioHabitoSexual = servicioHabitoSexual;
        this.servicioAlergiasComunesPaciente = servicioAlergiasComunesPaciente;
        this.servicioAlergia = servicioAlergia;
        this.servicioAlergiasMedicamentosPaciente = servicioAlergiasMedicamentosPaciente;
        this.servicioMedicamento = servicioMedicamento;
        this.servicioEnfermedadesCronicasPaciente = servicioEnfermedadesCronicasPaciente;
        this.servicioEnfermedadCronica = servicioEnfermedadCronica;
        this.servicioHabitosPaciente = servicioHabitosPaciente;
        this.servicioHabito = servicioHabito;
        this.servicioUsoMedicamento = servicioUsoMedicamento;
        this.servicioVacuna = servicioVacuna;
        this.servicioVacunasPaciente = servicioVacunasPaciente;
        this.data = data;
        this.personasDisponibles = [];
        this.paciente = data.paciente;
        this.totalPacientes = data.pacientes;
        this.totalPersonas = data.personas;
        this.totalTS = data.tipoSangres;
        this.totalGruposEtnicos = data.gruposEtnicos;
        this.totalOcupaciones = data.ocupaciones;
        this.servicioPaciente = data.servicioPaciente;
        this.servicioPersona = data.servicioPersona;
        this.servicioTS = data.servicioTS;
        this.personasDisponibles = data.personasDisponibles;
        this.habitosSexuales = [];
        this.nuevoHabitosSexualesPaciente = new HabitosSexualesPaciente_model_1.HabitosSexualesPaciente();
        this.alergias = [];
        this.nuevaAlergiaComunPaciente = new AlergiasComunesPaciente_model_1.AlergiasComunesPaciente();
        this.medicamentos = [];
        this.nuevaAlergiaMedicamentoPaciente = new AlergiasMedicamentosPaciente_model_1.AlergiasMedicamentosPaciente();
        this.enfermedadescronicas = [];
        this.nuevaEnfermedadCronicaPaciente = new EnfermedadesCronicasPaciente_model_1.EnfermedadesCronicasPaciente();
        this.habitos = [];
        this.nuevoHabitosPaciente = new HabitosPaciente_model_1.HabitosPaciente();
        this.nuevoUsoMedicamento = new UsoMedicamento_model_1.UsoMedicamento();
        this.vacunas = [];
        this.nuevaVacunaPaciente = new VacunasPaciente_model_1.VacunasPaciente();
        this.actualizarAtributos();
    }
    AgregarpacienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editarForm = new forms_1.FormGroup({
            // tslint:disable-next-line
            tipoSangre: new forms_1.FormControl('', [forms_1.Validators.required]),
            personaAsociada: new forms_1.FormControl('', [forms_1.Validators.required]),
            grupoEtnico: new forms_1.FormControl('', [forms_1.Validators.required]),
            ocupacion: new forms_1.FormControl('', [forms_1.Validators.required])
        });
        this.filteredPersonas = this.editarForm.controls['personaAsociada'].valueChanges
            .pipe(startWith_1.startWith(''), map_1.map(function (persona) { return persona ? _this.filterPersonas(persona) : _this.personasDisponibles.slice(); }));
    };
    AgregarpacienteComponent.prototype.filterPersonas = function (rut) {
        return this.personasDisponibles.filter(function (persona) {
            return persona.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0;
        });
    };
    AgregarpacienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AgregarpacienteComponent.prototype.actualizarAtributos = function () {
        var _this = this;
        this.servicioHabitoSexual.getHabitoSexuales().subscribe(function (data) {
            var todo = data;
            todo = todo.data;
            _this.habitosSexuales = todo;
            _this.servicioAlergia.getAlergias().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.alergias = todo;
                _this.servicioMedicamento.getMedicamentos().subscribe(function (data) {
                    var todo = data;
                    todo = todo.data;
                    _this.medicamentos = todo;
                    _this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(function (data) {
                        var todo = data;
                        todo = todo.data;
                        _this.enfermedadescronicas = todo;
                        _this.servicioHabito.getHabitos().subscribe(function (data) {
                            var todo = data;
                            todo = todo.data;
                            _this.habitos = todo;
                            _this.servicioVacuna.getVacunas().subscribe(function (data) {
                                var todo = data;
                                todo = todo.data;
                                _this.vacunas = todo;
                            });
                        });
                    });
                });
            });
        });
    };
    AgregarpacienteComponent.prototype.agregarPaciente = function () {
        var _this = this;
        this.servicioPaciente.registerPaciente(this.paciente).subscribe(function (data) {
            var pacienteAgregado;
            _this.servicioPaciente.getPacientes().subscribe(function (data) {
                var todo = data;
                todo = todo.data;
                _this.totalPacientes = todo;
                pacienteAgregado = _this.totalPacientes.filter(function (paciente) { return paciente.Persona_id === _this.paciente.Persona_id; });
                // Crear habitos sexuales del paciente en null
                for (var i = 0; i < _this.habitosSexuales.length; i++) {
                    _this.nuevoHabitosSexualesPaciente.Paciente_id = pacienteAgregado[0].id;
                    _this.nuevoHabitosSexualesPaciente.HabitoSexual_id = _this.habitosSexuales[i].id;
                    _this.servicioHabitosSexualesPaciente.registerHabitosSexualesPaciente(_this.nuevoHabitosSexualesPaciente).subscribe(function (data) { });
                }
                // Crear alergías comunes del paciente en null
                for (var i = 0; i < _this.alergias.length; i++) {
                    _this.nuevaAlergiaComunPaciente.Paciente_id = pacienteAgregado[0].id;
                    _this.nuevaAlergiaComunPaciente.Alergia_id = _this.alergias[i].id;
                    _this.servicioAlergiasComunesPaciente.registerAlergiasComunesPaciente(_this.nuevaAlergiaComunPaciente).subscribe(function (data) { });
                }
                // Crear alergías medicamentos del paciente en null
                for (var i = 0; i < _this.medicamentos.length; i++) {
                    _this.nuevaAlergiaMedicamentoPaciente.Paciente_id = pacienteAgregado[0].id;
                    _this.nuevaAlergiaMedicamentoPaciente.Medicamento_id = _this.medicamentos[i].id;
                    _this.servicioAlergiasMedicamentosPaciente.registerAlergiasMedicamentosPaciente(_this.nuevaAlergiaMedicamentoPaciente).subscribe(function (data) { });
                }
                // Crear enfermedades cronicas del paciente en null
                for (var i = 0; i < _this.enfermedadescronicas.length; i++) {
                    _this.nuevaEnfermedadCronicaPaciente.Paciente_id = pacienteAgregado[0].id;
                    _this.nuevaEnfermedadCronicaPaciente.EnfermedadCronica_id = _this.enfermedadescronicas[i].id;
                    _this.servicioEnfermedadesCronicasPaciente.registerEnfermedadesCronicasPaciente(_this.nuevaEnfermedadCronicaPaciente).subscribe(function (data) { });
                }
                // Crear habitos del paciente en null
                for (var i = 0; i < _this.habitos.length; i++) {
                    _this.nuevoHabitosPaciente.Paciente_id = pacienteAgregado[0].id;
                    _this.nuevoHabitosPaciente.Habito_id = _this.habitos[i].id;
                    _this.servicioHabitosPaciente.registerHabitosPaciente(_this.nuevoHabitosPaciente).subscribe(function (data) { });
                }
                // Crear medicamentos en uso del paciente en null
                for (var i = 0; i < _this.medicamentos.length; i++) {
                    _this.nuevoUsoMedicamento.Paciente_id = pacienteAgregado[0].id;
                    _this.nuevoUsoMedicamento.Medicamento_id = _this.medicamentos[i].id;
                    _this.servicioUsoMedicamento.registerUsoMedicamento(_this.nuevoUsoMedicamento).subscribe(function (data) { });
                }
                // Crear vacunas puestas al paciente en null
                for (var i = 0; i < _this.vacunas.length; i++) {
                    _this.nuevaVacunaPaciente.Paciente_id = pacienteAgregado[0].id;
                    _this.nuevaVacunaPaciente.Vacuna_id = _this.vacunas[i].id;
                    _this.servicioVacunasPaciente.registerVacunaPaciente(_this.nuevaVacunaPaciente).subscribe(function (data) { });
                }
            });
            _this.dialogRef.close();
        }, 
        //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
        function (err) {
            if (err === 'Used') {
                alert("Esta persona ya tiene asignado un paciente");
            }
        });
    };
    AgregarpacienteComponent = __decorate([
        core_1.Component({
            selector: 'app-agregarpaciente',
            templateUrl: './agregarpaciente.component.html',
            styleUrls: ['./agregarpaciente.component.css']
        }),
        __param(14, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            habitos_sexuales_paciente_service_1.HabitosSexualesPacienteService,
            habito_sexual_service_1.HabitoSexualService,
            alergias_comunes_paciente_service_1.AlergiasComunesPacienteService,
            alergia_service_1.AlergiaService,
            alergias_medicamentos_paciente_service_1.AlergiasMedicamentosPacienteService,
            medicamento_service_1.MedicamentoService,
            enfermedades_cronicas_paciente_service_1.EnfermedadesCronicasPacienteService,
            enfermedad_cronica_service_1.EnfermedadCronicaService,
            habitos_paciente_service_1.HabitosPacienteService,
            habito_service_1.HabitoService,
            uso_medicamento_service_1.UsoMedicamentoService,
            vacuna_service_1.VacunaService,
            vacunaspaciente_service_1.VacunasPacienteService, Object])
    ], AgregarpacienteComponent);
    return AgregarpacienteComponent;
}());
exports.AgregarpacienteComponent = AgregarpacienteComponent;
//# sourceMappingURL=agregarpaciente.component.js.map