import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';


import { Comuna } from '../../../../Models/Comuna.model';
import { ComunaService } from '../../../../Services/comuna/comuna.service';

import { Provincia } from '../../../../Models/Provincia.model';
import { ProvinciaService } from '../../../../Services/provincia/provincia.service';

export interface IContext {
    data:string;
}


@Component({
  selector: 'app-comunas',
  templateUrl: './comunas.component.html',
  styleUrls: ['./comunas.component.css']
})
export class ComunasComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>;
  public totalProvincias: Provincia[];
  public totalComunas: Comuna[];
  public nuevaComuna: Comuna;
  public editarComuna: Comuna;

  constructor (public modalService:SuiModalService, public servicioProvincia: ProvinciaService, public servicioComuna: ComunaService)
  {
    this.actualizarProvincias();
    this.actualizarComunas();

    this.nuevaComuna = new Comuna();
    this.editarComuna = new Comuna();
  }



  actualizarProvincias ()
  {
    this.servicioProvincia.getProvincias().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalProvincias = todo;
    });
  }

  actualizarComunas ()
  {
    this.servicioComuna.getComunas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalComunas = todo;
      this.reemplazarIdPorString();
    });
  }

  public open(tipo, comuna) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    if(comuna != null)
    {
       this.editarComuna = comuna;
    }


    config.context = { data: tipo };

    this.modalService
      .open(config)
      .onApprove(result => {
        if(tipo === "editarComuna")
        {
         this.actualizarComuna();
        }
        else if(tipo === "nuevaComuna")
        {
          this.agregarComuna();
        }

      })
      .onDeny(result => { /* deny callback */});
  }


  actualizarComuna ()
  {
    this.pasarStringId(this.editarComuna);

    this.servicioComuna.editComuna(this.editarComuna, parseInt(this.editarComuna.id)).subscribe(data => {
      console.log(data);
      this.actualizarComunas();
    });
  }


  agregarComuna ()
  {
   this.servicioComuna.registerComuna(this.nuevaComuna).subscribe(data => {
      console.log(data);
      this.actualizarComunas();
      this.nuevaComuna = new Comuna();
    });

  }


  eliminarComuna (comuna)
  {
    this.servicioComuna.deleteComuna(comuna.id).subscribe( data => {
      console.log(data);
      this.actualizarComunas();
    });
  }


  provinciaSeleccionada (provincia)
  {
    this.nuevaComuna.Provincia_id = provincia.id;
    console.log(this.nuevaComuna);
  }

  editarProvinciaSeleccionada (provincia)
  {
    this.editarComuna.Provincia_id = provincia.id;
  }


  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalComunas.length ; i ++)
    {

      for(let j = 0 ; j < this.totalProvincias.length ; j++)
      {
        if( parseInt(this.totalComunas[i].Provincia_id) === this.totalProvincias[j].id)
        {
          this.totalComunas[i].Provincia_id = this.totalProvincias[j].nombre;
          break;
        }
      }

    }
  }

  pasarStringId(comuna)
  {
    for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
    {
    if(comuna.Provincia_id === this.totalProvincias[i].nombre)
    {
      comuna.Provincia_id = this.totalProvincias[i].id;
    }
    }

  }


  ngOnInit() {
  }

}
