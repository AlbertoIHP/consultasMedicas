import { Component } from '@angular/core';
import { Role } from './Models/Role.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public currentUserRole: Role = { id: 1, nombre: 'Medico', write: 0, view: 0, edit: 0, erase: 0};



	constructor(private router: Router){}

  //Médico

  irHomeMedico()
  {
    this.router.navigate(['medic']);
  }

  irPacientesMedico()
  {
    this.router.navigate(['medic/pacientes']);
  }

	//Paciente
irFichaPaciente()
  {
  	this.router.navigate(['paciente/ficha']);
  }

  irCitasPaciente()
  {
    this.router.navigate(['paciente/citas']);
  }

  irHomePaciente()
  {
  	this.router.navigate(['paciente']);
  }

//admin
  irPacentesAdmin ()
  {
   this.router.navigate(['admin/moduloPacientes']);
  }

  irHomeAdmin ()
  {
   this.router.navigate(['admin']);
  }
//secretary
	irPacientesSecretary ()
	{
	 this.router.navigate(['secretary/moduloPacientes']);
	}

	irHomeSecretary ()
	{
		this.router.navigate(['secretary']);
	}
}
