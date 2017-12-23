import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { BoxConsulta } from '../../Models/BoxConsulta.model';

@Injectable()
export class BoxConsultaService {
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
getBoxConsultas(): Observable<BoxConsulta[]>
{
	return this.http.get(this.base+'boxConsultas', this.options).map((res: Response) => res.json());
}

//POST
registerBoxConsulta(boxConsulta: BoxConsulta): Observable<boolean>
{
	return this.http.post( this.base+'boxConsultas', JSON.stringify(boxConsulta), this.options).map((res: Response) => res.json());

}

//GET
getBoxConsulta(id) : Observable<BoxConsulta>
{
	return this.http.get(this.base+'boxConsultas/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editBoxConsulta(boxConsulta: BoxConsulta, id: number)
{
	return this.http.put(this.base+'boxConsultas/'+id, JSON.stringify(boxConsulta), this.options).map((res: Response) => res.json());
}

//DELETE
deleteBoxConsulta(id) {
	return this.http.delete(this.base+'boxConsultas/'+id, this.options).map((res: Response) => res.json());
}


}

