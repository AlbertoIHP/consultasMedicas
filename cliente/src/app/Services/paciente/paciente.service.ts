import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Paciente } from '../../Models/Paciente.model';

@Injectable()
export class PacienteService {
	public base: string = "http://localhost:8000/api/v1/";
	public options: RequestOptions;
	public headers: Headers;

  	constructor(private http: Http, private authenticationService: AuthenticationService)
	{
		this.headers = new Headers(
		{
			'Authorization': 'Bearer ' + this.authenticationService.token,
			'Content-Type': 'application/json'
		});

		this.options = new RequestOptions({ headers: this.headers });
	}

	//Get todos los pacientes
	getPacientes(): Observable<Paciente[]>
	{
		return this.http.get(this.base+'pacientes', this.options).map((res: Response) => res.json());
	}

	//Post nuevo paciente
	registerPaciente(paciente: Paciente)
	{
		return this.http.post(this.base+'paciente', JSON.stringify(paciente), this.options).map((res: Response) => res.json());
	}

	//GET paciente particular
	getPaciente(id) : Observable<Paciente>
	{
		return this.http.get(this.base+'pacientes/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT paciente particular
	editPaciente(paciente: Paciente, id: number)
	{
		return this.http.put(this.base+'pacientes/'+id, JSON.stringify(paciente), this.options).map((res: Response) => res.json());
	}

	//DELETE paciente particular
	deletePaciente(id) {
		return this.http.delete(this.base+'pacientes/'+id, this.options).map((res: Response) => res.json());
	}
}
