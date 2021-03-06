import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventosService } from '../../../../Services/eventos/eventos.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent  implements OnInit{
  editarForm: FormGroup;
  public usuario: any;
  public totalRoles: any;
  public servicio: any;
  public servicioRole: any;
  public emailValido = true;

  ngOnInit()
  {
    this.servicioRole.getRoles().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRoles = todo;

    });

     this.editarForm = new FormGroup({
          email: new FormControl(this.usuario.email, [Validators.required]),
          pass: new FormControl(this.usuario.password, [Validators.required]),
          rol: new FormControl(this.usuario.Role_id, [Validators.required]),
          personaAsociada: new FormControl(this.usuario.Persona_id, [Validators.required])
    
      });
  }

  constructor(
    public dialogRef: MatDialogRef<EditarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicioEventos: EventosService
    )
  {
    this.usuario = data.usuario;
    this.totalRoles = data.roles;
    this.servicio = data.servicioUsuario;
    this.servicioRole = data.servicioRole;
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

  editarRole()
  {
    this.servicio.editUser(this.usuario, this.usuario.id).subscribe( data => {
      console.log(data);
      this.dialogRef.close();
      this.servicioEventos.hiceUnCambio();
    });
  }

  validateEmail(email)
  {
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




}
