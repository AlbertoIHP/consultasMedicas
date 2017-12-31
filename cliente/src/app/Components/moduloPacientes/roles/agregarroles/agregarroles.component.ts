import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { RoleService } from '../../../../Services/role/role.service';
import { Role } from '../../../../Models/Role.model';

import { ModuloService } from '../../../../Services/modulo/modulo.service';
import { Modulo } from '../../../../Models/Modulo.model';

import { PermisoModuloService } from '../../../../Services/permisomodulo/permisomodulo.service';
import { PermisoModulo } from '../../../../Models/PermisoModulo.model';

@Component({
	selector: 'app-agregarroles',
	templateUrl: './agregarroles.component.html',
	styleUrls: ['./agregarroles.component.css']
})


export class AgregarrolesComponent{
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
		public dialogRef: MatDialogRef<AgregarrolesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public servicioRole: RoleService,
    public servicioModulo: ModuloService,
    public servicioPM: PermisoModuloService
		)
	{
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


	onNoClick()
	{
		this.dialogRef.close();
	}

	agregarRole()
	{


		this.servicioRole.registerRole(this.nuevoRole).subscribe(data => {

      this.servicioRole.getRoles().subscribe(data => {
        var todo: any = data
        todo = todo.data

        var current = todo.filter( role => role.nombre === this.nuevoRole.nombre)

        console.log(current[0].id)

        for ( let j = 0 ; j < this.totalPM.length ; j ++ )
        {


          this.totalPM[j].Role_id = current[0].id


          var module = this.totalModulos.filter( modulo => modulo.name === this.totalPM[j].Modulo_id)


          this.totalPM[j].Modulo_id = module[0].id.toString()


          this.totalPM[j].write === true ? this.totalPM[j].write =1 : this.totalPM[j].write = 0
          this.totalPM[j].erase === true ? this.totalPM[j].erase =1 : this.totalPM[j].erase = 0
          this.totalPM[j].update === true ? this.totalPM[j].update =1 : this.totalPM[j].update = 0
          this.totalPM[j].view === true ? this.totalPM[j].view = 1: this.totalPM[j].view = 0




          console.log(this.totalPM[j])


          this.servicioPM.registerPermisoModulo(this.totalPM[j]).subscribe(data => {
            console.log(data)
          })


        }

      })

			this.dialogRef.close();
		});



	}






escribir(permiso)
{
  permiso.write = !permiso.write
  console.log(permiso)
}


leer(permiso)
{
  permiso.view = !permiso.view
  console.log(permiso)
}


editar(permiso)
{
  permiso.update = !permiso.update
  console.log(permiso)
}


borrar(permiso)
{
  permiso.erase = !permiso.erase
  console.log(permiso)
}




}

