import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { HabitoSexual } from '../../Models/HabitoSexual.model';

@Injectable()
export class HabitoSexualService {

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
getHabitoSexuales(): Observable<HabitoSexual[]>
{
	return this.http.get(this.base+'habitoSexuals', this.options).map((res: Response) => res.json());
}

//POST
registerHabitoSexual(habitoSexual: HabitoSexual): Observable<boolean>
{
	return this.http.post( this.base+'habitoSexuals', JSON.stringify(habitoSexual), this.options).map((res: Response) => res.json());

}

//GET
getHabitoSexual(id) : Observable<HabitoSexual>
{
	return this.http.get(this.base+'habitoSexuals/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editHabitoSexual(habitoSexual: HabitoSexual, id: number)
{
	return this.http.put(this.base+'habitoSexuals/'+id, JSON.stringify(habitoSexual), this.options).map((res: Response) => res.json());
}

//DELETE
deleteHabitoSexual(id) {
	return this.http.delete(this.base+'habitoSexuals/'+id, this.options).map((res: Response) => res.json());
}



}
