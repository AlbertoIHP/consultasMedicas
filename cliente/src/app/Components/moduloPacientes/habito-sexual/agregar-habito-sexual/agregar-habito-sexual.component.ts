import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HabitoSexual } from '../../../../Models/HabitoSexual.model';
import { HabitoSexualService } from '../../../../Services/habitosexual/habito-sexual.service';

import { HabitosSexualesPacienteService } from '../../../../Services/habitossexualespaciente/habitos-sexuales-paciente.service';
import { HabitosSexualesPaciente } from '../../../../Models/HabitosSexualesPaciente.model';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';


@Component({
  selector: 'app-agregar-habito-sexual',
  templateUrl: './agregar-habito-sexual.component.html',
  styleUrls: ['./agregar-habito-sexual.component.css']
})
export class AgregarHabitoSexualComponent {
	public nuevoHabitoSexual: HabitoSexual;
	public totalPacientes: Paciente[];
	public nuevoHabitosSexualesPaciente:HabitosSexualesPaciente;
	public totalHabitosSexuales:HabitoSexual[];
	constructor(
		public dialogRef: MatDialogRef<AgregarHabitoSexualComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioHabitoSexual: HabitoSexualService,
		public servicioHabitosSexualesPaciente:HabitosSexualesPacienteService,
		public servicioPacientes:PacienteService
		)
	{
		this.totalPacientes=[];
		this.nuevoHabitosSexualesPaciente= new HabitosSexualesPaciente();
		this.nuevoHabitoSexual = new HabitoSexual();
		this.totalHabitosSexuales=[];
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarHabitoSexual()
	{
		this.servicioHabitoSexual.registerHabitoSexual(this.nuevoHabitoSexual).subscribe(data => {
	
			this.servicioPacientes.getPacientes().subscribe(data=>{
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				this.servicioHabitoSexual.getHabitoSexuales().subscribe(data=>{
					var todo: any = data;
					todo = todo.data;
					this.totalHabitosSexuales = todo;

					let currentHabitoSexual=this.totalHabitosSexuales.filter( habitoSexual => habitoSexual.nombre === this.nuevoHabitoSexual.nombre);

					
					// Agregar nuevo habito sexual a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevoHabitosSexualesPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevoHabitosSexualesPaciente.HabitoSexual_id = currentHabitoSexual[0].id;
						this.servicioHabitosSexualesPaciente.registerHabitosSexualesPaciente(this.nuevoHabitosSexualesPaciente).subscribe(data => {

						});
					}
					
				
				});

				console.log(data);
				this.dialogRef.close();
			});
		});

		
	}
}