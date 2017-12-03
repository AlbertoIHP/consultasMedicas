import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-editarmedico',
  templateUrl: './editarmedico.component.html',
  styleUrls: ['./editarmedico.component.css']
})
export class EditarmedicoComponent implements OnInit {
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
    public dialogRef: MatDialogRef<EditarmedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {


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

      this.servicioDisponibilidad.getDisponibilidads().subscribe( data => {
        let all = this.normalizeData( data )
        this.horarios = all.filter( dis => parseInt(dis.Medico_id) === parseInt(this.medico.id) )
      })

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

  normalizeData( todo : any )
  {
    return todo.data
  }

  agregarMedico()
  {

    this.servicioMedico.editMedico(this.medico, this.medico.id).subscribe( data => {

      for ( let horario of this.horarios)
      {
        this.servicioDisponibilidad.editDisponibilidad( horario, horario.id ).subscribe( data => {console.log(data) })
      }
      this.onNoClick()

    })


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
