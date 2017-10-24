import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { EventosService } from '../../../../../Services/eventos/eventos.service';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent  implements OnInit{
  public usuario: any;
  public totalRoles: any;
  public servicio: any;
  public servicioRole: any;

  ngOnInit()
  {
    this.servicioRole.getRoles().subscribe(data => {
      var todo: any = data;
      todo = todo.data;
      this.totalRoles = todo;

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

  roleSeleccionado(role)
  {
    console.log(this.usuario);
    this.usuario.Role_id = role.id;
  }

}
