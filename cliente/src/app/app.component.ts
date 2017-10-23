import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public currentUserRole: Role = { id: 1, nombre: 'Secretary', write: 0, view: 0, edit: 0, delete: 0};



	constructor(private router: Router){}

  irPacentesAdmin ()
  {
   this.router.navigate(['admin/moduloPacientes']);
  }

  irHomeAdmin ()
  {
   this.router.navigate(['admin']);
  }

	irPacientesSecretary ()
	{
	 this.router.navigate(['secretary/moduloPacientes']);
	}

	irHomeSecretary ()
	{
		this.router.navigate(['secretary']);
	}
}
