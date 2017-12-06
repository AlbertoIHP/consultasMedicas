import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Comuna } from '../../../../Models/Comuna.model';

@Component({
	selector: 'app-agregarcomuna',
	templateUrl: './agregarcomuna.component.html',
	styleUrls: ['./agregarcomuna.component.css']
})
export class AgregarcomunaComponent implements OnInit{

	public nuevaComuna: Comuna;
	public totalProvincias: any;
  public servicioProvincia: any;
  public servicioComuna: any;

  ngOnInit()
  {
    this.servicioProvincia.getProvincias().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalProvincias = todo;
    });
  }

	constructor(
		public dialogRef: MatDialogRef<AgregarcomunaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		)
	{
		this.nuevaComuna = new Comuna();
		this.totalProvincias = data.provincias;
    this.servicioProvincia = data.servicioProvincia;
    this.servicioComuna = data.servicioComuna;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarComuna()
	{
		this.servicioComuna.registerComuna(this.nuevaComuna).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}

	provinciaSeleccionada(provincia)
	{
		this.nuevaComuna.Provincia_id = provincia.id;
	}

}