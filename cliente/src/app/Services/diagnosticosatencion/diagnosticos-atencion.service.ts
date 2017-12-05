import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { DiagnosticosAtencion } from '../../Models/DiagnosticosAtencion.model';

@Injectable()
export class DiagnosticosAtencionService {
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
getDiagnosticosAtencions(): Observable<DiagnosticosAtencion[]>
{
	return this.http.get(this.base+'diagnosticosAtencions', this.options).map((res: Response) => res.json());
}

//POST
registerDiagnosticosAtencion(diagnosticosAtencion: DiagnosticosAtencion): Observable<boolean>
{
	return this.http.post( this.base+'diagnosticosAtencions', JSON.stringify(diagnosticosAtencion), this.options).map((res: Response) => res.json());

}

//GET
getDiagnosticosAtencion(id) : Observable<DiagnosticosAtencion>
{
	return this.http.get(this.base+'diagnosticosAtencions/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editDiagnosticosAtencion(diagnosticosAtencion: DiagnosticosAtencion, id: number)
{
	return this.http.put(this.base+'diagnosticosAtencions/'+id, JSON.stringify(diagnosticosAtencion), this.options).map((res: Response) => res.json());
}

//DELETE
deleteDiagnosticosAtencion(id) {
	return this.http.delete(this.base+'diagnosticosAtencions/'+id, this.options).map((res: Response) => res.json());
}

}
