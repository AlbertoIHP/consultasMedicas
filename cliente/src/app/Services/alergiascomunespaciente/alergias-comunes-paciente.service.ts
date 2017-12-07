import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { AlergiasComunesPaciente } from '../../Models/AlergiasComunesPaciente.model';

@Injectable()
export class AlergiasComunesPacienteService {

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
getAlergiasComunesPacientes(): Observable<AlergiasComunesPaciente[]>
{
	return this.http.get(this.base+'alergiasComunesPacientes', this.options).map((res: Response) => res.json());
}

//POST
registerAlergiasComunesPaciente(alergiasComunesPaciente: AlergiasComunesPaciente): Observable<boolean>
{
	return this.http.post( this.base+'alergiasComunesPacientes', JSON.stringify(alergiasComunesPaciente), this.options).map((res: Response) => res.json());

}

//GET
getAlergiasComunesPaciente(id) : Observable<AlergiasComunesPaciente>
{
	return this.http.get(this.base+'alergiasComunesPacientes/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editAlergiasComunesPaciente(alergiasComunesPaciente: AlergiasComunesPaciente, id: number)
{
	return this.http.put(this.base+'alergiasComunesPacientes/'+id, JSON.stringify(alergiasComunesPaciente), this.options).map((res: Response) => res.json());
}

//DELETE
deleteAlergiasComunesPaciente(id) {
	return this.http.delete(this.base+'alergiasComunesPacientes/'+id, this.options).map((res: Response) => res.json());
}

}
