// Componentes generales
import { Component, Inject, OnInit  } from '@angular/core';
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
	selector: 'app-editarroles',
	templateUrl: './editarroles.component.html',
	styleUrls: ['./editarroles.component.css']
})
export class EditarrolesComponent implements OnInit{
  //Se declaran los atributos a usar
	public role: any;

  public displayedColumns = ['function', 'permissions'];

  public totalModulos: Modulo[]
  public totalPM: PermisoModulo[]


  ngOnInit() {
      // Se inicializa el evento en false
      this.servicioEvento.actualizacion(false);
  
  }

obtenerNombre():boolean{
    if(this.role.nombre!=""){
      return true;
    }else{
      return false;
    }
  }

	constructor(
    //Se declaran los servicios y componentes a utilizar
		public dialogRef: MatDialogRef<EditarrolesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    public servicioRole: RoleService,
    public servicioModulo: ModuloService,
    public servicioPM: PermisoModuloService,
    public servicioEvento: EventosService
		)
  {
    // Se inicializan los atributos
    this.totalPM = []
    this.role = data.role

   this.servicioModulo.getModulos().subscribe( data => {
      var todo: any = data
      todo = todo.data

      this.totalModulos = todo

      this.servicioPM.getPermisoModulos().subscribe(data => {
        var todo: any = data
        todo = todo.data

        this.totalPM = todo.filter( permiso => parseInt(permiso.Role_id) === this.role.id )


        for( let i = 0 ; i < this.totalPM.length ; i ++ )
        {
          var a: any = this.totalModulos.filter( modulo => modulo.id === parseInt(this.totalPM[i].Modulo_id) )

          a = a[0]

          this.totalPM[i].Modulo_id = a.name

          console.log(this.totalPM[i])

          this.totalPM[i].write === 0 ? this.totalPM[i].write = false : this.totalPM[i].write = true
          this.totalPM[i].erase === 0 ? this.totalPM[i].erase = false : this.totalPM[i].erase = true
          this.totalPM[i].update === 0 ? this.totalPM[i].update = false : this.totalPM[i].update = true
          this.totalPM[i].view === 0 ? this.totalPM[i].view =  false: this.totalPM[i].view = true

        }

      })
    })


  }
  //Cerrar el diálogo
	onNoClick(){
		this.dialogRef.close();
	}

	editarRole(){
    //Usando el id del rol, se actualiza con los nuevos datos
		this.servicioRole.editRole(this.role, this.role.id).subscribe( data => {

      for( let j = 0 ; j < this.totalPM.length ; j ++ )
      {

        var module = this.totalModulos.filter( modulo => modulo.name === this.totalPM[j].Modulo_id)

        this.totalPM[j].Modulo_id = module[0].id.toString()


          this.totalPM[j].write === true ? this.totalPM[j].write =1 : this.totalPM[j].write = 0
          this.totalPM[j].erase === true ? this.totalPM[j].erase =1 : this.totalPM[j].erase = 0
          this.totalPM[j].update === true ? this.totalPM[j].update =1 : this.totalPM[j].update = 0
          this.totalPM[j].view === true ? this.totalPM[j].view = 1: this.totalPM[j].view = 0


        this.servicioPM.editPermisoModulo(this.totalPM[j], this.totalPM[j].id).subscribe(data => {
          
          //Se emite un evento para no actualizar la vista
          this.servicioEvento.actualizacion(true);

          this.dialogRef.close();


        })

      }
			
		});
	}




}


