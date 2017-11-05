import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { EstadoCita } from '../../Models/EstadoCita.model';

@Injectable()
export class EstadoCitaService {
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
getEstadoCitas(): Observable<EstadoCita[]>
{
	return this.http.get(this.base+'estadoCitas', this.options).map((res: Response) => res.json());
}

//POST
registerEstadoCita(estadoCita: EstadoCita): Observable<boolean>
{
	return this.http.post( this.base+'estadoCitas', JSON.stringify(estadoCita), this.options).map((res: Response) => res.json());

}

//GET
getEstadoCita(id) : Observable<EstadoCita>
{
	return this.http.get(this.base+'estadoCitas/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editEstadoCita(estadoCita: EstadoCita, id: number)
{
	return this.http.put(this.base+'estadoCitas/'+id, JSON.stringify(estadoCita), this.options).map((res: Response) => res.json());
}

//DELETE
deleteEstadoCita(id) {
	return this.http.delete(this.base+'estadoCitas/'+id, this.options).map((res: Response) => res.json());
}


}
