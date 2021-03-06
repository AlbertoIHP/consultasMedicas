import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Medico } from '../../Models/Medico.model';

@Injectable()
export class MedicoService {
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
getMedicos(): Observable<Medico[]>
{
	return this.http.get(this.base+'medicos', this.options).map((res: Response) => res.json());
}

//POST
registerMedico(medico: Medico): Observable<boolean>
{
	return this.http.post( this.base+'medicos', JSON.stringify(medico), this.options).map((res: Response) => res.json());

}

//GET
getMedico(id) : Observable<Medico>
{
	return this.http.get(this.base+'medicos/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editMedico(medico: Medico, id: number)
{
	return this.http.put(this.base+'medicos/'+id, JSON.stringify(medico), this.options).map((res: Response) => res.json());
}

//DELETE
deleteMedico(id) {
	return this.http.delete(this.base+'medicos/'+id, this.options).map((res: Response) => res.json());
}


}
