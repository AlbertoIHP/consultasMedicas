import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
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
    public servicioRole: RoleService
    )
  {
    this.nuevoUsuario = new Usuario();
    this.nuevaPersona = new Persona();
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

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
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

      console.log(this.nuevaPersona)
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
    if( this.nuevaPersona.rut != '' && this.nuevaPersona.nombre1 != '' && this.nuevaPersona.nombre2 != '' && this.nuevaPersona.apellido1 != '' && this.nuevaPersona.apellido2 != '' && this.nuevaPersona.fono_casa != '' && this.nuevaPersona.fono_trabajo != '' && this.nuevaPersona.movil )
    {
      this.puedeSeguir = false
    }
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


      for( let i = 0 ; i < this.totalPersonas.length ; i ++)
      {
        if(this.totalPersonas[i].rut === this.nuevaPersona.rut)
        {

          this.nuevaPersona.id = this.totalPersonas[i].id
          this.nuevaPersona.nombre1 = this.totalPersonas[i].nombre1
          this.nuevaPersona.nombre2 = this.totalPersonas[i].nombre2
          this.nuevaPersona.apellido1 = this.totalPersonas[i].apellido1
          this.nuevaPersona.apellido2 = this.totalPersonas[i].apellido2
          this.nuevaPersona.fono_casa = this.totalPersonas[i].fono_casa
          this.nuevaPersona.fono_trabajo = this.totalPersonas[i].fono_trabajo
          this.nuevaPersona.movil = this.totalPersonas[i].movil
          this.nuevaPersona.Genero_id = this.totalPersonas[i].Genero_id
          this.nuevaPersona.EstadoCivil_id = this.totalPersonas[i].EstadoCivil_id
          this.nuevaPersona.Comuna_id = this.totalPersonas[i].Comuna_id
          this.puedeSeguir = false
          this.seEncontro = true
          this.nuevoUsuario.Persona_id = this.nuevaPersona.id.toString();
          this.nuevoUsuario.Role_id = '1'
          console.log(this.nuevaPersona)
          console.log(this.nuevoUsuario)
          break
        }
        else
        {
          this.puedeSeguir = true
          this.seEncontro = false
          var rut = this.nuevaPersona.rut
          this.nuevaPersona = new Persona()
          this.nuevaPersona.rut = rut
          this.nuevoUsuario = new Usuario()

          console.log(this.nuevaPersona)
          console.log(this.nuevoUsuario)
        }
      }


    }

  }

}
