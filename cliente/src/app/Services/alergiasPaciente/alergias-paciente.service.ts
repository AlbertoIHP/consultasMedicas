import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { AlergiasPaciente } from '../../Models/AlergiasPaciente.model';
@Injectable()
export class AlergiasPacienteService {
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
getAlergiasPacientes(): Observable<AlergiasPaciente[]>
{
	return this.http.get(this.base+'alergiasPacientes', this.options).map((res: Response) => res.json());
}

//POST
registerAlergiasPaciente(alergiasPaciente: AlergiasPaciente): Observable<boolean>
{
	return this.http.post( this.base+'alergiasPacientes', JSON.stringify(alergiasPaciente), this.options).map((res: Response) => res.json());

}

//GET
getAlergiasPaciente(id) : Observable<AlergiasPaciente>
{
	return this.http.get(this.base+'alergiasPacientes/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editAlergiasPaciente(alergiasPaciente: AlergiasPaciente, id: number)
{
	return this.http.put(this.base+'alergiasPacientes/'+id, JSON.stringify(alergiasPaciente), this.options).map((res: Response) => res.json());
}

//DELETE
deleteAlergiasPaciente(id) {
	return this.http.delete(this.base+'alergiasPacientes/'+id, this.options).map((res: Response) => res.json());
}


}
