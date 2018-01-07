//Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Servicios
import { EventosService } from '../../../../Services/eventos/eventos.service';

import { Usuario } from '../../../../Models/Usuario.model';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent  implements OnInit {
  //Declarar atributos
  editarForm: FormGroup;
  public usuario: Usuario;
  public totalRoles: any;
  public servicioUsuario: any;
  public emailValido = true;

  ngOnInit() {
    // Se inician las validaciones usando un FormGroup y se dan los parámetros
    this.editarForm = new FormGroup({
      email: new FormControl(this.usuario.email, [Validators.required]),
      pass: new FormControl(this.usuario.password, [Validators.required]),
      rol: new FormControl(this.usuario.Role_id, [Validators.required]),
      personaAsociada: new FormControl(this.usuario.Persona_id, [Validators.required])
    });
  }

  constructor(
    //Se declaran los servicios y componentes a utilizar
    public dialogRef: MatDialogRef<EditarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEventos: EventosService
    ) {
    //Se inicializan los atributos
    this.usuario = new Usuario();
    this.usuario.email = data.usuario.email;
    this.usuario.password = data.usuario.password;
    this.usuario.Role_id = data.usuario.Role_id;
    this.usuario.id = data.usuario.id;
    this.totalRoles = data.roles;
    this.servicioUsuario = data.servicioUsuario;
  }

  //Cerrar el diálogo
  onNoClick() {
    this.dialogRef.close();
  }

  editarUsuario() {
    //Usando el id del usuario este se edita, y se actualiza con los nuevos datos
    this.servicioUsuario.editUser(this.usuario, this.usuario.id).subscribe( data => {
      //Se cierra el diálogo y se emite un evento
      this.dialogRef.close();
      this.servicioEventos.hiceUnCambio();
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if( re.test(email) ) {
      this.emailValido = false
    } else {
      this.emailValido = true
    }
  }
}