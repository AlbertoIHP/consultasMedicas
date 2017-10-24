import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Role } from '../../../../../Models/Role.model';
import { RoleService } from '../../../../../Services/role/role.service';

@Component({
	selector: 'app-editarroles',
	templateUrl: './editarroles.component.html',
	styleUrls: ['./editarroles.component.css']
})
export class EditarrolesComponent{
	public role: Role;

	constructor(
		public dialogRef: MatDialogRef<EditarrolesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRole: RoleService
		) { this.role = data.role }

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarRole()
	{
		this.servicioRole.editRole(this.role, this.role.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
