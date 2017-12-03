import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Atencion } from '../../Models/Atencion.model';

@Injectable()
export class AtencionService {
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
getAtenciones(): Observable<Atencion[]>
{
	return this.http.get(this.base+'atencions', this.options).map((res: Response) => res.json());
}

//POST
registerAtencion(atencion: Atencion): Observable<boolean>
{
	return this.http.post( this.base+'atencions', JSON.stringify(atencion), this.options).map((res: Response) => res.json());

}

//GET
getAtencion(id) : Observable<Atencion>
{
	return this.http.get(this.base+'atencions/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editAtencion(atencion: Atencion, id: number)
{
	return this.http.put(this.base+'atencions/'+id, JSON.stringify(atencion), this.options).map((res: Response) => res.json());
}

//DELETE
deleteAtencion(id) {
	return this.http.delete(this.base+'atencions/'+id, this.options).map((res: Response) => res.json());
}

}
