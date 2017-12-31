
import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { Persona } from '../../../../Models/Persona.model';
import { Provincia } from '../../../../Models/Provincia.model';
import { Comuna } from '../../../../Models/Comuna.model';
import { PersonaService } from '../../../../Services/persona/persona.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EspDateAdapter } from '../../../Globals/EspDateAdapter';


@Component({
	selector: 'app-editarpersona',
	templateUrl: './editarpersona.component.html',
	styleUrls: ['./editarpersona.component.css'],
	providers:[
		{provide: LOCALE_ID,useValue: 'es-MX'},
    	{provide: DateAdapter, useClass: EspDateAdapter},	
	],
})
export class EditarpersonaComponent implements OnInit{
	editarForm: FormGroup;
	public date;
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

	public provinciaPersona:any;
	public regionPersona:any;
	public comunaPersona:any;

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

      this.editarForm = new FormGroup({
      // tslint:disable-next-line
      rut: new FormControl(this.persona.rut, [Validators.required]),
      primerNombre: new FormControl(this.persona.nombre1, [Validators.required]),
      segundoNombre: new FormControl(this.persona.nombre2, [Validators.required]),
      primerApellido: new FormControl(this.persona.apellido1, [Validators.required]),
      segundoApellido: new FormControl(this.persona.apellido2, [Validators.required]),
      fonoCasa: new FormControl(this.persona.fono_casa, [Validators.required]),
      fonoTrabajo: new FormControl(this.persona.fono_trabajo, [Validators.required]),
      fonoMovil: new FormControl(this.persona.movil, [Validators.required]),
      direccion: new FormControl(this.persona.direccion, [Validators.required]),
      genero: new FormControl(this.persona.Genero_id, [Validators.required]),
      estadoCivil: new FormControl(this.persona.EstadoCivil_id, [Validators.required]),
      comuna: new FormControl(this.comunaPersona.id, [Validators.required]),
      region: new FormControl(this.regionPersona.id, [Validators.required]),
      provincia: new FormControl(this.provinciaPersona.id, [Validators.required])
     
    });

      this.regionSeleccionadaInicial(this.regionPersona);
      this.provinciaSeleccionadaInicial(this.provinciaPersona);
      this.comunaSeleccionada(this.comunaPersona);

	   
  }

	constructor(
		public dialogRef: MatDialogRef<EditarpersonaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioPersona: PersonaService,
		public dateAdapter: DateAdapter<any>,
		)
	{
		dateAdapter.setLocale('es-MX');

		this.defaultValues();

		this.date = new FormControl(new Date(this.persona.fechaNacimiento));

		this.obtenerUbicacionPersona();

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

	obtenerUbicacionPersona(){
		var currentComuna=this.totalComunas.filter( comuna => comuna.id === this.persona.Comuna_id);
		this.comunaPersona=currentComuna[0];
		
		var currentProvincia=this.totalProvincias.filter( provincia => provincia.id === this.comunaPersona.Provincia_id);
		this.provinciaPersona=currentProvincia[0];
		
		var currentRegion=this.totalRegiones.filter( region => region.id === this.provinciaPersona.Region_id);
		this.regionPersona=currentRegion[0];

	


	}
	regionSeleccionada(region)
	{
		this.provinciasMostrar=[];
		this.comunasMostrar=[];
		this.editarForm.controls['provincia'].setValue('');
		this.editarForm.controls['comuna'].setValue('');
		for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
		{
			if(this.totalProvincias[i].Region_id === region.id)
			{
				this.provinciasMostrar.push(this.totalProvincias[i]);
			}
		}

		this.mostrarProvincias = true;

	}

	provinciaSeleccionada(provincia)
	{
		this.comunasMostrar=[];
		this.editarForm.controls['comuna'].setValue('');
		for ( let i = 0 ; i < this.totalComunas.length ; i ++)
		{
			if(this.totalComunas[i].Provincia_id === provincia.id)
			{
				this.comunasMostrar.push(this.totalComunas[i]);
			}
		}

		this.mostrarComunas = true;
	}
	regionSeleccionadaInicial(region)
	{
		this.provinciasMostrar=[];
		this.comunasMostrar=[];

		for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
		{
			if(this.totalProvincias[i].Region_id === region.id)
			{
				this.provinciasMostrar.push(this.totalProvincias[i]);
			}
		}

		this.mostrarProvincias = true;

	}

	provinciaSeleccionadaInicial(provincia)
	{
		this.comunasMostrar=[];

		for ( let i = 0 ; i < this.totalComunas.length ; i ++)
		{
			if(this.totalComunas[i].Provincia_id === provincia.id)
			{
				this.comunasMostrar.push(this.totalComunas[i]);
			}
		}

		this.mostrarComunas = true;
	}

	actualizarPersona()
	{
		console.log(this.persona);
		this.persona.fechaNacimiento = new Date(this.date.value).toISOString().slice(0, 19).replace('T', ' ');
		
		this.servicioPersona.editPersona(this.persona, this.persona.id).subscribe(data => {
			this.onNoClick();
		});
	}

	nuevaProvincia(){
		this.mostrarProvincias=true;
	}

	comunaSeleccionada(comuna)
	{
		this.persona.Comuna_id = comuna.id;
	}

}
