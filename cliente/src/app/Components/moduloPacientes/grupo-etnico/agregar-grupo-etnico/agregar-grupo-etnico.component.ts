import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GrupoEtnico } from '../../../../Models/GrupoEtnico.model';
import { GrupoEtnicoService } from '../../../../Services/grupoetnico/grupo-etnico.service';


@Component({
  selector: 'app-agregar-grupo-etnico',
  templateUrl: './agregar-grupo-etnico.component.html',
  styleUrls: ['./agregar-grupo-etnico.component.css']
})
export class AgregarGrupoEtnicoComponent {
	
	public nuevoGrupoEtnico: GrupoEtnico;
	constructor(
		public dialogRef: MatDialogRef<AgregarGrupoEtnicoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioGrupoEtnico: GrupoEtnicoService
		)
	{
		this.nuevoGrupoEtnico = new GrupoEtnico();
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarGrupoEtnico()
	{
		this.servicioGrupoEtnico.registerGrupoEtnico(this.nuevoGrupoEtnico).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}
}

