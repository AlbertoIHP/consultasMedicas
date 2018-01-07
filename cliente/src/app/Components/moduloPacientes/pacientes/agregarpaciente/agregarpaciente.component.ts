//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

//Modelos y servicios
import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';
import { HabitosSexualesPacienteService } from '../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';

import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';
import { AlergiasComunesPacienteService } from '../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';

import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';

import { AlergiasMedicamentosPaciente } from '../../../../Models/AlergiasMedicamentosPaciente.model';
import { AlergiasMedicamentosPacienteService } from '../../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service';

import { Medicamento } from '../../../../Models/Medicamento.model';
import { MedicamentoService } from '../../../../Services/medicamento/medicamento.service';

import { EnfermedadesCronicasPaciente } from '../../../../Models/EnfermedadesCronicasPaciente.model';
import { EnfermedadesCronicasPacienteService } from '../../../../Services/enfermedadescronicaspaciente/enfermedades-cronicas-paciente.service';

import { EnfermedadCronica } from '../../../../Models/EnfermedadCronica.model';
import { EnfermedadCronicaService } from '../../../../Services/enfermedadcronica/enfermedad-cronica.service';

import { HabitosPaciente } from '../../../../Models/HabitosPaciente.model';
import { HabitosPacienteService } from '../../../../Services/habitospaciente/habitos-paciente.service';

import { Habito } from '../../../../Models/Habito.model';
import { HabitoService } from '../../../../Services/habito/habito.service';

import { UsoMedicamento } from '../../../../Models/UsoMedicamento.model';
import { UsoMedicamentoService } from '../../../../Services/usomedicamento/uso-medicamento.service';

import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';
import { VacunasPacienteService } from '../../../../Services/vacunaspaciente/vacunaspaciente.service';

import { Vacuna } from '../../../../Models/Vacuna.model';
import { VacunaService } from '../../../../Services/vacuna/vacuna.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-agregarpaciente',
	templateUrl: './agregarpaciente.component.html',
	styleUrls: ['./agregarpaciente.component.css']
})
export class AgregarpacienteComponent implements OnInit {
	//Se declaran los atributos
	editarForm: FormGroup;
	public paciente: any;
	public totalPacientes: any;
	public totalPersonas: any;
	public totalTS: any;
	public totalGruposEtnicos: any;
	public totalOcupaciones: any;
	public servicioPaciente: any;
	public servicioPersona: any;
	public servicioTS: any;
	public personasDisponibles: any;

	public nuevoHabitosSexualesPaciente: HabitosSexualesPaciente;
	public habitosSexuales: HabitoSexual[];

	public nuevaAlergiaComunPaciente: AlergiasComunesPaciente;
	public alergias: Alergia[];

	public nuevaAlergiaMedicamentoPaciente: AlergiasMedicamentosPaciente;
	public medicamentos: Medicamento[];

	public nuevaEnfermedadCronicaPaciente: EnfermedadesCronicasPaciente;
	public enfermedadescronicas: EnfermedadCronica[];

	public nuevoHabitosPaciente: HabitosPaciente;
	public habitos: Habito[];

	public nuevoUsoMedicamento: UsoMedicamento;

	public nuevaVacunaPaciente: VacunasPaciente;
	public vacunas: Vacuna[];

	// Necesarios para autocomplete
	public personaCtrl: FormControl;
  	public filteredPersonas: Observable<any[]>;

	constructor(
		public dialogRef: MatDialogRef<AgregarpacienteComponent>,
		public servicioHabitosSexualesPaciente: HabitosSexualesPacienteService,
  		public servicioHabitoSexual: HabitoSexualService,
  		public servicioAlergiasComunesPaciente: AlergiasComunesPacienteService,
  		public servicioAlergia: AlergiaService,
  		public servicioAlergiasMedicamentosPaciente: AlergiasMedicamentosPacienteService,
  		public servicioMedicamento: MedicamentoService,
  		public servicioEnfermedadesCronicasPaciente: EnfermedadesCronicasPacienteService,
  		public servicioEnfermedadCronica: EnfermedadCronicaService,
  		public servicioHabitosPaciente: HabitosPacienteService,
  		public servicioHabito: HabitoService,
  		public servicioUsoMedicamento: UsoMedicamentoService,
  		public servicioVacuna: VacunaService,
  		public servicioVacunasPaciente: VacunasPacienteService,
		@Inject(MAT_DIALOG_DATA) public data: any,
    	public servicioEvento: EventosService
		) {
		//Se inicializan los atributos
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
		this.nuevoHabitosSexualesPaciente = new HabitosSexualesPaciente();
		
		this.alergias = [];
		this.nuevaAlergiaComunPaciente = new AlergiasComunesPaciente();
		
		this.medicamentos = [];
		this.nuevaAlergiaMedicamentoPaciente = new AlergiasMedicamentosPaciente();

		this.enfermedadescronicas = [];
		this.nuevaEnfermedadCronicaPaciente = new EnfermedadesCronicasPaciente();

		this.habitos = [];
		this.nuevoHabitosPaciente = new HabitosPaciente();

		this.nuevoUsoMedicamento = new UsoMedicamento();

		this.vacunas = [];
		this.nuevaVacunaPaciente = new VacunasPaciente();

		//Se actualizan los atributos a utilizar
		this.actualizarAtributos();
	}

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
		this.editarForm = new FormGroup({
	      // tslint:disable-next-line
	      tipoSangre: new FormControl('', [Validators.required]),
	      personaAsociada: new FormControl('', [Validators.required]),
	      grupoEtnico: new FormControl('', [Validators.required]),
	      ocupacion: new FormControl('', [Validators.required])
    	});

