import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlergiasComunesPaciente } from '../../../../Models/AlergiasComunesPaciente.model';
import { DatepickerOptions } from 'ng2-datepicker';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-agregar-alergias-comunes-paciente',
  templateUrl: './agregar-alergias-comunes-paciente.component.html',
  styleUrls: ['./agregar-alergias-comunes-paciente.component.css']
})
export class AgregarAlergiasComunesPacienteComponent implements OnInit {
	public nuevaAlergiasComunesPaciente: AlergiasComunesPaciente;
	public totalAlergiasComunes: any;
  	public totalPacientes: any;
    public totalPersonas:any;

    public totalPersonasTemp: any;

  	public servicioAlergiaComun: any;
  	public servicioAlergiasComunesPaciente: any;
  	public servicioPaciente: any;

    // Necesarios para autocomplete
    public personaCtrl: FormControl;
    public filteredPersonas: Observable<any[]>;

    options: DatepickerOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'YYYY[-]MM[-]DD',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  
   };


 	ngOnInit()
  {
    this.servicioAlergiaComun.getAlergias().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalAlergiasComunes = todo;

      this.servicioPaciente.getPacientes().subscribe(data=>{
      	var todo: any = data;
	      todo = todo.data;
	      this.totalPacientes = todo;
        this.reemplazarIdPorString();
      });
    });

    this.personaCtrl = new FormControl();
     this.filteredPersonas = this.personaCtrl.valueChanges
      .pipe(
        startWith(''),
        map(persona => persona ? this.filterPersonas(persona) : this.totalPersonasTemp.slice())
    );
  }

    filterPersonas(rut: string) {
      return this.totalPersonasTemp.filter(persona =>
        persona.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0);
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
      console.log(this.totalPersonasTemp);

    
  }


  constructor(
  	public dialogRef: MatDialogRef<AgregarAlergiasComunesPacienteComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) {

  		this.nuevaAlergiasComunesPaciente = new AlergiasComunesPaciente();
	  	this.totalAlergiasComunes = data.alergiasComunes;
    	this.totalPacientes = data.pacientes;
      	this.totalPersonas=data.personas;

      	this.totalPersonasTemp=[];

    	this.servicioAlergiasComunesPaciente = data.servicioAlergiasComunesPaciente;
    	this.servicioAlergiaComun = data.servicioAlergiaComun;
    	this.servicioPaciente = data.servicioPaciente;

      console.log(this.totalPersonas);
      console.log(this.totalPacientes)
  	 }


  	onNoClick()
	{
		this.dialogRef.close();
	}
  /*

	agregarAlergiasComunesPaciente()
	{
    this.nuevaAlergiasComunesPaciente.fechaDeteccion=new Date(this.nuevaAlergiasComunesPaciente.fechaDeteccion).toISOString().slice(0, 19).replace('T', ' ');

		this.servicioAlergiasComunesPaciente.registerAlergiasComunesPaciente(this.nuevaAlergiasComunesPaciente).subscribe(data => {
			this.dialogRef.close();
		});
	}
  */
}
