import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private router: Router){}


  irMP()
  {
    this.router.navigate(['moduloPacientes']);
  }


  irMC()
  {

  }


  irMA()
  {

  }




}
