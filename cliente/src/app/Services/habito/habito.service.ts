import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Habito } from '../../Models/Habito.model';

@Injectable()
export class HabitoService {

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
getHabitos(): Observable<Habito[]>
{
	return this.http.get(this.base+'habitos', this.options).map((res: Response) => res.json());
}

//POST
registerHabito(habito: Habito): Observable<boolean>
{
	return this.http.post( this.base+'habitos', JSON.stringify(habito), this.options).map((res: Response) => res.json());

}

//GET
getHabito(id) : Observable<Habito>
{
	return this.http.get(this.base+'habitos/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editHabito(habito: Habito, id: number)
{
	return this.http.put(this.base+'habitos/'+id, JSON.stringify(habito), this.options).map((res: Response) => res.json());
}

//DELETE
deleteHabito(id) {
	return this.http.delete(this.base+'habitos/'+id, this.options).map((res: Response) => res.json());
}
}
