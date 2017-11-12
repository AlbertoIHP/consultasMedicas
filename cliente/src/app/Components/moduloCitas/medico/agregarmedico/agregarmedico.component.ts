import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-agregarmedico',
  templateUrl: './agregarmedico.component.html',
  styleUrls: ['./agregarmedico.component.css']
})
export class AgregarmedicoComponent implements OnInit {
	public medico: any;
	public totalMedicos: any;
	public totalPersonas: any;
	public totalEspecialidades: any;
	public servicioMedico: any;
	public servicioPersona: any;
	public servicioEspecialidad: any;
	public personasDisponibles: any;


	constructor(
		public dialogRef: MatDialogRef<AgregarmedicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) {
			this.personasDisponibles = [];
			this.medico = data.medico;
			this.totalMedicos = data.medicos;
			this.totalPersonas = data.personas;
			this.totalEspecialidades = data.especialidades;
			this.servicioMedico = data.servicioMedico;
			this.servicioPersona = data.servicioPersona;
			this.servicioEspecialidad = data.servicioEspecialidad;
			this.personasDisponibles = this.totalPersonas;
		 }

	ngOnInit()
	{
    this.actualizarPersonas();
    this.actualizarEspecialidades();
		this.actualizarMedicos();
	}

	actualizarPersonas()
	{	
		this.servicioPersona.getPersonas().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalPersonas = todo;
			this.personasDisponibles = this.totalPersonas;
			this.actualizarMedicos();
		});
	}

	onNoClick()
	{

		this.dialogRef.close();
	}

	especialidadSeleccionada(especialidad)
	{
		this.medico.Especialidad_id = especialidad.id;
	}

	personaSeleccionada(persona)
	{
		this.medico.Persona_id = persona.id;
	}


  actualizarEspecialidades ()
  {
    this.servicioEspecialidad.getEspecialidads().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEspecialidades = todo;
    });
  }

	actualizarMedicos()
	{
		this.servicioMedico.getMedicos().subscribe(data => {
		var todo: any = data;
		todo = todo.data;
		this.totalMedicos = todo;
		this.filtrarMedicosRegistrados();

		});
	}


	agregarMedico()
	{
		this.servicioMedico.registerMedico(this.medico).subscribe(data => {
			this.dialogRef.close();

		},
		//Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
		(err) => {
		if (err === 'Used') {
		alert("Esta persona ya tiene asignado un medico")
		}

	});
	}


	filtrarMedicosRegistrados()
	{
		for ( let i = 0 ; i < this.totalMedicos.length ; i ++ )
		{
			for ( let j = 0 ; j < this.personasDisponibles.length ; j ++ )
			{
				if (this.totalMedicos[i].Persona_id === this.personasDisponibles[j].id)
				{
					this.personasDisponibles.splice(j, 1);
				}
			}
		}
	}

}
