import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Especialidad } from '../../Models/Especialidad.model';

@Injectable()
export class EspecialidadService {
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
getEspecialidads(): Observable<Especialidad[]>
{
	return this.http.get(this.base+'especialidads', this.options).map((res: Response) => res.json());
}

//POST
registerEspecialidad(especialidad: Especialidad): Observable<boolean>
{
	return this.http.post( this.base+'especialidads', JSON.stringify(especialidad), this.options).map((res: Response) => res.json());

}

//GET
getEspecialidad(id) : Observable<Especialidad>
{
	return this.http.get(this.base+'especialidads/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editEspecialidad(especialidad: Especialidad, id: number)
{
	return this.http.put(this.base+'especialidads/'+id, JSON.stringify(especialidad), this.options).map((res: Response) => res.json());
}

//DELETE
deleteEspecialidad(id) {
	return this.http.delete(this.base+'especialidads/'+id, this.options).map((res: Response) => res.json());
}


}
