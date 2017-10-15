import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public currentUserRole: Role = { id: 1, nombre: 'Administrador'};



	constructor(private router: Router){}

	irPacientesSecretary()
	{
	 this.router.navigate(['secretary/pacientes']);
	}

	irHomeSecretary ()
	{
		this.router.navigate(['secretary']);
	}
}
