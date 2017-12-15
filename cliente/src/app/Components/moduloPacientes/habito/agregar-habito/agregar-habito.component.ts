import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { HabitosPaciente } from '../../../../Models/HabitosPaciente.model';
import { HabitosPacienteService } from '../../../../Services/habitospaciente/habitos-paciente.service';

import { Habito } from '../../../../Models/Habito.model';
import { HabitoService } from '../../../../Services/habito/habito.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';
@Component({
  selector: 'app-agregar-habito',
  templateUrl: './agregar-habito.component.html',
  styleUrls: ['./agregar-habito.component.css']
})
export class AgregarHabitoComponent {
	public nuevoHabito: Habito;
	public totalPacientes: Paciente[];
	public nuevoHabitosPaciente: HabitosPaciente;
	public totalHabitos: Habito[];
	constructor(
		public dialogRef: MatDialogRef<AgregarHabitoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabito: HabitoService,
		public servicioHabitosPaciente: HabitosPacienteService,
		public servicioPacientes: PacienteService
		)
	{
		this.nuevoHabito = new Habito();
		this.totalPacientes=[];
		this.nuevoHabitosPaciente= new HabitosPaciente();
		this.totalHabitos=[];
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarHabito()
	{
		this.servicioHabito.registerHabito(this.nuevoHabito).subscribe(data => {
	
			this.servicioPacientes.getPacientes().subscribe(data=>{
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				this.servicioHabito.getHabitos().subscribe(data=>{
					var todo: any = data;
					todo = todo.data;
					this.totalHabitos = todo;

					let currentHabito=this.totalHabitos.filter( habito => habito.nombre === this.nuevoHabito.nombre);

					
					// Agregar nuevo hábito a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevoHabitosPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevoHabitosPaciente.Habito_id = currentHabito[0].id;
						this.servicioHabitosPaciente.registerHabitosPaciente(this.nuevoHabitosPaciente).subscribe(data => {

						});
					}
					
				
				});

				console.log(data);
				this.dialogRef.close();
			});
		});

		
	}
}