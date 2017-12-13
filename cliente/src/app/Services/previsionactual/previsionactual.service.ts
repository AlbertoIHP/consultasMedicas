import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { PrevisionActual } from '../../Models/PrevisionActual.model';

@Injectable()
export class PrevisionactualService {
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
	getPrevisionActuals(): Observable<PrevisionActual[]>
	{
		return this.http.get(this.base+'previsionActuals', this.options).map((res: Response) => res.json());
	}

	//POST
	registerPrevisionActual(previsionActual: PrevisionActual)
	{
		return this.http.post( this.base+'previsionActuals', JSON.stringify(previsionActual), this.options).map((res: Response) => res.json());

	}

	//GET
	getPrevisionActual(id) : Observable<PrevisionActual>
	{
		return this.http.get(this.base+'previsionActuals/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editPrevisionActual(previsionActual: PrevisionActual, id: number)
	{
		return this.http.put(this.base+'previsionActuals/'+id, JSON.stringify(previsionActual), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deletePrevisionActual(id) {
		return this.http.delete(this.base+'previsionActuals/'+id, this.options).map((res: Response) => res.json());
	}


}
