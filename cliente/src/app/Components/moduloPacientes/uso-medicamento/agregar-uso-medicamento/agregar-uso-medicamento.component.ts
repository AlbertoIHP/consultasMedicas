import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UsoMedicamento } from '../../../../Models/UsoMedicamento.model';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-agregar-uso-medicamento',
  templateUrl: './agregar-uso-medicamento.component.html',
  styleUrls: ['./agregar-uso-medicamento.component.css']
})
export class AgregarUsoMedicamentoComponent implements OnInit {

	public nuevoUsoMedicamento: UsoMedicamento;
	public totalMedicamentos: any;
  	public totalPacientes: any;
    public totalPersonas:any;

    public totalPersonasTemp: any;

  	public servicioMedicamento: any;
  	public servicioUsoMedicamento: any;
  	public servicioPaciente: any;

    options: DatepickerOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  
   };

  	ngOnInit()
  {
    this.servicioMedicamento.getMedicamentos().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalMedicamentos = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
      	var todo: any = data;
	      todo = todo.data;
	      this.totalPacientes = todo;
        this.reemplazarIdPorString();
      });
    });
  }

  reemplazarIdPorString()
  {
      var arrayTemp=[];
      for (let i =0; i < this.totalPersonas.length; i++) {
       
        for(let j = 0 ; j < this.totalPacientes.length ; j++)

        {
          if(this.totalPacientes[j].Persona_id===this.totalPersonas[i].id){
            this.totalPersonas[i].Paciente_id=this.totalPacientes[j].id;
            arrayTemp.push(this.totalPersonas[i]);
          }
          //let currentPersona = this.totalPersonas.filter( persona => persona.id === this.totalPacientes[j].Persona_id);
          
        }
    }
      this.totalPersonasTemp=arrayTemp;
}
  constructor(
  	public dialogRef: MatDialogRef<AgregarUsoMedicamentoComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) { 

	  	this.nuevoUsoMedicamento = new UsoMedicamento();
	  	this.totalMedicamentos = data.vacunas;
	  	this.totalPacientes = data.pacientes;
	  	this.totalPersonas=data.personas;

	  	this.totalPersonasTemp=[];

	  	this.servicioUsoMedicamento = data.servicioUsoMedicamento;
	  	this.servicioMedicamento = data.servicioMedicamento;
	  	this.servicioPaciente = data.servicioPaciente;


  }

  	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarUsoMedicamentos()
	{
    this.nuevoUsoMedicamento.fechaInicio=new Date(this.nuevoUsoMedicamento.fechaInicio).toISOString().slice(0, 19).replace('T', ' ');
		this.servicioUsoMedicamento.registerUsoMedicamento(this.nuevoUsoMedicamento).subscribe(data => {
			this.dialogRef.close();
		});
	}

  

}
