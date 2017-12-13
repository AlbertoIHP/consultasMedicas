import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Ocupacion } from '../../Models/Ocupacion.model';

@Injectable()
export class OcupacionService {

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
getOcupacions(): Observable<Ocupacion[]>
{
	return this.http.get(this.base+'ocupacions', this.options).map((res: Response) => res.json());
}

//POST
registerOcupacion(ocupacion: Ocupacion): Observable<boolean>
{
	return this.http.post( this.base+'ocupacions', JSON.stringify(ocupacion), this.options).map((res: Response) => res.json());

}

//GET
getOcupacion(id) : Observable<Ocupacion>
{
	return this.http.get(this.base+'ocupacions/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editOcupacion(ocupacion: Ocupacion, id: number)
{
	return this.http.put(this.base+'ocupacions/'+id, JSON.stringify(ocupacion), this.options).map((res: Response) => res.json());
}

//DELETE
deleteOcupacion(id) {
	return this.http.delete(this.base+'ocupacions/'+id, this.options).map((res: Response) => res.json());
}


}
