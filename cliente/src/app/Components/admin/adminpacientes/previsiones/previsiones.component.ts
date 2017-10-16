import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { Prevision } from '../../../../Models/Prevision.model';
import { PrevisionService } from '../../../../Services/prevision/prevision.service';
export interface IContext {
    data:string;
}

@Component({
  selector: 'app-previsiones',
  templateUrl: './previsiones.component.html',
  styleUrls: ['./previsiones.component.css']
})
export class PrevisionesComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>;
  public totalPrevisiones: Prevision[];
  public nuevaPrevision: Prevision;
  public editarPrevision: Prevision;


  constructor (public modalService:SuiModalService, public servicioPrevisiones: PrevisionService)
  {
    this.actualizarPrevisiones();
    this.nuevaPrevision = new Prevision();
    this.editarPrevision = new Prevision();
  }

  actualizarPrevisiones ()
  {
    this.servicioPrevisiones.getPrevisions().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalPrevisiones = todo;
    });
  }

  public open(tipo, prevision) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    if(prevision != null)
    {
       this.editarPrevision = prevision;
    }


    config.context = { data: tipo };

    this.modalService
      .open(config)
      .onApprove(result => {
        if(tipo === "editarPrevision")
        {
         this.actualizarPrevision();
        }
        else if(tipo === "nuevaPrevision")
        {
          this.agregarPrevision();
        }

      })
      .onDeny(result => { /* deny callback */});
  }

  actualizarPrevision ()
  {
    this.servicioPrevisiones.editPrevision(this.editarPrevision, parseInt(this.editarPrevision.id)).subscribe(data => {
      console.log(data);
      this.actualizarPrevisiones();
    });
  }


  agregarPrevision ()
  {
   this.servicioPrevisiones.registerPrevision(this.nuevaPrevision).subscribe(data => {
      console.log(data);
      this.actualizarPrevisiones();
      this.nuevaPrevision = new Prevision();
    });

  }


  eliminarPrevision (prevision)
  {
    this.servicioPrevisiones.deletePrevision(prevision.id).subscribe( data => {
      console.log(data);
      this.actualizarPrevisiones();
    });
  }



  ngOnInit() {
  }

}
