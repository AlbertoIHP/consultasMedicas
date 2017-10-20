import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public currentUserRole: Role = { id: 1, nombre: 'Paciente'};



	constructor(private router: Router){}

	//Paciente
irFichaPaciente()
  {
  	this.router.navigate(['paciente/ficha']);
  }

  irHomePaciente()
  {
  	this.router.navigate(['paciente']);
  }

//admin
  irPacentesAdmin ()
  {
   this.router.navigate(['admin/pacientes']);
  }

  irHomeAdmin ()
  {
   this.router.navigate(['admin']);
  }
//secretary
	irPacientesSecretary ()
	{
	 this.router.navigate(['secretary/personas']);
	}

	irHomeSecretary ()
	{
		this.router.navigate(['secretary']);
	}
}
