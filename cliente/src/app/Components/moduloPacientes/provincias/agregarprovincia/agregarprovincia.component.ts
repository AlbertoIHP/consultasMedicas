import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Provincia } from '../../../../Models/Provincia.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-agregarprovincia',
	templateUrl: './agregarprovincia.component.html',
	styleUrls: ['./agregarprovincia.component.css']
})
export class AgregarprovinciaComponent implements OnInit{

	agregarForm: FormGroup;
	public nuevaProvincia: any;
	public totalRegiones: any;
	public servicioRegion: any;
	public servicioProvincia: any;

  ngOnInit()
  {
    this.servicioRegion.getRegions().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRegiones = todo;
    });

    this.agregarForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        region: new FormControl('', [Validators.required]),
     
    });
  }

	constructor(
		public dialogRef: MatDialogRef<AgregarprovinciaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		)
	{
		this.nuevaProvincia = new Provincia();
		this.totalRegiones = data.regiones;
    this.servicioRegion = data.servicioRegion;
    this.servicioProvincia = data.servicioProvincia;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarProvincia()
	{
		this.servicioProvincia.registerProvincia(this.nuevaProvincia).subscribe(data => {
			console.log(data);
			this.dialogRef.close();
		});
	}

}
