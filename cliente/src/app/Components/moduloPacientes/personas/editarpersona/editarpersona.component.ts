
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Persona } from '../../../../Models/Persona.model';
import { Provincia } from '../../../../Models/Provincia.model';
import { Comuna } from '../../../../Models/Comuna.model';
import { PersonaService } from '../../../../Services/persona/persona.service';
@Component({
	selector: 'app-editarpersona',
	templateUrl: './editarpersona.component.html',
	styleUrls: ['./editarpersona.component.css']
})
export class EditarpersonaComponent implements OnInit{
	public persona: any;
	public totalPersonas: any[];
	public totalRegiones: any[];
	public totalProvincias: any[];
	public totalComunas: any[];
	public totalGeneros: any[];
	public totalEstadoCiviles: any[];

	public provinciaActual: string;
	public regionActual: string;
	public mostrarRegiones: boolean;
	public mostrarProvincias: boolean;
	public mostrarComunas: boolean;

	public provinciasMostrar: Provincia[];
	public comunasMostrar: Comuna[];

  public servicioComuna: any;
  public servicioEC: any;
  public servicioGenero: any;
  public servicioProvincia: any;
  public servicioRegion: any;

  ngOnInit()
  {

      this.servicioGenero.getGeneros().subscribe(data => {
          var todo: any;
          todo = data;
          todo = todo.data;
          this.totalGeneros = todo;
        });

      this.servicioEC.getEstadoCivils().subscribe( data => {
        var todo: any;
        todo = data;
        todo = todo.data;
        this.totalEstadoCiviles = todo;



      });

      this.servicioRegion.getRegions().subscribe( data => {
      var todo: any;
      todo = data;
      todo = todo.data;
      this.totalRegiones = todo;
      });


     this.servicioComuna.getComunas().subscribe( data => {
      var todo: any;
      todo = data;
      todo = todo.data;
      this.totalComunas = todo;


    });

     this.servicioProvincia.getProvincias().subscribe( data => {
      var todo: any;
      todo = data;
      todo = todo.data;
      this.totalProvincias = todo;


    });


  }

	constructor(
		public dialogRef: MatDialogRef<EditarpersonaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioPersona: PersonaService
		)
	{
		this.defaultValues();
	}

	defaultValues()
	{

    this.servicioRegion = this.data.servicioRegion;
    this.servicioProvincia = this.data.servicioProvincia;
    this.servicioComuna = this.data.servicioComuna;
    this.servicioGenero  = this.data.servicioGenero;
    this.servicioEC = this.data.servicioEC;
		this.mostrarComunas = false;
		this.mostrarProvincias = false;
		this.mostrarRegiones = true;
		this.persona = this.data.persona;
		this.totalRegiones = this.data.regiones;
		this.totalProvincias = this.data.provincias;
		this.totalComunas = this.data.comunas;
		this.totalEstadoCiviles = this.data.ec;
		this.totalGeneros = this.data.generos;
		this.provinciasMostrar = [];
		this.comunasMostrar = [];
	}

	onNoClick(): void
	{
	 this.dialogRef.close();
	}

	regionSeleccionada(region)
	{
		for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
		{
			if(this.totalProvincias[i].Region_id === region.id)
			{
				this.provinciasMostrar.push(this.totalProvincias[i]);
			}
		}

		this.mostrarRegiones = false;
		this.mostrarProvincias = true;
	}

	provinciaSeleccionada(provincia)
	{
		for ( let i = 0 ; i < this.totalComunas.length ; i ++)
		{
			if(this.totalComunas[i].Provincia_id === provincia.id)
			{
				this.comunasMostrar.push(this.totalComunas[i]);
			}
		}

		this.mostrarProvincias = false;
		this.mostrarComunas = true;
	}

	actualizarPersona()
	{
		console.log(this.persona);
		this.servicioPersona.editPersona(this.persona, this.persona.id).subscribe(data => {
			this.defaultValues();
			this.onNoClick();
		});
	}

	comunaSeleccionada(comuna)
	{
		this.persona.Comuna_id = comuna.id;
	}

}
