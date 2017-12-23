import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { base } from '../const'

//Servicios utilizados
import { AuthenticationService } from '../authentication/authentication.service';

//Se importan los modelos a utilizar
import { TipoSangre } from '../../Models/TipoSangre.model';



@Injectable()
export class TipoSangreService {
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
getTipoSangres(): Observable<TipoSangre[]>
{
	return this.http.get(this.base+'tipoSangres', this.options).map((res: Response) => res.json());
}

//POST
registerTipoSangre(tipoSangre: TipoSangre): Observable<boolean>
{
	return this.http.post( this.base+'tipoSangres', JSON.stringify(tipoSangre), this.options).map((res: Response) => res.json());

}

//GET
getTipoSangre(id) : Observable<TipoSangre>
{
	return this.http.get(this.base+'tipoSangres/'+id, this.options).map((res: Response) => res.json());
}

//PUT
editTipoSangre(tipoSangre: TipoSangre, id: number)
{
	return this.http.put(this.base+'tipoSangres/'+id, JSON.stringify(tipoSangre), this.options).map((res: Response) => res.json());
}

//DELETE
deleteTipoSangre(id) {
	return this.http.delete(this.base+'tipoSangres/'+id, this.options).map((res: Response) => res.json());
}


}
