import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Feriado } from '../../Models/Feriado.model';

@Injectable()
export class FeriadoService {

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
getFeriados(): Observable<Feriado[]>
{
	return this.http.get(this.base+'feriados', this.options).map((res: Response) => res.json());
}

//POST
registerFeriado(feriado: Feriado): Observable<boolean>
{
	return this.http.post( this.base+'feriados', JSON.stringify(feriado), this.options).map((res: Response) => res.json());

}

//GET
getFeriado(id) : Observable<Feriado>
{
	return this.http.get(this.base+'feriados/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editFeriado(feriado: Feriado, id: number)
{
	return this.http.put(this.base+'feriados/'+id, JSON.stringify(feriado), this.options).map((res: Response) => res.json());
}

//DELETE
deleteFeriado(id) {
	return this.http.delete(this.base+'feriados/'+id, this.options).map((res: Response) => res.json());
}


}
