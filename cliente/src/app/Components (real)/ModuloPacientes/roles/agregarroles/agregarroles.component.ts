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
  public isWrite: boolean = false;
  public isRead: boolean = false;
  public isEdit: boolean = false;
  public isDelete: boolean = false;


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
    if(this.isEdit)
    {
      this.nuevoRole.edit = 1;
    }

    if(this.isWrite)
    {
      this.nuevoRole.write = 1;
    }

    if(this.isRead)
    {
      this.nuevoRole.view = 1;
    }

    if(this.isDelete)
    {
      this.nuevoRole.erase = 1;
    }

    console.log(this.nuevoRole);

		this.servicioRole.registerRole(this.nuevoRole).subscribe(data => {
			this.dialogRef.close();
		});
	}


cambiarEscritura()
{
  this.isWrite = !this.isWrite;
  console.log(this.isWrite);
}


cambiarLectura()
{
  this.isEdit = !this.isEdit;
}


cambiarEdicion()
{
  this.isRead = !this.isRead;
}


cambiarBorrado()
{
  this.isDelete = !this.isDelete;
}



}
