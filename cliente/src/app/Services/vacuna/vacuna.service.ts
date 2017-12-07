import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Vacuna } from '../../Models/Vacuna.model'

@Injectable()
export class VacunaService {

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
getVacunas(): Observable<Vacuna[]>
{
	return this.http.get(this.base+'vacunas', this.options).map((res: Response) => res.json());
}

//POST
registerVacuna(vacuna: Vacuna): Observable<boolean>
{
	return this.http.post( this.base+'vacunas', JSON.stringify(vacuna), this.options).map((res: Response) => res.json());

}

//GET
getVacuna(id) : Observable<Vacuna>
{
	return this.http.get(this.base+'vacunas/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editVacuna(vacuna: Vacuna, id: number)
{
	return this.http.put(this.base+'vacunas/'+id, JSON.stringify(vacuna), this.options).map((res: Response) => res.json());
}

//DELETE
deleteVacuna(id) {
	return this.http.delete(this.base+'vacunas/'+id, this.options).map((res: Response) => res.json());
}


}
