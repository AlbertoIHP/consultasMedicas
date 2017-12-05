import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-agregarmedico',
  templateUrl: './agregarmedico.component.html',
  styleUrls: ['./agregarmedico.component.css']
})
export class AgregarmedicoComponent implements OnInit {
	public medico: any
	public totalMedicos: any
	public totalPersonas: any
	public totalEspecialidades: any
	public servicioMedico: any
	public servicioPersona: any
	public servicioEspecialidad: any
	public personasDisponibles: any
  private servicioDisponibilidad: any
  private horarios: any
  private horasDia: any


	constructor(
		public dialogRef: MatDialogRef<AgregarmedicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		)
  {
      this.horarios = [
      {dia: 'Lunes', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0},
      {dia: 'Martes', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0},
      {dia: 'Miercoles', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0},
      {dia: 'Jueves', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0},
      {dia: 'Viernes', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0},
      {dia: 'Sabado', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0},
      {dia: 'Domingo', hora_inicio: 'No disponible', hora_termino: 'No disponible', Medico_id: 0},

      ]

      this.horasDia = [ '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00' ]

			this.personasDisponibles = []
			this.medico = data.medico
			this.totalMedicos = data.medicos
			this.totalPersonas = data.personas
			this.totalEspecialidades = data.especialidades
			this.servicioMedico = data.servicioMedico
			this.servicioPersona = data.servicioPersona
			this.servicioEspecialidad = data.servicioEspecialidad
			this.personasDisponibles = this.totalPersonas
      this.servicioDisponibilidad = data.servicioDisponibilidad
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

  normalizeData( todo : any )
  {
    return todo.data
  }

	agregarMedico()
	{
		this.servicioMedico.registerMedico(this.medico).subscribe(data => {

      this.servicioMedico.getMedicos().subscribe( data => {

        let all = this.normalizeData(data)
        let currentMedico = all.filter( medico => parseInt(medico.Persona_id) === parseInt(this.medico.Persona_id) )

        for( let i = 0 ; i < this.horarios.length ; i ++ )
        {
          this.horarios[i].Medico_id = currentMedico[0].id
          this.servicioDisponibilidad.registerDisponibilidad(this.horarios[i]).subscribe( data => {
            console.log("Hola")
          })
        }

        console.log(this.horarios)
        console.log(currentMedico[0])



        this.onNoClick()



      })

		},
		//Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
		(err) => {
		if (err === 'Used') {
		alert("Esta persona ya tiene asignado un médico")
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
