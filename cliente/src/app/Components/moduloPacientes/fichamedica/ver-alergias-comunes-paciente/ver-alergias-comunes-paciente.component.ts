import { Component, OnInit, Input } from '@angular/core';
import { EventosService } from '../../../../Services/eventos/eventos.service'

@Component({
  selector: 'app-ver-alergias-comunes-paciente',
  templateUrl: './ver-alergias-comunes-paciente.component.html',
  styleUrls: ['./ver-alergias-comunes-paciente.component.css']
})
export class VerAlergiasComunesPacienteComponent implements OnInit{

@Input() pacienteTest:any;

public mensajePrevio:any;

  constructor() {

   }

  ngOnInit() {
     this.mensajePrevio="hola "+this.pacienteTest.nombre;
     this.setAlert();
  }


  setAlert(){
    this.pacienteTest.extra="Extra gola";
    alert(this.pacienteTest.extra +" "+this.pacienteTest.id);
  }

}
