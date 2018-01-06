// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Vacuna } from '../../../../Models/Vacuna.model';

import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';
import { VacunasPacienteService } from '../../../../Services/vacunaspaciente/vacunaspaciente.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
  selector: 'app-agregar-vacuna',
  templateUrl: './agregar-vacuna.component.html',
  styleUrls: ['./agregar-vacuna.component.css']
})
export class AgregarVacunaComponent implements OnInit {
  // Se declaran los atributos
  agregarForm: FormGroup;
  public nuevaVacuna: Vacuna;
  public servicioVacuna: any;
  public totalPacientes: Paciente[];
  public nuevaVacunasPaciente: VacunasPaciente;
  public totalVacunas: Vacuna[];

  ngOnInit(){
      // Se inician las validaciones usando un FormGroup y se dan los parámetros
      this.agregarForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
           
      });

      //Se inicializa el evento en false
      this.servicioEvento.actualizacion(false);
    }

  constructor(
    //Se declaran los servicios y componentes a utilizar
  	public dialogRef: MatDialogRef<AgregarVacunaComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioVacunasPaciente: VacunasPacienteService,
    public servicioPacientes: PacienteService,
    public servicioEvento: EventosService
  	) { 
    // Se inicializan los atributos
  	this.nuevaVacuna=new Vacuna();
  	this.servicioVacuna = data.servicioVacuna;
    this.totalPacientes=[];
    this.nuevaVacunasPaciente= new VacunasPaciente();
    this.totalVacunas=[];
  }

  //Cerrar el diálogo
  onNoClick()
  {
    this.dialogRef.close();
  }

  agregarVacuna()
  {
    // Se registra  la nueva vacuna con los datos obtenidos
    this.servicioVacuna.registerVacuna(this.nuevaVacuna).subscribe(data => {

      // Se obtienen los pacientes
      this.servicioPacientes.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

         // Se obtienen todas las vacunas
        this.servicioVacuna.getVacunas().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalVacunas = todo;

          //Se obtiene la vacuna que se acaba de agregar
          let currentVacuna=this.totalVacunas.filter( vacuna => vacuna.nombre === this.nuevaVacuna.nombre);

          
          // Agregar nueva vacuna a cada paciente
          for (let i = 0; i < this.totalPacientes.length; i++) {
            this.nuevaVacunasPaciente.Paciente_id = this.totalPacientes[i].id;
            this.nuevaVacunasPaciente.Vacuna_id = currentVacuna[0].id;
            this.servicioVacunasPaciente.registerVacunaPaciente(this.nuevaVacunasPaciente).subscribe(data => {

            });
          }

           //Se emite un evento para actualizar los datos
          this.servicioEvento.actualizacion(true);

          // Se cierra el diálogo        
          this.dialogRef.close();
          
        
        });

       

      });
      
    });

    
  }
}