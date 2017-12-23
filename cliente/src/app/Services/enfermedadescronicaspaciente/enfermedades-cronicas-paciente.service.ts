import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { EnfermedadesCronicasPaciente } from '../../Models/EnfermedadesCronicasPaciente.model';

@Injectable()
export class EnfermedadesCronicasPacienteService {

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
getEnfermedadesCronicasPacientes(): Observable<EnfermedadesCronicasPaciente[]>
{
	return this.http.get(this.base+'enfermedadesCronicasPacientes', this.options).map((res: Response) => res.json());
}

//POST
registerEnfermedadesCronicasPaciente(enfermedadesCronicasPaciente: EnfermedadesCronicasPaciente): Observable<boolean>
{
	return this.http.post( this.base+'enfermedadesCronicasPacientes', JSON.stringify(enfermedadesCronicasPaciente), this.options).map((res: Response) => res.json());

}

//GET
getEnfermedadesCronicasPaciente(id) : Observable<EnfermedadesCronicasPaciente>
{
	return this.http.get(this.base+'enfermedadesCronicasPacientes/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editEnfermedadesCronicasPaciente(enfermedadesCronicasPaciente: EnfermedadesCronicasPaciente, id: number)
{
	return this.http.put(this.base+'enfermedadesCronicasPacientes/'+id, JSON.stringify(enfermedadesCronicasPaciente), this.options).map((res: Response) => res.json());
}

//DELETE
deleteEnfermedadesCronicasPaciente(id) {
	return this.http.delete(this.base+'enfermedadesCronicasPacientes/'+id, this.options).map((res: Response) => res.json());
}

}

