import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Comuna } from '../../Models/Comuna.model';


@Injectable()
export class ComunaService {
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
	getComunas(): Observable<Comuna[]>
	{
		return this.http.get(this.base+'comunas', this.options).map((res: Response) => res.json());
	}

	//POST
	registerComuna(comuna: Comuna)
	{
		return this.http.post( this.base+'comunas', JSON.stringify(comuna), this.options).map((res: Response) => res.json());

	}

	//GET
	getComuna(id) : Observable<Comuna>
	{
		return this.http.get(this.base+'comunas/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editComuna(comuna: Comuna, id: number)
	{
		return this.http.put(this.base+'comunas/'+id, JSON.stringify(comuna), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteComuna(id) {
		return this.http.delete(this.base+'comunas/'+id, this.options).map((res: Response) => res.json());
	}


}

