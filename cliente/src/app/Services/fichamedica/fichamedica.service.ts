import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { FichaMedica } from '../../Models/FichaMedica.model';


@Injectable()
export class FichamedicaService {
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
	getFichasMedicas(): Observable<FichaMedica[]>
	{
		return this.http.get(this.base+'fichamedicas', this.options).map((res: Response) => res.json());
	}

	//POST
	registerFichaMedica(fichaMedica: FichaMedica)
	{
		return this.http.post( this.base+'v1/fichamedicas', JSON.stringify(fichaMedica), this.options).map((res: Response) => res.json());

	}

	//GET
	getFichaMedica(id) : Observable<FichaMedica>
	{
		return this.http.get(this.base+'fichamedicas/'+id, this.options).map((res: Response) => res.json());
	}

	//PUT
	editFichaMedica(fichaMedica: FichaMedica, id: number)
	{
		return this.http.put(this.base+'fichamedicas/'+id, JSON.stringify(fichaMedica), this.options).map((res: Response) => res.json());
	}

	//DELETE
	deleteFichaMedica(id) {
		return this.http.delete(this.base+'fichamedicas/'+id, this.options).map((res: Response) => res.json());
	}


}
