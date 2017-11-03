import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { AuthenticationService } from '../../Services/authentication/authentication.service'
import { EventosService } from '../../Services/eventos/eventos.service'
import { RegistroComponent } from './registro/registro.component'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElementRef, ViewChild, Inject } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: string
  public password: string
  public isLoginable: boolean

  constructor( public dialog: MatDialog, public eventService: EventosService, private router: Router, public authService: AuthenticationService)
  {
    this.user = ''
    this.password = ''
    this.isLoginable = true
    this.eventService.isSingUp.subscribe( (newUser) => {
      this.user =  newUser.email
      this.password = newUser.password
    })
  }

  ngOnInit() {
  }

  login()
  {
    if( !( this.user === "" || this.password === "" ) )
    {
      this.authService.login(this.user, this.password).subscribe( ( data ) => {
        this.eventService.singIn()
        this.router.navigate(['moduloPacientes'])
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
