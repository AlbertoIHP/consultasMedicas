import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { EventosService } from './Services/eventos/eventos.service';
import {UsuarioActual} from './Components/Globals/usuarioactual.component';

import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLogeado: boolean = false
  public usuarioActual
  private deviceInfo

  goPacMobile()
  {
    this.router.navigate(['mobile/mp'])
  }

  goCitMobile()
  {
    this.router.navigate(['mobile/mc'])
  }

  goAteMobile()
  {
    this.router.navigate(['mobile/ma'])
  }

  private isMobile = false

    epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      console.log(this.deviceInfo);
    }

  constructor(private deviceService: Ng2DeviceService, public eventosService: EventosService,private router: Router,private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
     this.usuarioActual= new UsuarioActual();
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

     this.epicFunction()  
    if(this.deviceInfo.device === 'android' || this.deviceInfo.device === 'iphone' || this.deviceInfo.device === 'ipad')
    {
      //alert("Esto es un mobile")
      this.isMobile = true
    }



    if(localStorage.getItem('currentUser'))
    {
      this.isLogeado = true
    }

    this.eventosService.isSingIn.subscribe( data => {
      this.isLogeado = true
      this.usuarioActual.permisos=JSON.parse(localStorage.getItem('permisos'));
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
    this.router.navigate(['login'])
  }

  changeMenu(menu1, menu2)
  {
    menu1.close()
    menu2.close()
  }


}
