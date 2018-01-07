//Componentes generales
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { VistaUsuario } from '../../Models/VistaUsuario.model';

@Injectable()
export class VistaUsuarioService {
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
	getVistaUsuarios(): Observable<VistaUsuario[]>
	{
		return this.http.get(this.base+'vistaUsuarios', this.options).map((res: Response) => res.json());
	}

	//GET
	getVistaUsuario(id) : Observable<VistaUsuario>
	{
		return this.http.get(this.base+'vistaUsuarios/'+id, this.options).map((res: Response) => res.json());
	}

}

}
