import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Alergia } from '../../Models/Alergia.model';
@Injectable()
export class AlergiaService {

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
getAlergias(): Observable<Alergia[]>
{
	return this.http.get(this.base+'alergias', this.options).map((res: Response) => res.json());
}

//POST
registerAlergia(alergia: Alergia): Observable<boolean>
{
	return this.http.post( this.base+'alergias', JSON.stringify(alergia), this.options).map((res: Response) => res.json());

}

//GET
getAlergia(id) : Observable<Alergia>
{
	return this.http.get(this.base+'alergias/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editAlergia(alergia: Alergia, id: number)
{
	return this.http.put(this.base+'alergias/'+id, JSON.stringify(alergia), this.options).map((res: Response) => res.json());
}

//DELETE
deleteAlergia(id) {
	return this.http.delete(this.base+'alergias/'+id, this.options).map((res: Response) => res.json());
}


}
