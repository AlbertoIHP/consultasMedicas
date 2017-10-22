import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Role } from '../../../../../Models/Role.model';
import { RoleService } from '../../../../../Services/role/role.service';

@Component({
	selector: 'app-agregarroles',
	templateUrl: './agregarroles.component.html',
	styleUrls: ['./agregarroles.component.css']
})
export class AgregarrolesComponent  {
	public nuevoRole: Role;


	constructor(
		public dialogRef: MatDialogRef<AgregarrolesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRole: RoleService
		)
	{
		this.nuevoRole = new Role();
	}


	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarRole()
	{
		this.servicioRole.registerRole(this.nuevoRole).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}




}
