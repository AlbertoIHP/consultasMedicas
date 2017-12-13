import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { HabitosSexualesPaciente } from '../../Models/HabitosSexualesPaciente.model';

@Injectable()
export class HabitosSexualesPacienteService {

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
getHabitosSexualesPacientes(): Observable<HabitosSexualesPaciente[]>
{
	return this.http.get(this.base+'habitosSexualesPacientes', this.options).map((res: Response) => res.json());
}

//POST
registerHabitosSexualesPaciente(habitoSexualPaciente: HabitosSexualesPaciente): Observable<boolean>
{
	return this.http.post( this.base+'habitosSexualesPacientes', JSON.stringify(habitoSexualPaciente), this.options).map((res: Response) => res.json());

}

//GET
getHabitosSexualesPaciente(id) : Observable<HabitosSexualesPaciente>
{
	return this.http.get(this.base+'habitosSexualesPacientes/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editHabitosSexualesPaciente(habitoSexualPaciente: HabitosSexualesPaciente, id: number)
{
	return this.http.put(this.base+'habitosSexualesPacientes/'+id, JSON.stringify(habitoSexualPaciente), this.options).map((res: Response) => res.json());
}

//DELETE
deleteHabitosSexualesPaciente(id) {
	return this.http.delete(this.base+'habitosSexualesPacientes/'+id, this.options).map((res: Response) => res.json());
}

}
