import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { AlergiasMedicamentosPaciente } from '../../Models/AlergiasMedicamentosPaciente.model';
@Injectable()
export class AlergiasMedicamentosPacienteService {
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
getAlergiasMedicamentosPacientes(): Observable<AlergiasMedicamentosPaciente[]>
{
	return this.http.get(this.base+'alergiasMedicamentosPacientes', this.options).map((res: Response) => res.json());
}

//POST
registerAlergiasMedicamentosPaciente(alergiasMedicamentosPaciente: AlergiasMedicamentosPaciente): Observable<boolean>
{
	return this.http.post( this.base+'alergiasMedicamentosPacientes', JSON.stringify(alergiasMedicamentosPaciente), this.options).map((res: Response) => res.json());

}

//GET
getAlergiasMedicamentosPaciente(id) : Observable<AlergiasMedicamentosPaciente>
{
	return this.http.get(this.base+'alergiasMedicamentosPacientes/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editAlergiasMedicamentosPaciente(alergiasMedicamentosPaciente: AlergiasMedicamentosPaciente, id: number)
{
	return this.http.put(this.base+'alergiasMedicamentosPacientes/'+id, JSON.stringify(alergiasMedicamentosPaciente), this.options).map((res: Response) => res.json());
}

//DELETE
deleteAlergiasMedicamentosPaciente(id) {
	return this.http.delete(this.base+'alergiasMedicamentosPacientes/'+id, this.options).map((res: Response) => res.json());
}


}
