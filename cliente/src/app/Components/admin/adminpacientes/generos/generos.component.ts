import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { Genero } from '../../../../Models/Genero.model';
import { GeneroService } from '../../../../Services/genero/genero.service';
export interface IContext {
    data:string;
}


@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>;
  public totalGeneros: Genero[];
  public nuevoGenero: Genero;
  public editarGenero: Genero;


  constructor (public modalService:SuiModalService, public servicioGenero: GeneroService)
  {
    this.actualizarGeneros();
    this.nuevoGenero = new Genero();
    this.editarGenero = new Genero();
  }

  actualizarGeneros ()
  {
    this.servicioGenero.getGeneros().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalGeneros = todo;
    });
  }

  public open(tipo, genero) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    if(genero != null)
    {
       this.editarGenero = genero;
    }


    config.context = { data: tipo };

    this.modalService
      .open(config)
      .onApprove(result => {
        if(tipo === "editarGenero")
        {
         this.actualizarGenero();
        }
        else if(tipo === "nuevoGenero")
        {
          this.agregarGenero();
        }

      })
      .onDeny(result => { /* deny callback */});
  }

  actualizarGenero ()
  {
    this.servicioGenero.editGenero(this.editarGenero, parseInt(this.editarGenero.id)).subscribe(data => {
      console.log(data);
      this.actualizarGeneros();
    });
  }

  agregarGenero ()
  {
   this.servicioGenero.registerGenero(this.nuevoGenero).subscribe(data => {
      console.log(data);
      this.actualizarGeneros();
      this.nuevoGenero = new Genero();
    });
  }


  eliminarGenero (genero)
  {
    this.servicioGenero.deleteGenero(genero.id).subscribe( data => {
      console.log(data);
      this.actualizarGeneros();
    });
  }

  ngOnInit() {
  }

}
