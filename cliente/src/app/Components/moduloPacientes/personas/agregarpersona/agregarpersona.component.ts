// Componentes generales
import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Modelos y servicios
import { Persona } from '../../../../Models/Persona.model';
import { Usuario } from '../../../../Models/Usuario.model';
import { UserService } from '../../../../Services/user/user.service';
import { EventosService } from '../../../../Services/eventos/eventos.service';

import { EspDateAdapter } from '../../../Globals/EspDateAdapter';

@Component({
	selector: 'app-agregarpersona',
	templateUrl: './agregarpersona.component.html',
	styleUrls: ['./agregarpersona.component.css'],
  providers: [
   
    {provide: LOCALE_ID,useValue: 'es-MX'},
    {provide: DateAdapter, useClass: EspDateAdapter},
   
  ],
})

export class AgregarpersonaComponent implements OnInit{
  // Se declaran los atributos
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

	public provinciasMostrar: any[];
	public comunasMostrar: any[];

  public provinciaPersona:any;
  public regionPersona:any;
  public comunaPersona:any;

  public servicioComuna: any;
  public servicioEC: any;
  public servicioGenero: any;
  public servicioProvincia: any;
  public servicioRegion: any;
  public servicioPersona: any;
  public emailValido = true;
  public rutValido = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  public nuevoUsuario: Usuario;

	constructor(
    //Se declaran los servicios y componentes a utilizar  
		public dialogRef: MatDialogRef<AgregarpersonaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public servicioUsuario: UserService,
    public dateAdapter: DateAdapter<any>,
    public servicioEvento: EventosService 
		)
	{
    // Se inicializan los atributos
    dateAdapter.setLocale('es-MX');
    this.servicioRegion = this.data.servicioRegion;
    this.servicioProvincia = this.data.servicioProvincia;
    this.servicioComuna = this.data.servicioComuna;
    this.servicioGenero  = this.data.servicioGenero;
    this.servicioEC = this.data.servicioEC;
    this.servicioPersona = this.data.servicioPersona;
    this.nuevoUsuario = new Usuario();
    this.date = new FormControl(new Date());
		this.defaultValues();
	}

  ngOnInit(){

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

   // Se inician las validaciones usando un FormGroup y se dan los parámetros
   this.firstFormGroup = new FormGroup({
          comuna: new FormControl('', [Validators.required]),
          region: new FormControl('', [Validators.required]),
          provincia: new FormControl('', [Validators.required]),
          genero: new FormControl('', [Validators.required]),
          estadocivil: new FormControl('', [Validators.required]),
          celular: new FormControl('', [Validators.required]),
          telefonotrabajo: new FormControl('', [Validators.required]),
          telefonocasa: new FormControl('', [Validators.required]),
          direccion: new FormControl('', [Validators.required]),
          nombre_uno: new FormControl('', [Validators.required]),
          nombre_dos: new FormControl('', [Validators.required]),
          apellido_uno: new FormControl('', [Validators.required]),
          apellido_dos: new FormControl('', [Validators.required]),
          rut: new FormControl('', [Validators.required])
      });

       

    this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
    });

    //Se inicializa el evento en false
    this.servicioEvento.actualizacion(false);


  }


	defaultValues(){

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

  //Cerrar el diálogo
	onNoClick(): void {

	 this.dialogRef.close();

	}

  regionSeleccionada(region){

    this.provinciasMostrar=[];
    this.comunasMostrar=[];
    this.firstFormGroup.controls['provincia'].setValue('');
    this.firstFormGroup.controls['comuna'].setValue('');
    for ( let i = 0 ; i < this.totalProvincias.length ; i ++)
    {
      if(this.totalProvincias[i].Region_id === region.id)
      {
        this.provinciasMostrar.push(this.totalProvincias[i]);
      }
    }

    this.mostrarProvincias = true;

  }

  provinciaSeleccionada(provincia) {

    this.comunasMostrar=[];
    this.firstFormGroup.controls['comuna'].setValue('');
    for ( let i = 0 ; i < this.totalComunas.length ; i ++)
    {
      if(this.totalComunas[i].Provincia_id === provincia.id)
      {
        this.comunasMostrar.push(this.totalComunas[i]);
      }
    }

    this.mostrarComunas = true;
  }

	agregarPersona() {
    //Se agrega la nueva persona al dar click en el botón
    this.persona.fechaNacimiento = new Date(this.date.value).toISOString().slice(0, 19).replace('T', ' ');
		this.servicioPersona.registerPersona(this.persona).subscribe(data => {

      //Se emite un evento para actualizar los datos
      this.servicioEvento.actualizacion(true);

      this.servicioPersona.getPersonas().subscribe(data => {
        var todo: any = data
        todo = todo.data

        var persona: any = todo.filter( persona =>  persona.rut === this.persona.rut)

        this.nuevoUsuario.Persona_id = persona[0].id ;
        this.nuevoUsuario.Role_id = '4';
        this.nuevoUsuario.password = this.GeneratePassword();

        this.servicioUsuario.registerUser(this.nuevoUsuario).subscribe( data => {
          this.defaultValues();
        
        })


          
       

      })



		});
	}

	comunaSeleccionada(comuna) {

		this.persona.Comuna_id = comuna.id;
    if(this.validator(this.persona.rut))
    {
      this.rutValido = false
    }
    else
    {
      this.rutValido = true
    }
	}

  GeneratePassword() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  validator (rutComplete) {

    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutComplete)) {
      return false
    }
    let tmp = rutComplete.split('-')
    let checkDigit = tmp[1]
    let rut = tmp[0]
    if (checkDigit === 'K' || checkDigit === 'k') {
      checkDigit = 'k'
      return (this.verifyNumber(rut) === checkDigit)
    }
    return (this.verifyNumber(rut) === parseInt(checkDigit))
  }




  verifyNumber (T) {

    let M = 0
    let S = 1
    for (; T; T = Math.floor(T / 10)) {
      S = (S + T % 10 * (9 - M++ % 6)) % 11
    }
    return S ? S - 1 : 'k'
  }


  validateEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email))

    if( re.test(email) )
    {
      this.emailValido = false
    }
    else
    {
      this.emailValido = true
    }
  }

  verificarRut() {

    console.log("Esta funcion hasta ahora no tiene ninguna utilidad, deprecada en las proximas actualizacioens")
  }

}
