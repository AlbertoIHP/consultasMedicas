import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { AuthenticationService } from '../../Services/authentication/authentication.service'


import { EventosService } from '../../Services/eventos/eventos.service'

import { RegistroComponent } from './registro/registro.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ElementRef, ViewChild, Inject } from '@angular/core';

import { PermisoModuloService } from '../../Services/permisomodulo/permisomodulo.service'

import { ModuloService } from '../../Services/modulo/modulo.service'

import { UserService } from '../../Services/user/user.service'

import { RoleService } from '../../Services/role/role.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: string
  public password: string
  public isLoginable: boolean
  public totalModulos: any
  public totalPM: any
  public roleId: any

  constructor(
    public dialog: MatDialog,
    public eventService: EventosService,
    private router: Router,
    public authService: AuthenticationService,
    public servicioUsuario: UserService,
    public servicioRole: RoleService,
    public servicioPM: PermisoModuloService,
    public servicioModulo: ModuloService)
  {

    if( localStorage.getItem('currentUser') )
    {
      this.router.navigate([''])

    }
    else
    {


      this.totalModulos = []
      this.totalPM = []
      this.user = ''
      this.password = ''
      this.isLoginable = true
      this.eventService.isSingUp.subscribe( (newUser) => {
        this.user =  newUser.email
        this.password = newUser.password
      })
    }



  }

  ngOnInit() {
  }

  login()
  {
    if( !( this.user === "" || this.password === "" ) )
    {
      this.authService.login(this.user, this.password).subscribe( ( data ) => {


        this.servicioUsuario.getUsers().subscribe( data => {
          var todo: any = data
          todo = todo.data

          var currentUser: any = todo.filter( usuario => usuario.email === this.user )

          this.roleId = currentUser[0].Role_id

          var personaId=currentUser[0].Persona_id

          this.servicioModulo.getModulos().subscribe(data => {
            var todo: any = data
            todo = todo.data
            this.totalModulos = todo

            this.servicioPM.getPermisoModulos().subscribe( data => {
              var todo: any = data
              todo = todo.data

              var misPM: any = todo.filter( pm => pm.Role_id === this.roleId )

              this.totalPM = misPM

              for ( let j = 0 ; j < this.totalPM.length ; j++ )
              {

                var aux: any = this.totalModulos.filter( modulo => modulo.id === parseInt(this.totalPM[j].Modulo_id))

                this.totalPM[j].Modulo_id = aux[0].name

              }

              var arregloPermisos = JSON.stringify(this.totalPM)

              localStorage.setItem('permisos', arregloPermisos)
              var test=JSON.stringify({"id":personaId});
              localStorage.setItem('persona',test);

              this.eventService.singIn()
              this.router.navigate(['per'])


            })


          })



        })










      },

      (err) => {

        if ( err === 'Unauthorized' )
        {
          alert("No estas registrado")
        }

      })
    }

  }


  register()
  {
    let dialogRef = this.dialog.open(RegistroComponent, {
      width: '1000px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("cerrando")
    });
  }


  activeLogIn()
  {
    if( this.password != ''  && this.user != '')
    {
      this.isLoginable = false
    }
    else
    {
      this.isLoginable = true
    }
  }
}
