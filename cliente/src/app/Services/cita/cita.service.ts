import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Cita } from '../../Models/Cita.model';

@Injectable()
export class CitaService {
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
getCitas(): Observable<Cita[]>
{
	return this.http.get(this.base+'citas', this.options).map((res: Response) => res.json());
}

//POST
registerCita(cita: Cita): Observable<boolean>
{
	return this.http.post( this.base+'citas', JSON.stringify(cita), this.options).map((res: Response) => res.json());

}

//GET
getCita(id) : Observable<Cita>
{
	return this.http.get(this.base+'citas/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editCita(cita: Cita, id: number)
{
	return this.http.put(this.base+'citas/'+id, JSON.stringify(cita), this.options).map((res: Response) => res.json());
}

//DELETE
deleteCita(id) {
	return this.http.delete(this.base+'citas/'+id, this.options).map((res: Response) => res.json());
}


}
