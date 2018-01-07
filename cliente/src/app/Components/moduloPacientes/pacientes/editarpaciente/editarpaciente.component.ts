//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Servicio
//import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-editarpaciente',
  templateUrl: './editarpaciente.component.html',
  styleUrls: ['./editarpaciente.component.css']
})
export class EditarpacienteComponent implements OnInit {
  //Declaración de los atributos
  editarForm: FormGroup;
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
    public dialogRef: MatDialogRef<EditarpacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    //public servicioEvento: EventosService
    ) {
    // Se inicializan los atributos con los obtenidos en la base de datos
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

  ngOnInit() {
    // Se inician las validaciones usando un FormGroup y se dan los parámetros
    this.editarForm = new FormGroup({
      tipoSangre: new FormControl(this.paciente.TipoSangre_id, [Validators.required]),
      grupoEtnico: new FormControl(this.paciente.GrupoEtnico_id, [Validators.required]),
      ocupacion: new FormControl(this.paciente.Ocupacion_id, [Validators.required])
    });

    // Se inicializa el evento en false
    //this.servicioEvento.actualizacion(false);
  }

  //Cerrar el diálogo
  onNoClick() {
    this.dialogRef.close();
  }

  editarPaciente() {
    //Utilizando el id del paciente a editar, se modifican sus parámetros
    this.servicioPaciente.editPaciente(this.paciente, this.paciente.id).subscribe(data => {
      //Se emite un evento para no actualizar la vista
      //this.servicioEvento.actualizacion(true);
      
      // Se cierra el diálogo
      this.dialogRef.close();
    },
    //Verificamos si es que se ha catcheado algun error y desplegamos alguna alerta
    (err) => {
      if (err === 'Used') {
        alert("Esta persona ya tiene asignado un paciente")
      }
    });
  }
}