import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProvinciaService } from '../../../../Services/provincia/provincia.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-editarprovincia',
	templateUrl: './editarprovincia.component.html',
	styleUrls: ['./editarprovincia.component.css']
})
export class EditarprovinciaComponent implements OnInit {

	editarForm: FormGroup;
	public provincia: any;
	public totalRegiones: any;
  	public servicioRegion: any;

  ngOnInit()
  {
    this.servicioRegion.getRegions().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRegiones = todo;
    });

    this.editarForm = new FormGroup({
        nombre: new FormControl(this.provincia.nombre, [Validators.required]),
        region: new FormControl(this.provincia.Region_id, [Validators.required]),
     
    });
  }

	constructor(
		public dialogRef: MatDialogRef<EditarprovinciaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioProvincia: ProvinciaService
		)
	{
		this.provincia = data.provincia;
		this.totalRegiones = data.regiones;
    this.servicioRegion = data.servicioRegion;
	}

	onNoClick()
	{
		this.dialogRef.close();
	}

	editarProvincia()
	{
		this.servicioProvincia.editProvincia(this.provincia, this.provincia.id).subscribe( data => {
			console.log(data);
			this.dialogRef.close();

		});
	}

}
