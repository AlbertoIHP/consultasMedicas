import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { EstadoCivil } from '../../Models/EstadoCivil.model';


@Injectable()
export class EstadocivilService {
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
	getEstadoCivils(): Observable<EstadoCivil[]>
	{
		return this.http.get(this.base+'estadoCivils', this.options).map((res: Response) => res.json());
	}

	//POST
	registerEstadoCivil(estadoCivil: EstadoCivil)
	{
		return this.http.post( this.base+'estadoCivils', JSON.stringify(estadoCivil), this.options).map((res: Response) => res.json());

	}

	//GET
	getEstadoCivil(id) : Observable<EstadoCivil>
	{
		return this.http.get(this.base+'estadoCivils/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editEstadoCivil(estadoCivil: EstadoCivil, id: number)
	{
		return this.http.put(this.base+'estadoCivils/'+id, JSON.stringify(estadoCivil), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteEstadoCivil(id) {
		return this.http.delete(this.base+'estadoCivils/'+id, this.options).map((res: Response) => res.json());
	}


}
