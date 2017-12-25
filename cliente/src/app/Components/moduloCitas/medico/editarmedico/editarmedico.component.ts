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

  private dispo: any
  private dias: any

  constructor(
    public dialogRef: MatDialogRef<EditarmedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {

      this.dias = [
        'Lunes', 
        'Martes', 
        'Miercoles', 
        'Jueves', 
        'Viernes', 
        'Sabado', 
        'Domingo']
      this.dispo = []
      this.horasDia = [ '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00' ]

      this.personasDisponibles = []
      this.medico = data.medico
      console.log(this.medico)
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

  actualizarEspecialidades ()
  {
    this.servicioEspecialidad.getEspecialidads().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEspecialidades = todo;
    });
  }

     agregarHorario()
     {

      let validacion = [];
      validacion = this.verificarHoras();

      if(validacion[0]) {
        alert("Hay campos vacíos")
      } else if (!validacion[1]){
        alert("La hora de inicio debe ser menor que la hora de término");
      } else {
        this.horarios.push({id: 0, Medico_id: 0, dia: '', horaInicio: '', horaFin: ''})
      }
         
         //this.horasInicio = this.horasDia;
         //this.horasFin = this.horasDia;
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
      let duplicado = false;
      let validacion = [];
      validacion = this.verificarHoras();

      for (let m = 0; m < this.horarios.length; m++) {
        for (let n = 0; n < this.horarios.length; n++) {

          if (m != n && this.horarios[m].horaInicio === this.horarios[n].horaInicio &&
            this.horarios[m].horaFin === this.horarios[n].horaFin &&
            this.horarios[m].dia === this.horarios[n].dia) {
            duplicado = true;
          }
        }      
      }

      if(validacion[0]) {
        alert("Hay campos vacíos")
      } else if (!validacion[1]) {
        alert("La hora de inicio debe ser menor que la hora de término");
      } else if (duplicado) {
        alert("No pueden existir horarios duplicados")
      } else {

        this.servicioMedico.editMedico(this.medico, this.medico.id).subscribe( data => {

          for ( let horario of this.horarios)
          {
            this.servicioDisponibilidad.editDisponibilidad( horario, horario.id ).subscribe( data => {console.log(data) })
          }

          if( this.dispo.length > 0)
          {
            for ( let horario of this.dispo)
            {

              horario.Medico_id = this.medico.id
              this.servicioDisponibilidad.registerDisponibilidad(horario).subscribe( data => {
                  console.log(data)
              })

            }        
          }

          this.onNoClick()

        })
    }

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

    verificarHoras() {
      let inicio = [];
      let fin = [];
      let dia = [];
      let correcto = true;
      let vacio = false;

      for (let i = 0; i < this.horarios.length; i++) {
        dia.push(this.horarios[i].dia)
        for(let j = 0; j < this.horasDia.length; j++) {
        
          if (this.horasDia[j] === this.horarios[i].horaInicio || this.horarios[i].horaInicio === '') {
            inicio.push(j);
          }
        }
        for(let k = 0; k < this.horasDia.length; k++) {
        
          if (this.horasDia[k] === this.horarios[i].horaFin || this.horarios[i].horaFin === '') {
            fin.push(k);
          }
        }
      }

      for (let l = 0; l < inicio.length; l++) {
        if (fin[l] === '' || inicio[l] === '' || dia[l] === '') {
          vacio = true;
        }

        if(fin[l] <= inicio[l]) {
          correcto = false;
          break;
        }
      }

      let validacion = [];
      validacion.push(vacio);
      validacion.push(correcto);

      console.log(validacion);

      return validacion;
    }

}
