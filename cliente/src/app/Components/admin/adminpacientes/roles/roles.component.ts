import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

import { Role } from '../../../../Models/Role.model';
import { RoleService } from '../../../../Services/role/role.service';

export interface IContext {
		data:string;
}




@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
	@ViewChild('modalTemplate')
	public modalTemplate:ModalTemplate<IContext, string, string>;
	public totalRoles: Role[];
	public nuevoRole: Role;
	public editarRole: Role;


	constructor (public modalService:SuiModalService, public servicioRole: RoleService)
	{
		this.actualizarRoles();
		this.nuevoRole = new Role();
		this.editarRole = new Role();
	}



	actualizarRoles ()
	{
		this.servicioRole.getRoles().subscribe(data => {
			var todo: any = data;
			todo = todo.data;
			this.totalRoles = todo;
		});
	}


	public open(tipo, role)
  {
		const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

		if(role != null)
		{
			 this.editarRole = role;
		}


		config.context = { data: tipo };

		this.modalService
			.open(config)
			.onApprove(result => {
				if(tipo === "editarRole")
				{
				 this.actualizarRole();
				}
				else if(tipo === "nuevoRole")
				{
					this.agregarRole();
				}

			})
			.onDeny(result => { /* deny callback */});
	}

	actualizarRole ()
	{
		this.servicioRole.editRole(this.editarRole, this.editarRole.id).subscribe(data => {
			console.log(data);
			this.actualizarRoles();
		});
	}


	agregarRole ()
	{
		console.log(this.nuevoRole);
		this.servicioRole.registerRole(this.nuevoRole).subscribe(data => {
			console.log(data);
			this.actualizarRoles();
			this.nuevoRole = new Role();
		});

	}


	eliminarRole (role)
	{
		this.servicioRole.deleteRole(role.id).subscribe( data => {
			console.log(data);
			this.actualizarRoles();
		});
	}


	ngOnInit() {
	}

}
