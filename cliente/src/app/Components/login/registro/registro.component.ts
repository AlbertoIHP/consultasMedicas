import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { Usuario } from '../../../Models/Usuario.model';
import { UserService } from '../../../Services/user/user.service';

import { RoleService } from '../../../Services/role/role.service';

import { EventosService } from '../../../Services/eventos/eventos.service';
import { Router } from '@angular/router';

import { Persona } from '../../../Models/Persona.model';
import { PersonaService } from '../../../Services/persona/persona.service';

import { Genero } from '../../../Models/Genero.model';
import { GeneroService } from '../../../Services/genero/genero.service';

import { EstadoCivil } from '../../../Models/EstadoCivil.model';
import { EstadocivilService } from '../../../Services/estadocivil/estadocivil.service';

import { Region } from '../../../Models/Region.model';
import { RegionService } from '../../../Services/region/region.service';

import { Provincia } from '../../../Models/Provincia.model';
import { ProvinciaService } from '../../../Services/provincia/provincia.service';

import { Comuna } from '../../../Models/Comuna.model';
import { ComunaService } from '../../../Services/comuna/comuna.service';

import { EspDateAdapter } from '../../Globals/EspDateAdapter';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [
   
    {provide: LOCALE_ID,useValue: 'es-MX'},
    {provide: DateAdapter, useClass: EspDateAdapter},
   
  ],
})
export class RegistroComponent implements OnInit {
  hide = true;
  public date;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public nuevaPersona: Persona;
  public nuevoUsuario: Usuario;

  public totalPacientes: Persona[];
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
  public puedeSeguir = true
  public seEncontro = false

  public emailValido = true


  constructor(
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public servicioPersona: PersonaService,
    public servicioRegion: RegionService,
    public servicioProvincia: ProvinciaService,
    public servicioComuna: ComunaService,
    public servicioGenero: GeneroService,
    public servicioEstadoCivil: EstadocivilService,
    public router: Router,
    public servicioEventos: EventosService,
    public servicioUsuario: UserService,
    public servicioRole: RoleService,
    public dateAdapter: DateAdapter<any>, 
    )
  {
    dateAdapter.setLocale('es-MX');

    this.nuevoUsuario = new Usuario();
    this.nuevaPersona = new Persona();
    this.date = new FormControl(new Date());

    this.actualizarRegiones();

    this.actualizarProvincias();

    this.actualizarComunas();

    this.actualizarGeneros();

    this.actualizarEstadoCiviles();

    this.actualizarPersonas();

    this.defaultValues();
  }



  actualizarRegiones()
  {
    this.servicioRegion.getRegions().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRegiones = todo;
    });
  }

  actualizarProvincias()
  {
    this.servicioProvincia.getProvincias().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalProvincias = todo;
    });

  }

  actualizarComunas()
  {
    this.servicioComuna.getComunas().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalComunas = todo;
    });
  }

  actualizarGeneros()
  {
    this.servicioGenero.getGeneros().subscribe(data =>{
      var todo: any = data;
      todo = todo.data;
      this.totalGeneros = todo;
    });
  }

  actualizarEstadoCiviles()
  {
    this.servicioEstadoCivil.getEstadoCivils().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalEstadoCiviles = todo;
    });
  }

    actualizarPersonas()
  {
    this.servicioPersona.getPersonas().subscribe( data => {
      var todo: any = data;
      todo = todo.data;
      this.totalPersonas = todo;

    });
  }



  ngOnInit() {

    
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

  }



  onNoClick(): void
  {
   this.dialogRef.close();
  }

   regionSeleccionada(region)
  {
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

  provinciaSeleccionada(provincia)
  {
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

  defaultValues()
  {
    this.mostrarComunas = false;
    this.mostrarProvincias = false;
    this.mostrarRegiones = true;
    this.nuevaPersona = new Persona();
    this.nuevoUsuario = new Usuario();
    this.provinciasMostrar = [];
    this.comunasMostrar = [];
  }

  agregarPersona()
  {

    if( !this.seEncontro )
    {

      this.nuevaPersona.fechaNacimiento = new Date(this.date.value).toISOString().slice(0, 19).replace('T', ' ');      console.log(this.nuevaPersona)

      this.servicioPersona.registerPersona(this.nuevaPersona).subscribe(data => {


        this.servicioPersona.getPersonas().subscribe(data => {

          var todo: any = data
          todo = todo.data

          for( let j = 0 ; j < todo.length ; j ++ )
          {
            if( todo[j].rut === this.nuevaPersona.rut )
            {
              this.nuevoUsuario.Persona_id = todo[j].id.toString()
              this.nuevoUsuario.Role_id = '1'
              break
            }
          }

          console.log(this.nuevoUsuario)

          this.servicioUsuario.registerUser(this.nuevoUsuario).subscribe( data => {
            this.defaultValues()
          })



        })


      });

    }

    else

    {

      console.log(this.nuevoUsuario)

      this.servicioUsuario.registerUser(this.nuevoUsuario).subscribe( data => {
            this.defaultValues()
          })

    }



  }

  comunaSeleccionada(comuna)
  {
    this.nuevaPersona.Comuna_id = comuna.id;
 
  }

  ecSeleccionado(ec)
  {
    this.nuevaPersona.EstadoCivil_id = ec.id;
  }

  generoSeleccionado(genero)
  {
    this.nuevaPersona.Genero_id = genero.id;
  }




  buscarRut()
  {
    if( this.nuevaPersona.rut != '' )
    {

       if(this.validator(this.nuevaPersona.rut))
        {
          this.puedeSeguir = false
        }
        else
        {
          this.puedeSeguir = true
        }
        
      for( let i = 0 ; i < this.totalPersonas.length ; i ++)
      {
        if(this.totalPersonas[i].rut === this.nuevaPersona.rut)
        {
          alert("¡Usted ya esta registrado!")
          this.defaultValues()
          this.onNoClick()
          break
        }
      }
    }
  }



validator (rutComplete)
{
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


  verifyNumber (T)
  {
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

    if( re.test(email) && this.nuevoUsuario.password != '')
    {
      this.emailValido = false
    }
    else
    {
      this.emailValido = true
    }
  }



}
