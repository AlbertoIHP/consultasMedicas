import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Alergia } from '../../../../Models/Alergia.model';
import { AlergiaService } from '../../../../Services/alergia/alergia.service';

import { AlergiasComunesPacienteService } from '../../../../Services/alergiascomunespaciente/alergias-comunes-paciente.service';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-agregar-alergia',
  templateUrl: './agregar-alergia.component.html',
  styleUrls: ['./agregar-alergia.component.css']
})
export class AgregarAlergiaComponent {
	public nuevaAlergia: Alergia;
	public totalPacientes: Paciente[];
	public nuevaAlergiasComunesPaciente:AlergiasComunesPaciente;
	public totalAlergiasComunes:Alergia[];
	constructor(
		public dialogRef: MatDialogRef<AgregarAlergiaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioAlergia: AlergiaService,
		public servicioAlergiasComunesPaciente:AlergiasComunesPacienteService,
		public servicioPacientes:PacienteService
		)
	{
		this.nuevaAlergia = new Alergia();
		this.totalPacientes=[];
		this.nuevaAlergiasComunesPaciente= new AlergiasComunesPaciente();
		this.totalAlergiasComunes=[];
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarAlergia()
	{
		this.servicioAlergia.registerAlergia(this.nuevaAlergia).subscribe(data => {
	
			this.servicioPacientes.getPacientes().subscribe(data=>{
				var todo: any = data;
				todo = todo.data;
				this.totalPacientes = todo;

				this.servicioAlergia.getAlergias().subscribe(data=>{
					var todo: any = data;
					todo = todo.data;
					this.totalAlergiasComunes = todo;

					let currentAlergia=this.totalAlergiasComunes.filter( alergia => alergia.nombre === this.nuevaAlergia.nombre);

					
					// Agregar nueva alergia a cada paciente
					for (let i = 0; i < this.totalPacientes.length; i++) {
						this.nuevaAlergiasComunesPaciente.Paciente_id = this.totalPacientes[i].id;
						this.nuevaAlergiasComunesPaciente.Alergia_id = currentAlergia[0].id;
						this.servicioAlergiasComunesPaciente.registerAlergiasComunesPaciente(this.nuevaAlergiasComunesPaciente).subscribe(data => {

						});
					}
					
				
				});

				console.log(data);
				this.dialogRef.close();
			});
		});

		
	}
}