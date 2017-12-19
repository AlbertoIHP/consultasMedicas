import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vacuna } from '../../../../Models/Vacuna.model';

import { VacunasPaciente } from '../../../../Models/VacunasPaciente.model';
import { VacunasPacienteService } from '../../../../Services/vacunaspaciente/vacunaspaciente.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

@Component({
  selector: 'app-agregar-vacuna',
  templateUrl: './agregar-vacuna.component.html',
  styleUrls: ['./agregar-vacuna.component.css']
})
export class AgregarVacunaComponent {
  public nuevaVacuna: Vacuna;
  public servicioVacuna: any;
  public totalPacientes: Paciente[];
  public nuevaVacunasPaciente: VacunasPaciente;
  public totalVacunas: Vacuna[];

  constructor(
  	public dialogRef: MatDialogRef<AgregarVacunaComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
    public servicioVacunasPaciente: VacunasPacienteService,
    public servicioPacientes: PacienteService
  	) { 

  	this.nuevaVacuna=new Vacuna();
  	this.servicioVacuna = data.servicioVacuna;
    this.totalPacientes=[];
    this.nuevaVacunasPaciente= new VacunasPaciente();
    this.totalVacunas=[];
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

  agregarVacuna()
  {
    this.servicioVacuna.registerVacuna(this.nuevaVacuna).subscribe(data => {
  
      this.servicioPacientes.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioVacuna.getVacunas().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalVacunas = todo;

          let currentVacuna=this.totalVacunas.filter( vacuna => vacuna.nombre === this.nuevaVacuna.nombre);

          
          // Agregar nueva vacuna a cada paciente
          for (let i = 0; i < this.totalPacientes.length; i++) {
            this.nuevaVacunasPaciente.Paciente_id = this.totalPacientes[i].id;
            this.nuevaVacunasPaciente.Vacuna_id = currentVacuna[0].id;
            this.servicioVacunasPaciente.registerVacunaPaciente(this.nuevaVacunasPaciente).subscribe(data => {

            });
          }
          
        
        });

        console.log(data);
        this.dialogRef.close();
      });
    });

    
  }
}