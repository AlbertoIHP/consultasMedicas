import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Persona } from '../../../../Models/Persona.model';
import { Usuario } from '../../../../Models/Usuario.model';
import { UserService } from '../../../../Services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
	selector: 'app-agregarpersona',
	templateUrl: './agregarpersona.component.html',
	styleUrls: ['./agregarpersona.component.css']
})

export class AgregarpersonaComponent implements OnInit{
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

	public provinciasMostrar: any[];
	public comunasMostrar: any[];

  public servicioComuna: any;
  public servicioEC: any;
  public servicioGenero: any;
  public servicioProvincia: any;
  public servicioRegion: any;
  public servicioPersona: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  public nuevoUsuario: Usuario;

	constructor(
		public dialogRef: MatDialogRef<AgregarpersonaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public servicioUsuario: UserService
		)
	{

    this.servicioRegion = this.data.servicioRegion;
    this.servicioProvincia = this.data.servicioProvincia;
    this.servicioComuna = this.data.servicioComuna;
    this.servicioGenero  = this.data.servicioGenero;
    this.servicioEC = this.data.servicioEC;
    this.servicioPersona = this.data.servicioPersona;
    this.nuevoUsuario = new Usuario();
		this.defaultValues();
	}

  ngOnInit()
  {

        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });


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


	defaultValues()
	{
		this.mostrarComunas = false;
		this.mostrarProvincias = false;
		this.mostrarRegiones = true;
		this.persona = new Persona();
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

	agregarPersona()
	{

		this.servicioPersona.registerPersona(this.persona).subscribe(data => {

      this.servicioPersona.getPersonas().subscribe(data => {
        var todo: any = data
        todo = todo.data

        var persona: any = todo.filter( persona =>  persona.rut === this.persona.rut)

        console.log(persona)

        this.nuevoUsuario.Persona_id = persona[0].id ;
        this.nuevoUsuario.Role_id = '4';
        this.nuevoUsuario.password = this.GeneratePassword();

        console.log(this.nuevoUsuario)

        this.servicioUsuario.registerUser(this.nuevoUsuario).subscribe( data => {

          console.log(data)
          this.defaultValues();

        })



      })



		});
	}

	comunaSeleccionada(comuna)
	{
		this.persona.Comuna_id = comuna.id;
	}

	ecSeleccionado(ec)
	{
		this.persona.EstadoCivil_id = ec.id;
	}

	generoSeleccionado(genero)
	{
		this.persona.Genero_id = genero.id;
	}


  GeneratePassword()
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
