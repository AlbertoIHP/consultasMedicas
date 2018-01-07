//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

import { HabitosSexualesPacienteService } from '../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';
import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-habito-sexual',
  templateUrl: './agregar-habito-sexual.component.html',
  styleUrls: ['./agregar-habito-sexual.component.css']
})
export class AgregarHabitoSexualComponent implements OnInit {
	//Se declaran los atributos
	agregarForm: FormGroup;
	public nuevoHabitoSexual: HabitoSexual;
	public totalPacientes: Paciente[];
	public nuevoHabitosSexualesPaciente:HabitosSexualesPaciente;
	public totalHabitosSexuales:HabitoSexual[];

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]),     
	    });

	    //Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false)
  	}
	
	constructor(
		public dialogRef: MatDialogRef<AgregarHabitoSexualComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabitoSexual: HabitoSexualService,
		public servicioHabitosSexualesPaciente:HabitosSexualesPacienteService,
		public servicioPacientes:PacienteService,
    	public servicioEvento: EventosService
		) {
		//Se inicializan los atributos
		this.totalPacientes=[];
		this.nuevoHabitosSexualesPaciente= new HabitosSexualesPaciente();
		this.nuevoHabitoSexual = new HabitoSexual();
		this.totalHabitosSexuales=[];
	}

	// Se cierra el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarHabitoSexual() {
		//Se registra el nuevo hábito sexual
		this.servicioHabitoSexual.registerHabitoSexual(this.nuevoHabitoSexual).subscribe(data => {
			//Obtener todos los pacientes
			this.servicioPacientes.getPacientes().subscribe(data=>{
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				//Obtener todos los hábitos sexuales
				this.servicioHabitoSexual.getHabitoSexuales().subscribe(data=>{
					var todo: any = data;
					todo = todo.data;
					this.totalHabitosSexuales = todo;

					//Obtener el hábito sexual que se acaba de agregar
					let currentHabitoSexual=this.totalHabitosSexuales.filter( habitoSexual => habitoSexual.nombre === this.nuevoHabitoSexual.nombre);

					// Agregar nuevo habito sexual a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevoHabitosSexualesPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevoHabitosSexualesPaciente.HabitoSexual_id = currentHabitoSexual[0].id;
						this.servicioHabitosSexualesPaciente.registerHabitosSexualesPaciente(this.nuevoHabitosSexualesPaciente).subscribe(data => {});
					}	
				});

				//Se emite un evento para actualizar los datos
	    		this.servicioEvento.actualizacion(true);
	      
	      		// Se cierra el diálogo
	      		this.dialogRef.close();
			});
		});
	}
}