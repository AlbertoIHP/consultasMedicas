import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Medicamento } from '../../../../Models/Medicamento.model';

import { UsoMedicamento } from '../../../../Models/UsoMedicamento.model';
import { UsoMedicamentoService } from '../../../../Services/usomedicamento/uso-medicamento.service';

import { AlergiasMedicamentosPaciente } from '../../../../Models/AlergiasMedicamentosPaciente.model';
import { AlergiasMedicamentosPacienteService } from '../../../../Services/alergiasmedicamentospaciente/alergias-medicamentos-paciente.service';

import { Paciente } from '../../../../Models/Paciente.model';
import { PacienteService } from '../../../../Services/paciente/paciente.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.component.html',
  styleUrls: ['./agregar-medicamento.component.css']
})
export class AgregarMedicamentoComponent implements OnInit {
	agregarForm: FormGroup;
  public nuevoMedicamento: Medicamento;
  public servicioMedicamento: any;
  public totalPacientes: Paciente[];
  public nuevaAlergiasMedicamentosPaciente: AlergiasMedicamentosPaciente;
  public nuevoUsoMedicamento: UsoMedicamento;
  public totalMedicamentos: Medicamento[];

  ngOnInit(){

      this.agregarForm = new FormGroup({
            nombreComun: new FormControl('', [Validators.required]),
            nombreCientifico: new FormControl('', [Validators.required]),
           
        });
    }

   constructor(
  	public dialogRef: MatDialogRef<AgregarMedicamentoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any,
    public servicioUsoMedicamento: UsoMedicamentoService,
    public servicioAlergiasMedicamentosPaciente: AlergiasMedicamentosPacienteService,
    public servicioPacientes: PacienteService
  	) { 

  	this.nuevoMedicamento=new Medicamento();
  	this.servicioMedicamento = data.servicioMedicamento;
    this.totalPacientes=[];
    this.nuevaAlergiasMedicamentosPaciente= new AlergiasMedicamentosPaciente();
    this.nuevoUsoMedicamento=new UsoMedicamento();
    this.totalMedicamentos=[];
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

  agregarMedicamento()
  {
    this.servicioMedicamento.registerMedicamento(this.nuevoMedicamento).subscribe(data => {
  
      this.servicioPacientes.getPacientes().subscribe(data=>{
        var todo: any = data;
        todo = todo.data;
        this.totalPacientes = todo;

        this.servicioMedicamento.getMedicamentos().subscribe(data=>{
          var todo: any = data;
          todo = todo.data;
          this.totalMedicamentos = todo;

          let currentMedicamento=this.totalMedicamentos.filter( medicamento => medicamento.nombrecomun === this.nuevoMedicamento.nombrecomun);

          
          // Agregar nueva vacuna a cada paciente
          for (let i = 0; i < this.totalPacientes.length; i++) {
            this.nuevaAlergiasMedicamentosPaciente.Paciente_id = this.totalPacientes[i].id;
            this.nuevoUsoMedicamento.Paciente_id = this.totalPacientes[i].id;

            this.nuevaAlergiasMedicamentosPaciente.Medicamento_id = currentMedicamento[0].id;
            this.nuevoUsoMedicamento.Medicamento_id = currentMedicamento[0].id;

            this.servicioAlergiasMedicamentosPaciente.registerAlergiasMedicamentosPaciente(this.nuevaAlergiasMedicamentosPaciente).subscribe(data => {

            	this.servicioUsoMedicamento.registerUsoMedicamento(this.nuevoUsoMedicamento).subscribe(data=>{
            		
            	});

            });
          }
          
        
        });

        console.log(data);
        this.dialogRef.close();
      });
    });

    
  }

}
