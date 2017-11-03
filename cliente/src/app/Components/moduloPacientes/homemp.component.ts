import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../Services/eventos/eventos.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-homemp',
  templateUrl: './homemp.component.html',
  styleUrls: ['./homemp.component.css']
})
export class Homemp implements OnInit {
  public isLogeado = false

  constructor(public eventosService: EventosService, public router: Router) {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['/'])
    }

   }

  ngOnInit() {
  }

}
