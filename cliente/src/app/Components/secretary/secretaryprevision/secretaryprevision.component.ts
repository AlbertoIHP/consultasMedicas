import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Prevision }  from '../../../Models/Prevision.model';
import { PrevisionService } from '../../../Services/prevision/prevision.service';

import { PrevisionActual }  from '../../../Models/PrevisionActual.model';
import { PrevisionactualService } from '../../../Services/previsionactual/previsionactual.service';

import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import {IMessage} from "ng2-semantic-ui";


export interface IContext {
    data:string;
}


@Component({
  selector: 'app-secretaryprevision',
  templateUrl: './secretaryprevision.component.html',
  styleUrls: ['./secretaryprevision.component.css']
})
export class SecretaryprevisionComponent implements OnInit {

  @ViewChild('modalTemplate', 'mensaje')
  public modalTemplate:ModalTemplate<IContext, string, string>
  public mensaje: IMessage;


  public totalPrevision: Prevision[];
  public totalPrevisionActual: PrevisionActual[];
  public pacienteActual: Persona;
  public previsionActual: PrevisionActual;
  public nuevaPrevisionActual: PrevisionActual;
  public previsionSeleccionada: any;
  public descripcionSeleccionada: any;
  public mostrarMensaje: boolean;

  constructor(
    public servicioPrevision: PrevisionService,
    public servicioPrevisionActual: PrevisionactualService,
    public servicioPersona: PersonaService,
    public router: Router,
    public modalService:SuiModalService
    )
  {
    this.totalPrevision = [];
    this.totalPrevisionActual = [];
    this.previsionActual = new PrevisionActual();
    this.nuevaPrevisionActual = new PrevisionActual();
    this.mostrarMensaje = false;



  }



  seleccionPrevision(prevision)
  {
    this.descripcionSeleccionada = prevision.descripcion;
    this.nuevaPrevisionActual.Prevision_id = prevision.id;

  }

  cambiarPrevision()
  {
    if(this.totalPrevisionActual.length>=1)
    {
      this.previsionActual.activado = 0;
      for(let j = 0 ; j < this.totalPrevision.length ; j++)
      {
        if(this.previsionActual.Prevision_id === this.totalPrevision[j].nombre)
        {
          this.previsionActual.Prevision_id = this.totalPrevision[j].id;
        }
      }

      this.servicioPrevisionActual.editPrevisionActual(this.previsionActual, this.previsionActual.id).subscribe( data => {

        this.servicioPrevisionActual.registerPrevisionActual(this.nuevaPrevisionActual).subscribe( data  => {
          this.actualizarPrevisionActual();
          this.previsionActual = new PrevisionActual();
        });


      });
    }
    else
    {
        this.servicioPrevisionActual.registerPrevisionActual(this.nuevaPrevisionActual).subscribe( data  => {
          this.previsionActual = this.nuevaPrevisionActual;
          this.previsionActual = new PrevisionActual();
          this.actualizarPrevisionActual();
        });
    }


  }

  public open() {
      const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

      this.modalService
          .open(config)
          .onApprove(result => {
            this.cambiarPrevision();
          })
          .onDeny(result => { /* deny callback */});
  }

  actualizarPrevision ()
  {
    this.totalPrevision = [];
    this.servicioPrevision.getPrevisions().subscribe(data => {
      var todo: any = data;
      todo = todo.data;

      this.totalPrevision = todo;
    });
  }

  actualizarPrevisionActual ()
  {
    this.totalPrevisionActual = [];
    this.servicioPrevisionActual.getPrevisionActuals().subscribe(data => {
      var todo: any = data;
      todo = todo.data;

    for ( let i = 0 ; i < todo.length ; i ++)
    {
      if ( todo[i].Persona_id === this.pacienteActual.id )
      {
        this.totalPrevisionActual.push(todo[i]);
      }
    }

    if (this.totalPrevisionActual.length >= 1)
    {
     this.identificarPrevisionActiva();

    }
    else
    {
      this.mostrarMensaje = true;
    }


    });
  }


  identificarPrevisionActiva()
  {
    for ( let i = 0 ; i < this.totalPrevisionActual.length ; i++)
    {
      if (this.totalPrevisionActual[i].activado === 1)
      {
        this.previsionActual = this.totalPrevisionActual[i];
        break;

      }
    }

    this.cambiarIdPorString();
  }

  ngOnInit() {
    if(localStorage.getItem('currentPacient'))
    {

        this.pacienteActual = JSON.parse(localStorage.getItem('currentPacient'));
        this.nuevaPrevisionActual.Persona_id = this.pacienteActual.id;
        this.actualizarPrevision();
        this.actualizarPrevisionActual();
    }
    else
    {
      this.router.navigate(['secretary/pacientes']);
    }
  }


  cambiarIdPorString ()
  {
    for(let x = 0 ; x < this.totalPrevisionActual.length ; x ++)
    {
      for( let j = 0 ; j < this.totalPrevision.length ; j ++)
      {
        if(this.totalPrevisionActual[x].Prevision_id === this.totalPrevision[j].id)
        {
          this.totalPrevisionActual[x].Prevision_id = this.totalPrevision[j].nombre;
        }
      }

    }
  }

}