    	//Se filtran las personas que se mostrarán en el autocomplete
	    this.filteredPersonas = this.editarForm.controls['personaAsociada'].valueChanges
	      .pipe(
	        startWith(''),
	        map(persona => persona ? this.filterPersonas(persona) : this.personasDisponibles.slice())
		);

	    //Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
	}

	//Se filtran las personas usando el rut como variable
	filterPersonas(rut: string) {
	    return this.personasDisponibles.filter(persona => 
	    	persona.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0);
    }

	// Se cierra el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	//Se actualizan los atributos en general que se utilizarán para asignarlos al nuevo paciente
	actualizarAtributos() {
	    this.servicioHabitoSexual.getHabitoSexuales().subscribe(data => {
	    	var todo: any = data;
	    	todo = todo.data;
	    	this.habitosSexuales = todo;

	    	this.servicioAlergia.getAlergias().subscribe(data => {
		    	var todo: any = data;
		    	todo = todo.data;
		    	this.alergias = todo;

		    	this.servicioMedicamento.getMedicamentos().subscribe(data => {
			    	var todo: any = data;
			    	todo = todo.data;
			    	this.medicamentos = todo;

			    	this.servicioEnfermedadCronica.getEnfermedadesCronicas().subscribe(data => {
				    	var todo: any = data;
				    	todo = todo.data;
				    	this.enfermedadescronicas = todo;

				    	this.servicioHabito.getHabitos().subscribe(data => {
					  		var todo: any = data;
					    	todo = todo.data;
					    	this.habitos = todo;

					    	this.servicioVacuna.getVacunas().subscribe(data => {
						    	var todo: any = data;
						    	todo = todo.data;
						    	this.vacunas = todo;
				    	  });
			    	  });
		    	  });
	    	  });
	      });
	    });
 	}

	agregarPaciente() {
		//Se registra el nuevo paciente
		this.servicioPaciente.registerPaciente(this.paciente).subscribe(data => {
			let pacienteAgregado: any;

			//Se obtienen todos los nuevos pacientes
			this.servicioPaciente.getPacientes().subscribe(data=>{
	        	var todo: any = data;
	        	todo = todo.data;
	        	this.totalPacientes = todo;

	        	//Se obtiene el paciente recién agregado
				pacienteAgregado = this.totalPacientes.filter(paciente => paciente.Persona_id === this.paciente.Persona_id);
				
				// Crear habitos sexuales del paciente en null
				for (let i = 0; i < this.habitosSexuales.length; i++) {
					this.nuevoHabitosSexualesPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevoHabitosSexualesPaciente.HabitoSexual_id = this.habitosSexuales[i].id;
					this.servicioHabitosSexualesPaciente.registerHabitosSexualesPaciente(this.nuevoHabitosSexualesPaciente).subscribe(data => {});
				}

				// Crear alergías comunes del paciente en null
				for (let i = 0; i < this.alergias.length; i++) {
					this.nuevaAlergiaComunPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevaAlergiaComunPaciente.Alergia_id = this.alergias[i].id;
					this.servicioAlergiasComunesPaciente.registerAlergiasComunesPaciente(this.nuevaAlergiaComunPaciente).subscribe(data => {});
				}

				// Crear alergías medicamentos del paciente en null
				for (let i = 0; i < this.medicamentos.length; i++) {
					this.nuevaAlergiaMedicamentoPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevaAlergiaMedicamentoPaciente.Medicamento_id = this.medicamentos[i].id;
					this.servicioAlergiasMedicamentosPaciente.registerAlergiasMedicamentosPaciente(this.nuevaAlergiaMedicamentoPaciente).subscribe(data => {});
				}

				// Crear enfermedades cronicas del paciente en null
				for (let i = 0; i < this.enfermedadescronicas.length; i++) {
					this.nuevaEnfermedadCronicaPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevaEnfermedadCronicaPaciente.EnfermedadCronica_id = this.enfermedadescronicas[i].id;
					this.servicioEnfermedadesCronicasPaciente.registerEnfermedadesCronicasPaciente(this.nuevaEnfermedadCronicaPaciente).subscribe(data => {});
				}

				// Crear habitos del paciente en null
				for (let i = 0; i < this.habitos.length; i++) {
					this.nuevoHabitosPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevoHabitosPaciente.Habito_id = this.habitos[i].id;
					this.servicioHabitosPaciente.registerHabitosPaciente(this.nuevoHabitosPaciente).subscribe(data => {});
				}

				// Crear medicamentos en uso del paciente en null
				for (let i = 0; i < this.medicamentos.length; i++) {
					this.nuevoUsoMedicamento.Paciente_id = pacienteAgregado[0].id;
					this.nuevoUsoMedicamento.Medicamento_id = this.medicamentos[i].id;
					this.servicioUsoMedicamento.registerUsoMedicamento(this.nuevoUsoMedicamento).subscribe(data => {});
				}

				// Crear vacunas puestas al paciente en null
				for (let i = 0; i < this.vacunas.length; i++) {
					this.nuevaVacunaPaciente.Paciente_id = pacienteAgregado[0].id;
					this.nuevaVacunaPaciente.Vacuna_id = this.vacunas[i].id;
					this.servicioVacunasPaciente.registerVacunaPaciente(this.nuevaVacunaPaciente).subscribe(data => {});
				}
			});
			
			//Se emite un evento para actualizar los datos
    		this.servicioEvento.actualizacion(true);
      
      		// Se cierra el diálogo
      		this.dialogRef.close();
		},
		//Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
		(err) => {
			if (err === 'Used') {
				alert("Esta persona ya tiene asignado un paciente")
			}
		});
	}
}