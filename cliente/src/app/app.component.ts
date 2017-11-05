import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { EventosService } from './Services/eventos/eventos.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLogeado: boolean = false

	constructor(public eventosService: EventosService,private router: Router,private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    //iconos de toolbar
    this.iconRegistry
        .addSvgIcon('icono-paciente',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/patient.svg'));

    this.iconRegistry
        .addSvgIcon('icono-agenda',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/agenda.svg'));

    this.iconRegistry
        .addSvgIcon('icono-doctor',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/doctor.svg'));

    this.iconRegistry
        .addSvgIcon('icono-logout',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/exit.svg'));

    this.iconRegistry
        .addSvgIcon('icono-editar-perfil',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/tools.svg'));

    //iconos para las acciones de las distintas secciones de módulos
    this.iconRegistry
        .addSvgIcon('icono-editar',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/repair.svg'));

    this.iconRegistry
        .addSvgIcon('icono-desactivar',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/cancel.svg'));

    this.iconRegistry
        .addSvgIcon('icono-ficha-medica',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/curriculum.svg'));

    this.iconRegistry
        .addSvgIcon('icono-prevision',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/commerce.svg'));

    this.iconRegistry
        .addSvgIcon('icono-agregar',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/add-user.svg'));

    this.iconRegistry
        .addSvgIcon('icono-eliminar',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/trash.svg'));

    if(localStorage.getItem('currentUser'))
    {
      this.isLogeado = true
    }


    if( localStorage.getItem('currentUser'))
    {
      this.isLogeado = true
    }

    this.eventosService.isSingIn.subscribe( data => {
      this.isLogeado = true
    })
  }


  irMP()
  {
    this.router.navigate(['moduloPacientes']);
  }


  irMC()
  {
    this.router.navigate(['moduloCitas']);
  }


  irMA()
  {

  }


  cerrarSesion()
  {
    this.isLogeado = false
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
