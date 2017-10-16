import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

import { Region } from '../../../../Models/Region.model';
import { RegionService } from '../../../../Services/region/region.service';


export interface IContext {
		data:string;
}

@Component({
	selector: 'app-regiones',
	templateUrl: './regiones.component.html',
	styleUrls: ['./regiones.component.css']
})
export class RegionesComponent implements OnInit {
	@ViewChild('modalTemplate')
	public modalTemplate:ModalTemplate<IContext, string, string>;
	public totalRegiones: Region[];
	public nuevaRegion: Region;
	public editarRegion: Region;


	constructor (public modalService:SuiModalService, public servicioRegion: RegionService)
	{
		this.actualizarRegiones();
		this.nuevaRegion = new Region();
		this.editarRegion = new Region();
	}


	actualizarRegiones ()
	{
		this.servicioRegion.getRegions().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRegiones = todo;
		});
	}


	public open(tipo, region) {
		const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

		if(region != null)
		{
			 this.editarRegion = region;
		}


		config.context = { data: tipo };

		this.modalService
			.open(config)
			.onApprove(result => {
				if(tipo === "editarRegion")
				{
				 this.actualizarRegion();
				}
				else if(tipo === "nuevaRegion")
				{
					this.agregarRegion();
				}

			})
			.onDeny(result => { /* deny callback */});
	}

	actualizarRegion ()
	{
		this.servicioRegion.editRegion(this.editarRegion, this.editarRegion.id).subscribe(data => {
			console.log(data);
			this.actualizarRegiones();
		});
	}


	agregarRegion ()
	{
	 this.servicioRegion.registerRegion(this.nuevaRegion).subscribe(data => {
			console.log(data);
			this.actualizarRegiones();
			this.nuevaRegion = new Region();
		});

	}


	eliminarRegion (region)
	{
		this.servicioRegion.deleteRegion(region.id).subscribe( data => {
			console.log(data);
			this.actualizarRegiones();
		});
	}

	ngOnInit() {
	}

}
