import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Comuna } from '../../../../Models/Comuna.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
	selector: 'app-editarcomuna',
	templateUrl: './editarcomuna.component.html',
	styleUrls: ['./editarcomuna.component.css']
})
export class EditarcomunaComponent implements OnInit{

	editarForm: FormGroup;
	public comuna: Comuna;
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

    this.editarForm = new FormGroup({
        nombre: new FormControl(this.comuna.nombre, [Validators.required]),
        provincia: new FormControl(this.comuna.Provincia_id, [Validators.required]),
     
    });
  }

	constructor(
		public dialogRef: MatDialogRef<EditarcomunaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
		) {
		this.comuna = data.comuna;
		this.totalProvincias = data.provincias;
    this.servicioProvincia = data.servicioProvincia;
    this.servicioComuna = data.servicioComuna;
		 }

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarComuna()
	{
		this.servicioComuna.editComuna(this.comuna, this.comuna.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}
}
