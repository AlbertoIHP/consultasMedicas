import { Component, OnInit, Inject,AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Paciente } from '../../../../Models/Paciente.model';
import { VistaPaciente } from '../../../../Models/VistaPaciente.model';

import {VistaPacienteService} from '../../../../Services/vistas/vista-paciente.service';

import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-verfichamedica',
  templateUrl: './verfichamedica.component.html',
  styleUrls: ['./verfichamedica.component.css']
})
export class VerFichaMedicaComponent{

  public paciente:any;
  public datosPaciente:VistaPaciente;
  public arrayPaciente:any;


  constructor(
    public dialogRef: MatDialogRef<VerFichaMedicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioVistaPaciente: VistaPacienteService
    ) {
      this.datosPaciente=new VistaPaciente();
      this.obtenerDatosPaciente();
  	}

  obtenerDatosPaciente(){
    this.servicioVistaPaciente.getVistaPaciente(this.data.paciente.id).subscribe(data=>{
        this.arrayPaciente=data;
         this.datosPaciente=this.arrayPaciente.data[0];
        console.log(this.datosPaciente);
        this.paciente=this.data.paciente;
      });

  }

  onNoClick()
  {
    this.dialogRef.close();
  }


}
