// Componentes generales
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

// Modelos y servicios
import { RoleService } from '../../../../Services/role/role.service';
import { Role } from '../../../../Models/Role.model';

import { ModuloService } from '../../../../Services/modulo/modulo.service';
import { Modulo } from '../../../../Models/Modulo.model';

import { PermisoModuloService } from '../../../../Services/permisomodulo/permisomodulo.service';
import { PermisoModulo } from '../../../../Models/PermisoModulo.model';

import { EventosService } from '../../../../Services/eventos/eventos.service';

@Component({
	selector: 'app-agregarroles',
	templateUrl: './agregarroles.component.html',
	styleUrls: ['./agregarroles.component.css']
})


export class AgregarrolesComponent{
  // Se declaran los atributos
	public nuevoRole: any;
  public totalModulos: Modulo[]
  public totalPM: PermisoModulo[]

  obtenerNombre():boolean{
    if(this.nuevoRole.nombre!=""){
      return true;
    }else{
      return false;
    }
  }

	constructor(
    //Se declaran los servicios y componentes a utilizar  
		public dialogRef: MatDialogRef<AgregarrolesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRole: RoleService,
    public servicioModulo: ModuloService,
    public servicioPM: PermisoModuloService,
    public servicioEvento: EventosService
		)
	{
    // Se inicializan los atributos
    this.totalModulos = []
    this.totalPM = []

    this.servicioModulo.getModulos().subscribe( data => {
      var todo: any = data
      todo = todo.data

      this.totalModulos = todo


      for ( let j = 0 ; j < this.totalModulos.length ; j ++)
      {
        var a: PermisoModulo = new PermisoModulo()

        a.Modulo_id = this.totalModulos[j].name

        this.totalPM.push(a)

        console.log(a)
      }


    })

		this.nuevoRole = new Role();
	}

  //Cerrar el diálogo
	onNoClick(){
		this.dialogRef.close();
	}

	agregarRole(){

    //Se agrega el nuevo rol al dar click en el botón
		this.servicioRole.registerRole(this.nuevoRole).subscribe(data => {

      this.servicioRole.getRoles().subscribe(data => {
        var todo: any = data
        todo = todo.data

        var current = todo.filter( role => role.nombre === this.nuevoRole.nombre)

        console.log(current[0].id)

        for ( let j = 0 ; j < this.totalPM.length ; j ++ ){


          this.totalPM[j].Role_id = current[0].id


          var module = this.totalModulos.filter( modulo => modulo.name === this.totalPM[j].Modulo_id)


          this.totalPM[j].Modulo_id = module[0].id.toString()


          this.totalPM[j].write === true ? this.totalPM[j].write =1 : this.totalPM[j].write = 0
          this.totalPM[j].erase === true ? this.totalPM[j].erase =1 : this.totalPM[j].erase = 0
          this.totalPM[j].update === true ? this.totalPM[j].update =1 : this.totalPM[j].update = 0
          this.totalPM[j].view === true ? this.totalPM[j].view = 1: this.totalPM[j].view = 0


          this.servicioPM.registerPermisoModulo(this.totalPM[j]).subscribe(data => {
              //Se emite un evento para actualizar los datos
              this.servicioEvento.actualizacion(true);

              // Se cierra el diálogo
              this.dialogRef.close();

          })


        }

      })

		});



	}

//Funciones para setear permisos de rol

escribir(permiso){
  permiso.write = !permiso.write
}


leer(permiso){
  permiso.view = !permiso.view
}


editar(permiso){
  permiso.update = !permiso.update
}


borrar(permiso){
  permiso.erase = !permiso.erase
}


}

