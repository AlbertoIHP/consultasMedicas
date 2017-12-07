import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { VacunasPaciente } from '../../Models/VacunasPaciente.model';

@Injectable()
export class VacunasPacienteService {
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
getVacunasPaciente(): Observable<VacunasPaciente[]>
{
	return this.http.get(this.base+'vacunasPacientes', this.options).map((res: Response) => res.json());
}

//POST
registerVacunaPaciente(vacunaPaciente: VacunasPaciente): Observable<boolean>
{
	return this.http.post( this.base+'vacunasPacientes', JSON.stringify(vacunaPaciente), this.options).map((res: Response) => res.json());

}

//GET
getVacunaPaciente(id) : Observable<VacunasPaciente>
{
	return this.http.get(this.base+'vacunasPacientes/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editVacunaPaciente(vacunaPaciente: VacunasPaciente, id: number)
{
	return this.http.put(this.base+'vacunasPacientes/'+id, JSON.stringify(vacunaPaciente), this.options).map((res: Response) => res.json());
}

//DELETE
deleteVacunaPaciente(id) {
	return this.http.delete(this.base+'vacunasPacientes/'+id, this.options).map((res: Response) => res.json());
}

}
