import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { HabitosPaciente } from '../../Models/HabitosPaciente.model';

@Injectable()
export class HabitosPacienteService {

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
getHabitosPacientes(): Observable<HabitosPaciente[]>
{
	return this.http.get(this.base+'habitosPacientes', this.options).map((res: Response) => res.json());
}

//POST
registerHabitosPaciente(habitosPaciente: HabitosPaciente): Observable<boolean>
{
	return this.http.post( this.base+'habitosPacientes', JSON.stringify(habitosPaciente), this.options).map((res: Response) => res.json());

}

//GET
getHabitosPaciente(id) : Observable<HabitosPaciente>
{
	return this.http.get(this.base+'habitosPacientes/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editHabitosPaciente(habitosPaciente: HabitosPaciente, id: number)
{
	return this.http.put(this.base+'habitosPacientes/'+id, JSON.stringify(habitosPaciente), this.options).map((res: Response) => res.json());
}

//DELETE
deleteHabitosPaciente(id) {
	return this.http.delete(this.base+'habitosPacientes/'+id, this.options).map((res: Response) => res.json());
}


}
