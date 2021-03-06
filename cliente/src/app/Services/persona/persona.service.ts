import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Persona } from '../../Models/Persona.model';

@Injectable()
export class PersonaService {
	public base: string = base.api;
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
	//GET
	getPersonas(): Observable<Persona[]>
	{
		return this.http.get(this.base+'personas', this.options).map((res: Response) => res.json());
	}

	//POST
	registerPersona(persona: Persona)
	{
		return this.http.post( this.base+'personas', JSON.stringify(persona), this.options).map((res: Response) => res.json());

	}

	//GET
	getPersona(id) : Observable<Persona>
	{
		return this.http.get(this.base+'personas/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editPersona(persona: Persona, id: number)
	{
		return this.http.put(this.base+'personas/'+id, JSON.stringify(persona), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deletePersona(id) {
		return this.http.delete(this.base+'personas/'+id, this.options).map((res: Response) => res.json());
	}


}
