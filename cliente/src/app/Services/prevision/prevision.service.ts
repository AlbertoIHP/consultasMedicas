import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Prevision } from '../../Models/Prevision.model';


@Injectable()
export class PrevisionService {
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
	getPrevisions(): Observable<Prevision[]>
	{
		return this.http.get(this.base+'previsions', this.options).map((res: Response) => res.json());
	}

	//POST
	registerPrevision(prevision: Prevision)
	{
		return this.http.post( this.base+'v1/previsions', JSON.stringify(prevision), this.options).map((res: Response) => res.json());

	}

	//GET
	getPrevision(id) : Observable<Prevision>
	{
		return this.http.get(this.base+'previsions/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editPrevision(prevision: Prevision, id: number)
	{
		return this.http.put(this.base+'previsions/'+id, JSON.stringify(prevision), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deletePrevision(id) {
		return this.http.delete(this.base+'previsions/'+id, this.options).map((res: Response) => res.json());
	}


}
