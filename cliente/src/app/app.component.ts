import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { EventosService } from './Services/eventos/eventos.service';

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
        .addSvgIcon('icono-logout',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/exit.svg'));

    this.iconRegistry
        .addSvgIcon('icono-editar-perfil',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/tools.svg'));

    this.iconRegistry
        .addSvgIcon('icono-error',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/warning.svg'));

  

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

  changeMenu(menu1, menu2)
  {
    menu1.close()
    menu2.close()
  }


}
