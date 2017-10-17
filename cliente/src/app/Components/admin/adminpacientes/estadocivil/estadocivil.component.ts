import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { EstadoCivil } from '../../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../../Services/estadocivil/estadocivil.service';

export interface IContext {
		data:string;
}


@Component({
	selector: 'app-estadocivil',
	templateUrl: './estadocivil.component.html',
	styleUrls: ['./estadocivil.component.css']
})

export class EstadocivilComponent implements OnInit {
	@ViewChild('modalTemplate')
	public modalTemplate:ModalTemplate<IContext, string, string>;
	public totalEstadoCiviles: EstadoCivil[];
	public nuevoEC: EstadoCivil;
	public editarEC: EstadoCivil;


	constructor (public modalService:SuiModalService, public servicioEstadoCivil: EstadocivilService)
	{
		this.actualizarEstadoCiviles();
		this.nuevoEC = new EstadoCivil();
		this.editarEC = new EstadoCivil();
	}

	ngOnInit() {
	}

	actualizarEstadoCiviles ()
	{
		this.servicioEstadoCivil.getEstadoCivils().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalEstadoCiviles = todo;
		});
	}

	eliminarEstadoCivil (ec)
	{
		this.servicioEstadoCivil.deleteEstadoCivil(ec.id).subscribe( data => {
			console.log(data);
			this.actualizarEstadoCiviles();
		});
	}


	actualizarEC ()
	{
		this.servicioEstadoCivil.editEstadoCivil(this.editarEC, this.editarEC.id).subscribe(data => {
			console.log(data);
			this.actualizarEstadoCiviles();
		});
	}

	agregarEC ()
	{
		this.servicioEstadoCivil.registerEstadoCivil(this.nuevoEC).subscribe(data => {
			console.log(data);
			this.actualizarEstadoCiviles();
			this.nuevoEC = new EstadoCivil();
		});
	}

	public open(tipo, ec) {
		const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

		if(ec != null)
		{
			 this.editarEC = ec;
		}


		config.context = { data: tipo };

		this.modalService
			.open(config)
			.onApprove(result => {
				if(tipo === "editarEC")
				{
				 this.actualizarEC();
				}
				else if(tipo === "nuevoEC")
				{
					this.agregarEC()
				}

			})
			.onDeny(result => { /* deny callback */});
	}


}
