import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
	selector: 'app-agregarpaciente',
	templateUrl: './agregarpaciente.component.html',
	styleUrls: ['./agregarpaciente.component.css']
})
export class AgregarpacienteComponent implements OnInit {
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


	constructor(
		public dialogRef: MatDialogRef<AgregarpacienteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) {
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
			this.personasDisponibles = this.totalPersonas;


		 }

	ngOnInit()
	{
    	this.actualizarPersonas();
    	this.actualizarTS();
		this.actualizarPacientes();
	}

	actualizarPersonas()
	{
		this.servicioPersona.getPersonas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
			this.personasDisponibles = this.totalPersonas;
			this.actualizarPacientes();
		});
	}

	onNoClick()
	{

		this.dialogRef.close();
	}

  actualizarTS ()
  {
    this.servicioTS.getTipoSangres().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalTS = todo;
    });
  }

	actualizarPacientes()
	{
		this.servicioPaciente.getPacientes().subscribe(data => {
		var todo: any = data;
		todo = todo.data;
		this.totalPacientes = todo;
		this.filtrarPacientesRegistrados();

		});
	}


	agregarPaciente()
	{
		this.servicioPaciente.registerPaciente(this.paciente).subscribe(data => {
			this.dialogRef.close();

		},
		//Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
		(err) => {
		if (err === 'Used') {
		alert("Esta persona ya tiene asignado un paciente")
		}

	});
	}


	filtrarPacientesRegistrados()
	{
		for ( let i = 0 ; i < this.totalPacientes.length ; i ++ )
		{
			for ( let j = 0 ; j < this.personasDisponibles.length ; j ++ )
			{
				if (this.totalPacientes[i].Persona_id === this.personasDisponibles[j].id)
				{
					this.personasDisponibles.splice(j, 1);
				}
			}
		}
	}

}
