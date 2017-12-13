import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Provincia } from '../../Models/Provincia.model';


@Injectable()
export class ProvinciaService {
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
	getProvincias(): Observable<Provincia[]>
	{
		return this.http.get(this.base+'provincias', this.options).map((res: Response) => res.json());
	}

	//POST
	registerProvincia(provincia: Provincia): Observable<boolean>
	{
		return this.http.post( this.base+'provincias', JSON.stringify(provincia), this.options).map((res: Response) => res.json());

	}

	//GET
	getProvincia(id) : Observable<Provincia>
	{
		return this.http.get(this.base+'provincias/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editProvincia(provincia: Provincia, id: number)
	{
		return this.http.put(this.base+'provincias/'+id, JSON.stringify(provincia), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteProvincia(id) {
		return this.http.delete(this.base+'provincias/'+id, this.options).map((res: Response) => res.json());
	}


}
