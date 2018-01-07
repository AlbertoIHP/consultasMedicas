//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Modelos y servicios
import { HabitosPaciente } from '../../../../Models/HabitosPaciente.model';
import { HabitosPacienteService } from '../../../../Services/habitospaciente/habitos-paciente.service';

import { Habito } from '../../../../Models/Habito.model';
import { HabitoService } from '../../../../Services/habito/habito.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-habito',
  templateUrl: './agregar-habito.component.html',
  styleUrls: ['./agregar-habito.component.css']
})
export class AgregarHabitoComponent implements OnInit {
	//Se declaran los atributos
	agregarForm: FormGroup;
	public nuevoHabito: Habito;
	public totalPacientes: Paciente[];
	public nuevoHabitosPaciente: HabitosPaciente;
	public totalHabitos: Habito[];

	ngOnInit() {
		// Se inician las validaciones usando un FormGroup y se dan los parámetros
	    this.agregarForm = new FormGroup({
	        nombre: new FormControl('', [Validators.required]), 
	    });

	    //Se inicializa el evento en false
	    this.servicioEvento.actualizacion(false);
  	}

	constructor(
		//Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<AgregarHabitoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabito: HabitoService,
		public servicioHabitosPaciente: HabitosPacienteService,
		public servicioPacientes: PacienteService,
    	public servicioEvento: EventosService
		) {
		//Se inicializan los atributos
		this.nuevoHabito = new Habito();
		this.totalPacientes=[];
		this.nuevoHabitosPaciente= new HabitosPaciente();
		this.totalHabitos=[];
	}

	// Se cierra el diálogo
	onNoClick() {
		this.dialogRef.close();
	}

	agregarHabito()	{
		//Se registra el nuevo hábito
		this.servicioHabito.registerHabito(this.nuevoHabito).subscribe(data => {
			//Obtener todos los pacientes
			this.servicioPacientes.getPacientes().subscribe(data=>{
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				//Obtener todos los hábitos
				this.servicioHabito.getHabitos().subscribe(data=>{
					var todo: any = data;
					todo = todo.data;
					this.totalHabitos = todo;

					//Obtener el hábito que se acaba de agregar
					let currentHabito=this.totalHabitos.filter( habito => habito.nombre === this.nuevoHabito.nombre);
					
					// Agregar nuevo hábito a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevoHabitosPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevoHabitosPaciente.Habito_id = currentHabito[0].id;
						this.servicioHabitosPaciente.registerHabitosPaciente(this.nuevoHabitosPaciente).subscribe(data => {});
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