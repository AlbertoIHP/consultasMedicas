import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vacuna } from '../../../../Models/Vacuna.model';


@Component({
  selector: 'app-agregar-vacuna',
  templateUrl: './agregar-vacuna.component.html',
  styleUrls: ['./agregar-vacuna.component.css']
})
export class AgregarVacunaComponent {
  public nuevaVacuna: Vacuna;
  public servicioVacuna: any;

  constructor(
  	public dialogRef: MatDialogRef<AgregarVacunaComponent>,
	@Inject(MAT_DIALOG_DATA) public data: any
  	) { 

  	this.nuevaVacuna=new Vacuna();
  	this.servicioVacuna = data.servicioVacuna;
  }

    onNoClick()
	{
		this.dialogRef.close();
	}

	agregarVacuna()
	{
		this.servicioVacuna.registerVacuna(this.nuevaVacuna).subscribe(data => {
			this.dialogRef.close();
		});
	}

  ngOnInit() {
  }

}
