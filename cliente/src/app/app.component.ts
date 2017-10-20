import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public currentUserRole: Role = { id: 1, nombre: 'Secretary'};



	constructor(private router: Router){}

  irPacentesAdmin ()
  {
   this.router.navigate(['admin/pacientes']);
  }

  irHomeAdmin ()
  {
   this.router.navigate(['admin']);
  }

	irPacientesSecretary ()
	{
	 this.router.navigate(['secretary/personas']);
	}

	irHomeSecretary ()
	{
		this.router.navigate(['secretary']);
	}
}
