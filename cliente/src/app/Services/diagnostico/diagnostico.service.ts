import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { Diagnostico } from '../../Models/Diagnostico.model';
@Injectable()
export class DiagnosticoService {
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
getDiagnosticos(): Observable<Diagnostico[]>
{
	return this.http.get(this.base+'diagnosticos', this.options).map((res: Response) => res.json());
}

//POST
registerDiagnostico(diagnostico: Diagnostico): Observable<boolean>
{
	return this.http.post( this.base+'diagnosticos', JSON.stringify(diagnostico), this.options).map((res: Response) => res.json());

}

//GET
getDiagnostico(id) : Observable<Diagnostico>
{
	return this.http.get(this.base+'diagnosticos/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editDiagnostico(diagnostico: Diagnostico, id: number)
{
	return this.http.put(this.base+'diagnosticos/'+id, JSON.stringify(diagnostico), this.options).map((res: Response) => res.json());
}

//DELETE
deleteDiagnostico(id) {
	return this.http.delete(this.base+'diagnosticos/'+id, this.options).map((res: Response) => res.json());
}

}
