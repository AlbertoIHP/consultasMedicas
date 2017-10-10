import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { HistorialFicha } from '../../Models/HistorialFicha.model';


@Injectable()
export class HistorialfichaService {
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
	getHistorialFichas(): Observable<HistorialFicha[]>
	{
		return this.http.get(this.base+'historialfichas', this.options).map((res: Response) => res.json());
	}

	//POST
	registerHistorialFicha(historialFicha: HistorialFicha)
	{
		return this.http.post( this.base+'v1/historialfichas', JSON.stringify(historialFicha), this.options).map((res: Response) => res.json());

	}

	//GET
	getHistorialFicha(id) : Observable<HistorialFicha>
	{
		return this.http.get(this.base+'historialfichas/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editHistorialFicha(historialFicha: HistorialFicha, id: number)
	{
		return this.http.put(this.base+'historialfichas/'+id, JSON.stringify(historialFicha), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteHistorialFicha(id) {
		return this.http.delete(this.base+'historialfichas/'+id, this.options).map((res: Response) => res.json());
	}


}
