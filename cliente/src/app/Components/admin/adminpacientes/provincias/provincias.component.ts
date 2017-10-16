import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';


import { Provincia } from '../../../../Models/Provincia.model';
import { ProvinciaService } from '../../../../Services/provincia/provincia.service';

import { Region } from '../../../../Models/Region.model';
import { RegionService } from '../../../../Services/region/region.service';




export interface IContext {
    data:string;
}

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>;
  public totalRegiones: Region[];
  public totalProvincias: Provincia[];
  public nuevaProvincia: Provincia;
  public editarProvincia: Provincia;

  constructor (public modalService:SuiModalService, public servicioRegion: RegionService, public servicioProvincia: ProvinciaService)
  {
    this.actualizarRegiones();
    this.actualizarProvincias();
    this.nuevaProvincia = new Provincia();
    this.editarProvincia = new Provincia();
  }


  actualizarRegiones ()
  {
    this.servicioRegion.getRegions().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRegiones = todo;
    });
  }



  actualizarProvincias ()
  {
    this.servicioProvincia.getProvincias().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalProvincias = todo;
      this.reemplazarIdPorString();
    });
  }



  public open(tipo, provincia) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    if(provincia != null)
    {
       this.editarProvincia = provincia;
    }


    config.context = { data: tipo };

    this.modalService
      .open(config)
      .onApprove(result => {
        if(tipo === "editarProvincia")
        {
         this.actualizarProvincia();
        }
        else if(tipo === "nuevaProvincia")
        {
          this.agregarProvincia();
        }

      })
      .onDeny(result => { /* deny callback */});
  }

  actualizarProvincia ()
  {
    this.pasarStringId(this.editarProvincia);
    this.servicioProvincia.editProvincia(this.editarProvincia, this.editarProvincia.id).subscribe(data => {
      console.log(data);
      this.actualizarProvincias();
    });
  }


  agregarProvincia ()
  {
   this.servicioProvincia.registerProvincia(this.nuevaProvincia).subscribe(data => {
      console.log(data);
      this.actualizarProvincias();
      this.nuevaProvincia = new Provincia();
    });

  }


  eliminarProvincia (provincia)
  {
    this.servicioProvincia.deleteProvincia(provincia.id).subscribe( data => {
      console.log(data);
      this.actualizarProvincias();
    });
  }



  regionSeleccionada (region)
  {
    this.nuevaProvincia.Region_id = region.id;
    console.log(this.nuevaProvincia);
  }

  editarRegionSeleccionada (region)
  {
    this.editarProvincia.Region_id = region.id;
  }


  reemplazarIdPorString()
  {
    for(let i = 0 ; i < this.totalProvincias.length ; i ++)
    {

      for(let j = 0 ; j < this.totalRegiones.length ; j++)
      {
        if( parseInt(this.totalProvincias[i].Region_id) === this.totalRegiones[j].id)
        {
          this.totalProvincias[i].Region_id = this.totalRegiones[j].nombre;
          break;
        }
      }

    }
  }


  pasarStringId(provincia)
  {
    for ( let i = 0 ; i < this.totalRegiones.length ; i ++)
    {
    if(provincia.Region_id === this.totalRegiones[i].nombre)
    {
      provincia.Region_id = this.totalRegiones[i].id;
    }
    }

  }

  ngOnInit() {
  }

}
