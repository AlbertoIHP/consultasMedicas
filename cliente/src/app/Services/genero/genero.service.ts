import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Genero } from '../../Models/Genero.model';

@Injectable()
export class GeneroService {
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
	//GET
	getGeneros(): Observable<Genero[]>
	{
		return this.http.get(this.base+'generos', this.options).map((res: Response) => res.json());
	}

	//POST
	registerGenero(genero: Genero)
	{
		return this.http.post( this.base+'generos', JSON.stringify(genero), this.options).map((res: Response) => res.json());

	}

	//GET
	getGenero(id) : Observable<Genero>
	{
		return this.http.get(this.base+'generos/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editGenero(genero: Genero, id: number)
	{
		return this.http.put(this.base+'generos/'+id, JSON.stringify(genero), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteGenero(id) {
		return this.http.delete(this.base+'generos/'+id, this.options).map((res: Response) => res.json());
	}


}
